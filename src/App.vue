<script setup lang="ts">
import VideoPlayer from "./components/VideoPlayer.vue";
</script>

<template>
	<div class="main-container">
		<h1 class="title">Frontend Coding Challenge</h1>
		<div class="custom-shape-divider-top">
			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path
					d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
					class="shape-fill"
				></path>
			</svg>
		</div>

		<VideoPlayer />
		
		<div class="custom-shape-divider-bottom">
			<svg
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path
					d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
					class="shape-fill"
				></path>
			</svg>
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
.custom-shape-divider-bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	z-index: -1;
}

.custom-shape-divider-bottom svg {
	position: relative;
	display: block;
	width: calc(248% + 1.3px);
	height: 371px;
	transform: rotateY(180deg);
}

.custom-shape-divider-bottom .shape-fill {
	fill: #61de00;
}
.custom-shape-divider-top {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
	z-index: -1;
}

.custom-shape-divider-top svg {
	position: relative;
	display: block;
	width: calc(248% + 1.3px);
	height: 371px;
	transform: rotateY(180deg);
}

.custom-shape-divider-top .shape-fill {
	fill: #002e78;
}
</style>
