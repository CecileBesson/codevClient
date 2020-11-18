<template>
  <div>
    <!-- <div>Future popup</div> -->
    <div class="d-inline-flex pa-2 topNav" id="topLink">
      <router-link to="/messages">
        <v-icon class="mr-2">
        mdi-keyboard-backspace
        </v-icon>
      </router-link>
      <h3>{{ serviceTitle }}</h3>
    </div>
    <div id="conversationContainer">
      <div id="messageBlock">
        <div v-for="message in currentConversationMessages" :key="message.idMessage">
          <div :class="[idCurrentUser === message.idReceiver ? 'left' : 'right']">
            <pre class="messageBulle">{{ message.text }}</pre>
            <div class="date">
              {{ formatDate(message.date) }}
            </div>
          </div>
        </div>
        <div v-show="seen" id="viewBar">
          <span>{{ $t("messages.seen") }}</span>
        </div>
      </div>
      <div id="bottomContainer" class="pa-2">
        <textarea
            rows="3"
            id="textarea"
        ></textarea>
        <v-icon @click="send()" class="ml-2" role="img">
          mdi-send
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conversation",
  props: {
    idConversation: String
  },
  computed: {
    currentConversationMessages() {
      return this.$store.getters.currentConversationMessages;
    },
    idCurrentUser() {
      let conv = this.$store.getters.conversation;
      if(conv.lastToSpeak) {
        return conv.lastMessage.idSender;
      }
      return conv.lastMessage.idReceiver;
    },
    serviceTitle() {
      let conv = this.$store.getters.conversation;
      if(conv === null) {
        return "";
      }
      return conv.service.name;
    },
    seen() {
      let conv = this.$store.getters.conversation;
      if(conv === null) {
        return false
      }
      return conv.lastToSpeak && conv.lastMessage.readByReceiver;
    }
  },
  methods: {
    formatDate(date) {
      let d = new Date(date);
      let time = [
        '0' + d.getHours(),
        '0' + d.getMinutes()
      ].map(component => component.slice(-2));
      return "Le " +
          new Intl.DateTimeFormat('fr').format(d) +
          " à " +
          time.join(':');
    },
    send() {
      let text = document.getElementById("textarea").value;
      this.$store.dispatch('sendNewMessage', text).then(
          () => {
            this.$store.dispatch('getCurrentConversation', this.idConversation);
            document.getElementById("textarea").value = "";
          }
      )
    }
  },
  created() {
    this.$store.dispatch('getCurrentConversation', this.idConversation);
  },
  updated() {
      var div = document.getElementById("messageBlock");
      div.style.height = (
          window.innerHeight
          - document.getElementsByClassName("v-app-bar")[0].offsetHeight
          - document.getElementById("topLink").offsetHeight
          - document.getElementById("bottomContainer").offsetHeight) + "px";
      div.scrollTop = div.scrollHeight;

  }
}
</script>

<style scoped>
.topNav {
  width: 100%;
}
.topNav a {
  text-decoration: none !important;
}
#messageBlock {
  overflow: scroll;
  padding-top: 10px;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
#viewBar {
  position: relative;
  bottom: 20px;
  font-size: 0.8em;
  margin-left: 10px;
}
#bottomContainer .v-textarea textarea {
  font-size: 16px !important;
  line-height: 1.1rem !important;
}
.messageBulle {
  max-width: 80%;
  background-color: #2196F3;
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 10px;
  color: white;
  padding: 2px 10px;
  font-size: 1em !important;
  font-family: "Roboto", sans-serif;
  white-space: pre-wrap;
}
.date {
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  font-size: 0.6em;
}
#conversationContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#bottomContainer {
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
}
#bottomContainer textarea {
  border: 1px solid #9e9e9e;
  border-radius: 8px;
  width: 100%;
  padding: 5px;
  line-height: 1.2rem;
}
#bottomContainer textarea:focus {
  outline-color: #2196F3;
  -moz-outline-radius: 8px;
}
</style>