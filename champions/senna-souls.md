---
head:
  - - meta
    - name: description
      content: League of Legends Senna souls per minute calculator
---

<script setup lang="ts">
import { computed, provide, ref } from 'vue';

import FloatInput from '../components/FloatInput.vue';
import VariableToggle from '../components/VariableToggle.vue';
import DetailedEquasion from '../components/DetailedEquasion.vue';

const isRed = ref(false);
const includeScuttle = ref(false);
const isFarming = ref(false);

const parsedSoulsPerChampion = ref(1.5);
const rawSoulsPerChampion = ref(1.5);

function setSoulsPerChampionPerMinute(value: number) {
	parsedSoulsPerChampion.value = value;
}

const parsedMinionSoulDropRate = ref(0);
const rawMinionSoulDropRate = ref('');
const allyParsedMinionSoulDropRate = ref(0);
const allyRawMinionSoulDropRate = ref('');

// 8.(3)%
setMinionSoulDropRate(14 / 100);
rawMinionSoulDropRate.value = '14';
// 28%
setAllyMinionSoulDropRate(28 / 100);
allyRawMinionSoulDropRate.value = '28';

function setMinionSoulDropRate(value: number) {
	parsedMinionSoulDropRate.value = value;
}

function setAllyMinionSoulDropRate(value: number) {
	allyParsedMinionSoulDropRate.value = value;
}

function formatNumber(value: number) {
	return Number(value.toFixed(2));
}

const minionsAt10 = 108;
const minionsPost10Per10 = 120;
const cannonsPer10 = 6;

const computedMinionSoulDropRate = computed(() => isFarming.value ? parsedMinionSoulDropRate.value : allyParsedMinionSoulDropRate.value);

const computedMinionSoulsAt10 = computed(() => minionsAt10 * computedMinionSoulDropRate.value);
const computedMinionSoulsAt10PerMinute = computed(() => computedMinionSoulsAt10.value / 10);
const computedMinionSoulsPost10Per10 = computed(() => minionsPost10Per10 * computedMinionSoulDropRate.value);
const computedMinionSoulsAt20 = computed(() => computedMinionSoulsAt10.value + computedMinionSoulsPost10Per10.value);
const computedMinionSoulsAt20PerMinute = computed(() => computedMinionSoulsAt20.value / 20);

const computedCannonMinionSoulDropRate = computed(() => isFarming.value ? parsedMinionSoulDropRate.value : 1);

const computedCannonSoulsPer10 = computed(() => cannonsPer10 * computedCannonMinionSoulDropRate.value);
const computedCannonSoulsPer10PerMinute = computed(() => computedCannonSoulsPer10.value / 10);
const computedCannonSoulsAt20 = computed(() => computedCannonSoulsPer10.value * 2);
const computedCannonSoulsAt20PerMinute = computed(() => computedCannonSoulsAt20.value / 20);

const krugsAt10 = 24;
const krugsPost10Per10 = 32;
const grompsAt10 = 3;
const grompsPost10Per10 = 4;

const computedMonstersAt10 = computed(() => isRed.value ? grompsAt10 : krugsAt10);
const computedMonstersPost10Per10 = computed(() => isRed.value ? grompsPost10Per10 : krugsPost10Per10);
const computedMonsterSoulsAt10 = computed(() => computedMonstersAt10.value * allyParsedMinionSoulDropRate.value);
const computedMonsterSoulsAt10PerMinute = computed(() => computedMonsterSoulsAt10.value / 10);
const computedMonsterSoulsPost10Per10 = computed(() => computedMonstersPost10Per10.value * allyParsedMinionSoulDropRate.value);
const computedMonsterSoulsAt20 = computed(() => computedMonsterSoulsAt10.value + computedMonsterSoulsPost10Per10.value);
const computedMonsterSoulsAt20PerMinute = computed(() => computedMonsterSoulsAt20.value / 20);

