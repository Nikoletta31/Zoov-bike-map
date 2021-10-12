<template>
  <div>
    <div>
      <h1 class="header">Check out our bikes</h1>
    </div>
    <div class="d-flex justify-content-center bike-style">
      <div
        class="d-flex justify-content-center align-items-center flex-column m-4"
      >
        <img
          :src="require(`../assets/icons/location_in_use.png`)"
          class="bike-icon"
        />
        <p>In use</p>
      </div>
      <div
        class="d-flex justify-content-center align-items-center flex-column m-4"
      >
        <img
          :src="require(`../assets/icons/location_busy.png`)"
          class="bike-icon"
        />
        <p>Booked</p>
      </div>
      <div
        class="d-flex justify-content-center align-items-center flex-column m-4"
      >
        <img
          :src="require(`../assets/icons/location_free.png`)"
          class="bike-icon"
        />
        <p>Availiable</p>
      </div>
    </div>
    <p class="header">Or</p>
    <b-button size="lg" variant="light" class="mb-5" @click="openAddModal()"
      >Add new bike</b-button
    >
    <modal-add-bike />
  </div>
</template>

<script>
  import ModalAddBike from "./ModalAddBike.vue";

  export default {
    name: "Home",
    data() {
      return {};
    },
    components: {
      ModalAddBike,
    },
    methods: {
      openAddModal() {
        this.$bvModal.show("modal-add");
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/assets/styles/bike-header.scss";
</style>
