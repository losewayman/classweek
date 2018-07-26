import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main.vue'
import Editor from '../components/editor.vue'
import homepage from '../components/homepage.vue'
import draft from '../components/draft.vue'
import update from '../components/update.vue'
import collection from '../components/collection.vue'
import peoplewrite from '../components/peoplewrite.vue'
import notFound from '../components/notFound.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/main' },
        {
            path: '/main',
            component: main,
            children: [
                { name: 'editor', path: '/editor', component: Editor },
                { name: 'homepage', path: '/homepage', component: homepage },
                { name: 'collection', path: '/collection', component: collection },
                { name: 'update', path: '/update', component: update },
                { name: 'draft', path: '/draft', component: draft },
                { name: 'peoplewrite', path: '/peoplewrite', component: peoplewrite },

            ]
        },
        { path: '*', component: notFound },
    ]
})