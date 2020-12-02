<template>
  <div>
    <div class="d-inline-flex pa-2 topNav" id="topLink">
      <router-link :to="'/service/' + idService">
        <v-icon class="mr-2">
          mdi-keyboard-backspace
        </v-icon>
      </router-link>
      <h3>{{ $t("createConversation.back") }}</h3>
    </div>
    <div id="conversationContainer">
      <div id="messageBlock">
        <p class="pa-0 mt-6 font-weight-bold">
          {{ $t("createConversation.start") }}
        </p>
      </div>
      <div id="bottomContainer" class="pa-2">
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
import MessagesService from "@/services/messages.service";

export default {
  name: "createConversation",
  props: {
    idService: String
  },
  computed: {
    currentService: function () {
      return this.$store.getters.currentService;
    },
  },
  methods: {
    send() {
      let text = document.getElementById("textarea").value;
      if(text !== " " && text !== "") {
        MessagesService.sendNewMessage(text, this.currentService.idService, this.currentService.user.idUser).then(
            () => {
              this.$router.push('/conversation/' + this.idService)
            }
        );
      }
    }
  },
  mounted() {
    this.$store.dispatch('getCurrentService', this.idService);

    var div = document.getElementById("messageBlock");
    div.style.height = (
        window.innerHeight
        - document.getElementsByClassName("v-app-bar")[0].offsetHeight
        - document.getElementById("topLink").offsetHeight
        - document.getElementById("bottomContainer").offsetHeight) + "px";
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
  width: 100%;
  text-align: center;
}
#bottomContainer .v-textarea textarea {
  font-size: 16px !important;
  line-height: 1.1rem !important;
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