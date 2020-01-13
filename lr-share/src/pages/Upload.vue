<template>
  <div class="upload">
    <h1>Upload page</h1>

    <div class="image-container">
      <div class="images-text">
        <label for="file">
          <div>Add your Images!<br />Click me!</div>
          <input
            type="file"
            id="file"
            multiple
            accept="image/*"
            style="display:none;"
            @change="handleFiles"
          />
        </label>
      </div>

      <img src="@/assets/sample.jpeg" />
      <!-- <img src="@/assets/sample2.jpeg" />   -->
      <img
        v-bind:src="image"
        v-for="image in images"
        v-bind:key="image"
        alt=""
      />
      <div v-if="this.images.length" class="images-text">Save all files!</div>
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
  images: string[] = [] // ["data:image/jpeg;base64,/XXXXXX"]
  get triple() {
    return this.age * 3
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
  h1
    font-size: 2em
  display: flex
  min-height: calc(100vh - 120px)
  padding: 0
  margin: 0
  align-items: center
  justify-content: center
  flex-direction: column

.image-container
  width 100%
  max-width 960px
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap wrap
  background-color #eee;
  padding 20px 30px
  border-radius 6px

  img
    height 180px
    width 240px
    object-fit cover
    border-radius: 1%;
    margin 5px

  .images-text
    cursor pointer
    height 180px
    width 240px
    background-color white
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.5em
    margin 5px
</style>
