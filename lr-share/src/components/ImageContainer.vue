<template>
  <div class="image-container">
    <div class="image-text">
      <label for="file">
        <div>
          Add your Images!
          <br />Click me!
        </div>
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
    <!-- <img src="@/assets/sample.jpeg" /> -->
    <!-- <img src="@/assets/sample2.jpeg" />   -->
    <img v-bind:src="image" v-for="image in images" v-bind:key="image" alt />
    <div v-if="this.images.length" class="image-text" @click="hundleUploadImages">
      <span>Save all files!</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Compressor from 'compressorjs'

@Component
export default class ImageContainer extends Vue {
  images: string[] = [] // ["data:image/jpeg;base64,/XXXXXX"]
  mounted() {
    this.images.push(
      'data:image/jpeg;base64,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'
    )
  }
  hundleUploadImages(e: Event) {
    this.$emit('emitting', this.images)
  }
  handleFiles(e: Event) {
    const images = this.images
    const files: FileList | null = (<HTMLInputElement>e.target).files

    if (files === null) return
    ;[...files].forEach((file: File) => {
      const payload: Compressor.Options = {
        quality: 0.8,
        maxWidth: 100,
        maxHeight: 100,
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
<style lang="stylus" scoped>
.image-container {
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #eee;
  padding: 20px 30px;
  border-radius: 6px;

  img {
    height: 180px;
    width: 240px;
    object-fit: cover;
    border-radius: 1%;
    margin: 5px;
  }

  .image-text {
    height: 180px;
    width: 240px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    margin: 5px;

    label {
      cursor: pointer;
    }

    span {
      cursor: pointer;
    }
  }
}
</style>
