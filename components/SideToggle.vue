<script setup lang="ts">
import { defineModel, defineProps } from 'vue';

defineProps<{
	id: string;
	title: string;
	falseLabel: string;
	trueLabel: string;
}>();

const model = defineModel<boolean>({ required: true });
</script>

<template>
	<label :for="id" class="leading-7 text-5 block text-[var(--vp-c-text-2)]">
		{{ title }}:
		<div class="inline-flex items-center gap-1 text-[var(--vp-c-text-1)]">
			{{ falseLabel }}
			<button
				:id="id"
				class="relative rounded-[0.6875rem] inline w-10 h-[1.375rem] shrink-0 border border-solid border-[var(--vp-input-border-color)] bg-[var(--vp-input-switch-bg-color)] transition-border-color transition-250 hover:border-[var(--vp-c-brand-1)]"
				type="button"
				role="switch"
				:aria-checked="model"
				@click="model = !model"
			>
				<span
					class="absolute top-[0.09375rem] left-[0.09375rem] w-[1.125rem] h-[1.125rem] rounded-1/2 shadow-[var(--vp-shadow-1)] transition-250"
					:class="model ? 'bg-red translate-x-[1.125rem]' : 'bg-blue'"
				/>
			</button>
			{{ trueLabel }}
		</div>
	</label>
</template>
