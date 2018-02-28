<template>
	<div>
		<div id="RightCon" :class="[indexNav]">
			<div class="indexNav" @click="clickNav">
				<router-link to="/backhome" :class="[backhome]" @click.native.stop="click1">返回首页<span><img :src="homeIcon"></span></router-link>
				<router-link to="/Offer" active-class="aa" :class="[offer]">扫码入职 <span><img :src="offerIcon"></span></router-link>
				<router-link to="/Staff" :class="[staff]">员工管理 <span><img :src="staffIcon"></span></router-link>
				<router-link to="/Pay" :class="[pay]">工资发放 <span><img :src="payIcon"></span></router-link>
			</div>
			
			<router-view  v-if="routerShow === false"></router-view>
			<div v-else>
				<Home></Home>
		    </div>

		 </div>

		<div class="indexCon">
			<transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
				<div class="indexCon_left animated" v-show="bSign">111222</div>
			</transition>
		  	<transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
				<div class="indexCon_right animated" v-show="bSign">2222</div>
			</transition>
		</div>
	</div>
</template>

<script>
import Home from "../components/Home.vue";
export default{
	name: "v-Home",
	data(){
		return{
			bSign: false,
			routerShow: false,
			indexNav: "indexNav",
			offer: "offerName",
			staff: "staffName",
			pay: "payName",
			backhome: "backhomeName",
			offerIcon: "https://tebcms.51kxd.cn/images/offer.png",
			staffIcon: "https://tebcms.51kxd.cn/images/member.png",
			payIcon: "https://tebcms.51kxd.cn/images/pay.png",
			homeIcon: "https://tebcms.51kxd.cn/images/social.png",	
		}
	},
	methods:{
		move() {
			this.bSign = !this.bSign;
		},
		clickNav(){
			this.routerShow = false;
		},
		click1(){
			this.routerShow = true;
		}
	},
	mounted(){
		this.move();
	},
	watch:{
		'routerShow':{  //深度检测
            handler:(val,oldVal)=>{
            },
            deep:true
        },
	},
	components:{
		Home
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../assets/css/animate.css";
.indexCon{
  padding-top: 90px;
  .indexCon_left{
    width: 49%;
    float: left;
    border: 1px solid #e6e6e6;
    background: #fff;
    margin-right: 1%;
    height: 300px;
  }
  .indexCon_right{
    width: 49%;
    float: left;
    border: 1px solid #e6e6e6;
    background: #fff;
    height: 300px;
  }
}

.myAnimate{
	width: 200px;
	height: 200px;
	background: #00f;
	margin: 30px auto;
}

#RightCon{
	
}
.indexNav {
	a{
		font-size: 16px;
	    color: #fff;
	    text-decoration: none;
	    display: inline-block;
	    height: 60px;
	    border-radius: 6px;
	    line-height: 60px;
	    padding: 0 90px 0 20px;
	    margin-right: 15px;
	    position: relative;
	    &.offerName{
	    	background: url(../assets/offer_bg.png) no-repeat right top #1ab395;
	    }
	    &.staffName{
	    	background: url(../assets/social_bg.png) no-repeat right top #ec6b6b;
	    }
	    &.payName{
	    	background: url(../assets/pay_bg.png) no-repeat right top #ee853f;
	    }
	    &.backhomeName{
	    	background: url(../assets/payroll_bg.png) no-repeat right top #2ec7c9;
	    }
	    span{
	    	position: absolute;
	    	right: 10px;
	    	top: 8px;
	    }
	}
}
</style>