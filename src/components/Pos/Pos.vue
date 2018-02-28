<template>
	<div id="pos">
		<div class="posLeft">
			<table class="table">
			     <thead>
				     <tr>
				         <th>商品名称</th>
				         <th>商品数量</th>
				         <th>商品金额</th>
				         <th class="border-R-e5">操作</th>
				     </tr>
			     </thead>
			     <tbody>
			 		<tr v-for="myGoodItem in tableData">
			            <td>{{myGoodItem.goodsName}}</td>
			            <td>{{myGoodItem.count}}</td>
			            <td>{{myGoodItem.price}}</td>
			            <td>
			                <a href="javascript:void(0)" @click="selectGood(myGoodItem)">增加</a>
			                <a href="javascript:void(0)" @click="delSingeGood(myGoodItem)">删除</a>
			            </td>
			        </tr>
			        <tr v-show="tableData.length == 0">
			        	<td colspan="4">暂无数据~</td>
			        </tr>
			     </tbody>
			</table>
			<div class="totalMoney">
				商品总数：<span>{{totalCount}}</span>个&nbsp;&nbsp;&nbsp;&nbsp;商品总额：<span>{{totalMoney | currency}}</span>元
			</div>
			<div class="posBtn">
				<button type="button" class="btn btn-warn">挂单</button>
				<button type="button" class="btn btn-danger" @click="delGoods">删除</button>
				<button type="button" class="btn btn-success" @click="checkout">结账</button>
			</div>
		</div>

		<div class="posRight">
			<div class="posR_title">常用商品</div>
			<div class="oftenGoods">
				<a href="#" v-for="oftenGoodItem in oftenGoods" @click="selectGood(oftenGoodItem)">{{oftenGoodItem.goodsName}} <span>¥{{oftenGoodItem.price | currency }}元</span></a>
			</div>

			<div class="posR_title">
				<span v-for="(tabItem,index) in tabCons" @click="titTab(index)" :class="{active: nowIndex === index}">{{tabItem}}</span>
			</div>

			<div class="tabCon" v-show="nowIndex === 0">
				<ul>
					<li v-for="type1Item in goodType1Datas"  @click="selectGood(type1Item)">
						<p><img :src="type1Item.goodsImg"></p>
						<span>{{type1Item.goodsName}}</span>
						<em>¥{{type1Item.price | currency }}元</em>
					</li>
				</ul>
			</div>
			<div class="tabCon" v-show="nowIndex === 1">
				<ul>
					<li v-for="type2Item in goodType2Datas"  @click="selectGood(type2Item)">
						<p><img :src="type2Item.goodsImg"></p>
						<span>{{type2Item.goodsName}}</span>
						<em>¥{{type2Item.price | currency }}元</em>
					</li>
				</ul>
			</div>
			<div class="tabCon" v-show="nowIndex === 2">
				<ul>
					<li v-for="type3Item in goodType3Datas"  @click="selectGood(type3Item)">
						<p><img :src="type3Item.goodsImg"></p>
						<span>{{type3Item.goodsName}}</span>
						<em>¥{{type3Item.price | currency }}元</em>
					</li>
				</ul>
			</div>
			<div class="tabCon" v-show="nowIndex === 3">
				<ul>
					<li v-for="type4Item in goodType4Datas"  @click="selectGood(type4Item)">
						<p><img :src="type4Item.goodsImg"></p>
						<span>{{type4Item.goodsName}}</span>
						<em>¥{{type4Item.price | currency }}元</em>
					</li>
				</ul>
			</div>
		</div>
		<div id="toastCon" class="toastcon"></div>
	</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { toastFun } from "../../common/js/toast.js";

