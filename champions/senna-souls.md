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
25 / 3 / 100
const isRed = ref(false);
const includeScuttle = ref(false);
const isFarming = ref(false);

const killedMinionSoulChance = 25 / 3 / 100
const killedScuttleSoulChance = 1
const allyMinionSoulChance = 28 / 100
const allyScuttleSoulChance = 1

const parsedSoulsPerChampion = ref(1.5)
const rawSoulsPerChampion = ref(1.5)

function updateSoulsPerChampionPerMinute() {
  parsedSoulsPerChampion.value = rawSoulsPerChampion.value;
}
</script>

# Senna souls

Maximum theoretical senna souls per minute calculator. Human error not taken into account. Subtract whatever you think it is from final results.

Detailed explanations of various variables can be found in the [FAQ](#faq) at the bottom.

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

## values

- <WeightInput id="soulsPerChampion" v-model="rawSoulsPerChampion" @focusout="updateSoulsPerChampionPerMinute" label="souls per champion per minute" />

## details

explicitly explained results/values

## FAQ

### soul sources

By default I include: minions, lane camp (krugs / gromp) and 2 enemy champions. Below are more detailed explanations on how these are calculated.

Soul from leashing red / blue buff is skipped.

You can toggle between red and blue side, whether to include scuttle crab and whether the Senna is farming or fasting.

### waves

First wave meets in the bot lane at 1:38. Subsequent waves meet in 30 second intervals starting from 2:00. All calculations assume that the moment the waves collide is the moment they die. In other words, wave that gets to lane at 10:00 is the last one to be included in _at 10_ and _pre 10 per minute_ calculations. Same for _10-20 mins_ and _post 10 per minute_.

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
10:00 - 18 - c
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
20:00 - 20
:::

### camps (krugs / gromp)

First camp kill is skipped (doesn't get included in soul calculations). Camps are assumed to be killed on spawn + 16 seconds and respawn every 2:15 minutes which means:

At 10 minutes the above gives the total of:

- 3 gromps
- 24 krugs (3 big, 3 medium, 18 small)

::: details
1:42 - 1:58 - doesn't count<br/>
4:03 - 4:19 - 1<br/>
6:34 - 6:50 - 2<br/>
9:05 - 9:21 - 3
:::

Between 10 and 20 minutes the totals are:

- 4 gromps
- 32 krugs (4 big, 4 medium, 24 small)

::: details
11:37 - 11:53 - 1<br/>
14:08 - 14:24 - 2<br/>
16:39 - 16:55 - 3<br/>
19:10 - 19:26 - 4
:::

### champions

Senna can get souls from champions she hits twice in the span of 4 seconds. Cooldown per champions is 6/5/4 seconds on levels 1/6/11. This means the THEORETICAL maximum number of souls Senna can get from a champion is:

- 6 per minute on level 1
- 6.(6) per minute on level 6
- 7.5 per minute on level 11

::: tip
Because the above is virtually impossible to achieve the number of souls Senna can gain from champions is adjustable in [results](#results). These values should be used for reference. The default value is 1.5 stack per champion per minute.
:::

### scuttle crab

Scuttle crab spawns at 3:30 and respawns every 2:30 minutes. Calculations assume it's killed on spawn + 15 seconds.

At 10 minutes this gives the total of:

- 3 scuttle crabs

::: details
3:30 - 3:45 - 1<br/>
6:15 - 6:30 - 2<br/>
9:00 - 9:15 - 3
:::

Between 10 and 20 minutes the total is:

- 3 scuttle crabs

::: details
11:45 - 12:00 - 1<br/>
14:30 - 14:45 - 2<br/>
17:15 - 17-30 - 3
:::

### soul drop rates

According to [Senna wiki](https://leagueoflegends.fandom.com/wiki/Senna/LoL).

| source / who kills      | senna                                             | ally                                            |
|-------------------------|---------------------------------------------------|-------------------------------------------------|
| minions / krugs / gromp | {{ (killedMinionSoulChance * 100).toFixed(2) }}%  | {{ (allyMinionSoulChance * 100).toFixed(2) }}%  |
| scuttle crab            | {{ (killedScuttleSoulChance * 100).toFixed(2) }}% | {{ (allyScuttleSoulChance * 100).toFixed(2) }}% |


::: tip
Can be adjusted in [details](#details)
:::

## sources

- [League of Legends fandom wiki](https://leagueoflegends.fandom.com/wiki/League_of_Legends_Wiki)
