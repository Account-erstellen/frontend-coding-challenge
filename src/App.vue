<script setup lang="ts">
import VideoPlayer from "./components/VideoPlayer.vue";
</script>

<template>
	<div class="main-container">
		<h1 class="title">Frontend Coding Challenge</h1>

		<VideoPlayer class="video-player" />
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
</style>
