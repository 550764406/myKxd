<template>
	<div id="staff">
		<Breadcrumb></Breadcrumb>
		<div class="bgFFFbox">
            <router-link to="/addStaff">新增员工</router-link>
			<h3 class="addStaff_title">基本信息</h3>
			<div class="form-group clr">
                <label for="memberName" class="col-xs-2"><span class="alertColor">*</span>姓名：</label>
                <div class="col-xs-3">
                    <input id="memberName" name="memberName" class="form-control" value="" v-model="usernameModel">
                    <p class="alertColor">{{userErrors.errorText}}</p>
                </div>
                <label for="phone" class="col-xs-2"><span class="alertColor">*</span>手机：</label>
                <div class="col-xs-3">
                     <input type="text" id="phone" class="form-control" name="phone" data-bv-notempty-message="此字段不能为空" value=""  v-model="phoneModel">
                     <p class="alertColor">{{phoneErrors.errorText}}</p>
                </div>
            </div>
            <div class="form-group clr">
                <label for="memberName" class="col-xs-2">身份证号：</label>
                <div class="col-xs-3">
                    <input id="memberName" name="memberName" class="form-control" value="" v-model="userIdModel">
                    <p class="alertColor">{{userIdErrors.errorText}}</p>
                </div>
                <label for="phone" class="col-xs-2">毕业院校：</label>
                <div class="col-xs-3">
                     <input type="text" id="phone" class="form-control" name="phone" data-bv-notempty-message="此字段不能为空" value="" v-model="schoolModel">
                     <p class="alertColor">{{schoolErrors.errorText}}</p>
                </div>
            </div>
            <div class="form-group clr borB_ea">
                <label for="memberName" class="col-xs-2"><span class="alertColor">*</span>邮箱：</label>
                <div class="col-xs-3">
                    <input id="memberName" name="memberName" class="form-control" value="" v-model="emailModel">
                    <p class="alertColor">{{emailErrors.errorText}}</p>
                </div>
            </div>

			<h3 class="addStaff_title">工作信息</h3>
			<div class="form-group clr">
                <label for="memberName" class="col-xs-2">工号：</label>
                <div class="col-xs-3">
                    <input id="memberName" name="memberName" class="form-control" value="">
                </div>
                <label for="phone" class="col-xs-2">入职日期：</label>
                <div class="col-xs-3">
                     <input type="text" id="phone" class="form-control" name="phone" data-bv-notempty-message="此字段不能为空" value="">
                </div>
            </div>
            <div class="form-group clr borB_ea">
                <label for="memberName" class="col-xs-2">所属部门：</label>
                <div class="col-xs-3">
                    <select class="form-select">
                    	<option value="inWork">正式</option>
                        <option value="outWork">离职</option>
                        <option value="practice">实习</option>
                        <option value="ontrial">试用</option>
                    </select>
                </div>
                <label for="phone" class="col-xs-2">职位：</label>
                <div class="col-xs-3">
                     <select class="form-select">
                    	<option value="inWork">总监</option>
                        <option value="outWork">Java开发</option>
                        <option value="practice">前端开发</option>
                        <option value="ontrial">测试</option>
                    </select>
                </div>
            </div>

            <h3 class="addStaff_title">其他信息 ( 如需开通APP【开薪用】业务，请完善以下信息 )</h3>
            <div class="form-group clr">
                <label for="memberName" class="col-xs-2">聘用形式：</label>
                <div class="col-xs-3">
                    <select class="form-select">
                    	<option value="inWork">全职</option>
                        <option value="outWork">试用</option>
                        <option value="practice">实习</option>
                    </select>
                </div>
                <label for="phone" class="col-xs-2">婚姻情况：</label>
                <div class="col-xs-3">
                     <select class="form-select">
                    	<option value="inWork">已婚已育</option>
                        <option value="outWork">已婚</option>
                        <option value="practice">未婚</option>
                    </select>
                </div>
            </div>
            <div class="form-group clr borB_ea">
                <label for="memberName" class="col-xs-2">紧急联系人：</label>
                <div class="col-xs-3">
                    <input id="memberName" name="memberName" class="form-control" value="">
                </div>
                <label for="phone" class="col-xs-2">紧急联系人方式：</label>
                <div class="col-xs-3">
                     <input type="text" id="phone" class="form-control" name="phone" data-bv-notempty-message="此字段不能为空" value="">
                </div>
            </div>

            <div class="staffBtn">
                <button type="button" class="btn btn-primary-one" id="finish_btn" @click="addStaff">保存</button>
                <p>{{errorText}}</p>
            </div>

		</div>
	</div>
