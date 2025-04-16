<script setup lang="ts">
import { ref, watch } from "vue";

interface Chapter {
	title: string;
	start: number;
	end: number;
}

const videoRef = ref<HTMLVideoElement | null>(null);
//const videoUrl ="https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";
//const videoUrl = "https://www.w3schools.com/html/mov_bbb.webm";
const videoUrl = "https://mainline.i3s.unice.fr/mooc/elephants-dream-medium.webm";

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

const isPlaying = ref<boolean>(false);
const isMuted = ref<boolean>(false);
const isFullscreen = ref<boolean>(false);
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const currentChapter = ref<string>(chapters[0].title);
//const volume = ref<number>(1);

watch(currentTime, (newTime) => {
	const chapter = chapters.find((c) => newTime >= c.start && newTime <= c.end);
	if (chapter) {
		currentChapter.value = chapter.title;
	}
});

//Function to play/pause the video
const togglePlay = () => {
	const video = videoRef.value;
	if (video && video.paused) {
		video.play();
		isPlaying.value = true;
	} else {
		video?.pause();
		isPlaying.value = false;
	}
};

//Function to forward/rewind the video
const forward = () => {
	const video = videoRef.value;
	if (video) {
		video.currentTime += 5;
	}
};
const rewind = () => {
	const video = videoRef.value;
	if (video) {
		video.currentTime -= 5;
	}
};

//Function to control video volume

const volumeDown = () => {
	const video = videoRef.value;
	if (video) {
		video.volume = Math.max(0, video.volume - 0.1);
	}
};
const volumeUp = () => {
	const video = videoRef.value;
	if (video) {
		video.volume = Math.min(1, video.volume + 0.1);
	}
};
const mute = () => {
	const video = videoRef.value;
	if (video) {
		video.muted = !video.muted;
		isMuted.value = video.muted;
	}
};

//Function to fullscreen the video
const toggleFullscreen = () => {
	const video = videoRef.value;
	if (video) {
		if (isFullscreen.value) {
			document.exitFullscreen();
		} else {
			video.requestFullscreen();
		}
		isFullscreen.value = !isFullscreen.value;
	}
};

/*Function to speed up/down the video
const speedUp = () => {
	const video = videoRef.value;
	if (video) {
		playbackRate.value += 1;
	}
};
const speedDown = () => {
	const video = videoRef.value;
	if (video) {
		playbackRate.value -= 0.5;
	}
};*/

//Function to format time
const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	console.log("Formatted Time: ", `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

//Function to update current time and duration
const updateTime = () => {
	const video = videoRef.value;
	if (video) {
		currentTime.value = video.currentTime;
	}
};

const setDuration = () => {
	const video = videoRef.value;
	if (video) {
		duration.value = video.duration;
	}
};
</script>

<template>
	<div>
		<h1 class="title">Frontend Coding Challenge</h1>
		<video
			ref="videoRef"
			class="video"
			@loadedmetadata="setDuration"
			:src="videoUrl"
			@timeupdate="updateTime"
		></video>

		<div class="overall">
			<div class="progress-bar-container">
				<!-- Progress Bar and  Chapters in 1 Own Component-->
				<input class="progress-bar" type="range" min="0" :max="duration" :value="currentTime" step="0.004" />
			</div>

			<!-- Controlls auch in eigenes Component -->
			<div class="controls">
				<div class="current_time">
					<p>
						{{ formatTime(currentTime) }}/ <span>{{ formatTime(duration) }}</span>
					</p>
					<span class="chapter">{{ currentChapter }}</span>
				</div>
				<div class="control-group">
					<button class="button" @click="rewind"><img src="./assets/rewind.svg" alt="Zurückspulen" /></button>
					<button class="button" @click="togglePlay">
						<img src="./assets/play_pause.svg" alt="Abspielen/Pause" />
					</button>
					<button class="button" @click="forward"><img src="./assets/forward.svg" alt="Vorspulen" /></button>
				</div>

				<div class="control-group">
					<button class="volume-button" @click="volumeDown">
						<img src="./assets/volume_down.svg" alt="volume-down" />
					</button>
					<button class="volume-button" @click="mute">
						<img src="./assets/volume_mute.svg" alt="mute" />
					</button>
					<button class="volume-button" @click="volumeUp">
						<img src="./assets/volume_up.svg" alt="volume-up" />
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
					<button class="button" @click="toggleFullscreen">
						<img src="./assets/fullscreen.svg" alt="Vollbild" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.title {
	font-size: clamp(24px, 5vw, 45px);
	padding: 10px 20px;
	width: fit-content;
	max-width: 90%;
	color: #61de00;
	background-color: #001f52;
	border-radius: 15px;
	margin: 0 auto 25px;
	text-align: center;
}
.video {
	width: 100%;
	max-width: 1000px;
	height: auto;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	margin: 0 auto;
	display: block;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}

.overall {
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
	width: 100%;
	max-width: 1000px;
	height: auto;
	margin: 5px auto;
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
.current_time {
	color: #61de00;
	font-size: 20px;
	text-align: center;
	margin: 10px 0;
}
.button {
	background-color: #eff4fa;
	color: #001f52;
	border: 1px solid #001f52;
	padding: 10px;
	border-radius: 65px;
	cursor: pointer;
}
.button img {
	width: 20px;
	height: 20px;
}
.volume-button {
	background-color: #eff4fa;
	color: #001f52;
	border: 1px solid #001f52;
	padding: 10px;
	border-radius: 65px;
	cursor: pointer;
}
.volume-button img {
	width: 20px;
	height: 20px;
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

@media (max-width: 600px) {
	.button img {
		width: 15px;
		height: 15px;
	}
	.volume-button img {
		width: 15px;
		height: 15px;
	}
	.controls {
		justify-content: space-around;
	}

	control-group-speed {
		opacity: 0.5;
	}
}
</style>
