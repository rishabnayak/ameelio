<template>
    <div v-bind:style="{ background: bg, width: bgWidth, height: bgHeight }">
        <v-row>
            <v-layout row text-right>
                <v-container mt-5 mr-12>
                    <v-btn x-large text color="white" @click="signIn()">Login</v-btn>
                </v-container>
            </v-layout>
        </v-row>
        <v-row>
            <v-container>
                <v-layout
                text-center
                wrap
                >
                <!--
                <v-col>
                    <img class="ml-3 mt-11" :src="require('../assets/the-logo.png')" height="80"/>
                </v-col>
                <v-col>
                    <h1 class="font-weight-bold display-4 ma-5" style="color:white;">Connect</h1>
                </v-col>
                -->
                
                <v-col style="margin-top:90px; margin-bottom:90px">
                    <h1 class="font-weight-bold display-4 ma-5" style="color:white;"> 
                    <span><img class="pt-6" :src="require('../assets/the-logo.png')" height="80"/></span> Connect
                    </h1>
                </v-col>
                
                </v-layout>
            </v-container>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            bg: 'linear-gradient(180deg, #3DB3EE 13.54%, rgba(255, 255, 255, 0) 99.99%, rgba(64, 159, 227, 0.982353) 100%), #0AA0EA',
            bgWidth: '100%',
            bgHeight: '100%',
        }
    },
}
</script>