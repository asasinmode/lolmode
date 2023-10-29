<script setup lang="ts">
import { ref } from 'vue';

import WeightInput from '../components/WeightInput.vue';
import SideToggle from '../components/SideToggle.vue';

const rawWhitesWeight = ref(90);
const parsedWhitesWeight = ref(90);

function updateParsedWeight() {
  parsedWhitesWeight.value = rawWhitesWeight.value;
}

const isRed = ref(false);
</script>

# Senna souls

Maximum theoretical senna souls per minute calculator. Human error not taken into account. Subtract whatever you think it is from final results.

If you are interested in details check the [FAQ](#faq) at the bottom.

## results

<side-toggle v-model="isRed" />

- XX souls at 10 minutes (Y / min)
- XX souls 10-20 minutes (Y / min)

| source / time                   | at 10 mins | pre 10 per minute | 10-20 mins | post 10 per minute |
|---------------------------------|------------|-------------------|------------|--------------------|
| minions                         |            |                   |            |                    |
| {{ isRed ? 'gromp' : 'krugs' }} |            |                   |            |                    |
| champions (2)                   |            |                   |            |                    |

- <WeightInput id="whitesWeight" v-model="rawWhitesWeight" @focusout="updateParsedWeight" label="egg whites" />
- {{ Math.round(parsedWhitesWeight * 0.5) }}g sugar
- salt
- {{ Math.round(parsedWhitesWeight * 1.2) }}g almond flour
- {{ Math.round(parsedWhitesWeight * 1.6) }}g powdered sugar

## values

- {{ parsedWhitesWeight }}g egg whites
- {{ Math.round(parsedWhitesWeight * 0.5) }}g sugar
- salt
- {{ Math.round(parsedWhitesWeight * 1.2) }}g almond flour
- {{ Math.round(parsedWhitesWeight * 1.6) }}g powdered sugar

## details

explicitly explained reults/values

## FAQ

### where did the senna soul drop rates come from?

I 
