<script setup lang="ts">
import VideoContainer from "./VideoContainer.vue";

</script>

<template>
	<VideoContainer />
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
