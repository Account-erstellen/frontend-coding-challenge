<script setup lang="ts">
import { ref } from "vue";
import subtitlesOnIcon from "@/assets/subtitles.svg";
import subtitlesOffIcon from "@/assets/subtitles-slash.svg";
import speedUpIcon from "@/assets/speed_up.svg";
import speedDownIcon from "@/assets/speed_down.svg";

const props = defineProps<{
	visible: boolean;
	speed: number;
}>();

const emit = defineEmits(["speed-up", "speed-down"]);
const isSubtitles = ref<boolean>(false);
</script>

<template>
	<div class="popover-modal" v-if="props.visible">
		<div class="modal-content">
			<div class="arrow-down"></div>

			<div class="modal-actions">
				<button class="icon-btn" @click="isSubtitles = !isSubtitles">
					<img :src="isSubtitles ? subtitlesOnIcon : subtitlesOffIcon" />
				</button>

				<button class="icon-btn" @click="$emit('speed-down')">
					<img :src="speedDownIcon" />
				</button>

				<button class="icon-btn" @click="$emit('speed-up')">
					<img :src="speedUpIcon" />
				</button>
				<p class="icon-btn">{{ speed || 1 }}x</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
// Variablen
$popover-bg: white;
$shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
$border-radius-modal: 16px;
$spacing: 10px;
$btn-size: 50px;
$btn-hover-bg: #e0e0e0;
$btn-bg: #f0f0f0;
$img-size: 24px;
$img-size-sm: 20px;
$break-xs: 480px;

.popover-modal {
	position: absolute;
	bottom: 55px;
	left: 30%;
	transform: translateX(-50%);
	z-index: 100;
	width: max-content;
	max-width: 90vw;

	.modal-content {
		background-color: $popover-bg;
		border-radius: $border-radius-modal;
		padding: $spacing;
		text-align: center;
		box-shadow: $shadow;
		position: relative;

		.arrow-down {
			position: absolute;
			bottom: -10px;
			left: 50%;
			transform: translateX(-50%);
			width: 0;
			height: 0;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-top: 10px solid $popover-bg;
		}
	}

	.modal-actions {
		display: flex;
		flex-direction: column;
		gap: 5px;
		align-items: center;
	}

	.icon-btn {
		width: $btn-size;
		height: $btn-size;
		border-radius: 50%;
		background-color: $btn-bg;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover {
			background-color: $btn-hover-bg;
		}

		img {
			width: $img-size;
			height: $img-size;
		}
	}
}

// Responsive
@media (max-width: $break-xs) {
	.popover-modal {
		.modal-content {
			padding: 12px;
		}

		.icon-btn {
			width: 48px;
			height: 48px;

			img {
				width: $img-size-sm;
				height: $img-size-sm;
			}
		}
	}
}
</style>
