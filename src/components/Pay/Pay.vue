<template>
	<div id="pay">
		<Breadcrumb></Breadcrumb>
		<div class="carts">
			<ul>
				<li class="cartsHeader">
					<div class="cartsCheck checkbox">
					<input type="checkbox" value="guangpan" name="choose" id="checkAll" :checked="isCheckAll" @click="selectRadioAllBtn">
 						<label for="checkAll">全选</label>
					</div>
					<div class="cartsName">姓名</div>
					<div class="cartsPhone">手机号</div>
					<div class="cartsBasic">基本工资</div>
					<div class="cartsTotal">工资月份</div>
					<div class="cartsMoney">总工资</div>
					<div class="cartsDate">创建日期</div>
					<div class="cartsDo">操作</div>
				</li>
			</ul>
			<ul>
				<li v-for="(item,index) in cartLists">
					<div class="cartsCheck checkbox">
						<input type="checkbox" value="guangpan" name="choose" :id="'check'+index" :checked="item.radioCheck" @click="selectRadio(item)">
 						<label :for="'check'+index"></label>
					</div>
					<div class="cartsName">{{ item.productName }}</div>
					<div class="cartsPhone">{{ item.productPhone }}</div>
					<div class="cartsBasic">{{ item.productPrice | currency }}</div>
					<div class="cartsTotal">
						<span @click="addNum(item)">+</span>
						<input type="text" size="4" class="inputTotal" disabled :value="item.productQuentity">
						<span @click="reduceNum(item)">-</span>
					</div>
					<div class="cartsMoney"> {{ item.productPrice * item.productQuentity | currency }}</div>
					<div class="cartsDate"> {{ item.productDate }}</div>
					<div class="cartsDo" @click="openModal(item,index)">删除</div>
				</li>
			</ul>

			<ul>
				<li class="cartsFooter">
					<div class="cartsCheck checkbox">
					<input type="checkbox" value="guangpan" name="choose" id="checkAll" :checked="isCheckAll" @click="selectRadioAllBtn">
 						<label for="checkAll">全选</label>
					</div>
					
					<div class="fr w400">
						<span class="btn-primary-two marR10" @click="nextOrder">提交订单</span>
						<span class="btn-primary-two" @click="delteAllList">删除订单</span>
					</div>
				</li>
			</ul>

		</div>

		<!-- 确认删除 -->
		<div class="md-modal modal-msg md-modal-transition" :class="{'md-show': confirmModal }">
			<div class="md-modal-inner">
				<div class="md-top">
					<button class="md-close" @click="closeModal">关闭</button>
				</div>
				<div class="md-content">
					<div class="confirm-tips">
						<p>确认要删除此条信息吗?</p>
					</div>
					<div class="btn-wrap col-2">
						<button class="btn btn--m" @click="deleteItem">确定</button>
						<button class="btn btn--m btn--red" @click="closeModal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="md-overlay" v-show="confirmModal"></div>
		<div id="toastCon" class="toastcon"></div>
	</div>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
import Breadcrumb from "../Breadcrumb.vue";
import { toastFun } from "@/common/js/toast.js";

/*import jquery from "jquery";
import "../../common/jqueryconfirm/jquery-confirm.js";
import "../../common/jqueryconfirm/jquery-confirm.css";*/

