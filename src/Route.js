import UserLogin from './components/UserLogin';
import FundooMain from './components/FundooHome';
import Note from './components/Note';
import Trash from './components/Trash';
import Archive from './components/Archive';
import Reminders from './components/Reminders'

function beforeEnter(to, from, next) {
    if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
        next({
            path: '/'
        })
    } else {
        next()
    }
}
export default [
    { path: '/', component: UserLogin },
    {
        path: '/home', component: FundooMain,
        children: [
            {
                path: 'note',
                component: Note,
                beforeEnter
            },
            {
                path: 'trash',
                component: Trash,
                beforeEnter
            },
            {
                path: 'archive',
                component: Archive,
                beforeEnter
            },
            {
                path: 'reminder',
                component: Reminders,
                beforeEnter
            },
        ]
    }
]