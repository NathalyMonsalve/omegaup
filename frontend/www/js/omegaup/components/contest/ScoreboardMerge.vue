<template>
  <div>
    <div class="post">
      <legend>
        {{ T.wordsContest }}:
        <select
          class="contests"
          multiple="multiple"
          size="10"
          v-model="selectedContests"
        >
          <option
            v-bind:value="contest.alias"
            v-for="contest in availableContests"
          >
            {{ UI.contestTitle(contest) }}
          </option>
        </select>
      </legend>
      <button class="btn" type="button" v-on:click.prevent="onDisplayTable">
        {{ T.showTotalScoreboard }}
      </button>
    </div>
    <div class="post">
      <table class="merged-scoreboard" v-if="scoreboard.length &gt; 0">
        <tr>
          <td></td>
          <td>
            <strong>{{ T.username }}</strong>
          </td>
          <td colspan="2" v-for="alias in aliases">
            <strong>{{ alias }}</strong>
          </td>
          <td colspan="2">
            <strong>{{ T.wordsTotal }}</strong>
          </td>
        </tr>
        <tr v-for="rank in scoreboard">
          <td>
            <strong>{{ rank.place }}</strong>
          </td>
          <td>
            <div class="username">
              {{ rank.username }}
            </div>
            <div class="name">
              {{ rank.username != rank.name ? rank.name : ' ' }}
            </div>
          </td>
          <td class="numeric" colspan="2" v-for="alias in aliases">
            {{ rank.contests[alias].points
            }}<span class="scoreboard-penalty" v-if="showPenalty"
              >({{ rank.contests[alias].penalty }})</span
            >
          </td>
          <td class="numeric" colspan="2">
            {{ rank.totalPoints
            }}<span class="scoreboard-penalty" v-if="showPenalty"
              >({{ rank.totalPenalty }})</span
            >
          </td>
        </tr>
      </table>

      <table class="merged-scoreboard" v-else="">
        <tr>
          <td></td>
          <td>
            <strong>{{ T.username }}</strong>
          </td>
          <td colspan="2">
            <strong>{{ T.wordsTotal }}</strong>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
.merged-scoreboard {
  background: white;
}

.merged-scoreboard td {
  text-align: center;
}

.scoreboard-penalty {
  padding-left: 0.5em;
  opacity: 0.7;
  color: red;
}

.post {
  overflow-x: scroll;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { omegaup } from '../../omegaup';
import T from '../../lang';
import * as UI from '../../ui';

@Component
export default class ScoreboardMerge extends Vue {
  @Prop() availableContests!: omegaup.Contest[];
  @Prop() scoreboard!: omegaup.Scoreboard[];
  @Prop() showPenalty!: boolean;
  @Prop() aliases!: Array<string>;

  T = T;
  UI = UI;
  selectedContests: Array<string> = [];

  @Emit('get-scoreboard')
  onDisplayTable(): Array<string> {
    return this.selectedContests;
  }
}
</script>
