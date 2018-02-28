<template>
	<div class="mainBox">
		<div id="HeaderBox">
			<div class="logo">
				<router-link to="/Index">
					<img :src="logoMsg" alt="" height="64px">
				</router-link>
			</div>
			<div class="logoName">{{logoText}}</div>
			<div class="headerMenu">
				<a href="#" v-for="(menuRItem,index) in headerMenu">{{menuRItem}}</a>
			</div>
		</div>

		<div class="indexBox">
			<router-view></router-view>
		</div>
		
	</div>
</template>

<script>
export default{
	name: "HeaderBox",
	data(){
		return{
			logoMsg:'https://tebcms.51kxd.cn/images/logo.png',
			logoText: "机械工业集团有限责任公司海淀分公司知春里分部",
			headerMenu:["首页","员工管理","薪酬服务","企业金融服务","社保管理"]
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.indexBox{
	padding: 75px 0 0 210px;
}
#HeaderBox{
	background: #4d94ff;
	height: 64px;
	clear: both;
	box-shadow: 2px 2px 5px #e6e9ed;
	position: fixed;
	left: 0;
	z-index: 9999;
	width: 1000%;
}
.logo{
	padding: 0 0 0 20px;
	width: 180px;
	float: left;
	height: 64px;
	overflow: hidden;
}
.logoName{
	float: left;
	height: 64px;
	line-height: 64px;
	color: #fff;
	overflow: hidden
}
.headerMenu{
	text-align: right;
	line-height: 62px;
	color: #fff;
	a{
		padding: 0 15px;
		font-size: 14px;
		display: inline-block;
		color: #fff;
		text-decoration: none;
		&:hover{
			background:  #3c83ee;
		};
	}

}
</style>