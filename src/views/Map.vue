<template>
  <div class="about">
    <bike-map />
  </div>
</template>

<script>
  import BikeMap from "@/components/BikeMap.vue";

  export default {
    name: "Map",
    components: {
      BikeMap,
    },
  };
</script>
