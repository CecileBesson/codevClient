<template>
  <v-form class="login"  v-model="isValid" @submit.prevent="login">
    <div class="title"> {{ $t("drawer.login") }}</div>
    <v-text-field
        v-model="email"
        :rules="[rules.validEmail]"
        name="email"
        label="E-mail"
    ></v-text-field>
    <v-text-field
        v-model="password"
        type="password"
        :rules="[rules.required, rules.min]"
        name="password"
        label="Mot de passe"
        hint="At least 6 characters"
        counter
    ></v-text-field> <!-- todo: use $t !-->
    <v-alert v-if="alertDlg" color="cyan"
             border="left"
             elevation="2"
             colored-border>
      {{$t("alert.authFailed")}}
    </v-alert>
    <p>
      <router-link to="/register">Pas de compte? Inscrivez-vous ici !</router-link> <!-- todo: use $t !-->
    </p>
    <v-btn type="submit"  :disabled="!isValid">
      {{ $t("drawer.login") }}
    </v-btn>
  </v-form>
</template>



<script>
export default {
  name: 'Login',
  data(){
    return {
      email : "",
      password : "",
      isValid: true,
      rules: {
        required: value => !!value || 'Required.', // todo: use $t
        min: v => v.length >= 6 || 'Min 6 characters', // todo: use $t
        validEmail: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid' // todo: use $t
      },
    }
  },
  computed: {
    alertDlg() {
      return this.$store.getters.alertDlg;
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
@media title and (width: 500px){
  .title{
    font-size: 12px;
  }

}
@media title and (width: 501px){
  .title{
    font-size: 45px;
  }


}

</style>
