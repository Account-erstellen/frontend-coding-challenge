<script setup lang="ts">
import { ref, watch } from "vue";

const videoRef = ref<HTMLVideoElement | null>(null);
const videoUrl = "https://mainline.i3s.unice.fr/mooc/elephants-dream-medium.webm";
//const videoUrl ="https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";

interface Chapter {
	title: string;
	start: number;
	end: number;
}

const chapters: Chapter[] = [
	{
		title: "Introduction to event planning challenges",
		start: 0,
		end: 21,
	},
	{
		title: "Online events that feel real",
		start: 20.999,
		end: 41.999,
	},
	{
		title: "Customizable and interactive event environments",
		start: 42,
		end: 61.999,
	},
	{
		title: "Technical capabilities and sustainability",
		start: 62,
		end: 83.999,
	},
	{
		title: "Customer satisfaction and pricing options",
		start: 84,
		end: 90.008,
	},
];

const currentTime = ref<number>(0);
const duration = ref<number>(0);
const currentChapter = ref<string>(chapters[0].title);

const isPlaying = ref<boolean>(false);
const isMuted = ref<boolean>(false);
const isFullscreen = ref<boolean>(false);
const isChaptersOpen = ref<boolean>(false);
const isTranscriptOpen = ref<boolean>(false);
const isClicked = ref(false);

const muteBtnColor = ref<string>("#61de00");

function toggleColor() {
	muteBtnColor.value = muteBtnColor.value === "#61de00" ? "#f34134" : "#61de00";
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

watch(currentTime, (newTime: number) => {
	const chapter = chapters.find((c) => newTime >= c.start && newTime <= c.end);
	if (chapter) {
		currentChapter.value = chapter.title;
	}
});

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
const volumeUp = () => {
	const video = videoRef.value;
	if (video) {
		triggerClickEffect();
		video.volume = Math.min(1, video.volume + 0.1);
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

//Function to format time outsourced to function file
const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
</script>

<template>
	<div class="video-container">
		<div class="transcript-panel" :class="{ open: isTranscriptOpen }">
			<button class="toggle-content-btn-left" @click="isTranscriptOpen = !isTranscriptOpen">
				<img class="arrow" src="../assets/angle-double-left.svg" alt="" />
			</button>
			<div class="transcript-content-panel">
				<h3 class="panel-title">Transcript</h3>
				<div class="transcript-container">
					<div class="transcript-item-container">
						<p class="transcript-text">TimestampsStart --> TimestampsEnd</p>
						<p class="subtitle">Untertitlel, alsdm , ffhfewoh ewioiwefj w</p>
					</div>
					<div class="transcript-item-container">
						<p class="transcript-text">TimestampsStart --> TimestampsEnd</p>
						<p class="subtitle">Untertitlel, alsdm , ffhfewoh ewioiwefj w</p>
					</div>
					<div class="transcript-item-container">
						<p class="transcript-text">TimestampsStart --> TimestampsEnd</p>
						<p class="subtitle">Untertitlel, alsdm , ffhfewoh ewioiwefj w</p>
					</div>
					<div class="transcript-item-container">
						<p class="transcript-text">TimestampsStart --> TimestampsEnd</p>
						<p class="subtitle">Untertitlel, alsdm , ffhfewoh ewioiwefj w</p>
					</div>
					<div class="transcript-item-container">
						<p class="transcript-text">TimestampsStart --> TimestampsEnd</p>
						<p class="subtitle">Untertitlel, alsdm , ffhfewoh ewioiwefj w</p>
					</div>
				</div>
			</div>
		</div>

		<video
			ref="videoRef"
			class="video"
			@loadedmetadata="setDuration"
			:src="videoUrl"
			@timeupdate="updateTime"
			controls
		>
			<track src="../data/transcripts/transcript.vtt" kind="subtitles" srclang="en" label="English" />
		</video>

		<div class="chapters-panel" :class="{ open: isChaptersOpen }">
			<div class="chapters-content-panel">
				<h3 class="panel-title">Chapters</h3>
				<div class="transcript-container">
					<div class="chapters-item-container">
						<p class="chapters-text">Chapter id</p>
						<p class="subtitle">Untertitlel, alsdm , ffhfewoh ewioiwefj w</p>
					</div>
				</div>
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
			<div class="control-group">
				<button :class="{ clicked: isClicked }" @click="rewind">
					<img src="../assets/rewind.svg" alt="Zurückspulen" />
				</button>
				<button :class="{ clicked: isClicked }" @click="togglePlay">
					<img src="../assets/play_pause.svg" alt="Abspielen/Pause" />
				</button>
				<button :class="{ clicked: isClicked }" @click="forward">
					<img src="../assets/forward.svg" alt="Vorspulen" />
				</button>
			</div>

			<div class="control-group">
				<button :class="{ clicked: isClicked }" @click="volumeDown">
					<img src="../assets/volume_down.svg" alt="volume-down" />
				</button>
				<button :class="{ clicked: isClicked }" @click="mute" :style="{ backgroundColor: muteBtnColor }">
					<img src="../assets/volume_mute.svg" alt="mute" />
				</button>
				<button :class="{ clicked: isClicked }" @click="volumeUp">
					<img src="../assets/volume_up.svg" alt="volume-up" />
				</button>
			</div>
			<!--
			<div class="control-group-speed">
				<button class="button" @click="speedDown">
					<img src="./assets/speed_down.svg" alt="Langsamer" />
				</button>
				<button class="button" @click="speedUp">
					<img src="./assets/speed_up.svg" alt="Schneller" />
				</button>
			</div>-->
			<div class="control-group">
				<button :class="{ clicked: isClicked }">
					<img src="../assets/settings-sliders.svg" alt="Settings" />
				</button>
			</div>
			<div class="control-group">
				<button :class="{ clicked: isClicked }" @click="toggleFullscreen">
					<img src="../assets/fullscreen.svg" alt="Vollbild" />
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.video-container {
	display: flex;
	justify-content: center;
	align-items: stretch;
	max-height: 600px;
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
.video-container {
	display: flex;
	justify-content: center;
	align-items: stretch;
	max-height: 600px;
}
.video {
	width: 100%;
	max-width: 1000px;
	display: block;
	background-color: black;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}
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
}
.transcript-panel,
.chapters-panel {
	width: 60px;
}
.transcript-panel.open {
	width: 600px;
}
.chapters-panel.open {
	width: 600px;
}
.transcript-content-panel,
.chapters-content-panel {
	display: none;
	padding: 20px;
	background-color: #f5f5f5;
	width: 600px;
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
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
	margin-left: auto;
}
.toggle-content-btn-right {
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
}
.arrow {
	width: 20px;
	height: 20px;
}
/* Styles for the video player controls */
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
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	max-width: 1000px;
	padding: 10px;
	margin: -10px auto;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
}
.control-group {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
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
.control-group {
	display: flex;

	max-width: 1000px;
	padding: 5px;
	margin: 10px auto;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
}

/* Medienabfrage für mobile Geräte */
@media (max-width: 975px) {
	.control-group {
		display: flex;

		flex-direction: row;
		border: 1px solid green;
		width: fit-content;
		margin: 0px auto;
	}

	.control-group button {
		background-color: #00a651;
		color: white;
		padding: 5px;
		border: none;

		cursor: pointer;
	}

	.control-group button:first-child {
		border-left: none;
	}
}
</style>
