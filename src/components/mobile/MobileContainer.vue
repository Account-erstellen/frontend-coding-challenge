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
				<h3>Untertitel</h3>
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
				<p v-else>Keine Untertitel vorhanden</p>
			</div>
		</div>

		<div class="mobile-chapters-container">
			<div @click="mobileChaptersOpen = !mobileChaptersOpen">
				<div class="mobile-chapters-title">
					<h3 class="mobile-chapters-title">Kapitel</h3>
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
				<p v-else>Keine Kapitel vorhanden</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
$bg-light: #eff4fa;
$highlight-border: #61de00;
$radius-default: 12px;
$spacing-small: 5px;
$spacing-medium: 8px;
$spacing-large: 10px;
$break-md: 865px;
$break-sm: 600px;

.mobile-container {
	justify-content: space-between;
	display: none;
	flex-direction: column;
	align-items: center;
	padding: $spacing-large;
	background-color: $bg-light;
	border-top: 5px solid $highlight-border;
	margin-top: $spacing-large;

	@media (max-width: $break-md) {
		display: flex;
		border-bottom-left-radius: $radius-default;
		border-bottom-right-radius: $radius-default;
	}

	@media (max-width: $break-sm) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
}

.mobile-transcript {
	margin-bottom: $spacing-medium;
}

.mobile-transcript-title,
.mobile-chapters-title {
	display: flex;
	width: 100%;
	justify-content: space-between;
	cursor: pointer;

	h3 {
		margin-right: $spacing-medium; // Abstand zwischen Text und Pfeil
	}
}

.item-arrows {
	display: flex;
	justify-content: center;
	align-items: center;
}

.mobile-chapters-container,
.mobile-transcript-container {
	margin-top: $spacing-small;
	width: 100%;
}

.mobile-transcript-container {
	margin-bottom: $spacing-large;
}

ul {
	overflow-y: auto;
	max-height: 200px;
	padding: 0;
	margin: 0;
}
</style>
