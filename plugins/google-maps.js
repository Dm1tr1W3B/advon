import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA5vVFh8Z2a15TWQuUlYr0aBuovIsWRWe0",
    libraries: "places",
  }
});
