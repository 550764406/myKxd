<template>
	<div id="LeftMenuBox">
		<ul>
			<li v-for="(menuItem,index) in menuDatas" :class="menuItem.menuIcon">
				<router-link :to="menuItem.url" tag="a">{{ menuItem.menuText }}</router-link>
			</li>
			
		</ul>
	</div>
</template>

<script>
export default{
	name: "LeftMenuBox",
	data(){
		return{
			menuDatas:[
				{
					menuIcon: "icon1",
					menuText: "扫码入职",
					url: "/Offer"
				},
				{
					menuIcon: "icon2",
					menuText: "员工管理",
					url: "/Staff"
				},
				{
					menuIcon: "icon3",
					menuText: "工资管理",
					url: "/Pay"
				},
				{
					menuIcon: "icon4",
					menuText: "pos管理",
					url: "/Pos"
				},
				{
					menuIcon: "icon5",
					menuText: "审批管理" ,
					url: "/Apply"
				},
				{
					menuIcon: "icon6",
					menuText: "待办事项" ,
					url: "/Todo"
				},{
					menuIcon: "icon7",
					menuText: "考勤管理" ,
					url: "/Attendance"
				}

			]
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$height_48: 48px;
$light_blue: #20A0FF;
$color_FFF: #fff;
#LeftMenuBox{
	width: 190px;
	float: left;
	background: $color_FFF;
	height: 100%;
	position: fixed;
	left: 0;
	top: 64px;
	z-index: 199;
	box-shadow: 2px 2px 5px #e6e9ed;
	ul{
		li{
			height: $height_48;
			background: $color_FFF;
			line-height: $height_48;
			text-indent:  60px;
			border-left: 3px solid $color_FFF;
			&.icon1{
				background: url(../assets/leftMenu/index_offer.png) no-repeat 25px center;
				&:hover{
					background: url(../assets/leftMenu/index_offer.png) no-repeat 25px center #f2f2f2;
				};
			}
			&.icon2{
				background: url(../assets/leftMenu/index_staff.png) no-repeat 25px center;
				&:hover{
					background: url(../assets/leftMenu/index_staff.png) no-repeat 25px center #f2f2f2;
				}
			}
			&.icon3{
				background: url(../assets/leftMenu/index_recruit.png) no-repeat 25px center;
				&:hover{
					background: url(../assets/leftMenu/index_recruit.png) no-repeat 25px center #f2f2f2;
				}
			}
			&.icon4{
				background: url(../assets/leftMenu/index_notice.png) no-repeat 25px center;
				&:hover{
					background: url(../assets/leftMenu/index_notice.png) no-repeat 25px center #f2f2f2;
				}
			}
			&.icon5{
				background: url(../assets/leftMenu/index_flow.png) no-repeat 25px center;
				&:hover{
					background: url(../assets/leftMenu/index_flow.png) no-repeat 25px center #f2f2f2;
				}
			}
			&.icon6{
				background: url(../assets/leftMenu/index_waitDo.png) no-repeat 25px center;
				&:hover{
					background: url(../assets/leftMenu/index_waitDo.png) no-repeat 25px center #f2f2f2;
				}
			}
			&.icon7{
				background: url(../assets/leftMenu/index_tip.png) no-repeat 25px center;
				&:hover{
					background: url(../assets/leftMenu/index_tip.png) no-repeat 25px center #f2f2f2;
				}
			}
			a{
				color: #333;
				text-decoration: none;
				font-size: 14px;
				&:hover{
					border-left: none;
				};
			}
		}
		:hover{
			background: #f2f2f2;
			border-left:  3px solid $light_blue;
		};

	}
}
</style>