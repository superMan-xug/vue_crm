<template>
   <div class="login">
           <div class="center">
               <h1><img src="../assets/img/Windows10.png" alt=""></h1>

                   <div class="inputLi">
                       <input type="text" class="user" placeholder="请输入" required v-model="username">
                   </div>
                   <div class="inputLi">
                       <input type="password" class="pwd" placeholder="请输入" required v-model="password">
                   </div>
                   <div class="inputLi">
                       <button @click="login">登录</button>
                   </div>
               <p class="tip">欢迎使用青奥科技管理系统</p>
           </div>
       </div>
</template>

<script>
  export default{
     data(){
       return{
         username:"",
         password:""
       }
     },
     methods:{
        login(){
           var obj=this
           $.ajax({ 
              url:"http://localhost:8082/crm/userController/login",
              type:"POST",
              data:{time:new Date().getTime(),
                     username:obj.username,
                     password:obj.password
              },
              success:function(result){
                if(result.core =="200"){
                  alert(result.msg)
                  obj.$router.push("/main")
                  return false;
                }
                alert(result.msg)

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
   @import url("../assets/css/login.css");
</style>
