<template>
  <div>
    <div>{{ name }} ({{ age }})</div>
    <div>{{ triple }}</div>
    <div>
      <button @click="onClickButton">Click Me!</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {},
  directives: {},
  filters: {},
  mixins: []
})
export default class Update extends Vue {
  @Prop() userName: string = 'tanaka'

  name = 'simochee'
  age = 21
  get triple() {
    return this.age * 3
  }
  onClickButton() {
    console.log('fire')
  }
  mounted() {
    // コンポーネントがマウントされたときの処理
  }
}
</script>
