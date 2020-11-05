<template>
  <div>
    <v-app-bar dark
               prominent
               src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="goHome" class="white--text">{{$t("title")}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="goAuth">fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" clipped fixed app >
      <myContentDrawer />
    </v-navigation-drawer>
  </div>
</template>

<script>
import myContentDrawer from "@/components/Drawer"

export default {
  name: 'myToolbar',
  components: {myContentDrawer},
  data: function () {
    return {
      drawer: false
    }
  },
  methods: {
    goHome () {
      this.$router.replace('/');
    },
    goAuth() {
      this.$store.dispatch("logout").then(() => console.log("youhou")); // todo: remove that because must use drawer link
    }
  }
}
</script>
