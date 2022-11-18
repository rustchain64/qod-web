import { Layout, UserList, AddEdit } from '@/views/users';

export default {
    path: '/users',
    component: Layout,
    children: [
        { path: '', component: UserList },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit } // do not chante this ( breaks everything )
    ]
};
