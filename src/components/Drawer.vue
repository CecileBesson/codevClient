<template>
  <div>
    <v-toolbar dark
               src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
     />
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-divider dark v-if="item.divider" :key="i"></v-divider>
        <v-list-item ripple :to="item.action" :key="i" v-else>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-2">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'drawer',
  data: function () {
    return {
      items: [
        {icon: 'fas fa-comments', text: this.$t("drawer.mailbox"), action: '/'},
        {icon: 'fas fa-calendar-alt', text: this.$t("drawer.services"), action: '/services'},
        {icon: 'fas fa-calendar-plus', text: this.$t("drawer.offerAservice"), action: '/services'},
        {icon: 'fas fa-list', text: this.$t("drawer.offeredServices"), action: '/services'},
        {icon: 'fas fa-users-cog', text: this.$t("drawer.settings"), action: '/'},
        {icon: 'fas fa-user', text: this.$t("drawer.logout"), action: 'logout'},
      ]
    }
  },
  /*methods:{
    logout: function() {
      this.$store.dispatch('logout').then(() => this.$router.push("/auth"));
    }
  },*/
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>
