<template>
  <div class="about">
    <h1>This is an upload page</h1>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Upload extends Vue {
  name: string = 'upload'
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
<style lang="scss" scoped></style>
