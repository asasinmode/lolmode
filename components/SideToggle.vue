<script setup lang="ts">
import { defineModel } from 'vue';

const model = defineModel<boolean>({ required: true });
</script>

<template>
	<label for="sideToggleSwitch" class="mt-8 leading-7 text-5">
		Side:
		<div class="inline-flex items-center gap-1">
			blue
			<button
				id="sideToggleSwitch"
				class="relative rounded-[0.6875rem] inline w-10 h-[1.375rem] shrink-0 border border-solid border-[var(--vp-input-border-color)] bg-[var(--vp-input-switch-bg-color)] transition-border-color transition-250 hover:border-[var(--vp-c-brand-1)]"
				type="button"
				role="switch"
				:aria-checked="model"
				@click="model = !model"
			>
				<span
					class="absolute top-[0.09375rem] left-[0.0625rem] w-[1.125rem] h-[1.125rem] rounded-1/2 shadow-[var(--vp-shadow-1)] transition-250"
					:class="model ? 'bg-red translate-x-[1.125rem]' : 'bg-blue'"
				/>
			</button>
			red
		</div>
	</label>
</template>