const scuttlesPer10 = 3;
const computedScuttlesPer10 = computed(() => includeScuttle.value ? scuttlesPer10 : 0);
const computedScuttlesAt20 = computed(() => computedScuttlesPer10.value * 2);

const computedScuttleSoulsPer10 = computed(() => computedScuttlesPer10.value);
const computedScuttleSoulsAt10PerMinute = computed(() => computedScuttleSoulsPer10.value / 10);
const computedScuttleSoulsAt20 = computed(() => computedScuttlesAt20.value);
const computedScuttleSoulsAt20PerMinute = computed(() => computedScuttleSoulsAt20.value / 20);

const botlaneChampions = 2;
const pre10ChampionSoulMinutes = 8 + (1 / 3);

const computedChampionSoulsAt10 = computed(() => pre10ChampionSoulMinutes * parsedSoulsPerChampion.value * botlaneChampions);
const computedChampionSoulsAt10PerMinute = computed(() => computedChampionSoulsAt10.value / 10);
const computedChampionSoulsPost10Per10 = computed(() => 10 * parsedSoulsPerChampion.value * 2);
const computedChampionSoulsAt20 = computed(() => computedChampionSoulsAt10.value + computedChampionSoulsPost10Per10.value);
const computedChampionSoulsAt20PerMinute = computed(() => computedChampionSoulsAt20.value / 20);

const computedTotalAt10 = computed(() => computedMinionSoulsAt10.value + computedCannonSoulsPer10.value + computedMonsterSoulsAt10.value + computedScuttleSoulsPer10.value + computedChampionSoulsAt10.value);
const computedTotalAt10PerMinute = computed(() => computedTotalAt10.value / 10);

const computedTotalPost10Per10 = computed(() => computedMinionSoulsPost10Per10.value + computedCannonSoulsPer10.value + computedMonsterSoulsPost10Per10.value + computedScuttleSoulsPer10.value + computedChampionSoulsPost10Per10.value);

const computedTotalAt20 = computed(() => computedTotalAt10.value + computedTotalPost10Per10.value);
const computedTotalAt20PerMinute = computed(() => computedTotalAt20.value / 20);

const detailsDisplayValues = ref(true);

provide('detailedEquasionDisplayValues', detailsDisplayValues);
</script>

# Senna souls

Average Senna souls per minute calculator. Human error not taken into account. Subtract whatever you think it is from final results.

