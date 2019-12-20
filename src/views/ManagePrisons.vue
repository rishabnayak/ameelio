<template>
  <div>
    <v-container>
      <h1>Manage Prisons</h1>
      <br />
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="6">
            <v-card outlined tile>
              <v-card-title>
                Prisons
                <v-spacer></v-spacer>
              </v-card-title>
              <v-data-table
                :headers="prisonHeaders"
                :items="prisons"
                :items-per-page="5"
                class="elevation-1"
              >
              </v-data-table>
            </v-card>
            <br />
            <v-card outlined tile>
              <v-card-title>
                Admins
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Add Admin </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              :items="admins"
                              item-text="name"
                              item-value="uid"
                              label="Admin Name*"
                              v-model="admin"
                              :rules="adminRules"
                              required
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false"
                        >Close</v-btn
                      >
                      <v-btn
                        type="submit"
                        color="blue darken-1"
                        class="mr-4"
                        @click.stop="addAdmin"
                        :disabled="admin == null"
                        >Add Admin</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :admins="admins"
                :items-per-page="5"
                class="elevation-1"
              >
                <template slot="admins" slot-scope="props">
                  <tr>
                    <td>{{ props.admin.name }}</td>
                    <td class="text-m-right">{{ props.admin.name }}</td>
                    <td class="text-m-right">{{ props.admin.phone }}</td>
                  </tr>
                </template>
                <v-alert
                  slot="no-results"
                  :value="true"
                  color="error"
                  icon="warning"
                >
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="5">
            <v-card outlined tile>
              <v-card-title>
                Inmates
                <v-spacer></v-spacer>
                <v-text-field
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  v-model="search"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                v-model="selected"
                :search="search"
                :headers="headers"
                :admins="admins"
                :items-per-page="5"
                class="elevation-1"
              >
                <template slot="admins" slot-scope="props">
                  <tr>
                    <td>{{ props.admin.name }}</td>
                    <td class="text-m-right">{{ props.admin.name }}</td>
                    <td class="text-m-right">{{ props.admin.phone }}</td>
                  </tr>
                </template>
                <v-alert
                  slot="no-results"
                  :value="true"
                  color="error"
                  icon="warning"
                >
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import SideBar from "../components/Sidebar";
import { db } from "@/main";

export default {
  name: "manageprisons",
  components: {
    SideBar
  },
  mounted() {
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().role != "Inmate" && doc.data().role != "Admin") {
            this.admins.push({
              name: doc.data().displayName,
              uid: doc.data().uid
            });
          }
        });
      });
  },
  methods: {
    async addAdmin() {
      this.dialog = false;
      await db.collection("users")
        .doc(this.admin)
        .update({
          role: "Admin"
        });
      this.admin = null;
    }
  },
  data() {
    return {
      admins: [],
      adminRules: [val => !!val || "Select a User"],
      prisons: [],
      dialog: false,
      isExpanded: false,
      search: "",
      admin: null,
      selected: null,
      prisonHeaders: [
        {
          text: "Prison",
          value: "location"
        }
      ],
      headers: [
        {
          text: "Prison",
          value: "prison"
        },
        {
          text: "Address",
          value: "address"
        }
      ]
    };
  }
};
</script>
