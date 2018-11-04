import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main.vue'
import Editor from '../components/editor.vue'
import homepage from '../components/homepage.vue'
import draft from '../components/draft.vue'
import update from '../components/update.vue'
import collection from '../components/collection.vue'
import peoplewrite from '../components/peoplewrite.vue'
import weekly from '../components/weekly.vue'
import notFound from '../components/notFound.vue'
import guanliyuan from '../components/guanli.vue'
import login from '../components/login.vue'
import message from '../components/message.vue'
import week from '../components/week.vue'
import people from '../components/people.vue'
import send from '../components/send.vue'
Vue.use(Router)


export default new Router({
    routes: [
        { path: '/', redirect: '/main' },
        { path: '/login', component:login  },
        { path: '/rooter',
         component:guanliyuan,
         children: [
            { name: 'week', path: '/week', component: week },
            { name: 'send', path: '/send', component: send },
            { name: 'people', path: '/people', component: people },
        ]
        },
        {
            path: '/main',
            component: main,
            children: [
                { name: 'editor', path: '/editor', component: Editor },
                { name: 'homepage', path: '/homepage', component: homepage },
                { name: 'collection', path: '/collection', component: collection },
                { name: 'update', path: '/update', component: update },
                { name: 'draft', path: '/draft', component: draft },
                { name: 'message', path: '/message', component: message },
                { name: 'weekly', path: '/weekly', component: weekly },
                { name: 'peoplewrite', path: '/peoplewrite', component: peoplewrite }
            ]
        },
        { path: '*', component: notFound },
    ]
})