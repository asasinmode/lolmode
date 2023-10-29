<script setup lang="ts">
import { defineModel, defineProps } from 'vue';

defineProps<{
	id: string;
	label: string;
}>();

const emit = defineEmits<{
	focusout: [FocusEvent];
}>();

const modelValue = defineModel<string | number>({ required: true });

function parseInput(event: FocusEvent) {
	const value = parseFloat(`${(event.target as HTMLInputElement).value}`.replaceAll(/[^\d-.]/g, ''));

	if (Number.isNaN(value) || value < 0) {
		modelValue.value = 0;
	} else {
		modelValue.value = value;
	}

	(event.target as HTMLInputElement).value = modelValue.value.toString();

	emit('focusout', event);
}
</script>

<template>
	<input
		:id="id"
		v-model="modelValue"
		class="rounded-full w-15 min-w-15 bg-[#1b1b1f] color-[#ffffff] dark:bg-[#deded6] dark:color-[#161618] py-1 px-3 focus:(outline-[var(--vp-c-brand-3)] outline)"
		@focusout="parseInput"
	>
	<label class="ml-[0.2rem]" :for="id">{{ label }}</label>
</template>
