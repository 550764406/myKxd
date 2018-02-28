<template>
	<nav>
		<ul class="pagination">
			<span>总共{{ total }}条记录</span>
			<span>当前页是: {{ current }}</span>
			<li :class="{'disabled': current ==1}" @click="setCurrent(1)">第一页</li>
			<li :class="{'disabled': current ==1}" @click="setCurrent(current-1)">上一页</li>
			<li v-for="p in groupList" :class="{ 'active': current == p.val }" @click="setCurrent(p.val)">{{p.text}}</li>
			<li :class="{'disabled': current ==page}" @click="setCurrent(current+1)">下一页</li>
			<li :class="{'disabled': current == page }" @click="setCurrent(page)">尾页</li>
		</ul>
	</nav>
</template>

<script>
export default{
	data(){
		return{
			current: this.currentPage
		}
	},
	props:{
		total: { //总页码
			type: Number,
			default: 0
		},
		display:{ //每页显示多少条
			type: Number,
			default: 10
		},
		currentPage:{ //当前页码
			type: Number,
			default: 1
		},
		pagegroup:{ //分页码条数
			type: Number,
			default: 5,
			coerce(v){
				v=v>0 ? v: 5;
				return v%2=== 1 ? v : v+1;
			}
		}
	},
	computed:{
		page(){ //获取总页数
			return Math.ceil(this.total/this.display);
		},
		groupList(){ //获取分页页码
			var len = this.page, temp=[],list=[],count=Math.floor(this.pagegroup/2),center =this.current;
			if(len <= this.pagegroup){
				while(len--){
					temp.push({
						text: this.page-len,
						val: this.page -len
					})
				}
				return temp;
			}
			while(len--){
				temp.push(this.page-len)
			}
			var idx = temp.indexOf(center);
			(idx<count) && (center = center+ count-idx);
			(this.current > this.page -count) && (center=this.page - count);
			temp = temp.splice(center-count-1,this.pagegroup);
			do{
				var t = temp.shift();
				list.push({
					text: t,
					val: t
				});
			}while(temp.length);
			if(this.page> this.pagegroup){
				(this.current>count+1) && list.unshift({text:"...", val:list[0].val-1});
				(this.current< this.page-count) && list.push({text: "...",val:list[list.length-1].val+1});
			}
			return list;
		}
	},
	methods:{
		setCurrent(idx){
			if(this.current != idx && idx>0 && idx<this.page+1){
				this.current = idx;
				this.$emit('pagechange',this.current);
			}
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$light_blue: #20A0FF;
.pagination{
	text-align: right;
	padding: 15px 0;
	clear: both;
	display: flex;
	justify-content: flex-end;
	span{
		padding: 5px 15px;
		font-size: 14px;
		color: #999
	}
	li{
		border-top: 1px solid #ebebeb;
		border-bottom: 1px solid #ebebeb;
		border-right: 1px solid #ebebeb;
		font: 14px "Microsoft yahei";
		padding: 5px 15px;
		cursor: pointer;
		margin: 0;
		&.active{
			border-top: 1px solid $light_blue;
			background: $light_blue;
			color: #fff;
			&:hover{
				background: $light_blue;
				color: #fff;
			};
		}
		&.disabled{
			border: 1px solid #ebebeb;
			background:#f8f8f8;
			&:hover{
				background: #f8f8f8;
			};
		}
		&:hover{
			background:#ebebeb;
		}
		&:first-child{
			border-left: 1px solid #ebebeb
		};
		
	}
}
</style>