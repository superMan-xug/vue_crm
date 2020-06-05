<template>
  <div>
     <table class="table table-hover">
     <thead>
       <tr>
         <th>联系人编号</th>
         <th>联系人姓名</th>
         <th>联系人年龄</th>
         <th>联系人电话</th>
         <th>联系人邮箱</th>
         <th>生日</th>
       </tr>
       </thead>
       <tbody>
           <tr v-for="m in message">
              <td>{{m.id}}</td>
              <td>{{m.name}}</td>
              <td>{{m.age}}</td>
              <td>{{m.phone}}</td>
              <td>{{m.email}}</td>
              <td>{{m.birth}}</td>
              <td><button class="btn btn-warning btn-sm b2" @click="toEditCustomer(m.id)"><i class="glyphicon glyphicon-wrench"></i>&nbsp;修改</button></td>
              <td><button class="btn btn-success btn-sm b2" @click="deleteById(m.id,m.name)"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</button></td>
           </tr>
     </tbody>
     
       </table>
  </div>
</template>

<script>
  export default{
     data(){
       return{
          linksmans:[]
       }
     },
     mounted(){
         this.getlinkman()
     },
     methods:{
         getlinkman(){
            var obj=this
            $.ajax({
               url:"http://localhost:8082/crm/linkmanController/getlinkmans",
               type:"POST",
               data:{time:new Date().getTime()},
               success:function(result){
                   obj.linksmans=result
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
