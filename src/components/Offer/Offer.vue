<template>
	<div id="BreadcrumbBox">
		<Breadcrumb></Breadcrumb>
		<div class="bgFFFbox">
			<table class="table">
			     <thead>
				     <tr>
				         <th>姓名</th>
				         <th>身份证号</th>
				         <th>手机号</th>
				         <th>学历</th>
				         <th>员工状态</th>
				         <th>创建日期</th>
				         <th class="border-R-e5">操作</th>
				     </tr>
			     </thead>
			     <tbody>
			 		<tr v-for="offerItem in offerLists">
			            <td>{{ offerItem.name }}</td>
			            <td>{{ offerItem.cardId }}</td>
			            <td>{{ offerItem.phone }}</td>
			            <td>{{ offerItem.edu }}</td>
			            <td>{{ offerItem.status }}</td>
			            <td>{{ offerItem.date }}</td>
			            <td>
			                <a href="javascript:void(0)" @click="entryMember()">入职</a>
			                <a href="javascript:void(0)" @click="delMember()">删除</a>
			            </td>
			        </tr>
			     </tbody>
			</table>
			<pagination :total="total" :current-page='current' @pagechange="pagechange"></pagination>


		</div>
	</div>
</template>

<script>
import Breadcrumb from "../../components/Breadcrumb.vue";
import pagination from "../../components/pagination.vue";

export default{
	name: "v-Breadcrumb",
	data(){
		return{
			total: 150,     // 记录总条数
	        display: 5,   // 每页显示条数
	        current: 1,
			offerLists:[
				{
					name: "张毅",
					cardId: 211002188882070147,
					phone: 15811181236,
					edu: "本科",
					status: "待入职",
					date: "2017-06-02"
				},
				{
					name: "李二",
					cardId: 510325198611074119,
					phone: 15010993525,
					edu: "研究生	",
					status: "待入职",
					date: "2017-05-25"
				},
				{
					name: "张毅",
					cardId: 211002188882070147,
					phone: 15811181236,
					edu: "本科",
					status: "待入职",
					date: "2017-06-02"
				}

			]
		}
	},
	methods:{
		entryMember(){
			alert("入职")
		},
		delMember(){
			alert("删除")
		},
		pagechange(currentPage){
			console.log(currentPage)
		}
	},
	components:{
		Breadcrumb,pagination
	}
}
</script>

<style lang="scss" type="text/css" scoped="">
.bgFFFbox{
	background: #fff;
	padding: 10px;
	margin-left: -10px;
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
			    border: 1px solid #ebebeb
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
</style>