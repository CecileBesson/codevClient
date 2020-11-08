<template>
  <div>
    <h1 class="ma-4">{{ $t("drawer.mailbox") }}</h1>
    <div class="convContainer" v-for="conversation in conversations" :key="conversation.service.idService">
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
        <p class="ma-0 text" :class="[
            conversation.unreadMessagesNumber > 0 ? 'unreadMessage' : '',
          ]">
          <strong>{{ conversation.lastToSpeak ? $t("allMessages.you") + " : " : "" }}</strong>{{ conversation.lastMessage.text }}
        </p>
      </div>
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
  overflow: hidden;
  height: 25px;
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
</style>