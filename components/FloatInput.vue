<script setup lang="ts">
import { defineModel, defineProps } from 'vue';

const props = defineProps<{
	id: string;
	label: string;
	isPercent?: boolean;
}>();

const emit = defineEmits<{
	focusout: [number];
}>();

const modelValue = defineModel<string | number>({ required: true });

function parseInput(event: FocusEvent) {
	const value = parseFloat(`${(event.target as HTMLInputElement).value}`.replaceAll(/[^\d-.]/g, ''));

	if (Number.isNaN(value) || value < 0) {
		modelValue.value = '0';
	} else {
		modelValue.value = `${Number(value.toFixed(2))}`;
	}

	(event.target as HTMLInputElement).value = modelValue.value;

	emit('focusout', props.isPercent ? value / 100 : value);
}
</script>

<template>
	<input
		:id="id"
		v-model="modelValue"
		class="rounded-full w-18 min-w-18 bg-[#1b1b1f] color-[#ffffff] dark:bg-[#deded6] dark:color-[#161618] py-1 px-3 focus:(outline-[#C89B3C] outline)"
		@focusout="parseInput"
	>
	<label class="ml-[0.2rem]" :for="id">{{ isPercent ? '%' : '' }} {{ label }}</label>
</template>
