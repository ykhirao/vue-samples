<template>
  <section class="container">
    <article class="message" id="message-ogp" ref="printMe">
      <div class="message-header">
        <p>{{ogp.title}}</p>
      </div>
      <div class="message-body" v-bind:style="ogpStyle" contenteditable="true">{{ogp.text}}</div>
    </article>
    <div>
      <input type="text" v-model="ogp.title" placeholder="タイトル" />
      <input type="text" v-model="ogp.text" placeholder="本文" />
      <input type="number" v-model="ogp.size" />
      <button @click="print">print</button>
      <button @click="submit">submit</button>
    </div>
    <div>
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
        title: 'タイトル',
        text: 'あああああああああ',
        size: '4'
      }
    }
  },
  computed: {
    ogpStyle: function() {
      const fontSize = `${this.ogp.size}em`
      return { fontSize }
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

.links {
  padding-top: 15px;
}

#message-ogp {
  max-width: 640px;
  max-height: 335px;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
}
.message-body {
  padding: 0.2em;
}
</style>
