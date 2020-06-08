<template>
  <div>
    <button class="btn btn-info b1" @click="toadd()"><i class="glyphicon glyphicon-plus i1">添加用户</i></button>
    <table class="table table-hover">
    <thead>
      <tr>
        <th>用户编号</th>
        <th>用户名</th>
        <th>密码</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>邮箱</th>
        <th>级别</th>
        <th>相关操作</th>
      </tr>
      </thead>
      <tbody>
          <tr v-for="u in user">
             <td>{{u.id}}</td>
             <td>{{u.username}}</td>
             <td>{{u.password}}</td>
             <td>{{u.name}}</td>
             <td>{{u.age}}</td>
             <td>{{u.email}}</td>
             <td>{{u.role == 0?"管理员":"普通用户"}}</td>
             <td><button class="btn btn-warning btn-sm b2" @click="toEditUpdate(u.id)"><i class="glyphicon glyphicon-wrench"></i>&nbsp;修改</button></td>
             <td><button class="btn btn-success btn-sm b2" @click="deleteById(u.id,u.name)"><i class="glyphicon glyphicon-trash"></i>删除</button></td>
          </tr>
    </tbody>
   </table>
      <!--分页-->
              <div id="di">
                <nav>
                  <ul class="pagination">
                    <li >
                      <a href="javascript:void(0);" @click="toPage(--currectPage <= 1 ? 1: currectPage)">
                        <span >&laquo;</span>
                      </a>
                    </li>
                    <li v-for="index in indexs"><a href="javascript:void(0);" @click="toPage(index)">{{index}}</a></li>
                    <li >
                      <a href="javascript:void(0);" @click="toPage(++currectPage >= count?count:currectPage)">
                        <span>&raquo;</span>
                      </a>
                    </li>
                    <li> <a>共{{count}}页,当前第{{currectPage}}页</a></li>
                  </ul>
                </nav>
              </div>
              <br />
              <!--模态框-->
              <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                  <div class="modal-dialog" role="document">
                  	<div class="modal-content">
                  	  <div class="modal-header">
                  	     <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  	      <h4 class="modal-title" id="myModalLabel">添加客户</h4>
                  	  </div>
                  	  <div class="modal-body">
                      <form>
                          <div class="form-group">
                            <label for="customerName">用户名</label>
                              <input type="text" class="form-control" id="username" v-model="username">
                            </div>
                  			   <div class="form-group">
                              <label for="customerAge">密码</label>
                              <input type="password" class="form-control" id="password" v-model="password">
                           </div>
                           <div class="form-group">
                              <label for="customerAge">姓名</label>
                              <input type="text" class="form-control" id="name" v-model="name">
                           </div>
                           <div class="form-group">
                              <label for="customerSex">年龄</label>
                              <input type="text" class="form-control" id="age" v-model="age">
                           </div>
                  			   <div class="form-group">
                              <label for="customerAge">邮箱</label>
                              <input type="email" class="form-control" id="email"v-model="email">
                  			  </div>
                          <div class="form-group">
                            <label for="customerAge">级别</label>
                            <input type="text" class="form-control" id="role" v-model="role">
                          </div>
                  			</form>
                  	   </div>
                  	      <div class="modal-footer">
                  	        <button type="button" class="btn btn-primary" id="save" @click="addUser">保存</button>
                  	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                  	      </div>
                  	    </div>
                      </div>
                    </div>
                      <!--修改的模态框-->
                      <div class="modal fade" id="update" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                      	  <div class="modal-dialog" role="document">
                      	    <div class="modal-content">
                      	      <div class="modal-header">
                      	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      	        <h4 class="modal-title" id="myModalLabel">修改客户</h4>
                      	      </div>
                      	      <div class="modal-body">
                      	        <form>
                                  <div class="form-group">
                                  	<input  type="hidden"  id="editCustomerId"/>
                                    <label for="customerName">编号</label>
                                    <input type="text" class="form-control" id="username" v-model="u_id">
                                  </div>
                      			  <div class="form-group">
                      			  	<input  type="hidden"  id="editCustomerId"/>
                      			    <label for="customerName">用户名</label>
                      			    <input type="text" class="form-control" id="username" v-model="u_username">
                      			  </div>
                      			   <div class="form-group">
                      			    <label for="customerAge">密码</label>
                      			    <input type="password" class="form-control" id="password" v-model="u_password">
                      			  </div>
                              <div class="form-group">
                                <label for="customerAge">姓名</label>
                                <input type="text" class="form-control" id="name" v-model="u_name">
                              </div>
                      			    <div class="form-group">
                      			    <label for="customerAge">年龄</label>
                      			    <input type="text" class="form-control" id="age" v-model="u_age">
                      			  </div>
                      			 	<div class="form-group">
                      			    <label for="customerSex">邮箱</label>
                      			    <input type="email" class="form-control" id="email" v-model="u_email">
                      			  </div>
                              <div class="form-group">
                                <label for="customerSex">级别</label>
                                <input type="text" class="form-control" id="role" v-model="u_role">
                              </div>
                      			</form>
                      	      </div>
                      	      <div class="modal-footer">
                      	        <button type="button" class="btn btn-primary" id="updateBtn" @click="update()">修改</button>
                      	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                      	      </div>
                      	    </div>
                      	  </div>
                      	</div>

    </div>
