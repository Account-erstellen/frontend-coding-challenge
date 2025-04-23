<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";

import ControllsContainer from "../components/ControllsContainer.vue";
import ChaptersPanel from "./panels/ChaptersPanel.vue";
import TranscriptPanel from "./panels/TranscriptPanel.vue";

import { type Chapter } from "../types/chapter";
import { type TranscriptItem } from "../types/transcript";
import { fetchChapters } from "../composables/fetchChapters.ts";
import { fetchTranscript } from "../composables/fetchTranscript.ts";

const videoRef = ref<HTMLVideoElement | null>(null);
const videoUrl = "https://mainline.i3s.unice.fr/mooc/elephants-dream-medium.webm";
//const videoUrl ="https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";

const transcripts = ref<TranscriptItem[]>([]);
const chapters = ref<Chapter[]>([]);
const currentChapter = ref<string>();
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const isPlaying = ref<boolean>(false);
const isSubtitles = ref(false);

//Fetch chapters and transcript on mount of the app
onMounted(async () => {
	chapters.value = (await fetchChapters("./chapters/full.xml")) || [];
	transcripts.value = (await fetchTranscript("./transcript/transcript.vtt")) || [];
});
//Function to updated the currentchapter
watch(currentTime, (newTime: number) => {
	const chapter = chapters.value.find((c) => newTime >= c.start && newTime <= c.end);
	if (chapter) {
		currentChapter.value = chapter.title;
	}
});
provide("videoApi", { videoRef, seekTo });
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
	updateTime(); // falls du willst, aber nicht zwingend notwendig
};
</script>

<template>
	<div class="main-container">
		<div class="video-container">
			<TranscriptPanel :transcripts="transcripts" />

			<video ref="videoRef" class="video" @loadedmetadata="setDuration" :src="videoUrl" @timeupdate="updateTime">
				<track src="../data/transcripts/transcript.vtt" kind="subtitles" srclang="en" label="English" />
			</video>

			<ChaptersPanel :chapters="chapters" />
		</div>
		<ControllsContainer
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
	</div>
</template>

<style>
.video-container {
	display: flex;
	justify-content: center;
	align-items: stretch;
	width: 100%;
	height: auto;
	max-width: 1076px;
	margin: 0 auto;
}
.video {
	width: 100%;
	max-width: 1000px;
	height: auto;
	display: block;
	background-color: black;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}
.chapter {
	color: #eff4fa;
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
	color: #61de00;
	font-size: 20px;
	text-align: center;
	margin: 10px 0;
	max-width: 400px; /* Maximale Breite für größere Bildschirme */
	width: 100%; /* Auf mobilen Geräten 100% Breite */
}
@media (max-width: 865px) {
	.video {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}
}
@media (max-width: 600px) {
	.video {
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
	}
}
</style>
