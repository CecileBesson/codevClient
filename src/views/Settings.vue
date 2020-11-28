<template>
  <v-form class="settings" v-model="isValid"  :key="currentUserKey" @submit.prevent="updateSettings">
    <h1>{{ $t("settings.message") }}</h1>
    <v-text-field class="small"
        v-model="currentUser.firstName"
        :rules="[rules.required]"
        name="prenom"
        label="Prénom"
    ></v-text-field>
    <v-text-field class="small"
        v-model="currentUser.lastName"
        :rules="[rules.required]"
        name="nom"
        label="Nom"
    ></v-text-field>
    <v-text-field class="small"
        v-model="currentUser.mail"
        readonly
        :rules="[rules.validEmail]"
        name="email"
        label="E-mail"
    ></v-text-field>
    <v-text-field class="small"
        type="password"
        v-model="password"
        :rules="[rules.required, rules.min]"
        name="password"
        label="Mot de passe"
        hint="At least 6 characters"
        counter
    ></v-text-field><!-- todo: use $t !-->
    <v-text-field class="small"
        type="password"
        v-model="password_confirmation"
        :rules="[rules.required, rules.min, (password === password_confirmation) || 'Password must match']"
        name="password"
        label="Confirmation du mot de passe"
        hint="At least 6 characters"
        counter
    ></v-text-field><!-- todo: use $t !-->
    <v-btn small type="submit" :disabled="!isValid">
      {{ $t("settings.submit") }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Settings",
  created(){
    this.$store.dispatch('getCurrentUser')
    .then(response => {
            this.currentUser = response;
            this.currentUserKey ++
        })
    },
  data(){
    return {
      currentUser: "",
      password : "",
      password_confirmation : "",
      isValid: true,
      currentUserKey : 1,
      rules: {
        required: v => !!v || 'Required.', // todo: use $t
        min: v => v.length >= 6 || 'Min 6 characters', // todo: use $t
        validEmail: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid' // todo: use $t
      },
    }
  },
  methods: {
    updateSettings: function () {
      let data = {
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        password: this.password,
      }
      this.$store.dispatch('updateSettings', data)
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => console.log(err)); // todo: real exception handling
    }
  }
}
</script>

<style scoped>

@Media screen and (max-width: 500px) {
.settings {
  width: 90%;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 40px;
  padding: 25px;
  text-align: center;
}
  .small{
    font-size: 16px;
    text-align: center;
  }
  h1{
    font-size: 19px;
    margin-bottom: 20px;
  }
}

@Media screen and (min-width:500px) {
  .settings {
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
