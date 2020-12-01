<template>
  <v-form class="register" v-model="isValid" @submit.prevent="register">
    <h1>{{ $t("register.message") }}</h1>
    <v-text-field
        v-show="!registered"
        v-model="firstName"
        :rules="[rules.required]"
        name="prenom"
        label="Prénom"
    ></v-text-field>
    <v-text-field
        v-show="!registered"
        v-model="lastName"
        :rules="[rules.required]"
        name="nom"
        label="Nom"
    ></v-text-field>
    <v-text-field
        v-show="!registered"
        v-model="mail"
        :rules="[rules.validEmail]"
        name="email"
        label="E-mail"
    ></v-text-field>
    <v-text-field
        v-show="!registered"
        type="password"
        v-model="password"
        :rules="[rules.required, rules.min]"
        name="password"
        label="Mot de passe"
        hint="At least 6 characters"
        counter
    ></v-text-field><!-- todo: use $t !-->
    <v-text-field
        v-show="!registered"
        type="password"
        v-model="password_confirmation"
        :rules="[rules.required, rules.min, (password === password_confirmation) || 'Password must match']"
        name="password"
        label="Confirmation du mot de passe"
        hint="At least 6 characters"
        counter
    ></v-text-field><!-- todo: use $t !-->

    <v-alert v-if="alertDlg!=null" color="cyan"
             border="left"
             elevation="2"
             colored-border>
      {{ alertDlg }}
    </v-alert>

    <p v-if="registered" style="text-align: justify">
      {{ $t("register.registred") }}
    </p>

    <v-btn v-show="!registered" type="submit" :disabled="!isValid">
      {{ $t("register.message") }}
    </v-btn>
  </v-form>
</template>


<script>
export default {
  data(){
    return {
      alertDlg: null,
      registered: false,
      firstName : "",
      lastName: "",
      mail : "",
      password : "",
      password_confirmation : "",
      isValid: true,
      rules: {
        required: v => !!v || 'Required.', // todo: use $t
        min: v => v.length >= 6 || 'Min 6 characters', // todo: use $t
        validEmail: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid' // todo: use $t
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
      this.alertDlg = null;
      this.$store.dispatch('register', data)
          .then(() => {
            this.registered = true;
          })
          .catch(err => {
            if(err.response.status === 400) {
              this.alertDlg = err.response.data.detailedMessage;
            }
          });
    }
  }
}
</script>


<style scoped>
@Media screen and (max-width: 500px) {
  .register {
    width: 90%;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 50px;
    padding: 25px;
    text-align: center;
  }
  h1{
    font-size: 19px;
    margin-bottom: 20px;
  }
}

@Media screen and (min-width:500px) {
  .register {
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
