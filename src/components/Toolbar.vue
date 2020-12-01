<template>
  <div>
    <v-app-bar dark
               clipped-left app
               @click="goHome"
               src="@/assets/BanCodev.png">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-app-bar-nav-icon>
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
      this.$router.replace('/').catch(
          () => {
            // don't print redundant navigation message in console if we're already in home
          }
      );
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>
