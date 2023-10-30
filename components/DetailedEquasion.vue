<script setup lang="ts">
import { inject } from 'vue';

defineProps<{
	content: (string | [string, number])[];
}>();

const displayValues = inject('detailedEquasionDisplayValues', false);

function formatNumber(value: number) {
	return Number(value.toFixed(2));
}
</script>

<template>
	<div class="flex flex-wrap gap-x-[0.28125rem]">
		<template v-for="(value, index) in content" :key="index">
			<span v-if="typeof value === 'string'">
				{{ value }}
			</span>
			<span v-else class="group hover:underline relative">
				{{ displayValues ? formatNumber(value[1]) : value[0] }}
				<span class="min-w-[max(100%,_6rem)] -translate-x-1/2 left-1/2 absolute -translate-y-full rounded-md p-1 px-2 left-0 text-center bg-black/90 text-white invisible group-hover:visible">
					{{ displayValues ? value[0] : formatNumber(value[1]) }}
				</span>
			</span>
		</template>
		<span v-if="displayValues" class="text-[var(--vp-c-text-2)]">{{ content[0][0] }}</span>
	</div>
</template>
