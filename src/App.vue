<template>
  <v-app>
    <myToolbar />
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>


<script>
import myToolbar from "@/components/Toolbar";

export default {
  name: 'App',
  components: { myToolbar },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });

    if(this.$store.getters.isLoggedIn) {
      // load conversations
      this.$store.dispatch('getConversations');
      // wait for new messages
      this.$store.dispatch('subscribeToNewMessage');
    }
  }
}
</script>
