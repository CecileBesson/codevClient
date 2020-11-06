<template>
  <div>
    <v-app-bar dark
               src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-app-bar-nav-icon>
      <h3 @click="goHome" class="white--text">{{$t("title")}}</h3>
    </v-app-bar>

    <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" clipped fixed app >
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
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>
