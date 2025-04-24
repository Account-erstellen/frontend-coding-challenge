<script setup lang="ts">
import { type Ref, inject } from "vue";
import { formatTime } from "../../composables/formatFunctions";

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
	<div class="chapters-panel">
		<h3 class="panel-title" v-if="chapters.length">Chapters</h3>
		<ul v-if="chapters.length">
			<li v-for="(chapter, index) in chapters" :key="index" @click="() => videoApi?.seekTo(chapter.start)">
				<span>{{ formatTime(chapter.end) }}</span> {{ chapter.title }}
			</li>
		</ul>
		<p v-else>Keine Kapitel vorhanden</p>
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
	display: flex;
	justify-content: center;
	align-items: center;
}
li span {
	font-weight: 700;
	color: #61de00;
	margin-right: 5px;
}
li:hover {
	background-color: #e0e0e0;
}
.panel-title {
	color: #001f52;
	border-bottom: #002e78 1px solid;
	text-align: center;
	width: 100%;
}
.chapters-panel {
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	max-height: 577x;
	background-color: #f5f5f5;
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
