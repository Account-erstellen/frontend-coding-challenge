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
		<h3 class="panel-title" v-if="chapters.length">Kapitel</h3>
		<ul v-if="chapters.length">
			<li v-for="(chapter, index) in chapters" :key="index" @click="() => videoApi?.seekTo(chapter.start)">
				<span>{{ formatTime(chapter.end) }}</span> {{ chapter.title }}
			</li>
		</ul>
		<p v-else class="no-chapters">Keine Kapitel vorhanden</p>
	</div>
</template>

<style scoped lang="scss">
// Farben
$color-primary: #002e78;
$color-secondary: #001f52;
$color-highlight: #61de00;
$color-panel-bg: #f5f5f5;
$color-subtle-bg: #e7e7e7;

// Abstände
$spacing-xs: 0.5rem;
$spacing-s: 6px;
$spacing-m: 10px;
$spacing-l: 1rem; // Optional, falls benötigt

// Border Radius
$radius-sm: 5px;
$radius-md: 0.25rem;

// Max-Höhen
$max-transcript: 577px;
$max-list: 700px;

// Breakpoints
$break-md: 1070px;
$break-sm: 865px;

ul {
	margin-top: $spacing-m;
	padding: $spacing-m;
	max-height: $max-list;

	li {
		cursor: pointer;
		color: $color-primary;
		font-size: medium;
		padding: $spacing-s;
		border-radius: $radius-sm;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			font-weight: 700;
			color: $color-highlight;
			margin-right: $spacing-s;
		}
	}
}

.panel-title {
	color: $color-secondary;
	border-bottom: 1px solid $color-primary;
	text-align: center;
	width: 100%;
}

.chapters-panel {
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	max-height: $max-transcript;
	background-color: $color-panel-bg;
}
.no-chapters {
	color: $color-primary;
	font-size: medium;
	padding: $spacing-s;
	border-radius: $radius-sm;
	font-weight: 800;
	text-align: center;
	width: 100%;
	margin-top: $spacing-m;
}
@media (max-width: $break-md) {
	.toggle-content-btn-left {
		border-bottom-left-radius: 0;
	}
}

@media (max-width: $break-sm) {
	.toggle-content-btn-right {
		display: none;
	}
}
</style>
