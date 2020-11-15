<template>
  <div>
    <v-list dense >
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
      <v-list-item ripple @click="logout">
        <v-list-item-action>
          <v-icon>fas fa-user</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="body-2">{{ $t("drawer.logout") }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
        {icon: 'fas fa-calendar-plus', text: this.$t("drawer.offerAservice"), action: '/offerAService'},
        {icon: 'fas fa-list', text: this.$t("drawer.offeredServices"), action: '/services'},
        {icon: 'fas fa-users-cog', text: this.$t("drawer.settings"), action: '/'},
      ]
    }
  },
  methods:{
    logout: function() {
      this.$store.dispatch('logout');
      this.$router.push("/auth");
    }
  }
}
</script>
