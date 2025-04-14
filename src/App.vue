<script setup lang="ts">
import { ref } from "vue";

const videoRef = ref<HTMLVideoElement | null>(null);
//const videoUrl ="https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";
const videoUrl = "https://www.w3schools.com/html/mov_bbb.webm";
</script>

<template>
	<div>
		<h1 class="title">Frontend Coding Challenge</h1>
		<video ref="videoRef" class="video" preload="metadata" :src="videoUrl"></video>
		<div class="controls">
			<button class="seek_backward_button">Seek Backward</button>
			<button class="play_button">Play/Pause</button>
			<button class="seek_forward_button">Seek Forward</button>
			<button class="mute_button">Mute/UnMute</button>

			<button class="volume_up_button">Volume Up</button>
			<button class="volume_down_button">Volume Down</button>

			<p class="current_time">{{ videoRef?.currentTime }}:00 / {{ videoRef?.duration }}:00</p>
			<button class="fullscreen_button">Fullscreen</button>

			<button class="speed_up_button">Speed Up</button>
			<button class="slow_down_button">Slow Down</button>
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
	max-width: 800px;
	height: auto;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	margin: 0 auto;
	display: block;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}
.controls {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 5px;
	max-width: 800px;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	padding: 10px;
	margin: 0 auto;
	background-color: #002e78;
	box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
}
.current_time {
	color: #61de00;
	font-size: 20px;
	text-align: center;
	margin: 10px 0;
}
</style>
