import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        data: [],
        names: {},
        cart: [],
        rate: 2.6,
        totalSum: 0
    },
    mutations: {
        SET_DATA_TO_STATE(state, list) {
            state.data = list;
        },
        SET_TO_CART(state, item) {
            let isYes = false;

            state.cart.forEach(el => {
                if (el.N == item.N) {
                    isYes = true;
                    el.count++;
                    item.price = (item.A.C * state.rate).toFixed(2);
                    state.totalSum += parseFloat(item.price);
                }
            });
            
            
            if (!isYes) {
                item.price = (item.A.C * state.rate).toFixed(2);
                state.totalSum += parseFloat(item.price);
                state.totalSum = state.totalSum.toFixed(2);
                state.totalSum = parseFloat(state.totalSum);
                state.cart.push(item); 
            }
            
        },
        SET_NAMES_TO_STATE(state, name) {
            let A = {};
            
            for (let gr in name) {
                for (let key in name[gr].B) {
                    state.data.forEach(el => {
                        if (key == el.T) {
                            A = el;
                        }
                    });
                    name[gr].B[key].A = A;
                    name[gr].B[key].count = 1;
                }
            }
            console.log(name);
            state.names = name;
        },
        REMOVE_FROM_CART(state, data) {
            let itemPrice = (data.A.C * state.rate * data.count).toFixed(2);
            state.totalSum -= parseFloat(itemPrice);
            let itemArray = state.cart.filter(cardItem => cardItem.A.T != data.A.T);
            
            state.cart = itemArray;
        }
    },
    actions: {
        GET_DATA_FROM_API({commit}) {
            return axios('http://localhost:3333/data', {
                method: 'GET'
            })
            .then(list => {
                commit('SET_DATA_TO_STATE', list.data.data[0].Value.Goods);
                return list.data.data[0].Value.Goods;
            })
            .catch(error => {
                console.log(error);

                return error;
            });
        },
        GET_NAMES_FROM_API({commit}) {
            return axios('http://localhost:3333/names', {
                method: 'GET'
            })
            .then(name => {
                commit('SET_NAMES_TO_STATE', name.data);
                return name.data;
            })
            .catch(error => {
                console.log(error);

                return error;
            });
        },
        ADD_TO_CART({commit}, item) {
            commit('SET_TO_CART', item);
        },
        DELETE_FROM_CART({commit}, cardItem) {
            commit('REMOVE_FROM_CART', cardItem);
        }
    },
    getters: {
        DATA(state) {
            return state.data;
        },
        NAMES(state) {
            return state.names;
        },
        CART(state) {
            return state.cart;
        },
        SUM(state) {
            return state.totalSum;
        }
    }
});

export default store;