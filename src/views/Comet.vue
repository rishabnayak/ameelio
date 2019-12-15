<template>
  <v-container>
    <v-row>
      <CometVideo ref="showVideo" :receiver_id="receiverUID" />
    </v-row>
    <v-row>
      <Chat ref="fetchChat" :userUID="uid.toLowerCase()" :receiverID="receiverUID.toLowerCase()" />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

import { CometChat } from "@cometchat-pro/chat";
import firebase from "firebase/app";
import "@firebase/functions";
import CometVideo from "../components/Video";
import Chat from "../components/Chat";

export default {
  name: "videocall",
  components: {
    CometVideo,
    Chat
  },
  data() {
    return {
      username: "",
      uid: "",
      session_id: "",
      receiver_id: null,
      error: false,
      showSpinner: false,
      incomingCall: false,
      ongoingCall: false,
      appID: "11033fd257dda26",
      receiverUID: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.receiverUID = this.$route.params.uid;
    // this.logInUser();
    let cometChatSettings = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion("us")
      .build();
    CometChat.init("11033fd257dda26", cometChatSettings)
      .then(
        () => {
          console.log("Initialization completed successfully");
          //You can now call login function.
        },
        error => {
          console.log("Initialization failed with error:", error);
          //Check the reason for error and take apppropriate action.
        }
      )
      .then(
        firebase
          .functions()
          .httpsCallable("logInCometChat")({ uid: this.user.uid })
          .then(data => {
            console.log(JSON.parse(data.data).data.authToken);
            let authToken = JSON.parse(data.data).data.authToken;
            CometChat.login(authToken).then(
              User => {
                console.log("Login successfully:", { User });
                // User loged in successfully.
              },
              error => {
                console.log("Login failed with exception:", { error });
                // User login failed, check error and take appropriate action.
              }
            );
          })
          .then(() => {
            console.log('fetching')
            this.$refs.fetchChat.getMessages();
            this.$refs.showVideo.isLoggedIn = true;
          })
      );
  },
  destroyed() {
    this.logoutUser();
    console.log("destroyed");
  },
  methods: {
    isLoggedIn() {
      CometChat.getLoggedinUser().then(
        user => {
          return true;
        },
        error => {
          return false;
        }
      );
    },
    logoutUser() {
      CometChat.logout().then(
        () => {
          //Logout completed successfully
          console.log("Logout completed successfully");
        },
        error => {
          //Logout failed with exception
          console.log("Logout failed with exception:", { error });
        }
      );
    }
  }
};
</script>