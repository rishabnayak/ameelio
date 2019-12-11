<template>
  <div class="home">
   

    <div class="form-group">
      <div v-if="incomingCall">
        <div id="callScreen"></div>
        <v-btn @click="acceptCall">Accept Call</v-btn>
        <v-btn @click="rejectCall">Reject Call</v-btn>
      </div>

      <div v-else-if="ongoingCall">
        <div id="callScreen"></div>
        <v-btn>Ongoing Call ...</v-btn>
      </div>

      <!-- <v-container  > -->
        <v-container id="noCall" bg fill-height grid-list-md v-else>
          <v-layout row wrap align-center >
            <v-flex>
              <v-btn id="callButton" color="error" @click="startVideoChat" >
                Start Call
                <span v-if="showSpinner" class="fa fa-spin fa-spinner"></span>
              </v-btn>
            </v-flex>
          </v-layout>
        <!-- </v-container> -->
      </v-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { CometChat } from "@cometchat-pro/chat";
export default {
  name: "Video",
  props: {
    receiver_id: String
  },
  data() {
    return {
      session_id: "",
      error: false,
      showSpinner: false,
      incomingCall: false,
      ongoingCall: false,
      appID: "11033fd257dda26",
      onCall: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    let globalContext = this;
    var listnerID = "UNIQUE_LISTENER_ID";
    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived(call) {
          console.log("Incoming call:", call);
          globalContext.incomingCall = true;
          globalContext.session_id = call.sessionId;
          this.onCall = true;
        },
        onOutgoingCallAccepted(call) {
          console.log("Outgoing call accepted:", call);
          globalContext.ongoingCall = true;
          CometChat.startCall(
            call.sessionId,
            document.getElementById("callScreen"),
            new CometChat.OngoingCallListener({
              onUserJoined: user => {
                /* Notification received here if another user joins the call. */
                console.log("User joined call:", user);
                /* this method can be use to display message or perform any actions if someone joining the call */
              },
              onUserLeft: user => {
                /* Notification received here if another user left the call. */
                console.log("User left call:", user);
                /* this method can be use to display message or perform any actions if someone leaving the call */
              },
              onCallEnded: call => {
                globalContext.ongoingCall = false;
                globalContext.incomingCall = false;
                /* Notification received here if current ongoing call is ended. */
                console.log("Call ended:", call);
                /* hiding/closing the call screen can be done here. */
              }
            })
          );
          this.onCall = true;
          // Outgoing Call Accepted
        },
        onOutgoingCallRejected(call) {
          console.log("Outgoing call rejected:", call);
          this.incomingCall = false;
          this.ongoingCall = false;
          // Outgoing Call Rejected
          this.onCall = false;
        },
        onIncomingCallCancelled(call) {
          console.log("Incoming call calcelled:", call);
          this.onCall = false;
        }
      })
    );
  },
  methods: {
    startVideoChat() {
      if (!this.receiver_id) this.error = true;
      this.showSpinner = true;
      var receiverID = this.receiver_id;
      var callType = CometChat.CALL_TYPE.VIDEO;
      var receiverType = CometChat.RECEIVER_TYPE.USER;
      var call = new CometChat.Call(receiverID, callType, receiverType);
      CometChat.initiateCall(call).then(
        outGoingCall => {
          this.showSpinner = false;
          console.log("Call initiated successfully:", outGoingCall);
          // perform action on success. Like show your calling screen.
        },
        error => {
          console.log("Call initialization failed with exception:", error);
        }
      );
    },
    acceptCall() {
      let globalContext = this;
      this.ongoingCall = true;
      this.incomingCall = false;
      var sessionID = this.session_id;
      CometChat.acceptCall(sessionID).then(
        call => {
          console.log("Call accepted successfully:", call);
          console.log("call accepted now....");
          // start the call using the startCall() method
          console.log(globalContext.ongoingCall);
          CometChat.startCall(
            call.sessionId,
            document.getElementById("callScreen"),
            new CometChat.OngoingCallListener({
              onUserJoined: user => {
                /* Notification received here if another user joins the call. */
                console.log("User joined call:", user);
                /* this method can be use to display message or perform any actions if someone joining the call */
              },
              onUserLeft: user => {
                /* Notification received here if another user left the call. */
                console.log("User left call:", user);
                /* this method can be use to display message or perform any actions if someone leaving the call */
              },
              onCallEnded: call => {
                /* Notification received here if current ongoing call is ended. */
                console.log("Call ended:", call);
                globalContext.ongoingCall = false;
                globalContext.incomingCall = false;
                /* hiding/closing the call screen can be done here. */
                this.onCall = false;
              }
            })
          );
        },
        error => {
          console.log("Call acceptance failed with error", error);
          // handle exception
        }
      );
    },
    rejectCall() {
      var sessionID = this.session_id;
      var globalContext = this;
      var status = CometChat.CALL_STATUS.REJECTED;
      CometChat.rejectCall(sessionID, status).then(
        call => {
          console.log("Call rejected successfully", call);
          globalContext.incomingCall = false;
          globalContext.ongoingCall = false;
          globalContext.receiver_id = "";
        },
        error => {
          console.log("Call rejection failed with error:", error);
        }
      );
    }
  }
};
</script>
<style scoped>

.home{
  width: 100%;
}

#callScreen {
  width: 100%;
  height: 100vh;
}
#noCall {
  height: 100vh;
  width: 100%;
}
#callButton {
  margin: auto;
}
</style>