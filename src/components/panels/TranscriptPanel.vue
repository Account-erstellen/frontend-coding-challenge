<script setup lang="ts">
import { ref } from "vue";

const isTranscriptOpen = ref<boolean>(false);
import { formatTime } from "../../composables/functions";
defineProps<{
	transcripts: { id: number; text: string; start: number; end: number }[];
}>();
</script>
<template>
	<div class="transcript-panel" :class="{ open: isTranscriptOpen }">
		<button class="toggle-content-btn-left" @click="isTranscriptOpen = !isTranscriptOpen">
			<img class="arrow" src="@/assets/angle-double-left.svg" alt="" />
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
</template>
<style scoped>
.panel-title {
	color: #001f52;
	border-bottom: #002e78 1px solid;
	text-align: center;
}

.transcript-panel {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	overflow: hidden;
	transition: width 0.3s ease;
	height: auto;
	width: auto;
}

.transcript-panel.open {
	width: 60%;
}

.transcript-content-panel {
	display: none;
	padding: 20px;
	background-color: #f5f5f5;
	width: 100%;
}

.transcript-panel.open .transcript-content-panel {
	display: block;
}

.toggle-content-btn-left {
	width: 40px;
	height: 100%;
	background-color: #ffffff;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px;
	border-top-right-radius: 2px;
	border-bottom-right-radius: 2px;
}

.arrow {
	width: 20px;
	height: 20px;
}

.subtitle {
	font-size: medium;
	color: #002e78;
}
@media (max-width: 1070px) {
	.toggle-content-btn-left {
		border-bottom-left-radius: 0px;
	}
}
@media (max-width: 865px) {
	.toggle-content-btn-left {
		display: none;
	}
}
</style>
