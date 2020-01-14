<template>
  <div class="signup">
    <b-field label="Email">
      <b-input type="email" maxlength="30" v-model="username"></b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password" password-reveal v-model="password"></b-input>
    </b-field>
    <b-button tag="input" native-type="submit" value="Submit signUp" @click="signUp" />
    <p>
      Do you have an account?
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Compressor from 'compressorjs'
import * as firebase from 'firebase/app'
import 'firebase/auth'
console.log(firebase)

@Component
export default class Signup extends Vue {
  uploadImages(payload: string[]) {
    console.log(payload)
  }
  username: string = ''
  password: string = ''
  signUp() {
    console.log('sign up')
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.username, this.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        const user: firebase.User | null = userCredential.user

        this.$buefy.toast.open({
          message: 'ユーザーの作成に成功しました！',
          position: 'is-bottom',
          type: 'is-success'
        })
      })
      .catch(e => {
        this.$buefy.toast.open({
          duration: 5000,
          message: e.message,
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
