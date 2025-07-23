<script setup lang="ts">
import { formatTime } from "../../composables/formatFunctions";

defineProps<{
	transcripts: { id: number; text: string; start: number; end: number }[];
	currentTime: number;
}>();

</script>
<template>
	<div class="transcript-panel">
		<h3 v-if="transcripts.length" class="panel-title">Untertitel</h3>
		<ul v-if="transcripts.length">
			<li
				v-for="(transcript, index) in transcripts"
				:key="index"
				:class="[
					'cursor-pointer rounded',
					currentTime >= transcript.start && currentTime <= transcript.end
						? 'bg-gray-800 text-white'
						: 'text-blue-600',
				]"
				@click="$emit('seek', transcript.start)"
			>
				<span
					:class="[
						'font-bold',
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
		<p v-else class="no-transcript">Keine Untertitel vorhanden</p>
	</div>
</template>
<style lang="scss" scoped>
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
$spacing-l: 1rem;

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

.transcript-panel {
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	max-height: $max-transcript;
	background-color: $color-panel-bg;
}

.arrow {
	width: 20px;
	height: 20px;
}

.subtitle {
	margin-top: 0px;
	font-size: medium;
	color: $color-primary;
}

.no-transcript {
	color: $color-primary;
	font-size: medium;
	padding: $spacing-s;
	border-radius: $radius-sm;
	font-weight: 800;
	text-align: center;
	width: 100%;
	margin-top: $spacing-m;
}

// Utility-Klassen
.bg-gray-800 {
	background-color: $color-subtle-bg;
}
.text-white {
	color: white;
}
.text-green-400 {
	color: $color-highlight;
}
.rounded {
	border-radius: $radius-md;
}
.font-bold {
	font-weight: 700;
}

// Media Queries
@media (max-width: $break-md) {
	.toggle-content-btn-left {
		border-bottom-left-radius: 0;
	}
}

@media (max-width: $break-sm) {
	.toggle-content-btn-left {
		display: none;
	}
}
</style>
