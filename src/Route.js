import UserLogin from './components/UserLogin';
import FundooMain from './components/FundooHome';
import Note from './components/Note';
import Trash from './components/Trash';

export default [
    { path: '/', component: UserLogin },
    { 
        path: '/home', component: FundooMain,
        children:[
            {path: 'note',component:Note},
            {path: 'trash',component:Trash}
        ]
    }
]