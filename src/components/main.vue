<template>
   <div id="app">
    <!--导航条 -->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">欢迎使用青奥系统</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">


          <ul class="nav navbar-nav navbar-right">

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.role==0?"管理员":"普通用户"}}:{{user.username}} <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="javascript:;" @click="toupdatepwd()">更改密码</a></li>
                <li><a href="javascript:;" @click="oversession()">登出</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <div style="width:1170px; margin: 0 auto;">
    <!--左边的内容-->
   <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" >
     <div class="panel panel-default" style="margin-top: 30px;border-radius: 10px;">
       <div class="panel-heading" role="tab" id="headingOne" style="background-color:#2191C9;height: 60px;border-radius: 10px;">
         <h4 class="panel-title">
           <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <span>客户管理</span>
           </a>
         </h4>
       </div>
       <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
         <div class="panel-body" style="padding: 0;">
           <button class="btn btn-primary" style="width: 100%;" @click="tocustomerinfo()">客户信息</button>
           <button class="btn btn-primary" style="width: 100%;" @click="tolinkman()">联系人信息</button>
           <button class="btn btn-primary" style="width: 100%;">联系记录</button>
         </div>
       </div>
     </div>

     <div class="panel panel-default" style="margin-top: 30px;border-radius: 10px;">
       <div class="panel-heading" role="tab" id="headingTwo" style="background-color:#2191C9;height: 60px;border-radius: 10px;">
         <h4 class="panel-title">
           <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
            <span>供应商管理</span>
           </a>
         </h4>
       </div>
       <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
         <div class="panel-body" style="padding: 0;">
           <button class="btn btn-primary" style="width: 100%;">供应商信息</button>
           <button class="btn btn-primary" style="width: 100%;">检索中心</button>
           <button class="btn btn-primary" style="width: 100%;">渠道管理</button>
           <button class="btn btn-primary" style="width: 100%;">来电管理</button>
         </div>
       </div>
     </div>

     <div class="panel panel-default" style="margin-top: 30px;border-radius: 10px;">
       <div class="panel-heading" role="tab" id="headingThree" style="background-color:#2191C9;height: 60px;border-radius: 10px;">
         <h4 class="panel-title">
           <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
           <span>商品管理</span>
           </a>
         </h4>
       </div>
       <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
         <div class="panel-body" style="padding: 0;">
           <button class="btn btn-primary" style="width: 100%;">商品信息</button>
           <button class="btn btn-primary" style="width: 100%;">采购管理</button>
           <button class="btn btn-primary" style="width: 100%;">采购退货</button>
         </div>
       </div>
     </div>


     <div class="panel panel-default" style="margin-top: 30px;border-radius: 10px;">
       <div class="panel-heading" role="tab" id="headingFour" style="background-color:#2191C9;height: 60px;border-radius: 10px;">
         <h4 class="panel-title">
           <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="true" aria-controls="collapseOne">
           <span>工作管理</span>
           </a>
         </h4>
       </div>
       <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
         <div class="panel-body" style="padding: 0;">
           <button class="btn btn-primary" style="width: 100%;">日程管理</button>
           <button class="btn btn-primary" style="width: 100%;">通讯录</button>
           <button class="btn btn-primary" style="width: 100%;">通讯管理</button>
           <button class="btn btn-primary" style="width: 100%;">公告栏</button>
         </div>
       </div>
     </div>

     <div class="panel panel-default" style="margin-top: 30px;border-radius: 10px;">
       <div class="panel-heading" role="tab" id="headingFive" style="background-color:#2191C9;height: 60px;border-radius: 10px;">
         <h4 class="panel-title">
           <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="true" aria-controls="collapseOne">
          <span>用户管理</span>
           </a>
         </h4>
       </div>
       <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
         <div class="panel-body" style="padding: 0;">
           <button class="btn btn-primary" style="width: 100%;">用户信息</button>
         </div>
       </div>
     </div>
   </div>


    <!--右边的内容-->
    <div style="width: 850px; float: left; margin-left: 100px;">

      <router-view></router-view>
    </div>
   </div>


   </div>
</template>

<script>
  export default{
     data(){
       return{
         user:{}
       }
     },
     mounted(){
      this.getuser()
     },
     methods:{
       getuser(){
           var obj=this
           $.ajax({
              url:"http://localhost:8082/crm/userController/getuser",
              type:"POST",
              data:{time:new Date().getTime()},
              success:function(result){
                if(result.core =="200"){
                  obj.user=result.user
                }else{
                  obj.$router.push("/")
                }

              },
              xhrFields: {
              	withCredentials: true
              }
           });
       },
       tocustomerinfo(){
          this.$router.push("/main/customerinfor")
       },
       tolinkman(){
         var obj=this
         this.$router.push({name:'Linkman',query:{id:obj.user.id,role:obj.user.role}})
       },
       toupdatepwd(){
         this.$router.push("/main/updatePwd")
       },
       oversession(){
         var obj=this
         $.ajax({
            url:"http://localhost:8082/crm/userController/oversession",
            type:"POST",
            data:{time:new Date().getTime()},
            success:function(result){
              if(result.core =="100"){
                obj.$router.push("/")
              }else{
                alert("操作异常")
              }

            },
            xhrFields: {
            	withCredentials: true
            }
         });
       }
     }
  }
</script>

<style scoped>
  #accordion{
    margin-left: -150px;
    width: 300px;
    float: left;
  }
 span{
   font-weight: bold;
   
   font-size:20px;
   margin-left:90px;
 }
 
</style>
