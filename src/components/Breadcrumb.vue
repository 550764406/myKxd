<template>
	<div class="breadcrumb">
		<div class="breadcrumb_left">
			<a>{{ brumbtitle }}</a>
		</div>
		<div class="breadcrumb_right">
			<span v-for="(brumbItem,index) in brumbLists" :key="index">
				<router-link :to="brumbItem.path"> {{ brumbItem.meta.breadcrumbName }}</router-link>
				<!-- <i v-if ="index !== brumbLists.length-1 ">&gt;</i> -->
			</span>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			brumbtitle: "",
			brumbLists : ""
		}
	},
	methods:{
		
		getBreadcrumb () {
	        this.brumbLists = this.$route.matched;
	        this.$route.matched.forEach((item, index) => {
	          item.meta.breadcrumbName === '首页' ? item.path = '/' : this.$route.path === item.path ? this.brumbtitle = item.meta.breadcrumbName : '';
	        })
	    }
	},
	mounted(){
		this.getBreadcrumb();
	},
    watch: {
      $route () {
        this.getBreadcrumb();
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$color-333: #333;
$color-blue: #4d94ff;
a{
	color: $color-333;
	text-decoration: none;
	&:hover{
		color: $color-blue;
	};
}
.breadcrumb{
	height: 64px;
	line-height: 64px;
	background: #fff;
	display: flex;
	position: relative;
	left: -21px;
	top: -15px;
	width: 102%;
	.breadcrumb_left{
		flex: 1;
		padding-left: 20px;
		color: $color-333;
		a{
			color: $color-333;
			text-decoration: none;
			&:hover{
				color: $color-blue;
			};
		}
	}
	.breadcrumb_right{
		padding-right: 20px;
		text-align: right;
		flex: 1;
		span {
			i{
				font-style: normal;
				color: #ccc;
				font-size: 12px;
				display: none
			}
			a{
				display:inline-block;
			    padding:0 15px;
			    font-size: 14px;
			    height:32px;
			    line-height:30px;
			    color:#777;
			    text-align: center;
			    background:#fff;
			    border-radius:2px;
			    border:1px solid #e5e5e5;
			    margin-left: 10px;
			    &:hover{
			    	display:inline-block;
				    padding:0 15px;
				    font-size: 14px;
				    height:32px;
				    line-height:30px;
				    color:#fff;
				    text-align: center;
				    background:#4d94ff;
				    border-radius:2px;
				    border:1px solid #4d94ff;
			    };
			}
		}
	}
}
</style>