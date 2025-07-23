<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref, watch } from "vue";

import ControllsContainer from "./ControllsContainer.vue";
import ChaptersPanel from "./panels/ChaptersPanel.vue";
import TranscriptPanel from "./panels/TranscriptPanel.vue";

import { type Chapter } from "../types/chapter.ts";
import { type TranscriptItem } from "../types/transcript.ts";
import { fetchChapters } from "../composables/fetchChapters.ts";
import { fetchAndFormatTranscript } from "../composables/fetchTranscript.ts";
import { fetchVideo } from "../composables/fetchVideo.ts";

const videoRef = ref<HTMLVideoElement | null>(null);
const trackRef = ref<HTMLTrackElement | null>(null);

//const videoUrl ="https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";
const videoError = ref<boolean>(false);

const transcripts = ref<TranscriptItem[]>([]);
const transcriptFile = ref();
const chapters = ref<Chapter[]>([]);
const currentChapter = ref<string>();
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const isPlaying = ref<boolean>(false);
const isSubtitles = ref(false);
const isChaptersOpen = ref<boolean>(false);
const isTranscriptOpen = ref<boolean>(false);

//Fetch chapters and transcript on mount of the app
onMounted(async () => {
	//Fetch Video Url and check if it is valid
	const videoFetchResult = await fetchVideo(videoRef.value);
	videoError.value = videoFetchResult !== undefined ? videoFetchResult : false;

	const fetchedChapters = await fetchChapters(
		"./chapters/full.xml" //"https://meetyoo-code-challenge.s3.eu-central-1.amazonaws.com/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/full.xml" //
	);
	const transcriptResult = await fetchAndFormatTranscript(
		"./transcript/transcript.vtt" //"https://meetyoo-code-challenge.s3.eu-central-1.amazonaws.com/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/transcript.vtt" //
	);
	if (Array.isArray(fetchedChapters) && Array.isArray(transcriptResult)) {
		chapters.value = fetchedChapters;
		transcripts.value = transcriptResult;
	} else {
		if (!Array.isArray(fetchedChapters)) {
			console.error("Error fetching chapters:", fetchedChapters.error);
			chapters.value = [];
		}
		if (!Array.isArray(transcriptResult)) {
			console.error("Error fetching transcript:", transcriptResult.error);
			transcripts.value = [];
		}
	}
	transcriptFile.value = fetch("./transcript/transcript.vtt");
	checkScreenSize();
	window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", checkScreenSize);
});

//Function to updated the currentchapter
watch(currentTime, (newTime: number) => {
	const chapter = chapters.value.find((c) => newTime >= c.start && newTime <= c.end);
	if (chapter) {
		currentChapter.value = chapter.title;
	}
});

provide("videoApi", { videoRef, seekTo });

function checkScreenSize() {
	if (window.innerWidth <= 1070) {
		isChaptersOpen.value = false;
		isTranscriptOpen.value = false;
	}
}
//Handle video errors
const handleVideoError = () => {
	videoError.value = true;
};

const setDuration = () => {
	const video = videoRef.value;
	if (video) {
		duration.value = video.duration;
	}
};
//Function to update current time and duration
const updateTime = () => {
	const video = videoRef.value;
	if (video) {
		currentTime.value = video.currentTime;
	}
};
function seekTo(seconds: number) {
	if (videoRef.value) {
		videoRef.value.currentTime = seconds;
		videoRef.value.play();
	}
}
const handleSeek = (newTime: number) => {
	currentTime.value = newTime;
	updateTime();
};
</script>

<template>
	<div class="video-container">
		<button class="toggle-content-btn-left" @click="isTranscriptOpen = !isTranscriptOpen" v-if="!videoError">
			<img class="arrow" src="@/assets/angle-double-left.svg" alt="" />
		</button>
		<TranscriptPanel :transcripts="transcripts" :currentTime="currentTime" v-if="isTranscriptOpen" />

		<video
			v-if="!videoError"
			ref="videoRef"
			class="video"
			@loadedmetadata="setDuration"
			@timeupdate="updateTime"
			@error="handleVideoError"
		>
			<track ref="trackRef" :src="transcriptFile" kind="subtitles" srclang="en" label="English" default />
		</video>
		<div class="no-video" v-else>
			<img class="error-img" src="../assets/VideoError.png" />
		</div>

		<ChaptersPanel :chapters="chapters" v-if="isChaptersOpen" />
		<button class="toggle-content-btn-right" @click="isChaptersOpen = !isChaptersOpen" v-if="!videoError">
			<img class="arrow" src="@/assets/angle-double-right.svg" alt="" />
		</button>
	</div>
	<ControllsContainer
		v-if="!videoError"
		:videoRef="videoRef"
		:currentTime="currentTime"
		:duration="duration"
		:isPlaying="isPlaying"
		:isSubtitles="isSubtitles"
		:transcripts="transcripts"
		:chapters="chapters"
		:currentChapter="currentChapter || ''"
		@seek="handleSeek"
	/>
</template>

<style lang="scss">
$max-video-width: 1000px;
$box-shadow-dark: 10px 10px 15px rgba(0, 0, 0, 0.3);
$box-shadow-error: 15px 20px 25px rgba(0, 0, 0, 0.2);
$main-color: #eff4fa;
$highlight-color: #61de00;
$btn-bg: #ffffff;
$btn-padding: 12px;
$btn-max-height: 577px;
$btn-max-width: 37px;

.video-container {
	display: flex;
	justify-content: center;
	align-items: stretch;
	width: 100%;
	height: 100%;
	max-width: 1500px;
	max-height: 650px;
	margin: 0 auto;
}

.video,
.no-video {
	width: 100%;
	max-width: $max-video-width;
}

.video {
	min-height: 50%;
	display: block;
	background-color: black;
	box-shadow: $box-shadow-dark;

	@media (max-width: 865px) {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}

	@media (max-width: 600px) {
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
	}
}

.no-video {
	height: auto;
	margin: 0 auto;
	display: flex;
	justify-content: center;
}

.error-img {
	width: 70%;
	height: auto;
	border-radius: 12px;
	box-shadow: $box-shadow-error;
}

.chapter {
	color: $main-color;
	font-size: 15px;
	max-width: 450px;
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.current_time {
	color: $highlight-color;
	font-size: 20px;
	text-align: center;
	margin: 10px 0;
	max-width: 400px;
	width: 100%;
}

%toggle-button {
	max-width: $btn-max-width;
	max-height: $btn-max-height;
	background-color: $btn-bg;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: $btn-padding;
}

.toggle-content-btn-right {
	@extend %toggle-button;
	border-top-left-radius: 2px;
	border-bottom-left-radius: 2px;

	@media (max-width: 1070px), (max-width: 865px) {
		display: none;
		border-bottom-left-radius: 0;
	}
}

.toggle-content-btn-left {
	@extend %toggle-button;
	border-top-right-radius: 2px;
	border-bottom-right-radius: 2px;

	@media (max-width: 1070px) {
		display: none;
		border-bottom-left-radius: 0;
	}
}
</style>
