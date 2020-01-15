<template>
  <div class="upload">
    <h1>Upload page</h1>
    <ImageContainer @emitting="uploadImages" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Compressor from 'compressorjs'
import ImageContainer from '@/components/ImageContainer.vue'

@Component({
  components: { ImageContainer },
  directives: {},
  filters: {},
  mixins: []
})
export default class Update extends Vue {
  uploadImages(payload: string[]) {
    console.log(payload)
  }
}
</script>
<style scoped lang="stylus">
.upload {
  display: flex;
  min-height: calc(100vh - 120px);
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 2em;
  }
}
</style>
