<template>
  <div>
    <v-sheet height="64">
      <v-toolbar flat color="white">
        <div v-if="defaultMenu">
          <v-btn
            class=".d-none"
            color="primary"
            dark
            v-if="user.role == 'Friends and Family'"
            @click.stop="dialog = true"
            >Schedule A Call</v-btn
          >
          <v-btn
            color="primary"
            dark
            v-if="user.role == 'Friends and Family'"
            @click="contactDialog = true"
            >Add Contact</v-btn
          >
        </div>
        <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn outlined v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-dialog v-model="contactDialog" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent="addCon">
            <div>
              <h2 id="addContactTitle">Inmate Information</h2>
            </div>
            <v-text-field
              v-model="firstname"
              type="text"
              label="First Name"
              placeholder="John"
            ></v-text-field>
            <v-text-field
              v-model="lastname"
              type="text"
              label="Last Name"
              placeholder="Doe"
            ></v-text-field>
            <v-text-field
              v-model="inmateID"
              type="text"
              label="Inmate ID"
              placeholder="123456789"
            ></v-text-field>
            <v-text-field
              v-model="birthdate"
              type="date"
              label="Birth Date"
            ></v-text-field>
            <label>Place of Incarceration</label>
            <v-select
              :items="prisons"
              v-model="location"
              label="Select the prison (required)"
            ></v-select>
            <v-text-field
              v-model="race"
              type="text"
              label="Race"
            ></v-text-field>
            <label for="sex">Sex</label>
            <v-radio-group v-model="sex" row>
              <v-radio label="Female" value="fem"></v-radio>
              <v-radio label="Male" value="mal"></v-radio>
            </v-radio-group>
            <v-btn
              type="submit"
              color="primary"
              class="mr-4"
              @click.stop="contactDialog = false"
              :disabled="
                firstname == null ||
                  lastname == null ||
                  inmateID == null ||
                  birthdate == null ||
                  location == null ||
                  race == null ||
                  sex == null
              "
              >Submit</v-btn
            >
            <!-- <v-btn type="submit" @click.stop="contactDialog = false" :disabled= "firstname == null || ">Submit</v-btn> -->
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-container>
          <v-form @submit.prevent="addEvent">
            <v-select
              :items="contacts"
              item-text="name"
              item-value="uid"
              v-model="name"
              label="Select a person from your contacts (required)"
            ></v-select>
            <v-text-field
              v-model="start"
              type="date"
              label="Date (required)"
            ></v-text-field>
            <v-row justify="center">
              <v-time-picker
                v-model="startTime"
                :landscape="$vuetify.breakpoint.smAndUp"
                :allowed-hours="allowedHours"
                :allowed-minutes="m => m % 30 === 0"
                class="mt-4"
                scrollable
                min="8:00"
                max="22:00"
              ></v-time-picker>
            </v-row>
            <v-btn
              type="submit"
              color="primary"
              class="mr-4"
              @click.stop="dialog = false"
              :disabled="name == null || start == null || startTime == null"
              >create event</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :event-margin-bottom="3"
        :now="today"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="updateRange"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" :width="350" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn color="secondary" dark @click="checkCalls(selectedEvent)"
              >Join a Call</v-btn
            >
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>
<script>
import { db } from "@/main";
import firebase from "firebase/app";
import { log } from "util";

export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month"
    },
    pastEvents: [],
    contacts: [],
    name: null,
    color: "#1976D2",
    start: null,
    startTime: null,
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    contactDialog: false,
    prisons: [],
    firstname: null,
    lastname: null,
    inmateID: null,
    birthdate: null,
    location: null,
    race: null,
    sex: null
  }),
  mounted() {
    this.getEvents();
    this.getPrison();
    for (let index = 0; index < this.user.contactList.length; index++) {
      const element = this.user.contactList[index];
      db.collection("users")
        .doc(element)
        .get()
        .then(doc => {
          this.contacts.push({
            name: doc.data().displayName,
            uid: doc.data().uid
          });
        });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    },
    defaultMenu() {
      return !(this.$route.name === "admin");
    }
  },
  methods: {
    async getPrison() {
      let snapshot = await db.collection("users").get();
      snapshot.forEach(doc => {
        if (doc.data().location) {
          this.prisons.push(doc.data().location);
        }
      });
    },
    async addCon() {
      if (
        this.firstname &&
        this.lastname &&
        this.inmateID &&
        this.birthdate &&
        this.location &&
        this.race &&
        this.sex
      ) {
        let inmateDetails = await db
          .collection("users")
          .where("inmateID", "==", this.inmateID)
          .get();
        if (inmateDetails.empty) {
          return;
        } else {
          let adminDetails = await db
            .collection("users")
            .where("location", "==", inmateDetails.docs[0].data().location)
            .where("role", "==", "Admin")
            .get();
          if (adminDetails.empty) {
            return;
          } else {
            for (let index = 0; index < adminDetails.size; index++) {
              db.collection("users")
                .doc(adminDetails.docs[index].data().uid)
                .update({
                  contactRequests: firebase.firestore.FieldValue.arrayUnion({
                    inmateUID: inmateDetails.docs[0].data().uid,
                    familyUID: this.user.uid
                  })
                });
            }
            return;
          }
        }
      }
      return;
    },

    checkCalls(selectedEvent) {
      this.$router.push({
        name: "videocall",
        params: { uid: selectedEvent.uid }
      });
    },

    allowedHours: v => v,

    async getEvents() {
      this.events = this.user.calEvent;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    async addEvent() {
      if (this.name && this.start && this.startTime) {
        db.collection("users")
          .doc(this.name)
          .get()
          .then(doc => {
            let userEvent = {
              name: doc.data().displayName,
              uid: this.name,
              start: this.start,
              startTime: this.startTime,
              color: "blue"
            };

            let inmateEvent = {
              name: this.user.displayName,
              uid: this.user.uid,
              start: this.start,
              startTime: this.startTime,
              color: "blue"
            };

            db.collection("users")
              .doc(this.user.uid)
              .update({
                calEvent: firebase.firestore.FieldValue.arrayUnion(userEvent)
              });

            db.collection("users")
              .doc(this.name)
              .update({
                calEvent: firebase.firestore.FieldValue.arrayUnion(inmateEvent)
              });

            this.getEvents();
            (this.name = ""), (this.start = ""), (this.startTime = "");

            alert("Succeessfully added");
          });
      }
    },
    editEvent(ev) {
      this.currentlyEditing = ev.id;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  }
};
</script>

<style>
#addContactTitle {
  margin-bottom: 30px;
}
 .v-input--selection-controls__input input[role=radio]{
  opacity: 1;
}
</style>
