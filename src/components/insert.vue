<template>
<div>
  <!--背景-->
  <div class="wel" id="background-3"></div>
  <!--左右两边云-->
  <div class="wel" id="box">
      <div class="box-1 lefp"></div>
      <div class="box-1">
          <div class="righp"></div>
      </div>
  </div>
  <!--荧光点点-->
  <div class="wel" id="git"></div>
  <!--登录注册表-->
  <div class="wel" id="from">

      <div class="box-2 le-2">
          <form action="" method="post">
              <div class="flrg-1">
                  <h3>注册</h3>
                  <div class="a">
                      <input type="text" class="in-1" placeholder="客户姓名" v-model="name">
                  </div>
                  <div class="a">
                      <input type="text" class="in-1" placeholder="客户年龄" v-model="age">
                  </div>
                  <div class="a">
                      <input type="text" class="in-1" placeholder="客户性别" v-model="sex">
                  </div>
                  <div class="a">
                      <input type="text" class="in-1" placeholder="客户电话" v-model="phone">
                  </div>
                  <div class="a">
                      <input type="email" class="in-1" placeholder="客户邮箱" v-model="email">
                  </div>
                  <div class="a">
                      <input type="text" class="in-1" placeholder="客户生日 格式:xxxx-xx-xx" v-model="birth">
                  </div>
                  <div class="a">
                      <input type="text" class="in-1" placeholder="客户级别 请输入0 1 2" v-model="level">
                  </div>
                  <div class="a">
                      <button type="button" @click="addCustomer">注册</button>
                  </div>
              </div>
          </form>
      </div>
  </div>
</div>
</template>

<script>
  export default{
    data:function(){
      return{
        /* name:"",
        age:"",
        sex:"",
        email:"",
        phone:"",
        birth:"",
        level:"" */

          name:"",
          age:"",
          sex:"",
          email:"",
          phone:"",
          birth:"",
          level:""

      }
    },
    methods:{
      addCustomer:function(){

          var obj=this
          $.ajax({
             url:"http://localhost:8082/crm/customerController/addCustomer",
             type:"POST",
             data:{time:new Date().getTime(),
                    name:obj.name,
                    age:obj.age,
                    sex:obj.sex,
                    email:obj.email,
                    phone:obj.phone,
                    birth:obj.birth,
                    level:obj.level
             },
             success:function(result){
               if(result.core =="200"){
                 alert("添加成功");
                 obj.$router.push("/main/customerinfor")
               }else{
                 alert("添加失败，联系管理员");
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

<style>
@import url("../assets/css/style.css");
</style>
