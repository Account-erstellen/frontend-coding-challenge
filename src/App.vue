<script setup lang="ts">
import { ref } from "vue";

const videoRef = ref<HTMLVideoElement | null>(null);
//const videoUrl ="https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";
const videoUrl = "https://www.w3schools.com/html/mov_bbb.webm";

const isPlaying = ref<boolean>(false);
const isMuted = ref<boolean>(false);
const isFullscreen = ref<boolean>(false);
const playbackRate = ref<number>(videoRef.value?.playbackRate || 1);
//const currentTime = ref<number>(0);
//const duration = ref<number>(0);
//const volume = ref<number>(1);
//const playbackRate = ref(1);

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

//Function to speed up/down the video
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
};
</script>

<template>
	<div>
		<h1 class="title">Frontend Coding Challenge</h1>
		<video ref="videoRef" class="video" preload="metadata" :src="videoUrl"></video>
		<div class="controls">
			<div class="control-group">
				<button class="button" @click="rewind"><img src="./assets/rewind.svg" alt="Zurückspulen" /></button>
				<button class="button" @click="togglePlay">
					<img src="./assets/play_pause.svg" alt="Abspielen/Pause" />
				</button>
				<button class="button" @="forward"><img src="./assets/forward.svg" alt="Vorspulen" /></button>
			</div>

			<div class="control-group">
				<button class="volume-button" @click="volumeDown">
					<img src="./assets/volume_down.svg" alt="volume-down" />
				</button>
				<button class="volume-button" @click="mute"><img src="./assets/volume_mute.svg" alt="mute" /></button>
				<button class="volume-button" @click="volumeUp">
					<img src="./assets/volume_up.svg" alt="volume-up" />
				</button>
			</div>

			<div class="control-group-speed">
				<button class="button" @click="speedDown">
					<img src="./assets/speed_down.svg" alt="Langsamer" />
				</button>
				<button class="button" @click="speedUp">
					<img src="./assets/speed_up.svg" alt="Schneller" />
				</button>
			</div>

			<!--<p class="current_time">{{ videoRef?.currentTime }}:00 / {{ videoRef?.duration }}:00</p>-->
			<div class="control-group">
				<button class="button" @click="toggleFullscreen">
					<img src="./assets/fullscreen.svg" alt="Vollbild" />
				</button>
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
.controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	max-width: 1000px;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	padding: 10px;
	margin: 0 auto;
	background-color: #002e78;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
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