Detailed explanations of various variables can be found in the [FAQ](#faq) at the bottom.

## results

<div class="w-full flex gap-6 flex-col sm:flex-row sm:flex-wrap justify-between border border-[var(--vp-input-border-color)] rounded-lg p-4 mt-4 mb-8">
  <VariableToggle id="sideToggle" v-model="isRed" label="side: (krugs / gromp)" false-label="blue" true-label="red" />
  <VariableToggle id="fastingToggle" v-model="isFarming" label="farming style" false-label="fasting" true-label="farming" />
  <VariableToggle id="scuttleToggle" v-model="includeScuttle" label="include scuttle" false-label="no" true-label="yes" />
</div>

- {{ formatNumber(computedTotalAt10) }} souls at 10 minutes ({{ formatNumber(computedTotalAt10PerMinute) }} / min)
- {{ formatNumber(computedTotalAt20) }} souls at 20 minutes ({{ formatNumber(computedTotalAt20PerMinute) }} / min)

<table>
  <thead>
    <tr>
      <th>source / time</th>
      <th>total at 10</th>
      <th>per minute at 10</th>
      <th>total at 20</th>
      <th>per minute at 20</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>minions</td>
      <td>{{ formatNumber(computedMinionSoulsAt10) }}</td>
      <td>{{ formatNumber(computedMinionSoulsAt10PerMinute) }}</td>
      <td>{{ formatNumber(computedMinionSoulsAt20) }}</td>
      <td>{{ formatNumber(computedMinionSoulsAt20PerMinute) }}</td>
    </tr>
    <tr>
      <td>cannon minions</td>
      <td>{{ formatNumber(computedCannonSoulsPer10) }}</td>
      <td>{{ formatNumber(computedCannonSoulsPer10PerMinute) }}</td>
      <td>{{ formatNumber(computedCannonSoulsAt20) }}</td>
      <td>{{ formatNumber(computedCannonSoulsAt20PerMinute) }}</td>
    </tr>
    <tr>
      <td>{{ isRed ? 'gromp' : 'krugs' }}</td>
      <td>{{ formatNumber(computedMonsterSoulsAt10) }}</td>
      <td>{{ formatNumber(computedMonsterSoulsAt10PerMinute) }}</td>
      <td>{{ formatNumber(computedMonsterSoulsAt20) }}</td>
      <td>{{ formatNumber(computedMonsterSoulsAt20PerMinute) }}</td>
    </tr>
    <tr>
      <td>champions (2)</td>
      <td>{{ formatNumber(computedChampionSoulsAt10) }}</td>
      <td>{{ formatNumber(computedChampionSoulsAt10PerMinute) }}</td>
      <td>{{ formatNumber(computedChampionSoulsAt20) }}</td>
      <td>{{ formatNumber(computedChampionSoulsAt20PerMinute) }}</td>
    </tr>
    <tr v-if="includeScuttle">
      <td>scuttle crab</td>
      <td>{{ formatNumber(computedScuttleSoulsPer10) }}</td>
      <td>{{ formatNumber(computedScuttleSoulsAt10PerMinute) }}</td>
      <td>{{ formatNumber(computedScuttleSoulsPer10) }}</td>
      <td>{{ formatNumber(computedScuttleSoulsAt20PerMinute) }}</td>
    </tr>
  </tbody>
</table>

## values

- <FloatInput id="soulsPerChampion" v-model="rawSoulsPerChampion" @focusout="setSoulsPerChampionPerMinute" label="souls per champion per minute" />
- <FloatInput id="minionSoulDropRate" v-model="rawMinionSoulDropRate" @focusout="setMinionSoulDropRate" label="chance for Senna-killed minion soul" is-percent />
- <FloatInput id="allyMinionSoulDropRate" v-model="allyRawMinionSoulDropRate" @focusout="setAllyMinionSoulDropRate" label="chance for ally-killed minion soul" is-percent />

## details

<div class="tip custom-block">
  <label class="custom-block-title uppercase">Tip</label>
  <div class="my-2 flex flex-wrap gap-2">
    hover over variables to see the values or use this toggle:
    <VariableToggle id="detailsMode" v-model="detailsDisplayValues" label="details variables mode" false-label="variables" true-label="values" label-visually-hidden />
  </div>
</div>

With `at 10` at the beginning all subsequent variables are _at 10_ (total souls at 10 = total minion souls _at 10_ + cannon minion souls _at 10_ + ...).

<ul>
  <li>
    <DetailedEquasion :content="[
	['souls per minute at 10', computedTotalAt10PerMinute],
	'=',
	['total souls at 10', computedTotalAt10],
	'/',
	'10'
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['total souls at 10', computedTotalAt10],
	'=',
	['minion souls', computedMinionSoulsAt10],
	'+',
	['cannon minion souls', computedCannonSoulsPer10],
	'+',
	[`${isRed ? 'gromp' : 'krug'} souls`, computedMonsterSoulsAt10],
	'+',
	['champion souls', computedChampionSoulsAt10],
	'+',
	['scuttle souls', computedScuttleSoulsPer10]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['minion souls at 10', computedMinionSoulsAt10],
	'=',
	['total minions', minionsAt10],
	'*',
	['minion soul drop chance', computedMinionSoulDropRate]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['cannon minion souls at 10', computedCannonSoulsPer10],
	'=',
	['total cannons', cannonsPer10],
	'*',
	['cannon minion soul drop chance', computedCannonMinionSoulDropRate]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
      [`${isRed ? 'gromp' : 'krug'} souls at 10`, computedMonsterSoulsAt10],
      '=',
      [`total ${isRed ? 'gromps' : 'krugs'}`, computedMonstersAt10],
      '*',
      ['ally minion kill soul drop chance', allyParsedMinionSoulDropRate]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['champion souls at 10', computedChampionSoulsAt10],
	'=',
	['champions', 2],
	'*',
	['souls per champion per minute', parsedSoulsPerChampion],
	'*',
	['minutes', pre10ChampionSoulMinutes]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
      ['scuttle souls at 10', computedScuttleSoulsPer10],
      '=',
      ['total scuttles', computedScuttlesPer10]
    ]" />
  </li>