</template>

<script>
import Vue from "vue";
import Breadcrumb from "../Breadcrumb.vue";

export default{
	data(){
		return{
            usernameModel: "",
            userflag: false,
            phoneModel: "",
            phoneflag: false,
            errorText: "",
            userIdModel: "",
            userIdflag: false,
            schoolModel: "",
            schoolflag: false,
            emailModel: "",
            emailflag: false
		}
	},
	components:{
		Breadcrumb
	},
    computed: {
        userErrors(){ // 用户名
            let status, errorText;
            var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            if(!uPattern.test(this.usernameModel)){
                status = false;
                errorText = "用户名不能包含特殊字符,且输入4-16个字符"
            }
            else{
                status = true;
                errorText = "";
            }
            if(!this.userflag){
                errorText = "";
                this.userflag = true;
            }
            return{
                errorText, status
            }
        },
        phoneErrors(){ // 手机号
            let status, errorText;
            var phonePattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
            if(!phonePattern.test(this.phoneModel)) {
                status = false;
                errorText = "请输入正确的手机号"
            }
            else{
                status = true;
                errorText = "";
            }
            if(!this.phoneflag){
                errorText = "";
                this.phoneflag = true;
            }
            return{
                status, errorText
            }
        },
        userIdErrors(){ //身份证号
            let status,errorText;
            var userIdPattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if(!userIdPattern.test(this.userIdModel)){
                status = false;
                errorText = "请输入正确的身份证号"
            }
            else{
                status = true;
                errorText = ""
            }
            if(!this.userIdflag){
                errorText = "";
                this.userIdflag = true;
            }
            return{
                status, errorText
            }
        },
        schoolErrors(){ // 学校
            let status, errorText;
            var schoolPattern =  /^[\u4e00-\u9fa5]+$/ ;
            if(!schoolPattern.test(this.schoolModel)){
                status = false;
                errorText = "学校名称只能为汉字"
            }
            else{
                status = true;
                errorText = ""
            }
            if(!this.schoolflag){
                errorText = "";
                this.schoolflag = true;
            }
            return{
                status,errorText
            }
        },
        emailErrors(){
            let status, errorText;
            var emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(!emailPattern.test(this.emailModel)){
                status = false;
                errorText = "请输入正确的邮箱"
            }
            else{
                status = true;
                errorText = ""
            }
            if(!this.emailflag){
                errorText = "";
                this.emailflag = true;
            }
            return{
                errorText,status
            }
        }


    },
    methods:{
        addStaff(){
            if(!this.userErrors.status || !this.phoneErrors.status){
                this.errorText = "部分选型为通过"
            }
            else{
                this.errorText = ""
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bgFFFbox{
	background: #fff;
	padding: 10px;
	margin-left: -10px;
	height: auto;
	overflow: hidden;
}
.addStaff_title{
	font-size: 14px;
	font-weight: bold;
	color: #777;
	padding: 10px 0 20px 10px;
}
.col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9{
	position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    float: left;
}
.col-xs-2{
	width: 16.66666667%;
	text-align: right;
}
.col-xs-3{
	width: 25%;
}
.form-group {
    height: 54px;
    margin-bottom: 0px;
    font-size: 14px;
    color: #777;
}
.form-control{
	width: 100%;
	height: 32px;
    border: 1px solid #e5e5e5;
    box-shadow: none;
    border-radius: 0;
    color: #777;
    font-size: 14px;
    padding: 0 10px;
}
.alertColor {
    color: #ff3333;
}
.form-select{
	width: 100%;
	height: 32px;
	line-height: 32px;
    border: 1px solid #e5e5e5;
    color: #777;
    text-indent: 5px;
}
.borB_ea {
    border-bottom: 1px dashed #eaeaea;
}
.staffBtn{
	padding: 10px 0 0 240px
}
.btn-primary-one, .btn-primary-one:active:focus, .btn-primary-one:focus {
    display: inline-block;
    padding: 0 20px;
    font-size: 14px;
    height: 40px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    background: #4d94ff;
    border-radius: 2px;
    border: 1px solid #4d94ff;
}
</style>