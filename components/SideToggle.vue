<script setup lang="ts">
import { defineModel } from 'vue';

const model = defineModel<boolean>({ required: true });
</script>

<template>
	<div class="flex items-center gap-2">
		<label for="sideToggleSwitch" class="inline">blue</label>
		<button
			id="sideToggleSwitch"
			class="VPSwitch"
			type="button"
			role="switch"
			:aria-checked="model"
			@click="model = !model"
		>
			<span class="check">
				<span class="icon" :class="model ? 'bg-red' : 'bg-blue'" />
			</span>
		</button>
		<label for="sideToggleSwitch" class="inline">red</label>
	</div>
</template>

<style scoped>
.VPSwitch {
  position: relative;
  border-radius: 11px;
  display: inline;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
}

.VPSwitch:hover {
  border-color: var(--vp-c-brand-1);
}

.check {
  position: absolute;
  top: 1.5px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.25s;
}

.VPSwitch[aria-checked=true] .check{
	transform: translateX(18px);
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
  transition: background-color 0.25s;
}
</style>
