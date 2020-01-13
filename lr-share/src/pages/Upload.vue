<template>
  <div class="upload">
    <div>Upload page</div>
    <input
      type="file"
      id="file"
      multiple
      accept="image/*"
      @change="handleFiles"
    />
    <div class="image-container">
      <img src="@/assets/sample.jpeg" />
      <img src="@/assets/sample2.jpeg" />
      <img src="@/assets/sample2.jpeg" />
      <img src="@/assets/sample.jpeg" />
      <img src="@/assets/sample.jpeg" />
      <img src="@/assets/sample.jpeg" />
      <img
        v-bind:src="image"
        v-for="image in images"
        v-bind:key="image"
        alt=""
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Compressor from 'compressorjs'

@Component({
  components: {},
  directives: {},
  filters: {},
  mixins: []
})
export default class Update extends Vue {
  age = 21
  images: string[] = []
  get triple() {
    return this.age * 3
  }
  onClickButton() {
    console.log('fire')
  }
  mounted() {
    // コンポーネントがマウントされたときの処理
  }
  handleFiles(e: Event) {
    const images = this.images
    const files: FileList | null = (<HTMLInputElement>e.target).files

    if (files === null) return
    ;[...files].forEach((file: File) => {
      const payload: Compressor.Options = {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        mimeType: 'image/jpeg',
        success(blob: Blob): void {
          var reader = new FileReader()
          reader.onloadend = () => {
            const result = <string | ArrayBuffer | null>reader.result
            if (result instanceof ArrayBuffer || result === null) return
            images.push(result)
          }
          reader.readAsDataURL(blob)
        },
        error(err: Error): void {
          console.log(err.message)
        }
      }
      new Compressor(file, payload)
    })
  }
}
</script>
<style scoped lang="stylus">
.upload
  font-size: 3em
  display: flex
  min-height: 100vh
  padding: 0
  margin: 0
  align-items: center
  justify-content: center
  flex-direction: column


.image-container
  width 100%
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap wrap
  background-color #eee;
  padding 30px 40px
  border-radius 6px


  img
    height 200px
</style>
