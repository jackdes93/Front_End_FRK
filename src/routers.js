import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '@/components/Pages/HomePage.vue';
import AboutPage from '@/components/Pages/AboutPage.vue';
import NewsPage from '@/components/Pages/NewsPage.vue';
import ContactPage from '@/components/Pages/ContactPage.vue';
import JoingningPage from '@/components/Pages/JoinningDemanPage.vue';
import LoginPage from '@/components/Pages/LoginPage.vue';
import ForgotPasswordPage from '@/components/Pages/ForgotPassword.vue';
import SignUpPage from '@/components/Pages/SignUpPage.vue';
import PriceTablePage from '@/components/Pages/PriceTablePage.vue';
import JoiningOnlinePage from '@/components/Pages/OnlineJoining.vue';
import CategoryPage from '@/components/Pages/CategoryPage.vue';
import NormalBrandPage from '@/components/Pages/NormalBrand.vue';
import UserDashBoard from '@/components/Pages/User/UserDashBoard.vue';
import ResetPasswordPage from '@/components/Pages/ResetPassword.vue'
import SearchPage from '@/components/Pages/PageSearch.vue'

import InfoUserPage from '@/components/Pages/User/ui_user/InfoUser.vue'
import YourJoiningDemand from '@/components/Pages/User/ui_user/YourJoiningDemand.vue'
import WishList from '@/components/Pages/User/ui_user/WishList.vue'
import SupportTicket from '@/components/Pages/User/ui_user/SupportTicket.vue'
import FAQ from '@/components/Pages/User/ui_user/FQA.vue'
// Brand Center
import YourBrand from '@/components/Pages/User/ui_user/YourBrand.vue'
import JoiningDemandSuggestionPage from '@/components/Pages/User/ui_user/JoiningDemandSuggestion.vue'
import CallBack from '@/components/Pages/User/ui_user/CallBackRequest.vue'
import Advertisement from '@/components/Pages/User/ui_user/AdverPage.vue'
import AdvertisementStop from '@/components/Pages/User/ui_user/Advertisements_Stop.vue'
import AdvertisementType from '@/components/Pages/User/ui_user/AdvertisementTypePage.vue'

// Admin
import AdminDashBoard from '@/components/Pages/Admin/AdminDashBoard.vue'
import Login from '@/components/Pages/Admin/Pages/Login.vue';
import AdminList from '@/components/Pages/Admin/Pages/AdminList.vue';
import MenuEditor from '@/components/Pages/Admin/Pages/MenuEditor.vue'
import FqaManagement from '@/components/Pages/Admin/Pages/FqaManagement.vue'
import SupportTicketAdmin from '@/components/Pages/Admin/Pages/SupportTicket.vue'
import UserWaitList from '@/components/Pages/Admin/Pages/UserWaitingList.vue'
import UserList from '@/components/Pages/Admin/Pages/UserList.vue';
import BrandList from '@/components/Pages/Admin/Pages/BrandList.vue';
import AdvWaitList from '@/components/Pages/Admin/Pages/AdvWaitingList.vue'
import AdvStopList from '@/components/Pages/Admin/Pages/AdvertismentStop.vue'
import AdvList from '@/components/Pages/Admin/Pages/AdvList.vue'
import AdvertisementTypePage from '@/components/Pages/Admin/Pages/AdvertisementType.vue'
import SettingPage from '@/components/Pages/Admin/Pages/SettingPage.vue'
import ReportCallBackPage from '@/components/Pages/Admin/Pages/ReportCallBack.vue'
import ReportViewBrand from '@/components/Pages/Admin/Pages/ReportViewerBrand.vue'
import ReportWishBrand from '@/components/Pages/Admin/Pages/ReportWishBrand.vue'

