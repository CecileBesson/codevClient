<template>
  <div>
    <h1 class="ma-4">{{ $t("drawer.mailbox") }}</h1>
    <div class="convContainer" v-for="conversation in conversations" :key="conversation.service.idService">
      <router-link class="link" :to='"conversation/"+conversation.service.idService'>
        <div class="pa-3 conversationBlock">
          <v-badge
              color="blue"
              :content="conversation.unreadMessagesNumber"
              offset-x="-5"
              offset-y="17"
              class="title mb-2"
              :value="conversation.unreadMessagesNumber > 0"
          >
            {{ conversation.service.name }}
          </v-badge>
          <div class="textContainer">
            <p class="ma-0 text" :class="[
                conversation.unreadMessagesNumber > 0 ? 'unreadMessage' : '',
              ]">
              <strong>{{ conversation.lastToSpeak ? $t("allMessages.you") + " : " : "" }}</strong>{{ conversation.lastMessage.text }}
            </p>
            <v-icon class="ml-1" v-show="conversation.lastToSpeak && conversation.lastMessage.readByReceiver">
              mdi-check
            </v-icon>
          </div>
        </div>
      </router-link>
    </div>
    <p class="ml-3" v-if="conversations.length === 0">
      {{ $t("allMessages.empty") }}
    </p>
  </div>
</template>

<script>

export default {
  name: "AllMessages",
  computed : {
    conversations: function () {
      return this.$store.getters.conversations;
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 1.5em !important;
}
.text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.link {
  color: black;
  text-decoration: none;
}
.unreadMessage {
  font-weight: bold;
}
.conversationBlock {
  border-top: 1px solid #dcdcdc;
}
.convContainer:last-child div {
  border-bottom: 1px solid #dcdcdc;
}
.textContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: none !important;
}
</style>