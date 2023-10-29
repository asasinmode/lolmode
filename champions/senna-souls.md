<script setup lang="ts">
import { ref } from 'vue';

import WeightInput from '../components/WeightInput.vue';
import SideToggle from '../components/SideToggle.vue';

const isRed = ref(false);
const includeScuttle = ref(false);
const isFarming = ref(false);

const minionsWavesAt10 = 1
const minionWavesBetween10And20 = 2
const cannonWavesAt10 = 5
const cannonWavesBetween10And20 = 5

const rawWhitesWeight = ref(90);
const parsedWhitesWeight = ref(90);

function updateParsedWeight() {
  parsedWhitesWeight.value = rawWhitesWeight.value;
}
</script>

# Senna souls

Maximum theoretical senna souls per minute calculator. Human error not taken into account. Subtract whatever you think it is from final results.

If you are interested in details check the [FAQ](#faq) at the bottom.

## results

<side-toggle id="sideToggle" v-model="isRed" title="side" false-label="blue" true-label="red" />
<side-toggle id="fastingToggle" v-model="isFarming" title="farming style" false-label="fasting" true-label="farming" />
<side-toggle id="scuttleToggle" v-model="includeScuttle" title="include scuttle" false-label="no" true-label="yes" />

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

### waves how

First wave meets in the bot lane at 1:38. All subsequent waves meet in 30 seconds interval starting from 2:00 (2:00, 2:30, 3:00 and so on). All calculations assume that the moment the waves collide is the moment they die. In other words, wave that gets to lane at 10:00 is the last one to be included in _at 10_ and _pre 10 per minute_ calculations. Same for _10-20 mins_ and _post 10 per minute_.

At 10 minutes this means:

- 18 waves total (6 cannon)
- 108 melee/caster minions
- 6 cannon minions

Between 10 and 20 minutes (wave that collides at 10:30 to wave that collides at 20:00):

- 20 waves total (6 cannon)
- 120 melee/caster minions
- 6 cannon minions

### soul sources

I assum Senna is in the bot lane and there are 2 other champions she can hit to get souls. Besides that there are minions and lane camp (krugs / gromp).

### soul drop rates

