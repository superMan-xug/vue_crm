<template>
  <div class="form-horizontal">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-2 control-label">原始密码:</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="inputEmail3" placeholder="oldPassword" v-model="oldpwd">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">新密码:</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="newPassword" v-model="newpwd">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">确认新密码:</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="newPassword" v-model="newpwd2">
      </div>
    </div>
    <button class="btn btn-default" style="margin-left: 400px;" @click="updatepwd()">确认修改</button>
  </div>
</template>

<script>
  export default{
     data(){
       return{
          user:{
            id:"",
            username:"",
            password:""
          },
          oldpwd:"",
          newpwd:"",
          newpwd2:""
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
        updatepwd(){
           var obj=this
           if(obj.oldpwd !=obj.user.password){
             alert("请输入正确的原始密码")
             return;
           }
           if(obj.newpwd==obj.newpwd2){
             $.ajax({
                url:"http://localhost:8082/crm/userController/updatepwd",
                type:"POST",
                data:{time:new Date().getTime(),
                      id:obj.user.id,
                      password:obj.newpwd
                },
                success:function(result){
                  if(result.core=="200"){
                     alert("修改成功")
                     obj.$router.push("/")
                  }else{
                    alert("未知错误")
                  }
                },
                xhrFields: {
                	withCredentials: true
                }
             });
           }else{
             alert("两次密码不一致")
           }

        }
     }
  }
</script>

<style>
</style>
