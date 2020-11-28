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
            <v-list-item-title class="body-2">
              <v-badge
                  style="position: relative; bottom: 7px;"
                  v-if="item.action === '/messages'"
                  color="blue"
                  :content="totalMessages"
                  offset-x="-10"
                  offset-y="17"
                  :value="totalMessages > 0"
              >
                {{ item.text }}
              </v-badge>
              <span v-else>{{ item.text }}</span>
            </v-list-item-title>
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
        {icon: 'fas fa-comments', text: this.$t("drawer.mailbox"), action: '/messages'},
        {icon: 'fas fa-calendar-alt', text: this.$t("drawer.comingServices"), action: '/comingServices'},
        {icon: 'fas fa-calendar-plus', text: this.$t("drawer.offerAservice"), action: '/offerAService'},
        {icon: 'fas fa-list', text: this.$t("drawer.offeredServices"), action: '/offeredServices'},
        {icon: 'fas fa-users-cog', text: this.$t("drawer.settings"), action: '/'},
      ]
    }
  },
  methods:{
    logout: function() {
      this.$store.dispatch('logout');
      this.$router.push("/auth");
    }
  },
  computed: {
    totalMessages() {
      return this.$store.getters.totalUnreadMessages;
    }
  }
}
</script>
