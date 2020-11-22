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
        <div>
          <v-btn
            small
            rounded
            color="primary"
            v-show="canAskMeeting"
            class="mb-2"
          >
            {{ $t("messages.newAppointment.button") }}
            <v-icon
                right
                dark
            >
              mdi-calendar-clock
            </v-icon>
          </v-btn>
          <div v-show="hasProposedAnAppointment">
            <div v-if="lastAppointment !== null && !lastAppointment.accepted" class="d-inline-flex justify-space-between align-center pa-1">
              <p class="pa-0 ma-0">
                {{ $t("messages.appointmentAsked") }} <strong>{{ formatDateOnly(lastAppointment.date) }}</strong> {{ $t("messages.at") }} <strong>{{ lastAppointment.startHour.substr(0, 5) }}</strong>.
              </p>
              <v-btn
                  small
                  rounded
                  color="error"
                  @click="deleteAppointment"
              >
                {{ $t("messages.abort.button") }}
              </v-btn>
            </div>
            <div v-if="lastAppointment !== null && lastAppointment.accepted" class="d-inline-flex justify-space-between align-center pa-1">
              <p class="pa-0 ma-0">
                {{ $t("messages.appointmentAccepted") }} <strong>{{ formatDateOnly(lastAppointment.date) }}</strong> {{ $t("messages.at") }} <strong>{{ lastAppointment.startHour.substr(0, 5) }}</strong>.
              </p>
              <v-btn
                  small
                  rounded
                  color="error"
                  @click="deleteAppointment"
              >
                {{ $t("messages.abort.button") }}
              </v-btn>
            </div>
          </div>
          <div v-show="appointmentIsProposed">
            <div v-if="lastAppointment !== null && !lastAppointment.accepted" class="d-inline-flex justify-space-between align-center pa-1">
              <p class="ma-0 pa-0">
                {{ $t("messages.appointmentProposed") }} <strong>{{ formatDateOnly(lastAppointment.date) }}</strong> {{ $t("messages.at") }} <strong>{{ lastAppointment.startHour.substr(0, 5) }}</strong>.
              </p>
              <v-btn
                  small
                  rounded
                  color="success"
                  @click="acceptAppointment"
              >
                {{ $t("messages.accept.button") }}
              </v-btn>
            </div>
            <div v-if="lastAppointment !== null && lastAppointment.accepted" class="d-inline-flex justify-space-between align-center pa-1">
              <p class="pa-0 ma-0">
                {{ $t("messages.appointmentTaken") }} <strong>{{ formatDateOnly(lastAppointment.date) }}</strong> {{ $t("messages.at") }} <strong>{{ lastAppointment.startHour.substr(0, 5) }}</strong>.
              </p>
              <v-btn
                  small
                  rounded
                  color="error"
                  @click="deleteAppointment"
              >
                {{ $t("messages.abort.button") }}
              </v-btn>
            </div>
          </div>
        </div>
        <div id="sendMessageContainer">
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
    },
    isAsker() {
      let conv = this.$store.getters.conversation;
      if(conv === null) {
        return false
      }
      return conv.service.user.idUser !== this.idCurrentUser;
    },
    canAskMeeting() {
      if(this.isAsker) {
        const lastAppointment = this.lastAppointment;
        if(lastAppointment === null) {
          return true;
        }
        // if the last one is passed
        else if (new Date(lastAppointment.date + " " + lastAppointment.startHour) < new Date()) {
          return true;
        }
      }
      return false;
    },
    hasProposedAnAppointment() {
      if(this.isAsker) {
        const lastAppointment = this.lastAppointment;
        if(lastAppointment === null) {
          return false;
        }
        // if the last one is not passed
        else if (new Date(lastAppointment.date + " " + lastAppointment.startHour) > new Date()) {
          return true;
        }
      }
      return false;
    },
    lastAppointment() {
      let appointments = JSON.parse(JSON.stringify(this.$store.getters.appointmentsForCurrentConversation));
      if(appointments.length === 0) {
        return null;
      }
      return appointments[appointments.length-1];
    },
    appointmentIsProposed() {
      if(!this.isAsker) {
        const lastAppointment = this.lastAppointment;
        if(lastAppointment === null) {
          return false;
        }
        // the last is not passed
        else if (new Date(lastAppointment.date + " " + lastAppointment.startHour) > new Date()) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    formatDateOnly(date) {
      return (date.substr(8,2) + "/" + date.substr(5, 2) + "/" + date.substr(0,4));
    },
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
      if(text !== " " && text !== "") {
        this.$store.dispatch('sendNewMessage', text).then(
            () => {
              this.$store.dispatch('getCurrentConversation', this.idConversation);
              document.getElementById("textarea").value = "";
            }
        )
      }
    },
    deleteAppointment() {
      this.$store.dispatch('deleteAppointment', this.lastAppointment.idAppointment);
    },
    acceptAppointment() {
      this.$store.dispatch('acceptAppointment', this.lastAppointment.idAppointment);
    }
  },
  created() {
    this.$store.dispatch('getCurrentConversation', this.idConversation).then(
        () => {
          let userId;
          let conv = this.$store.getters.conversation;
          if(conv.service.user.idUser === conv.lastMessage.idSender) {
            userId = conv.lastMessage.idReceiver;
          }
          else {
            userId = conv.lastMessage.idSender;
          }
          this.$store.dispatch('loadAppointmentsForCurrentConversation', userId);
        }
    )
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
  flex-direction: column;
  align-items: center;
}
#sendMessageContainer {
  display: flex;
  align-items: center;
  width: 100%;
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