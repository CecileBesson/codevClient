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
             colored-border
    dense>
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
      alertDlg: false,
      rules: {
        required: value => !!value || 'Required.', // todo: use $t
        min: v => v.length >= 6 || 'Min 6 characters', // todo: use $t
        validEmail: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid' // todo: use $t
      },
    }
  },
  computed: {
  },
  methods: {
    login: function () {
      let email = this.email;
      let password = this.password;
      this.$store.dispatch('auth', { email, password })
          .then(() => this.$router.push('/'))
          .catch(() => this.alertDlg = true);
    }
  }
}
</script>

<style scoped>
@Media screen and (max-width: 500px) {
  .login {
    width: 93%;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 100px;
    padding: 25px;
    text-align: center;
  }
  h1{
    font-size: 19px;
    margin-bottom: 20px;
  }
  .v-alert{
    font-size: 14px;
  }
}

@Media screen and (min-width:500px) {
  .login {
    width: 600px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 25px;
    text-align: center;
  }
}
</style>
