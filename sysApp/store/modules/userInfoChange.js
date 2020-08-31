define(function () {
    'use strict';

    return {
        namespaced: true,
        state: {
            isUserLogin: false,
        },
        getters: {
            getIsUserLogin: state => {
                return state.isUserLogin
            },
        },
        mutations: {
            setIsUserLogin(state, ve) {
                state.isUserLogin = ve
            }
        },
    }
});

