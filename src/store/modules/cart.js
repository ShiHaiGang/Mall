// initial state
const state = {
  number: 0,
  value: 0
};

// getters
const getters = {};

// mutations
const mutations = {
  add(state) {
    state.number++;
  },
  jian(state) {
    state.number--;
  },
  addvalue(state, argument) {
    state.value += argument;
  },
  jianvalue(state, argument) {
    state.value -= argument;
  }
};

// actions
const actions = {
  add({ commit }) {
    commit("add");
  },
  jian({ commit }) {
    commit("jian");
  },
  addvalue({ commit }, param) {
    commit("addvalue", param);
  },
  jianvalue({ commit }, param) {
    commit("jianvalue", param);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
