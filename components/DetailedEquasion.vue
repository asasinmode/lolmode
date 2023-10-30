<script setup lang="ts">
import { inject } from 'vue';

defineProps<{
	content: (string | [string, string])[];
}>();

const displayValues = inject('detailedEquasionDisplayValues', false);
</script>

<template>
	<div class="flex flex-wrap gap-x-[0.28125rem]">
		<template v-for="(value, index) in content" :key="index">
			<span v-if="typeof value === 'string'">
				{{ value }}
			</span>
			<span v-else class="group hover:underline relative">
				{{ value[displayValues ? 1 : 0] }}
				<span class="min-w-[max(100%,_6rem)] -translate-x-1/2 left-1/2 absolute -translate-y-full rounded-md p-1 px-2 left-0 text-center bg-black/90 text-white invisible group-hover:visible">
					{{ value[displayValues ? 0 : 1] }}
				</span>
			</span>
		</template>
	</div>
</template>
