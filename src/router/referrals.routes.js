import { Layout, ListView, AddReferralView, AddEditReferral, ReferralView } from '@/views/referrals';

export default {
    path: '/referrals',
    component: Layout,
    children: [
        { 
            path: '', 
            component: ListView 
        },
        { path: 'addl', component: AddReferralView },
        { path: 'edit/:id', component: AddEditReferral }, // find id to workd
        { 
            path: 'referral/:id', 
            name:'Referral', 
            component: ReferralView 
        }, 
        // this works
        // rename Referral to EditReferral or such
        { path: 'edit', component: AddReferralView } // this works
    ]
};
