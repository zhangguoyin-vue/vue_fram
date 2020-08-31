<template id='abcd'>
    <div id="app" class="container is-fluid">
        <div class="tabs">
            <div v-for="(navMenu) in navMenus">
                <router-link tag="li" active-class="is-active" :to="navMenu.value">
                    <a>{{navMenu.menuNameZh}}</a>
                </router-link>
            </div>
        </div>
        <div class="column is-half">
            <transition name="component-fade" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
    define(["vju", "configs"], function(Vue, config) {
        return Vue.component("home-view", {
            template: template,
            data: function() {
                return {
                    navMenus: config.showMenus
                };
            },
            watch: {
                "$store.state.systemChange.Language_Change": function(type) {
                    var j = 0;
                },
            },

            mounted: function() {

            },
        });
    });
</script>