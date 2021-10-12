<template>
  <div>
    <b-modal
      id="modal-add"
      class="modal-style"
      :hide-header="true"
      :hide-footer="true"
    >
      <b-form @submit.prevent="onSubmit()" class="form-style">
        <b-form-group
          class="label-name"
          id="serial-group"
          label="Serial Number:"
          label-for="serial"
        >
          <b-form-input
            id="serial"
            v-model="bike.serial_number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="label-name"
          id="battery-group"
          label="Battery Level:"
          label-for="battery"
          prepend="%"
        >
          <b-form-input
            id="battery"
            v-model.number="bike.battery_level"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="label-name"
          id="status-group"
          label="Location:"
          label-for="status"
        >
          <b-form-select
            id="status"
            v-model="bike_location"
            :options="stations"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group
          class="label-name"
          id="status-group"
          label="Status:"
          label-for="status"
        >
          <b-form-select
            id="status"
            v-model="bike.service_status"
            :options="options"
            required
          ></b-form-select>
        </b-form-group>
        <div align="center">
          <b-button type="submit" variant="primary" size="lg">Submit</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    data() {
      return {
        bike: {
          serial_number: "",
          location: {
            type: "Point",
            coordinates: [],
          },
          in_order: true,
          service_status: null,
          battery_level: null,
        },
        bike_location: null,
        options: [
          { value: 1, text: "Free" },
          { value: 2, text: "Booked" },
          { value: 3, text: "In use" },
        ],
        stations: [
          { value: 1, text: "Antony" },
          { value: 2, text: "Montrouge" },
          { value: 3, text: "Sceaux" },
        ],
      };
    },
    methods: {
      addCoordinates() {
        if (this.bike_location === 1) {
          this.bike.location.coordinates.push("2.302553");
          this.bike.location.coordinates.push("48.759255");
        } else if (this.bike_location === 2) {
          this.bike.location.coordinates.push("2.317384");
          this.bike.location.coordinates.push("48.816363");
        } else if (this.bike_location === 3) {
          this.bike.location.coordinates.push("2.295092");
          this.bike.location.coordinates.push("48.778016");
        }
      },
      onSubmit() {
        this.$bvModal.hide("modal-add");
        this.addCoordinates();
        this.$store.dispatch("addNewBike", this.bike);
        this.bike = {};
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/assets/styles/bike-modal-add.scss";
</style>
