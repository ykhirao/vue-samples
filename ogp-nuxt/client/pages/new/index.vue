<template>
  <section class="container">
    <article class="box17" id="message-ogp" ref="printMe">{{ogp.text}}</article>
    <div>
      <textarea class="textarea-text" type="text" v-model="ogp.text" placeholder="本文" />
      <button @click="print">print</button>
      <button @click="submit">submit</button>
    </div>
    <div style="width:60%;">
      <img :src="src" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      src: null,
      ogp: {
        text: `ここに文字の入力をお願いします！
        改行も絵文字も可能！！！😂`
      }
    }
  },
  methods: {
    async submit() {
      if (!this.src) {
        console.log('dataがない')
        return
      }
      const response = await this.$axios.$post('/api/canvas', {
        base64: this.src
      })
    },
    async print() {
      const el = this.$refs.printMe
      const options = {
        type: 'dataURL',
        logging: false
      }
      this.src = await this.$html2canvas(el, options)
      console.log(this.src)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  text-align: center;
}

#message-ogp {
  width: 640px;
  min-height: 335px;
  font-size: 3em;
  padding: 0.7em 1em;
  line-height: 1.1;
  white-space: pre-line; /* 改行記号の反映 */
}
.message-body {
  min-height: 335px;
}
.box17 {
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;
  border: solid 3px #111;
}
.box17 div {
  margin: 0;
  padding: 0;
}

.textarea-text {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 0;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  height: 100px;
  padding: 0.4em 0.8em;
  width: 100%;
}

.textarea-text:focus {
  border: 1px solid rgba(0, 0, 0, 0.32);
  box-shadow: none;
  outline: none;
}
</style>
