<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue";
import { type Chapter } from "../types/chapter";
import Modal from "./universal/Modal.vue";
import MobileContainer from "./mobile/MobileContainer.vue";
import { formatTime } from "../composables/functions.ts"; // Corrected the path to use an alias
import { fetchChapters } from "../composables/fetchChapters.ts";
import { fetchTranscript } from "../composables/fetchTranscript.ts";

const videoRef = ref<HTMLVideoElement | null>(null);

const videoUrl = "https://mainline.i3s.unice.fr/mooc/elephants-dream-medium.webm";
//const videoUrl ="https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";

import { type TranscriptItem } from "../types/transcript";

const transcripts = ref<TranscriptItem[]>([]);
const chapters = ref<Chapter[]>([]);
const currentChapter = ref<string>();

const currentTime = ref<number>(0);
const duration = ref<number>(0);
const isPlaying = ref<boolean>(false);
const showModal = ref<boolean>(false);
const isMuted = ref<boolean>(false);
const isFullscreen = ref<boolean>(false);
const isChaptersOpen = ref<boolean>(false);
const isTranscriptOpen = ref<boolean>(false);
const isClicked = ref(false);
const isSubtitles = ref(false);
const muteBtnColor = ref<string>("#eff4fa");

//Fetch chapters and transcript on mount of the app
onMounted(async () => {
	chapters.value = (await fetchChapters("./chapters/full.xml")) || [];
	transcripts.value = (await fetchTranscript("./transcript/transcript.vtt")) || [];
});

watch(currentTime, (newTime: number) => {
	const chapter = chapters.value.find((c) => newTime >= c.start && newTime <= c.end);
	if (chapter) {
		currentChapter.value = chapter.title;
	}
});
function toggleColor() {
	muteBtnColor.value = muteBtnColor.value === "#eff4fa" ? "#f34134" : "#eff4fa";
}
function triggerClickEffect() {
	isClicked.value = true;
	setTimeout(() => {
		isClicked.value = false;
	}, 150); // Effekt dauert 150ms
}
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
//Function to fullscreen the video
const toggleFullscreen = () => {
	const video = videoRef.value;
	if (video) {
		if (isFullscreen.value) {
			triggerClickEffect();
			document.exitFullscreen();
		} else {
			triggerClickEffect();
			video.requestFullscreen();
		}
		isFullscreen.value = !isFullscreen.value;
	}
};
//Function to play/pause the video
const togglePlay = () => {
	const video = videoRef.value;
	if (video && video.paused) {
		triggerClickEffect();
		video.play();
		isPlaying.value = true;
	} else {
		triggerClickEffect();
		video?.pause();
		isPlaying.value = false;
	}
};
//Function to forward/rewind the video
const forward = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.currentTime += 5;
	}
};
const rewind = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.currentTime -= 5;
	}
};
//Function to control video volume
const volumeDown = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.volume = Math.max(0, video.volume - 0.1);
	}
};
//Function to decrease playback speed
const speedDown = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.playbackRate = Math.max(0.5, video.playbackRate - 0.25); // Minimum speed is 0.5x
	}
};
const volumeUp = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.volume = Math.min(1, video.volume + 0.1);
	}
};
const speedUp = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.playbackRate = Math.min(2, video.playbackRate + 0.25); // Maximum speed is 2x
	}
};
const mute = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.muted = !video.muted;
		isMuted.value = video.muted;
		toggleColor();
	}
};
function seekTo(seconds: number) {
	if (videoRef.value) {
		videoRef.value.currentTime = seconds;
		videoRef.value.play();
	}
}
provide("videoApi", { videoRef, seekTo });
</script>

