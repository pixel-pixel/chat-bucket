import Vue from 'vue';
import { io } from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';

const socket = io('http://localhost:8080');

Vue.use(VueSocketIOExt, socket);
