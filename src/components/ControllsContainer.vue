<script setup lang="ts">
import { inject, ref, type Ref } from "vue";

import { formatTime } from "../composables/functions";
import Modal from "../components/universal/Modal.vue";
import MobileContainer from "../components/mobile/MobileContainer.vue";
import type { TranscriptItem } from "../types/transcript";
import type { Chapter } from "../types/chapter";

const props = defineProps<{
	isSubtitles: boolean;
	transcripts: TranscriptItem[];
	chapters: Chapter[];
	currentChapter: string;
	currentTime: number;
	duration: number;
}>();

interface VideoAPI {
	videoRef: Ref<HTMLVideoElement | null>;
	seekTo: (t: number) => void;
}
const videoApi = inject<VideoAPI>("videoApi");

const isPlaying = ref<boolean>(false);
const showModal = ref<boolean>(false);
const isMuted = ref<boolean>(false);
const isFullscreen = ref<boolean>(false);
const isChaptersOpen = ref<boolean>(false);
const isTranscriptOpen = ref<boolean>(false);
const isClicked = ref(false);
const muteBtnColor = ref<string>("#eff4fa");

const emit = defineEmits(["seek", "update:isSubtitles"]);

function onSeek(event: Event) {
	const target = event.target as HTMLInputElement;
	const newTime = parseFloat(target.value);

	if (videoApi?.videoRef?.value) {
		videoApi.videoRef.value.currentTime = newTime;
	}
	emit("seek", newTime); // Parent kann updateTime aufrufen oder currentTime setzen
}

//Function to fullscreen the video
const toggleFullscreen = () => {
	const video = videoApi?.videoRef.value;
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
	const video = videoApi?.videoRef.value;
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
	const video = videoApi?.videoRef.value;
	if (video) {
		triggerClickEffect();
		video.currentTime += 5;
	}
};
const rewind = () => {
	const video = videoApi?.videoRef.value;
	if (video) {
		triggerClickEffect();
		video.currentTime -= 5;
	}
};
//Function to control video volume
const volumeDown = () => {
	const video = videoApi?.videoRef.value;
	if (video) {
		triggerClickEffect();
		video.volume = Math.max(0, video.volume - 0.1);
	}
};
//Function to decrease playback speed
const speedDown = () => {
	const video = videoApi?.videoRef.value;
	if (video) {
		triggerClickEffect();
		video.playbackRate = Math.max(0.5, video.playbackRate - 0.25); // Minimum speed is 0.5x
	}
};
const volumeUp = () => {
	const video = videoApi?.videoRef.value;
	if (video) {
		triggerClickEffect();
		video.volume = Math.min(1, video.volume + 0.1);
	}
};
const speedUp = () => {
	const video = videoApi?.videoRef.value;
	if (video) {
		triggerClickEffect();
		video.playbackRate = Math.min(2, video.playbackRate + 0.25); // Maximum speed is 2x
	}
};
const mute = () => {
	const video = videoApi?.videoRef.value;
	if (video) {
		triggerClickEffect();
		video.muted = !video.muted;
		isMuted.value = video.muted;
		toggleColor();
	}
};
function toggleColor() {
	muteBtnColor.value = muteBtnColor.value === "#eff4fa" ? "#f34134" : "#eff4fa";
}
function triggerClickEffect() {
	isClicked.value = true;
	setTimeout(() => {
		isClicked.value = false;
	}, 150); // Effekt dauert 150ms
}
</script>

<template>
	<div class="controls-container">
		<div class="progress-bar-container">
			<input
				class="progress-bar"
				type="range"
				min="0"
				:max="props.duration"
				:value="props.currentTime"
				step="0.004"
				@input ="onSeek"
			/>
		</div>
		<div class="controls">
			<div class="current_time">
				<p>
					{{ formatTime(props.currentTime) }}/ <span>{{ formatTime(props.duration) }}</span>
				</p>
				<p class="chapter" v-if="currentChapter">{{ currentChapter || "–" }}</p>
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
						@toggle-subtitles="$emit('update:isSubtitles', !isSubtitles)"
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
</template>
<style scoped>
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
.settings-container {
	position: relative;
	display: inline-block;
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
</style>