<template>
	<div class="main-container">
		<div class="video-container">
			<div class="transcript-panel" :class="{ open: isTranscriptOpen }">
				<button class="toggle-content-btn-left" @click="isTranscriptOpen = !isTranscriptOpen">
					<img class="arrow" src="../assets/angle-double-left.svg" alt="" />
				</button>
				<div class="transcript-content-panel">
					<h3 class="panel-title">Transcript</h3>
					<ul v-if="transcripts.length">
						<li
							v-for="(transcript, index) in transcripts"
							:key="index"
							class="cursor-pointer text-blue-600 hover:underline mb-2"
						>
							{{ formatTime(transcript.start) }} –▶ {{ formatTime(transcript.end) }}
							<p class="subtitle">{{ transcript.text }}</p>
						</li>
					</ul>
				</div>
			</div>

			<video ref="videoRef" class="video" @loadedmetadata="setDuration" :src="videoUrl" @timeupdate="updateTime">
				<track src="../data/transcripts/transcript.vtt" kind="subtitles" srclang="en" label="English" />
			</video>

			<div class="chapters-panel" :class="{ open: isChaptersOpen }">
				<div class="chapters-content-panel">
					<h3 class="panel-title">Chapters</h3>
					<ul v-if="chapters.length">
						<li
							v-for="(chapter, index) in chapters"
							:key="index"
							class="cursor-pointer text-blue-600 hover:underline mb-2"
							@click="() => seekTo(chapter.start)"
						>
							▶ {{ formatTime(chapter.end) }} – {{ chapter.title }}
						</li>
					</ul>
					<p v-else>Lade Kapitel...</p>
				</div>
				<button class="toggle-content-btn-right" @click="isChaptersOpen = !isChaptersOpen">
					<img class="arrow" src="../assets/angle-double-right.svg" alt="" />
				</button>
			</div>
		</div>

		<div class="controls-container">
			<div class="progress-bar-container">
				<input class="progress-bar" type="range" min="0" :max="duration" :value="currentTime" step="0.004" />
			</div>
			<div class="controls">
				<div class="current_time">
					<p>
						{{ formatTime(currentTime) }}/ <span>{{ formatTime(duration) }}</span>
					</p>
					<p class="chapter">{{ currentChapter }}</p>
				</div>
				<div class="main-controls">
					<div class="control-group">
						<button :class="['rounded-left', { clicked: isClicked }]" @click="rewind">
							<img src="@/assets/rewind.svg" alt="Zurückspulen" />
						</button>
						<button :class="['not-rounded', { clicked: isClicked }]" @click="togglePlay">
							<img src="@/assets/play.svg" v-if="!isPlaying" />
							<img src="@/assets/play_pause.svg" v-if="isPlaying" />
						</button>
						<button :class="['rounded-right', { clicked: isClicked }]" @click="forward">
							<img src="@/assets/forward.svg" alt="Vorspulen" />
						</button>
					</div>
					<div class="volume-container">
						<button :class="['rounded-left', { clicked: isClicked }]" @click="volumeDown">
							<img src="@/assets/volume_down.svg" alt="volume-down" />
						</button>
						<button
							:class="['not-rounded', { clicked: isClicked }]"
							@click="mute"
							:style="{ backgroundColor: muteBtnColor }"
						>
							<img src="@/assets/volume_mute.svg" />
						</button>
						<button :class="['rounded-right', { clicked: isClicked }]" @click="volumeUp">
							<img src="@/assets/volume_up.svg" alt="volume-up" />
						</button>
					</div>
					<div class="settings-container">
						<Modal
							:visible="showModal"
							:isSubtitles="isSubtitles"
							@toggle-subtitles="isSubtitles = !isSubtitles"
							@speed-up="speedUp"
							@speed-down="speedDown"
						/>
						<button :class="['rounded-left', { clicked: isClicked }]" @click="showModal = !showModal">
							<img src="@/assets/settings-sliders.svg" />
						</button>

						<button :class="['rounded-right', { clicked: isClicked }]" @click="toggleFullscreen">
							<img src="@/assets/fullscreen.svg" alt="Vollbild" />
						</button>
					</div>
				</div>
			</div>
			<MobileContainer
				:transcripts="transcripts"
				:chapters="chapters"
				:isMobileTranscriptOpen="isTranscriptOpen"
				:isMobileChaptersOpen="isChaptersOpen"
				v-if="true"
			/>
		</div>
	</div>
</template>

<style>
.panel-title {
	color: #001f52;
	border-bottom: #002e78 1px solid;
	text-align: center;
}
.transcript-container,
.chapters-container {
	overflow-x: hidden; /* Hide horizontal scrollbar */
	overflow-y: auto; /* Add vertical scrollbar */
}
.chapter-item-container,
.transcript-item-container {
	margin-top: 8px;
	padding: 1px;
	max-height: 100%;
}
.chapter-text,
.transcript-text {
	font-size: small;
	font-style: italic;
	font-weight: 500;
	color: #61de00;
}
.subtitle {
	font-size: medium;
	color: #002e78;
}
.transcript-panel,
.chapters-panel {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	overflow: hidden;
	transition: width 0.3s ease;
	height: auto;
	width: auto;
}
.transcript-panel.open,
.chapters-panel.open {
	width: 60%;
}

.transcript-content-panel,
.chapters-content-panel {
	display: none;
	padding: 20px;
	background-color: #f5f5f5;
	width: 100%;
}
.transcript-panel.open .transcript-content-panel,
.chapters-panel.open .chapters-content-panel {
	display: block;
}
.toggle-content-btn-left,
.toggle-content-btn-right {
	width: 40px;
	height: 100%;
	background-color: #ffffff;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px;
}
.toggle-content-btn-left {
	border-top-right-radius: 2px;
	border-bottom-right-radius: 2px;
}
.toggle-content-btn-right {
	border-top-left-radius: 2px;
	border-bottom-left-radius: 2px;
}
.arrow {
	width: 20px;
	height: 20px;
}
.controls-container {
	display: block;
	width: 100%;
	max-width: 1000px;
	height: auto;
	margin: 0 auto;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	background-color: #002e78;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}
.progress-bar {
	-webkit-appearance: none;
	width: 100%;
	height: 25px;
	background: #d4d4d4;
	outline: #001f52;
	opacity: 1;
	-webkit-transition: 0.2s;
	transition: opacity 0.2s;
}
.progress-bar::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 15px;
	height: 25px;
	background: #61de00;
	cursor: pointer;
}
.progress-bar::-moz-range-thumb {
	width: 25px;
	height: 25px;
	background: #bebdbd;
	cursor: pointer;
}
.controls {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	max-width: 1000px;
	width: 100%;
	padding: 10px;
	margin: 0 auto 10px auto;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
}
.main-controls {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
}
.control-group {
	display: flex;
	flex-wrap: wrap;
	gap: 0px;
	justify-content: center;
}
.volume-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0px;
}
.main-container {
	display: flex;
	flex-direction: column;
	height: auto;
}
@media (max-width: 1070px) {
	.toggle-content-btn-left {
		border-bottom-left-radius: 0px;
	}
	.toggle-content-btn-right {
		border-bottom-right-radius: 0px;
	}
}
@media (max-width: 865px) {
	.toggle-content-btn-left {
		display: none;
	}
	.toggle-content-btn-right {
		display: none;
	}
	.video {
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}
}
@media (max-width: 790px) {
	.main-controls {
		display: flex;
		flex-direction: row; /* Wichtig: vertikale Anordnung */
		gap: 1rem; /* Abstand zwischen den Elementen */
	}
	.controls-container {
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
	}
}
@media (max-width: 600px) {
	.video {
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
	}
}
</style>
