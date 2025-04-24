<script setup lang="ts">
import { formatTime } from "../../composables/formatFunctions";

defineProps<{
	transcripts: { id: number; text: string; start: number; end: number }[];
}>();
</script>
<template>
	<div class="transcript-panel">
		<h3 class="panel-title">Transcript</h3>
		<ul v-if="transcripts.length">
			<li
				v-for="(transcript, index) in transcripts"
				:key="index"
				class="cursor-pointer text-blue-600 hover:underline mb-2"
			>
				<span>{{ formatTime(transcript.start) }} –▶ {{ formatTime(transcript.end) }}</span>
				<p class="subtitle">{{ transcript.text }}</p>
			</li>
		</ul>
	</div>
</template>
<style scoped>
ul {
	margin-top: 10px;
	padding: 10px;
	max-height: 545px;
}
li {
	cursor: pointer;
	color: #002e78;
	font-size: medium;
	padding: 6px;
	border-radius: 5px;
	font-weight: 400;
}
li:hover {
	background-color: #e0e0e0;
}
li span {
	font-weight: 700;
	color: #61de00;
	margin-right: 5px;
}

.panel-title {
	color: #001f52;
	border-bottom: #002e78 1px solid;
	text-align: center;
	width: 100%;
}

.transcript-panel {
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	max-height: 577px;
	background-color: #f5f5f5;
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
