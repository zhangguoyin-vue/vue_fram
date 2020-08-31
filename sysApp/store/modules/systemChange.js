define(function () {
    'use strict';

    return {
        namespaced: true,
        state: {
            Page_Size_Change: { width: 0, height: 0 },
            Style_Change: "",
            isMenuOpen: false,
            Language_Change: "zh",
        },
        getters: {
            getIsMenuOpen: state => {
                return state.isMenuOpen
            },
        },
        mutations: {
            setPageSizeChange(state, ve) {
                state.Page_Size_Change = ve;
            },
            setStyleChange(state, ve) {
                state.Style_Change = ve
            },
            setIsMenuOpen(state, ve) {
                state.isMenuOpen = ve
            },
            setLanguage_Change(state, ve) {
                state.Language_Change = ve
            }
        },
    }
});