Vue.use(Router);
export const router = new Router ({
    // mode:'history',
    base: '/',
    linkExactActiveClass: 'active',
    routes : [
        { path: '*', redirect: '/' },
        {
            path: '/',
            name: 'HOME',
            component: HomePage
        },
        { path: '/search-key=:key', name: 'Search', component: SearchPage},
        {
            path: '/about',
            name: 'ABOUT',
            component: AboutPage
        },
        {
            path: '/news',
            name: 'NEWS',
            component: NewsPage
        },
        {
            path: '/contact',
            name: 'CONTACT',
            component: ContactPage
        },
        {
            path: '/joining-demand',
            name: 'JOINNING DEMAND',
            component: JoingningPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'LOG OUT',
            redirect: '/'
        },
        {
            path: '/signup',
            name: 'Sign Up',
            component: SignUpPage
        },
        {
            path: '/price-table',
            name: 'Price Table',
            component: PriceTablePage
        },
        {
            path: '/joining-online',
            name: 'JOINING ONLINE',
            component: JoiningOnlinePage
        }, 
        {
            path: '/forgot-password',
            component: ForgotPasswordPage
        },
        {
            path: '/manager-login',
            name: '',
            component: Login
        },
        {
            path: '/reset-password/token=:token',
            component: ResetPasswordPage
        },
        {
            path: '/user',
            component: UserDashBoard,
            children: [
                {
                    path: '/',
                    redirect: 'info-user'
                },
                {
                    path: 'info-user',
                    component: InfoUserPage
                },
                {
                    path: 'your-joining-demands',
                    component: YourJoiningDemand
                },
                {
                    path: 'wish-list',
                    component: WishList
                },
                {
                    path: 'support-ticket',
                    component: SupportTicket
                },
                {
                    path: 'faq',
                    component: FAQ
                },
                {
                    path: 'your-brand',
                    component: YourBrand
                }, 
                {
                    path: 'joining-demand-suggestion',
                    component: JoiningDemandSuggestionPage    
                }, 
                {
                    path: 'call-back-request',
                    component: CallBack    
                }, 
                {
                    path: 'advertisement',
                    component: Advertisement
                },
                {
                    path: 'advertisement-stop',
                    component: AdvertisementStop
                },
                {
                    path: 'advertisement-type',
                    component: AdvertisementType
                }
            ]
        },
        {
            path: '/manager',
            component: AdminDashBoard,
            children: [
                {
                    path: '',
                    redirect: 'admin-list',
                    component:AdminList
                },
                {
                    path: 'admin-list',
                    component:AdminList
                },
                {
                    path: 'menu-editor',
                    component:MenuEditor
                },
                {
                    path: 'fqa-management',
                    component:FqaManagement
                },
                {
                    path: 'support-center',
                    component:SupportTicketAdmin
                },
                {
                    path: 'user-waiting-list',
                    component:UserWaitList
                },
                {
                    path: 'user-list',
                    component:UserList
                },
                {
                    path: 'brand-list',
                    component: BrandList
                },
                {
                    path: 'advertising-wait-list',
                    component: AdvWaitList
                },
                {
                    path: 'advertising-stop-list',
                    component: AdvStopList
                },
                {
                    path: 'advertising-list',
                    component: AdvList
                },
                {
                    path: 'advertisement-type',
                    component:AdvertisementTypePage
                },
                {
                    path: 'settings',
                    component: SettingPage
                },
                {
                    path: 'report-call-back',
                    component: ReportCallBackPage
                },
                {
                    path: 'report-view-brand',
                    component: ReportViewBrand
                },
                {
                    path:'report-wish-brand',
                    component: ReportWishBrand
                }
            ]
        },
        {
            path: '/:category',
            name: 'Category Page',
            component: CategoryPage
        }, 
        {
            path: '/:category/:id',
            name: 'Brand Normal Page', 
            component: NormalBrandPage
        },
    ],
    scrollBehavior: function(to, from, savedPosition) {
        if (to.hash) {
            return { selector: to.hash }
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 }
        }
      }
});