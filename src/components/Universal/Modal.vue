<script setup lang="ts">
import subtitlesOnIcon from "@/assets/subtitles.svg";
import subtitlesOffIcon from "@/assets/subtitles-slash.svg";
import speedUpIcon from "@/assets/speed_up.svg";
import speedDownIcon from "@/assets/speed_down.svg";

const props = defineProps<{
	visible: boolean;
	isSubtitles: boolean;
}>();

const emit = defineEmits(["toggle-subtitles", "speed-up", "speed-down"]);
</script>

<template>
	<div class="popover-modal" v-if="props.visible">
		<div class="modal-content">
			<div class="arrow-down"></div>

			<div class="modal-actions">
				<button class="icon-btn" @click="$emit('toggle-subtitles')">
					<img :src="isSubtitles ? subtitlesOnIcon : subtitlesOffIcon" />
				</button>

				<button class="icon-btn" @click="$emit('speed-down')">
					<img :src="speedDownIcon" />
				</button>

				<button class="icon-btn" @click="$emit('speed-up')">
					<img :src="speedUpIcon" />
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.popover-modal {
	position: absolute;
	bottom: 55px;
	left: 30%;
	transform: translateX(-50%);
	z-index: 100;
	width: max-content;
	max-width: 90vw;
}
.modal-content {
	background-color: white;
	border-radius: 16px;
	padding: 10px;
	text-align: center;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	position: relative;
}
.arrow-down {
	position: absolute;
	bottom: -10px;
	left: 50%;
	transform: translateX(-50%);
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-top: 10px solid white;
}
.modal-actions {
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: center;
}
.icon-btn {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #f0f0f0;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: background-color 0.2s;
}
.icon-btn:hover {
	background-color: #e0e0e0;
}
.icon-btn img {
	width: 24px;
	height: 24px;
}
/* Responsive */
@media (max-width: 480px) {
	.modal-content {
		padding: 12px;
	}

	.icon-btn {
		width: 48px;
		height: 48px;
	}

	.icon-btn img {
		width: 20px;
		height: 20px;
	}
}
</style>
