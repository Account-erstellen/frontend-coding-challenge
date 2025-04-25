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
		<p v-else>Keine Kapitel vorhanden</p>
	</div>
</template>

<style scoped lang="scss">
$color-primary: #002e78;
$color-secondary: #001f52;
$color-highlight: #61de00;
$bg-panel: #f5f5f5;
$border-radius: 5px;
$spacing-small: 5px;
$spacing-medium: 6px;
$spacing-large: 10px;
$max-panel-height: 577px;
$max-ul-height: 700px;
$break-md: 1070px;
$break-sm: 865px;

ul {
	margin-top: $spacing-large;
	padding: $spacing-large;
	max-height: $max-ul-height;

	li {
		cursor: pointer;
		color: $color-primary;
		font-size: medium;
		padding: $spacing-medium;
		border-radius: $border-radius;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;

		span {
			font-weight: 700;
			color: $color-highlight;
			margin-right: $spacing-small;
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
	max-height: $max-panel-height;
	background-color: $bg-panel;
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
