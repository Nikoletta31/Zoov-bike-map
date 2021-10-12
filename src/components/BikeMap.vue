<template>
  <div>
    <bike-header />
    <div style="height: 600px; width: 100%">
      <l-map
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
        class="map-style"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker
          v-for="bike in bikes"
          :key="bike.id"
          :lat-lng="bikeLocation(bike.location.coordinates)"
        >
          <l-icon
            :icon-size="dynamicSize"
            :icon-anchor="dynamicAnchor"
            :icon-url="bikeIcon(bike.service_status)"
            :popup-anchor="popupAnchor"
          >
          </l-icon>
          <l-popup>
            <div class="flex-battery">
              <div
                class="battery"
                :style="{ borderColor: batteryColor(bike.battery_level) }"
              >
                <div
                  class="battery-level"
                  :style="{
                    width: bike.battery_level + '%',
                    backgroundColor: batteryColor(bike.battery_level),
                  }"
                ></div>
              </div>
              <div class="level-text">{{ bike.battery_level }} %</div>
              <div class="serial-num">{{ bike.serial_number }}</div>
            </div>
            <div class="grey-line"></div>
            <div>
              <h2 class="bike-status mt-2">
                {{ bikeStatus(bike.service_status) }}
              </h2>
              <h2 class="bike-status mt-2">
                {{ bikeOrder(bike.in_order) }}
              </h2>
            </div>
            <div class="mt-4 buttons">
              <b-button
                size="sm"
                variant="primary"
                class="mr-2"
                :disabled="true"
                >Update state</b-button
              >
              <b-button size="sm" variant="danger" @click="deleteBike(bike)"
                >Delete bike</b-button
              >
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
  import { latLng } from "leaflet";
  import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
  import locationUse from "../assets/icons/location_in_use.png";
  import locationBusy from "../assets/icons/location_busy.png";
  import locationFree from "../assets/icons/location_free.png";
  import BikeHeader from "./BikeHeader.vue";

  export default {
    name: "Example",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LIcon,
      BikeHeader,
    },
    data() {
      return {
        zoom: 13,
        center: latLng(48.7543, 2.32013),
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        currentZoom: 11.5,
        currentCenter: latLng(48.7543, 2.32013),
        mapOptions: {
          zoomSnap: 0.5,
        },
        iconSize: 50,
        popupAnchor: [0, -40],
      };
    },
    created() {
      this.$store.dispatch("getBikes");
    },
    computed: {
      bikes() {
        return this.$store.state.bikes;
      },
      dynamicSize() {
        return [this.iconSize, this.iconSize * 1];
      },
      dynamicAnchor() {
        return [this.iconSize / 2, this.iconSize * 1];
      },
    },
    methods: {
      deleteBike(bike) {
        this.$bvModal
          .msgBoxConfirm("Are you sure you want to remove this bike?")
          .then((value) => {
            if (value === true) {
              this.$store.dispatch("deleteBike", bike);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      bikeOrder(order) {
        if (order === true) {
          return "In order";
        } else {
          return "Out of order";
        }
      },
      bikeStatus(status) {
        if (status === 1) {
          return "Availiable";
        } else if (status === 2) {
          return "Booked";
        } else {
          return "In use";
        }
      },
      batteryColor(level) {
        if (level >= 60) {
          return "rgb(137, 218, 147)";
        } else if (level < 60 && level >= 30) {
          return "rgb(233, 224, 95)";
        } else {
          return "rgb(255, 72, 72)";
        }
      },
      bikeIcon(status) {
        if (status === 1) {
          return locationFree;
        } else if (status === 2) {
          return locationBusy;
        } else {
          return locationUse;
        }
      },
      bikeLocation(location) {
        const bikeOnTheMap = [].concat(location).reverse();
        return latLng(bikeOnTheMap);
      },
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/assets/styles/bike-map.scss";
  @import "@/assets/styles/buttons.scss";
</style>
