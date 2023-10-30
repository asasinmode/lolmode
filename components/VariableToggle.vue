<script setup lang="ts">
import { defineModel } from 'vue';

defineProps<{
	id: string;
	label: string;
	falseLabel: string;
	trueLabel: string;
	falseClass?: string;
	trueClass?: string;
	labelVisuallyHidden?: boolean;
}>();

const model = defineModel<boolean>({ required: true });
</script>

<template>
	<div class="relative grid grid-cols-[min-content_min-content_auto] gap-x-2 text-[var(--vp-c-text-2)] w-fit">
		<label class="col-span-full" :class="labelVisuallyHidden ? 'visually-hidden' : ''" :for="id">{{ label }}:</label>
		<label
			class="cursor-pointer transition-250 transition-color"
			:class="model ? 'text-[var(--vp-c-text-2)]' : 'text-[var(--vp-c-text-1)]'"
			@click.stop="model = false"
		>
			{{ falseLabel }}
		</label>
		<button
			:id="id"
			class="relative self-center rounded-[0.6875rem] inline w-10 h-[1.375rem] shrink-0 border border-solid border-[var(--vp-input-border-color)] bg-[var(--vp-input-switch-bg-color)] transition-border-color transition-250 hover:border-[var(--vp-c-brand-1)] focus-visible:border-[var(--vp-c-brand-1)]"
			type="button"
			role="switch"
			:aria-checked="model"
			@click="model = !model"
		>
			<span
				class="absolute top-[0.0625rem] left-[0.0625rem] w-[1.125rem] h-[1.125rem] rounded-1/2 shadow-[var(--vp-shadow-1)] transition-250"
				:class="model
					? ['translate-x-[1.125rem]', trueClass ?? 'bg-[var(--vp-c-brand-1)]']
					: [falseClass ?? 'bg-[var(--vp-c-neutral-inverse)]']
				"
			/>
		</button>
		<label
			class="cursor-pointer w-fit transition-250 transition-color"
			:class="model ? 'text-[var(--vp-c-text-1)]' : 'text-[var(--vp-c-text-2)]'"
			@click.stop="model = true"
		>
			{{ trueLabel }}
		</label>
	</div>
</template>
