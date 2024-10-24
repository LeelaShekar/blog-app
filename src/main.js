import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import { createPinia } from 'pinia'; 
 


const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives
});

app.use(vuetify);
 
app.use(router)

const pinia = createPinia(); 
app.use(pinia);
app.mount('#app');

export { default as noteAppStore } from './store/store';