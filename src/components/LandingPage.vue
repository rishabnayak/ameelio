<template>
    <div v-bind:style="{ background: bg, width: bgWidth, height: bgHeight }">
        <v-container>
            <v-layout
            text-center
            wrap
            >

            <v-col style="margin-top:90px; margin-bottom:90px">
                <h1 class="font-weight-regular display-4 ma-5" style="color:white;">
                Ameelio <span class="font-weight-bold">Connect</span>
                </h1>
            </v-col>
            </v-layout>
        </v-container>
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