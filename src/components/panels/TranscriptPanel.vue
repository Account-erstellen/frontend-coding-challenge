<script setup lang="ts">
import { formatTime } from "../../composables/formatFunctions";

defineProps<{
	transcripts: { id: number; text: string; start: number; end: number }[];
	currentTime: number;
}>();
</script>
<template>
	<div class="transcript-panel">
		<h3 v-if="transcripts.length" class="panel-title">Transcript</h3>
		<ul v-if="transcripts.length">
			<li
				v-for="(transcript, index) in transcripts"
				:key="index"
				:class="[
					'cursor-pointer mb-2 p-2 rounded',
					currentTime >= transcript.start && currentTime <= transcript.end
						? 'bg-gray-800 text-white'
						: 'text-blue-600 hover:underline',
				]"
				@click="$emit('seek', transcript.start)"
			>
				<span
					:class="[
						'font-bold mr-2',
						currentTime >= transcript.start && currentTime <= transcript.end
							? 'text-green-400'
							: 'text-[#61de00]',
					]"
				>
					{{ formatTime(transcript.start) }} –▶ {{ formatTime(transcript.end) }}
				</span>
				<p class="subtitle">{{ transcript.text }}</p>
			</li>
		</ul>
		<p v-else>Keine Untertitel vorhanden</p>
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
li span {
	font-weight: 700;
	color: #002e78;
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
	margin-top: 500px;
	font-size: medium;
	color: #002e78;
}
.bg-gray-800 {
	background-color: #e7e7e7;
}
.text-white {
	color: white;
}
.text-green-400 {
	color: #61de00;
}
.p-2 {
	padding: 0.5rem;
}
.mb-2 {
	margin-bottom: 0.5rem;
}
.rounded {
	border-radius: 0.25rem;
}
.font-bold {
	font-weight: 700;
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
