import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Offer from "@/components/Offer/Offer"
import Staff from "@/components/Staff/Staff"
import Pay from "@/components/Pay/Pay"
import Address from "@/components/Pay/Address"
import addStaff from "@/components/Staff/addStaff"
import Pos from "@/components/Pos/Pos"

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
  	{
      path: "/Index",
	  component: require('@/components/Home.vue').default
    },
    {
      path: "/",
	  component: require('@/components/Home.vue').default
    },
    {
		path: "/Offer",
		component: Offer,
		meta: {
			breadcrumbName: "扫码入职",
		},
		children: [
			{
				path: "",
				component: Offer,
				meta:{
					breadcrumbName: "入职二维码"
				},
				children: [
					{
						path: "",
						component: Offer,
						meta:{
							breadcrumbName: "定制入职表"
						}
					}
				]
			},
		]
	},
	{
		path: "/Staff",
		component: Staff,
		meta: {
			breadcrumbName: "添加员工"
		}
	},
	{
		path: "/addStaff",
		component: addStaff,
		meta: {
			breadcrumbName: "添加员工1"
		}
	},
		{
			path: "/Address",
			component: Address
		},
		{
		    path: "/Pay",
		    component: Pay,
		    meta: {
		      breadcrumbName: "工资管理"
		    }
		  },
		{
			path: "/backhome",
			component: Home
		},
		{
			path: "/Pos",
			component: Pos
		},
		/*{   path:'/user/:id',
            component:User,
            children:[
                {
                    path:'',
                    component:UserNull
                },
                {
                    path:'profile',
                    component:UserProfile
                },
                {
                    path:'posts',
                    component:UserPosts
                }
            ]
        }*/
  ]
})
