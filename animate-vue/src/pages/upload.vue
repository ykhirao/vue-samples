<template>
  <div class="upload">
    <h1>This is an upload page</h1>
    <Chart class="chart chart1" />
    <Chart class="chart" />
    <a href="" id="downloadlink">download</a>
    <div @click="stop">stop</div>
    <div @click="start">start</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Chart from '@/components/Chart.vue'
declare var MediaRecorder: any
interface CanvasElement extends HTMLCanvasElement {
  captureStream(): void
}

@Component({ components: { Chart } })
export default class Upload extends Vue {
  name: string = 'upload'
  email: string = ''
  recorder: any = {}
  mounted() {
    this.initRecorder()
  }
  initRecorder() {
    //canvasの取得
    const canvas = <CanvasElement>document.querySelector('.chart1 #bar-chart')
    if (!canvas) return
    const stream = <any>canvas.captureStream()
    //ストリームからMediaRecorderを生成
    let recorder: any = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    })
    //ダウンロード用のリンクを準備
    //録画終了時に動画ファイルのダウンロードリンクを生成する処理
    recorder.ondataavailable = function(e: any) {
      console.log('ondataavailable')
      var anchor = <HTMLAnchorElement>document.getElementById('downloadlink')

      var videoBlob = new Blob([e.data], { type: e.data.type })
      const blobUrl = window.URL.createObjectURL(videoBlob)
      anchor.download = 'movie.webm'
      anchor.href = blobUrl
      anchor.style.display = 'block'
      console.log(blobUrl)
    }
    //録画開始
    this.recorder = recorder
  }
  start(event: Event) {
    event.preventDefault()
    console.log('START!')

    if (this.recorder) {
      this.recorder.start()
    }
  }
  stop(event: Event) {
    console.log('STOP!')
    event.preventDefault()

    if (this.recorder) {
      this.recorder.stop()
    }
  }
}
</script>
<style lang="stylus" scoped>

.chart
  width 300px
</style>