</ul>

With `at 20` at the beginning, every value after the first `X at 10` is _between 10 and 20 minutes_ (total souls at 20 = total souls at 10 + minion souls _between 10 and 20_ + cannon minion souls _between 10 and 20_ + ...).

<ul>
  <li>
    <DetailedEquasion :content="[
	['souls per minute at 20', computedTotalAt20PerMinute],
	'=',
	['total souls at 20', computedTotalAt20],
	'/',
	'20'
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['total souls at 20', computedTotalAt20],
	'=',
	['total souls at 10', computedTotalAt10],
	'+',
	['minion souls', computedMinionSoulsPost10Per10],
	'+',
	['cannon minion souls', computedCannonSoulsPer10],
	'+',
	[`${isRed ? 'gromp' : 'krug'} souls`, computedMonsterSoulsPost10Per10],
	'+',
	['champion souls', computedChampionSoulsPost10Per10],
	'+',
	['scuttle souls', computedScuttleSoulsPer10]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['minion souls between 10 and 20', computedMinionSoulsPost10Per10],
	'=',
	['total minions', minionsPost10Per10],
	'*',
	['minion soul drop chance', computedMinionSoulDropRate]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['cannon minion souls between 10 and 20', computedCannonSoulsPer10],
	'=',
	['total cannons', cannonsPer10],
	'*',
	['cannon minion soul drop chance', computedCannonMinionSoulDropRate]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
      [`${isRed ? 'gromp' : 'krug'} souls between 10 and 20`, computedMonsterSoulsPost10Per10],
      '=',
      [`total ${isRed ? 'gromps' : 'krugs'}`, computedMonstersPost10Per10],
      '*',
      ['ally minion kill soul drop chance', allyParsedMinionSoulDropRate]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['champion souls between 10 and 20', computedChampionSoulsPost10Per10],
	'=',
	['champions', 2],
	'*',
	['souls per champion per minute', parsedSoulsPerChampion],
	'*',
	['minutes', 10]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
      ['scuttle souls between 10 and 20', computedScuttleSoulsAt20],
      '=',
      ['total scuttles', computedScuttlesPer10]
    ]" />
  </li>
</ul>

Additionally here are some values from the [results](#results) table for specific soul sources at 20 minutes.

<ul>
  <li>
    <DetailedEquasion :content="[
	['minion souls at 20', computedMinionSoulsAt20],
	'=',
	['minion souls at 10', computedMinionSoulsAt10],
	'+',
	['minion souls between 10 and 20', computedMinionSoulsPost10Per10]
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
	['cannon minion souls at 20', computedCannonSoulsAt20],
	'=',
	['cannon minion souls at 10', computedCannonSoulsPer10],
	'+',
	['cannon minion souls between 10 and 20', computedCannonSoulsPer10],
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
      [`${isRed ? 'gromp' : 'krug'} souls at 20`, computedMonsterSoulsAt20],
      '=',
      [`${isRed ? 'gromps' : 'krugs'} souls at 10`, computedMonsterSoulsAt10],
      '+',
      [`${isRed ? 'gromps' : 'krugs'} souls between 10 and 20`, computedMonsterSoulsPost10Per10],
    ]" />
  </li>
  <li>
    <DetailedEquasion :content="[
      ['scuttle souls at 20', computedScuttleSoulsAt20],
      '=',
      ['scuttle souls at 10', computedScuttleSoulsPer10],
      '+',
      ['scuttle souls between 10 and 20', computedScuttleSoulsPer10]
    ]" />
  </li>
