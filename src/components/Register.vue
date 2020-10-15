<template>
  <v-form class="register" v-model="isValid" @submit.prevent="register">
    <h1>{{ $t("register.message") }}</h1>
    <v-text-field
        v-model="firstName"
        :rules="[rules.required]"
        name="prenom"
        label="Prénom"
    ></v-text-field>
    <v-text-field
        v-model="lastName"
        :rules="[rules.required]"
        name="nom"
        label="Nom"
    ></v-text-field>
    <v-text-field
        v-model="mail"
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
    <v-text-field
        v-model="password_confirmation"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min, (password === password_confirmation) || 'Password must match']"
        :type="show2 ? 'text' : 'password'"
        name="password"
        label="Confirmation du mot de passe"
        hint="At least 6 characters"
        counter
        @click:append="show2 = !show2"
    ></v-text-field>
    <v-btn type="submit" :disabled="!isValid">
      {{ $t("register.message") }}
    </v-btn>
  </v-form>
</template>


<script>
export default {
  data(){
    return {
      firstName : "",
      lastName: "",
      mail : "",
      password : "",
      password_confirmation : "",
      show1: false,
      show2: false,
      isValid: true,
      rules: {
        required: v => !!v || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        validEmail: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid'
      },
    }
  },
  methods: {
    register: function () {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mail: this.mail,
        password: this.password,
      }
      this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>


<style scoped>
.register {
  width: 600px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 25px;
  text-align: center;
}

</style>
