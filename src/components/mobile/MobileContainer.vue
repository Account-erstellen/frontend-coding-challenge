<script setup lang="ts">
import { inject, ref, type Ref } from "vue";
import { formatTime } from "../../composables/formatFunctions";
import type { TranscriptItem } from "../../types/transcript";
import type { Chapter } from "../../types/chapter";

/*  API‑Objekt aus Parent abholen  */
interface VideoAPI {
	videoRef: Ref<HTMLVideoElement | null>;
	seekTo: (t: number) => void;
}

const props = defineProps<{
	transcripts: TranscriptItem[];
	chapters: Chapter[];
	isMobileTranscriptOpen: boolean;
	isMobileChaptersOpen: boolean;
}>();

const videoApi = inject<VideoAPI>("videoApi");
const mobileTranscriptOpen = ref(props.isMobileTranscriptOpen);
const mobileChaptersOpen = ref(props.isMobileChaptersOpen);
</script>

<template>
	<div class="mobile-container">
		<div class="mobile-transcript-container">
			<div class="mobile-transcript-title" @click="mobileTranscriptOpen = !mobileTranscriptOpen">
				<h3>Transcript</h3>
				<div class="mobile-transcript">
					<div class="item-arrows">
						<img class="arrow" src="@/assets/chevron-double-down.svg" v-if="!mobileTranscriptOpen" />
						<img class="arrow" src="@/assets/chevron-double-up.svg" v-if="mobileTranscriptOpen" />
					</div>
				</div>
			</div>
			<div v-if="mobileTranscriptOpen" class="mobile-transcript-content">
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
				<p v-else>Lade Untertitel...</p>
			</div>
		</div>

		<div class="mobile-chapters-container">
			<div @click="mobileChaptersOpen = !mobileChaptersOpen">
				<div class="mobile-chapters-title">
					<h3 class="mobile-chapters-title">Chapters</h3>
					<div class="item-arrows">
						<img class="arrow" src="@/assets/chevron-double-down.svg" v-if="!mobileChaptersOpen" />
						<img class="arrow" src="@/assets/chevron-double-up.svg" v-if="mobileChaptersOpen" />
					</div>
				</div>
			</div>
			<div v-if="mobileChaptersOpen">
				<ul v-if="chapters.length">
					<li
						v-for="(chapter, index) in chapters"
						:key="index"
						class="cursor-pointer text-blue-600 hover:underline mb-2"
						@click="() => videoApi?.seekTo(chapter.start)"
					>
						▶ {{ formatTime(chapter.end) }} – {{ chapter.title }}
					</li>
				</ul>
				<p v-else>Lade Kapitel...</p>
			</div>
		</div>
	</div>
</template>

<style>
.mobile-container {
	justify-content: space-between;
	display: none;
	flex-direction: column;
	align-items: center;
	padding: 10px;
	background-color: #eff4fa;
	border-top: #61de00 5px solid;
	margin-top: 10px;
}
.mobile-transcript {
	margin-bottom: 8px;
}
.mobile-transcript-title,
.mobile-chapters-title {
	display: flex;
	width: 100%;
	justify-content: space-between;
	cursor: pointer;
}
.item-arrows {
	display: flex;
	justify-content: center;
	align-items: center;
}
.mobile-transcript-title h3,
.mobile-chapters-title h3 {
	margin-right: 8px; /* Etwas Abstand zwischen Text und Pfeil */
}
.mobile-chapters-container,
.mobile-transcript-container {
	margin-top: 5px;
	width: 100%;
}
.mobile-transcript-container {
	margin-bottom: 10px;
}
ul {
	overflow-y: auto;
	max-height: 200px;
	padding: 0;
	margin: 0;
}
@media (max-width: 865px) {
	.mobile-container {
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		display: flex;
	}
}
@media (max-width: 600px) {
	.mobile-container {
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
	}
}
</style>