</ul>

## FAQ

### soul sources

By default I include: minions, lane camp (krugs / gromp) and 2 enemy champions. Below are more detailed explanations on how these are calculated.

Soul from leashing red / blue buff is skipped.

::: tip
You can toggle between red and blue side, whether to include scuttle crab and whether the Senna is farming or fasting in [results](#results).
:::

### waves

First wave meets in the bot lane at 1:38. Subsequent waves meet in 30 second intervals starting from 2:00. All calculations assume that the moment the waves collide is the moment they die. In other words, wave that gets to lane at 10:00 is the last one to be included in _at 10_ and _pre 10 per minute_ calculations. Same for _10-20 mins_ and _post 10 per minute_.

At 10 minutes this means:

- 18 waves total ({{ cannonsPer10 }} cannon)
- {{ minionsAt10 }} melee/caster minions
- {{ cannonsPer10 }} cannon minions

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

- 20 waves total ({{ cannonsPer10 }} cannon)
- {{ minionsPost10Per10 }} melee/caster minions
- {{ cannonsPer10 }} cannon minions

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

First camp kill is skipped (doesn't get included in soul calculations). Camps are assumed to be killed _by a jungler_ on spawn + 16 seconds and respawn every 2:15 minutes which means:

At 10 minutes the above gives the total of:

- {{ grompsAt10 }} gromps
- {{ krugsAt10 }} krugs (3 big, 3 medium, 18 small)

::: details
1:42 - 1:58 - doesn't count<br/>
4:03 - 4:19 - 1<br/>
6:34 - 6:50 - 2<br/>
9:05 - 9:21 - 3
:::

Between 10 and 20 minutes the totals are:

- {{ grompsPost10Per10 }} gromps
- {{ krugsPost10Per10 }} krugs (4 big, 4 medium, 24 small)

::: details
11:37 - 11:53 - 1<br/>
14:08 - 14:24 - 2<br/>
16:39 - 16:55 - 3<br/>
19:10 - 19:26 - 4
:::

### champions

Senna can get souls from champions she hits twice in the span of 4 seconds. Cooldown per champions is 6/5/4 seconds on levels 1/6/11. This means the **THEORETICAL** maximum number of souls Senna can get from a champion is:

- 6 per minute on level 1
- 6.(6) per minute on level 6
- 7.5 per minute on level 11

::: warning
champion soul stacking starts calculating from <ins>1:40</ins>
:::

::: tip
Because the above is virtually impossible to achieve the number of souls Senna can gain from champions is adjustable in [values](#values). These values should be used for reference. The default value is 1.5 stack per champion per minute.
:::

### scuttle crab

Scuttle crab spawns at 3:30 and respawns every 2:30 minutes. Calculations assume it's killed _by a jungler_ on spawn + 15 seconds.

At 10 minutes this gives the total of:

- {{ scuttlesPer10 }} scuttle crabs

::: details
3:30 - 3:45 - 1<br/>
6:15 - 6:30 - 2<br/>
9:00 - 9:15 - 3
:::

Between 10 and 20 minutes the total is:

- {{ scuttlesPer10 }} scuttle crabs

::: details
11:45 - 12:00 - 1<br/>
14:30 - 14:45 - 2<br/>
17:15 - 17-30 - 3
:::

### soul drop rates

According to [Senna wiki](https://wiki.leagueoflegends.com/en-us/Senna).

| source / who kills      | senna                        | ally                             |
| ----------------------- | ---------------------------- | -------------------------------- |
| minions / krugs / gromp | {{ rawMinionSoulDropRate }}% | {{ allyRawMinionSoulDropRate }}% |
| scuttle crab            | 100%                         | 100%                             |

::: tip
Minion soul drop rates can be adjusted in [values](#values).
:::

## sources

- [League of Legends wiki](https://wiki.leagueoflegends.com/en-us/)
