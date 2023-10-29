---
head:
  - - meta
    - name: description
      content: League of Legends Senna souls at 10 and 20 minutes calculator
---

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

<div class="w-full flex gap-6 flex-col sm:flex-row justify-between border border-[var(--vp-input-border-color)] rounded-lg p-4 my-4">
  <side-toggle id="sideToggle" v-model="isRed" title="side" false-label="blue" true-label="red" />
  <side-toggle id="fastingToggle" v-model="isFarming" title="farming style" false-label="fasting" true-label="farming" />
  <side-toggle id="scuttleToggle" v-model="includeScuttle" title="include scuttle" false-label="no" true-label="yes" />
</div>

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

### soul sources

By default I include: minions, lane camp (krugs / gromp) and 2 enemy champions. Below are more detailed explanations on how these are calculated.

Soul from leashing red / blue buff is skipped.

You can toggle between red and blue side, whether to include scuttle crab and whether the Senna is farming or fasting.

### waves

First wave meets in the bot lane at 1:38. All subsequent waves meet in 30 seconds intervals starting from 2:00 (2:00, 2:30, 3:00 and so on). All calculations assume that the moment the waves collide is the moment they die. In other words, wave that gets to lane at 10:00 is the last one to be included in _at 10_ and _pre 10 per minute_ calculations. Same for _10-20 mins_ and _post 10 per minute_.

At 10 minutes this means:

- 18 waves total (6 cannon)
- 108 melee/caster minions
- 6 cannon minions

::: details
01:38 - 1<br/>
02:00 - 2<br/>
02:30 - 3 - c<br/>
03:00 - 4<br/>
03:30 - 5<br/>
04:00 - 6 - c<br/>
04:30 - 7<br/>
05:00 - 8<br/>
05:30 - 9 - c<br/>
06:00 - 10<br/>
06:30 - 11<br/>
07:00 - 12 - c<br/>
07:30 - 13<br/>
08:00 - 14<br/>
08:30 - 15 - c<br/>
09:00 - 16<br/>
09:30 - 17<br/>
10:00 - 18 - c<br/>
:::

Between 10 and 20 minutes (wave that collides at 10:30 to wave that collides at 20:00):

- 20 waves total (6 cannon)
- 120 melee/caster minions
- 6 cannon minions

::: details
10:30 - 1<br/>
11:00 - 2<br/>
11:30 - 3 - c<br/>
12:00 - 4<br/>
12:30 - 5<br/>
13:00 - 6 - c<br/>
13:30 - 7<br/>
14:00 - 8<br/>
14:30 - 9 - c<br/>
15:00 - 10<br/>
15:30 - 11<br/>
16:00 - 12 - c<br/>
16:30 - 13<br/>
17:00 - 14<br/>
17:30 - 15 - c<br/>
18:00 - 16<br/>
18:30 - 17<br/>
19:00 - 18 - c<br/>
19:30 - 19<br/>
20:00 - 20<br/>
:::

### camps (krugs / gromp)

First camp kill is skipped (doesn't get included in soul calculations). Camps are assumed to be killed on spawn + 10 seconds and respawn every 2:15 which means:

1. Krug/gromp spawns at 1:42, killed at 1:52. No souls from this one.
2. Respawns at 3:07, killed at 3:17. Souls count from now onward.
3. Respawns at 5:32, killed at 5:42 and so on.

At 10 minutes the above gives the total of:

- 
- 

Between 10 and 20 minutes the totals are:

- 
- 

### soul drop rates

