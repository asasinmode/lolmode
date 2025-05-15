<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps<{
	content: (string | [string, number])[];
}>();

const displayValues = inject('detailedEquationDisplayValues', false);

function formatNumber(value: number) {
	return Number(value.toFixed(2));
}

function id(index: number) {
	const value = props.content[index][0].replaceAll(' ', '');
	if (index !== 0 && value === 'totalsoulsat10' && props.content[0][0].replaceAll(' ', '') === 'totalsoulsat20') {
		return undefined;
	}
	return value.endsWith('at10') || value.endsWith('at20')
		? value.slice(0, -4)
		: value.endsWith('between10and20') ? value.slice(0, -14) : value;
};
</script>

<template>
	<div :id="id(0)" class="flex flex-wrap gap-x-[0.28125rem] w-fit relative after:(-inset-x-1 inset-y-0 -z-1 absolute top-0 rounded-sm bg-[#c89b3c] op-20 dark:op-10)">
		<template v-for="(value, index) in content" :key="index">
			<span v-if="typeof value === 'string'">
				{{ value }}
			</span>
			<span v-else :data-highlight-id="index === 0 ? undefined : id(index)" class="group hover:underline relative">
				{{ displayValues ? formatNumber(value[1]) : value[0] }}
				<span class="min-w-[max(100%,_6rem)] -translate-x-1/2 left-1/2 absolute -translate-y-full rounded-md p-1 px-2 left-0 text-center bg-black/90 text-white invisible group-hover:visible">
					{{ displayValues ? value[0] : formatNumber(value[1]) }}
				</span>
			</span>
		</template>
		<span v-if="displayValues" class="text-[var(--vp-c-text-2)]">{{ content[0][0] }}</span>
	</div>
</template>
