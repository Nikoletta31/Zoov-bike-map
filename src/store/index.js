import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const base_url = "https://615eef55af36590017204688.mockapi.io/bikes";

export default new Vuex.Store({
  state: {
    bikes: [],
  },

  actions: {
    /* API GET call request */

    async getBikes({ commit }) {
      try {
        const response = await axios.get(base_url);
        commit("SET_BIKES", response.data.bikes);
      } catch (error) {
        console.log(error);
      }
    },

    /* API POST call request */

    async addNewBike({ commit }, bike) {
      try {
        const response = await axios.post(base_url, bike);
        commit("ADD_BIKE", response.data);
        alert("The bike has been successfully added!");
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    /* API DELETE call request */

    async deleteBike({ commit }, bike) {
      try {
        await axios.delete(`${base_url}/${bike.id}`);
        commit("DELETE_BIKE", bike);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_BIKES(state, bikes) {
      state.bikes = bikes;
    },
    ADD_BIKE(state, bike) {
      state.bikes.push(bike);
    },
    DELETE_BIKE(state, bike) {
      const findBike = state.bikes.findIndex((c) => c.id == bike.id);
      state.bikes.splice(findBike, 1);
    },
  },
  modules: {},
});
