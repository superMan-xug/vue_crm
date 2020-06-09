<template>
  <div>
     <table class="table table-hover">
     <thead>
       <tr>
         <th>联系人编号</th>
         <th>联系人姓名</th>
         <th>联系人电话</th>
         <th>联系人邮箱</th>
         <th>联系人QQ</th>
         <th>所属人</th>
       </tr>

       </thead>
       <tbody>
           <tr v-for="lin in linksmans">
              <td>{{lin.id}}</td>
              <td>{{lin.name}}</td>
              <td>{{lin.phone}}</td>
              <td>{{lin.email}}</td>
              <td>{{lin.qq}}</td>
              <td>{{lin.user.username}}</td>
           </tr>
     </tbody>

       </table>
  </div>
</template>

<script>
  export default{
     data(){
       return{
          linksmans:[],
          u_role:this.$route.query.role,
          u_id:this.$route.query.id
       }
     },
     mounted(){
       if(this.u_role=="0"){
         this.getlinkman()
       }else{
         this.getlinkmanById(this.u_id)
       }
     },
     methods:{
         getlinkman(){
            var obj=this
            $.ajax({
               url:"http://localhost:8082/crm/linkmanController/getlinkmans",
               type:"POST",
               data:{time:new Date().getTime()},
               success:function(result){
                   obj.linksmans=result.linkmans
               },
               xhrFields: {
               	withCredentials: true
               }
            });
         },
         getlinkmanById(id){
            var obj=this
            $.ajax({
               url:"http://localhost:8082/crm/linkmanController/getlinkmansById",
               type:"POST",
               data:{time:new Date().getTime(),
                     id:id
               },
               success:function(result){
                   obj.linksmans=result.IDlinkman
               },
               xhrFields: {
               	withCredentials: true
               }
            });
         },

     }
  }
</script>

<style>
  
</style>