</template>

<script>
  export default{
     data:function(){
       return{
         user:[],
         currectPage:1,
         sizePage:5,
         count:0,

         username:"",
         password:"",
         name:"",
         age:'',
         email:'',
         role:"",


         u_id:"",
         u_username:"",
         u_password:"",
         u_name:"",
         u_age:'',
         u_email:'',
         u_role:""
       }
     },
    mounted() {
      this.getAll()
    },
    computed:{
      indexs(){
         var arr=[]
         for(var i=1;i<=this.count;i++){
            arr[i-1]=i
         }
         return arr;
      },
    },
     methods:{
       update:function(){
         var obj=this;
         $.ajax({
            url:"http://localhost:8082/crm/userController/update",
            type:"POST",
            data:{
                    time:new Date().getTime(),
                    id:obj.u_id,
                    username:obj.u_username,
                    password:obj.u_password,
                    name:obj.u_name,
                    age:obj.u_age,
                    email:obj.u_email,
                    role:obj.u_role,
                  },
            success:function(result){
              if(result.rode == 0 || result.rode == 1){
                if(result.code == 200){
                  alert("修改成功！！");
                  $("#update").modal("hide")
                }else{
                  alert("修改失敗，请认真填写信息！")
                }
              }
            },
            xhrFields: {
            	withCredentials: true
            }
         });
       },
       toEditUpdate:function(id){
         var obj=this;
         $.ajax({
            url:"http://localhost:8082/crm/userController/findOne",
            type:"POST",
            data:{time:new Date().getTime(),id:id},
            success:function(result){
              if(result.code == 200){
                obj.u_id = result.user.id;
                obj.u_username = result.user.username;
                obj.u_password = result.user.password;
                obj.u_name = result.user.name;
                obj.u_age = result.user.age;
                obj.u_email = result.user.email;
                obj.u_role= result.user.role;

              }else{
                alert("请给程序员说")
              }
            },
            xhrFields: {
            	withCredentials: true
            }
         });
         $("#update").modal("show");
       },




       toPage(index){
         var obj=this;
         obj.currectPage=index
       },
       getAll:function(){
         var obj=this;
         $.ajax({
            url:"http://localhost:8082/crm/userController/queryAllCustomer",
           type:"POST",
           data:{time:new Date().getTime(),
                  currectPage:obj.currectPage,
                  sizePage:obj.sizePage,
           },
           success:function(result){
               obj.user=result.user;
               obj.count=result.count;
               obj.getAll()
           },
           xhrFields: {
           	withCredentials: true
           }
         });
       },
       deleteById:function(id,name){
         if(confirm("你确定删除"+name+"的客户信息吗")){
             $.ajax({
                url:"http://localhost:8082/crm/userController/delete",
                type:"POST",
                data:{time:new Date().getTime(),id:id},
                success:function(result){
                  alert("删除成功！！")

                },
                xhrFields: {
                	withCredentials: true
                }
             });
         }
       },

       toadd:function(){
        $("#add").modal("show")
       },
       addUser:function(){
         var obj=this;
         $.ajax({
            url:"http://localhost:8082/crm/userController/addUser",
            type:"POST",
            data:{time:new Date().getTime(),username:obj.username,password:obj.password,name:obj.name,age:obj.age,email:obj.email},
            success:function(result){

              if(obj.role == 0 || obj.role == 1){
                alert("添加成功");
                $("#add").modal("hide")
              }else{
                alert("請正確添加信息！")
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
</style>
