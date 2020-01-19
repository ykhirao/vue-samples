<template>
  <div class="about">
    <h1>This is an upload page</h1>
    <chartist
      ratio="ct-major-second"
      type="Line"
      :data="chartData"
      :options="chartOptions"
    >
    </chartist>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Signin extends Vue {
  email: string = ''
  chartData: object = {
    labels: ['A', 'B', 'C'],
    series: [
      [1, 3, 2],
      [4, 6, 2]
    ]
  }
  chartOptions: object = {
    lineSmooth: true
  }
}
</script>
<style lang="scss" scoped>
@import '../../node_modules/chartist/dist/scss/settings/_chartist-settings.scss';
@import '../../node_modules/chartist/dist/chartist.min.css';
</style>
