<script setup lang="ts">
import { ref } from 'vue';

import WeightInput from '../components/WeightInput.vue';

const rawWhitesWeight = ref(90);
const parsedWhitesWeight = ref(90);

function updateParsedWeight() {
  parsedWhitesWeight.value = rawWhitesWeight.value;
}
</script>

# Senna souls

Maximum theoretical senna souls possible per minute calculator. Below you can find results and adjustable values for calculations.

## results

- <WeightInput id="whitesWeight" v-model="rawWhitesWeight" @focusout="updateParsedWeight" label="egg whites" />
- {{ Math.round(parsedWhitesWeight * 0.5) }}g sugar
- salt
- {{ Math.round(parsedWhitesWeight * 1.2) }}g almond flour
- {{ Math.round(parsedWhitesWeight * 1.6) }}g powdered sugar

## values

- {{ parsedWhitesWeight }}g egg whites
- {{ Math.round(parsedWhitesWeight * 0.5) }}g sugar
- salt
---
- {{ Math.round(parsedWhitesWeight * 1.2) }}g almond flour
- {{ Math.round(parsedWhitesWeight * 1.6) }}g powdered sugar