export default{
	data(){
		return {
			cartLists: [],
			isCheckAll: false,
			confirmModal: false,
			delteIndex : -1,
		}
	},
	components:{
		Breadcrumb
	},
	mounted(){
		this.$nextTick(function(){
			axios.get('../data/cartData.json').then((res)=>{
					if(res.status == 200){
						var aa = eval('(' + res.data + ')');
						this.cartLists = aa.result.list
					}
				}
			).catch(function(errorObj){
				console.log("get data error...错误" );
			});
		});
	},
	methods:{
		nextOrder(obj){
			var ischeckAllListCheck = this.cartLists.some((item)=>{
				return item.radioCheck;
			})
			if(!ischeckAllListCheck){
				toastFun("toastCon", "fail","请至少选择一个呦~");
			}
			else{
				window.location.href = "/address";
			}
			
		},
		addNum(obj){
			obj.productQuentity++;
		},
		reduceNum(obj){
			if(obj.productQuentity < 2){
				obj.productQuentity = 1;
				toastFun("toastCon", "fail","最小为一个呢~");
			}
			else{
				obj.productQuentity--
			}
		},
		selectRadio(itemList){ //选择单选按钮
			if(itemList.radioCheck == undefined){
				this.$set(itemList,"radioCheck",true)
			}
			else{
				itemList.radioCheck = !itemList.radioCheck;
			}
			this.isSelectRadioAll();
		},
		selectRadioAllBtn(){
			this.selectRadio(this.cartLists);
			if(this.isCheckAll == false){
				this.isCheckAll = true;
				this.cartLists.forEach((item)=>{
					item.radioCheck = true;
				})
			}
			else{
				this.isCheckAll = false;
				this.cartLists.forEach((item)=>{
					item.radioCheck = false;
				})
			}
			
		},
		isSelectRadioAll(){
			var flag = true;
			this.cartLists.forEach((item)=>{
				if(!item.radioCheck){
					flag = false;
				}
			})
			if(!flag){
				this.isCheckAll = false;
			}
			else{
				this.isCheckAll = true;
			}
		},
		openModal(item,indexs){
			this.confirmModal = true;
			this.delteIndex = indexs;
		},
		closeModal(){
			this.confirmModal = false;
		},
		deleteItem(){
			this.cartLists.splice(this.delteIndex,1);
			this.confirmModal = false;
		},
		delteAllList(){
			var isDelteAllListCheck = this.cartLists.some((item)=>{
				return item.radioCheck;
			});
			if(!isDelteAllListCheck){
				toastFun("toastCon", "fail","请至少选择一个呦~");
			}
			else{
				this.cartLists = this.cartLists.filter((item,delindex)=>{
					return !item.radioCheck;
				})
			}
			
		}
	},
	filters:{
		currency(val){
			return "¥" + val.toFixed(2);
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/checkbox.css";
@import "../../common/modal.css";
@import "../../common/toast.css";

	.carts{
		background: #fff;
		padding: 20px;
		ul{
			border-bottom: 1px solid #ebebeb;
			li{
				font: 14px "Microsoft yahei";
				color: #777;
				text-align: center;
				clear: both;
				border: 1px solid #ebebeb;
				height: auto;
				overflow: hidden;
				border-bottom: none;
				&.cartsHeader{
					background: #f2f2f2;
					font-weight: bold;
				};
				&.cartsFooter{
					background: #f2f2f2;
					font-weight: bold;
					.fr{
						width: 400px;
						float: right;
						text-align: right;
						.marR10{
							margin-right: 10px;
						}
					}
				};
				div{
					width: 12.5%;
					float: left;
					border-right: 1px solid #ebebeb;
					padding: 10px 10px;
					height: 50px;
					box-sizing: border-box;
					&:last-child{
						border-right: none;
					}
				}
				&:hover{
					background: #f8f8f8;
				};
				.cartsTotal{
					span{
						display: inline-block;
						background: #ececec;
						padding: 5px 6px;
						margin-right: 8px;
						cursor: pointer;
					}
				}
			}
		}
	}

	.inputTotal{
		border: 1px solid #ebebeb;
		height: 28px;
		line-height: 28px;
		width: 60px;
		text-align: center;
		background: #f8f8f8;
	}

	.btn-primary-two {
		display:inline-block;
	    padding:0 20px;
	    font-size: 14px;
	    height:30px;
	    line-height:28px;
	    color:#fff;
	    text-align: center;
	    background:#4d94ff;
	    border-radius:2px;
	    border:1px solid #4d94ff;
	 }
</style>
