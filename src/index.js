import 'babel-polyfill';
import 'es6-promise';
import 'es6-object-assign';
import Vue from 'vue'
import App from 'App';
import './scss/global/global.scss';
new Vue({
    el: '#app',
    render: h=>h(App),
});