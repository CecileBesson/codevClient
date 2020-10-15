<template>
  <v-form class="login" v-model="isValid" @submit.prevent="login">
    <h1>{{ $t("drawer.login") }}</h1>
    <v-text-field
        v-model="email"
        :rules="[rules.validEmail]"
        name="email"
        label="E-mail"
    ></v-text-field>
    <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="password"
        label="Mot de passe"
        hint="At least 6 characters"
        counter
        @click:append="show1 = !show1"
    ></v-text-field>
    <a href="/register">Pas de compte? Inscrivez-vous ici !</a><br/><br/>
    <v-btn type="submit"  :disabled="!isValid">
      {{ $t("drawer.login") }}
    </v-btn>
  </v-form>
</template>



<script>
export default {
  name: 'Login',
  show1: false,
  data(){
    return {
      email : "",
      password : "",
      isValid: true,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        validEmail: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid'
      },
    }
  },
  methods: {
    login: function () {
      let email = this.email
      let password = this.password
      this.$store.dispatch('auth', { email, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.login {
  width: 500px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 25px;
  text-align: center;
}

button{
  padding-top: 5px;
}
h1{
  font-size: 45px;
}
</style>
