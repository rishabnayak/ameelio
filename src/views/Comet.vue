<template>
  <v-container>
    <v-row>
      <!-- <CometVideo :receiver_id=receiverUID /> -->
    </v-row>
    <v-row>
      <!-- <Chat :userUID="uid.toLowerCase()" :receiverID="receiverUID.toLowerCase()" /> -->
    </v-row>
</v-container>
</template>

<script>
// @ is an alias to /src
import { CometChat } from "@cometchat-pro/chat";
import CometVideo from '../components/Video'
import Chat from '../components/Chat'
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
      appID: '11033fd257dda26',
      receiverUID: ""
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.receiverUID = this.$route.params.uid
    let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
    CometChat.init('11033fd257dda26',cometChatSettings)
        .then(
          () => {
            console.log("Initialization completed successfully");
            //You can now call login function.
           },
           error => {
            console.log("Initialization failed with error:", error);
            //Check the reason for error and take apppropriate action.
          }
        ).then(this.logInUser).then(this.getLoggedinUser);
    
  },
  methods: {
    logInUser(){
      console.log('we are ')
      var authToken = this.user.authToken;
      // console.log('the auth token is ', authToken)
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
    },
    getLoggedInUser() {
      CometChat.getLoggedinUser().then(
        user => {
          this.username = user.name;
          this.uid = user.uid;
          console.log('the user is: ', user)
        },
        error => {
          console.log(error);
        }
      );
    },
  }
}

</script>