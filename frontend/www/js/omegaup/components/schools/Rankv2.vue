<template>
  <div class="card">
    <h5 class="card-header">
      {{
        showHeader
          ? UI.formatString(T.schoolRankHeader, {
              count: rank ? rank.length : 0,
            })
          : UI.formatString(T.schoolRankRangeHeader, {
              lowCount: (page - 1) * length + 1,
              highCount: page * length,
            })
      }}
    </h5>
    <div class="card-body" v-if="showControls">
      <template v-if="page > 1">
        <a class="prev" v-bind:href="`/rank/schools/?page=${page - 1}`">
          {{ T.wordsPrevPage }}</a
        >
        <span class="delimiter" v-show="showNextPage">|</span>
      </template>
      <a
        class="next"
        v-show="showNextPage"
        v-bind:href="`/rank/schools/?page=${page + 1}`"
        >{{ T.wordsNextPage }}</a
      >
    </div>
    <table class="table mb-0">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ T.profileSchool }}</th>
          <th class="text-right" scope="col">{{ T.wordsScore }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="index" v-for="(school, index) in rank">
          <th scope="row">
            {{ showHeader ? index + 1 : school.ranking || '' }}
          </th>
          <td>
            <omegaup-countryflag
              v-bind:country="school.country_id"
            ></omegaup-countryflag>
            <a v-bind:href="`/schools/profile/${school.school_id}/`">{{
              school.name
            }}</a>
          </td>
          <td class="text-right">
            {{ school.score }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="card-footer" v-if="showHeader">
      <a href="/schoolofthemonth/">{{ T.rankViewFull }}</a>
    </div>
    <div class="card-footer" v-else-if="showControls">
      <template v-if="page > 1">
        <a class="prev" v-bind:href="`/rank/schools/?page=${page - 1}`">
          {{ T.wordsPrevPage }}</a
        >
        <span class="delimiter" v-show="showNextPage">|</span>
      </template>
      <a
        class="next"
        v-show="showNextPage"
        v-bind:href="`/rank/schools/?page=${page + 1}`"
        >{{ T.wordsNextPage }}</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { omegaup } from '../../omegaup';
import T from '../../lang';
import * as UI from '../../ui';
import CountryFlag from '../CountryFlag.vue';

@Component({
  components: {
    'omegaup-countryflag': CountryFlag,
  },
})
export default class SchoolRank extends Vue {
  @Prop() page!: number;
  @Prop() length!: number;
  @Prop() showHeader!: boolean;
  @Prop() totalRows!: number;
  @Prop() rank!: omegaup.SchoolsRank[];

  T = T;
  UI = UI;

  get showNextPage(): boolean {
    return this.length * this.page < this.totalRows;
  }

  get showControls(): boolean {
    return !this.showHeader && (this.showNextPage || this.page > 1);
  }
}
</script>
