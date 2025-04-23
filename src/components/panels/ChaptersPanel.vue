<script setup lang="ts">
import { ref, type Ref, inject } from "vue";
import { formatTime } from "../../composables/functions";
const isChaptersOpen = ref<boolean>(false);
defineProps<{
	chapters: { start: number; end: number; title: string }[];
}>();
interface VideoAPI {
	videoRef: Ref<HTMLVideoElement | null>;
	seekTo: (t: number) => void;
}
const videoApi = inject<VideoAPI>("videoApi");
</script>
<template>
	<div class="chapters-panel" :class="{ open: isChaptersOpen }">
		<div class="chapters-content-panel">
			<h3 class="panel-title">Chapters</h3>
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
		<button class="toggle-content-btn-right" @click="isChaptersOpen = !isChaptersOpen">
			<img class="arrow" src="@/assets/angle-double-right.svg" alt="" />
		</button>
	</div>
</template>

<style scoped>
.panel-title {
	color: #001f52;
	border-bottom: #002e78 1px solid;
	text-align: center;
}

.chapters-panel {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	overflow: hidden;
	transition: width 0.3s ease;
	height: auto;
	width: auto;
}

.chapters-panel.open {
	width: 60%;
}

.chapters-content-panel {
	display: none;
	padding: 20px;
	background-color: #f5f5f5;
	width: 100%;
}

.chapters-panel.open .chapters-content-panel {
	display: block;
}

.toggle-content-btn-right {
	width: 40px;
	height: 100%;
	background-color: #ffffff;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px;
	border-top-left-radius: 2px;
	border-bottom-left-radius: 2px;
}
@media (max-width: 1070px) {
	.toggle-content-btn-left {
		border-bottom-left-radius: 0px;
	}
}
@media (max-width: 865px) {
	.toggle-content-btn-right {
		display: none;
	}
}
</style>