export default{
	data(){
		return{
			tabCons: ["汉堡","饮料","零食","套餐"],
			nowIndex: 0,
			tableData: [],
			goodType1Datas: [],
			goodType2Datas: [],
			goodType3Datas: [],
			goodType4Datas: [],
			oftenGoods: [],
			totalCount: 0,
			totalMoney: 0,
		}
	},
	methods:{
		//商品切换
		titTab(index){
			this.nowIndex = index
		},
		//添加商品
		selectGood(goods){
			this.totalCount=0;
			this.totalMoney= 0;
			let isHave = false;

			//判断商品是否存在左侧列表里
			for(let i=0;i<this.tableData.length;i++){
				if(this.tableData[i].goodsId == goods.goodsId){
					isHave = true;
				}
			}

			if(isHave){
				let arr = this.tableData.filter(o=>o.goodsId == goods.goodsId);
				arr[0].count++;
			}
			else{
				let newArr = {
					goodsId: goods.goodsId,
					goodsName:goods.goodsName,
					price: goods.price,
					count: 1
				}
				this.tableData.push(newArr)
			}
			this.getAllMoney();
		},
		//删除单个商品
		delSingeGood(goods){
			this.tableData = this.tableData.filter(o=> o.goodsId != goods.goodsId);
			this.getAllMoney();
		},
		//删除所有的商品
		delGoods(godds){
			this.tableData = [];
			this.totalCount = 0;
			this.totalMoney = 0;
		},
		//计算总数
		getAllMoney(){
			this.totalMoney = 0;
			this.totalCount = 0;
			if(this.tableData){
				this.tableData.forEach((element) => {
					this.totalCount += element.count;
					this.totalMoney += (element.price * element.count);
				})
			}
		},
		//结算
		checkout(){
			if(this.totalCount!=0){
				this.totalMoney = 0;
				this.totalCount = 0;
				this.tableData = [];
				toastFun("toastCon","success","感谢你支付成功~~")
			}
			else{
				toastFun("toastCon", "fail","最少需要购买一个商品~~");
			}
		}
	},
	mounted(){
		this.$nextTick(function(){
			// tab切换商品
			axios.get('http://jspang.com/DemoApi/typeGoods.php')
			.then(response=>{
				//console.log(response.data)
				this.goodType1Datas = response.data[0];
				this.goodType2Datas = response.data[1];
				this.goodType3Datas = response.data[2];
				this.goodType4Datas = response.data[3];
			}).catch(error=>{
				console.log(2)
			})

			//常用商品
			axios.get("http://jspang.com/DemoApi/oftenGoods.php")
			.then(response=>{
				this.oftenGoods = response.data;
			}).catch(error=>{
				console.log("常用商品数据忙碌，请稍后....")
			})
			
		})
	},
	filters:{
		// 格式化价格
		currency(val){
			return val.toFixed(2);
		}
	}
	
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/toast.css";
#pos{
	background: #fff;
	padding: 15px 0 15px 0;
	height: auto;
	 overflow: hidden;
	 box-sizing: border-box;

	.posLeft,.posRight{
		width: 48%;
		float: left;
		margin-left: 1%;
		box-sizing: border-box;
	}
}
.totalMoney{
	text-align: right;
	font-size: 14px;
	border-bottom: 1px solid #ececec;
	border-left: 1px solid #ececec;
	border-right: 1px solid #ececec;
	padding: 10px;
	span{
		color: #f00;
		font-size: 16px;
		font-weight: bold;
		padding: 0 5px;
	}
}
.table{
    border:1px solid #ebebeb;
    width: 100%;
    border-collapse:collapse;
    thead{
	    background:#f8f8f8;
	    tr{
	    	th{
	    		padding:10px;
			    line-height: 1.42857143;
			    vertical-align: middle;
			    border-top: 1px solid #ebebeb!important;
			    border-bottom-width: 1px;
			    font-size: 14px;
			    color: #777;
			    font-weight:bold;
			    word-break:break-all;
			    border: 1px solid #ebebeb;
			    text-align: center;
	    	}
	    }
	}
	tbody{
		tr{
			td{
	    		padding:15px 10px;
			    line-height: 1.42857143;
			    vertical-align: middle;
			    border-top: 1px solid #ebebeb;
			    border-bottom: none;
			    font-size: 14px;
			    color: #777;
			    word-break:break-all;
			    border: 1px solid #ebebeb;
			    text-align: center;
	    	}
	    	&:hover{
	    		background:#fafafa;
	    	}
		}
	}
    a{
	    color:#4d94ff;
	    margin-left:20px;
	    text-decoration:none;
	    &:hover{
	    	text-decoration:underline;
	    }
	}
	tr a:first-child{
	   margin-left:0;
	}
}
.posBtn{
	padding: 15px 0;
	text-align: right;
	.btn{
		display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    background: #fff;
	    border: 1px solid #c4c4c4;
	    color: #1f2d3d;
	    margin-left: 10px;
	    padding: 10px 15px;
	    border-radius: 4px;
	}
	.btn-warn{
		color: #fff;
	    background-color: #f7ba2a;
	    border-color: #f7ba2a;
	}
	.btn-danger{
		color: #fff;
	    background-color: #ff4949;
	    border-color: #ff4949;
	}
	.btn-success{
		color: #fff;
	    background-color: #13ce66;
	    border-color: #13ce66;
	    
	}
}
.posR_title{
	margin-top: 10px;
	padding-bottom: 5px;
	border-bottom: 1px solid #ececec;
	font-size: 14px;
	span{
		padding: 5px 15px;
		cursor: pointer;
		&.active{
			color: #fff;
	    	background-color: #4d94ff;
		}
	}
}
.tabCon{
	padding: 15px 0 15px 15px;
	ul li{
		width: 208px;
		float: left;
		margin-right: 9px;
		margin-bottom: 20px;
		p{
			display: block;
			float: left;
			width: 90px;
			height: 70px;
			overflow: hidden;
			margin-right: 15px;
		}
		span{
			display: block;
			font-size: 16px;
			font-weight: bold;
			color: #ff4949;
			margin-top: 5px;
		}
		em{
			display: block;
			font-style: normal;
			font-size: 14px;
			margin-top: 15px;
		}
		&:hover{
			background: #ececec;
			cursor: pointer;
		};
	}
}
.oftenGoods{
	padding: 15px 0;
	a{
		display: inline-block;
		padding: 4px 10px 4px 15px;
		background: #f5f5f5;
		text-decoration: none;
		color: #333;
		border: 1px dashed #ececec;
		font-size: 14px;
		margin-right: 10px;
		margin-bottom: 10px;
		span{
			color: #4d94ff;
			padding-left: 10px;
		}
		&:hover{
			background: #4d94ff;
			border: 1px solid #4d94ff;
			color: #fff;
			span{
				color: #fff
			}
		};
	}
}


</style>
