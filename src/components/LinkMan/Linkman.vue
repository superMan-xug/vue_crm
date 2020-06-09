<template>
  <div>
   <button type="button" class="btn btn-info btn-lg" data-toggle="tooltip" data-placement="top" title="Add Liaison Man" @click=" liaison()"><i class="glyphicon glyphicon-plus-sign" style="font-weight: bold;"></i>&nbsp;添加联系人</button>
     <table class="table table-hover">
     <thead>
       <tr>
         <th>联系人编号</th>
         <th>联系人姓名</th>
         <th>联系人电话</th>
         <th>联系人邮箱</th>
         <th>联系人QQ</th>
         <th>所属人</th>
         <th colspan="2">相关操作</th>
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
              <td><button class="btn btn-warning btn-sm b2" @click="toEditUpdate(lin.id)"><i class="glyphicon glyphicon-wrench"></i>&nbsp;修改</button></td>
              <td><button class="btn btn-success btn-sm b2" @click="deleteById(lin.id,lin.name)"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</button></td>
           </tr>
     </tbody>

       </table>
  <!--分页-->
  <div id="di">
    <nav>
      <ul class="pagination">
        <li>
          <a href="javascript:void(0);" @click="toPage(--currentPage <= 1 ? 1: currentPage)">
            <span>&laquo;</span>
          </a>
        </li>
        <li v-for="index in indexs"><a href="javascript:void(0);" @click="toPage(index)">{{index}}</a></li>
        <li>
          <a href="javascript:void(0);" @click="toPage(++currentPage >= countPage?countPage:currentPage)">
            <span>&raquo;</span>
          </a>
        </li>
        <li> <a>共{{countPage}}页,当前第{{currentPage}}页</a></li>
      </ul>
    </nav>
  </div>
  <br />
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
       			    <label for="customerName">联系人名字</label>
       			    <input type="text" class="form-control"  v-model="linkman.i_name">
       			  </div>
       			   <div class="form-group">
       			    <label for="customerAge">联系人手机号</label>
       			    <input type="text" class="form-control" v-model="linkman.i_phone">
                 </div>
                <div class="form-group">
                  <label for="customerSex">联系人邮箱</label>
                  <input type="text" class="form-control"  v-model="linkman.i_email">
                </div>
                 <div class="form-group">
                   <label for="customerPhone">联系人QQ</label>
                   <input type="text" class="form-control"  v-model="linkman.i_qq">
                 </div>
                    <div class="form-group">
                      <label for="customerPhone">所属员工ID</label>
                      <input type="text" class="form-control" disabled v-model="linkman.u_id"  id="uid">
                    </div>
       			</form>
       	      </div>
       	      <div class="modal-footer">
       	        <button type="button" class="btn btn-primary" id="save" @click="addliaison()">保存</button>
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
                    <input type="hidden" id="editCustomerId" />
                    <label for="customerName">联系人名字</label>
                    <input type="text" class="form-control" v-model="enidlinkman.name">
                  </div>

                  <div class="form-group">
                    <label for="customerAge">联系人电话</label>
                    <input type="text" class="form-control" v-model="enidlinkman.phone">
                  </div>
                  <div class="form-group">
                    <label for="customerAge">联系人邮箱</label>
                    <input type="text" class="form-control" v-model="enidlinkman.email">
                  </div>
                  <div class="form-group">
                    <label for="customerSex">联系人QQ</label>
                    <input type="text" class="form-control" v-model="enidlinkman.qq">
                  </div>
                  <div class="form-group">
                    <label for="customerSex">所属员工</label>
                    <input type="text" class="form-control" id="uid2" disabled v-model="enidlinkman.userId">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="updateLinkman()">修改</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              </div>
            </div>
          </div>
        </div>

  </div>
</template>

<script>
  export default{
     data(){
       return{
          linksmans:[],
          u_role:this.$route.query.role,
          u_id:this.$route.query.id,
          linkman:{
             i_name:"",
             i_phone:"",
             i_email:"",
             i_qq:"",
             u_id:"",
             },
           enidlinkman:{
             id:"",
             name:"",
             phone:"",
             email:"",
             qq:"",
             userId:""
           },
           //当前页
           currentPage:1,
           //每页显示条数
           pageSize:5,
           //总页数
           pageCount:0
          }
       },
    computed:{
       indexs(){
          var arr=[]
          for(var i=1;i<=this.pageCount;i++){
            arr[i-1]=i
          }
          return arr
       }
    },
     mounted(){
       if(this.u_role=="0"){
         this.getlinkman()
         $("#uid").attr("disabled",false);
       }else{
         this.getlinkmanById(this.u_id)
         this.linkman.u_id=this.u_id
         $("#uid").attr("disabled",true);
       }
     },
   updated(){
     if(this.u_role=="0"){
       this.getlinkman()
       $("#uid").attr("disabled",false);
     }else{
       this.getlinkmanById(this.u_id)
       this.linkman.u_id=this.u_id
       $("#uid").attr("disabled",true);
     }
   },
     methods:{
             toPage(currentPage){
               var obj=this
               obj.currentPage=currentPage
               if(obj.u_role=="0"){

               obj.getlinkman()
               }
             },
       updateLinkman(){
         var obj=this
         $.ajax({
            url:"http://localhost:8082/crm/linkmanController/updatelinkman",
            type:"POST",
            data:{time:new Date().getTime(),
                  id:obj.enidlinkman.id,
                  name:obj.enidlinkman.name,
                  phone:obj.enidlinkman.phone,
                  email:obj.enidlinkman.email,
                  qq:obj.enidlinkman.qq,
                  userId:obj.enidlinkman.userId
            },
            success:function(result){
                alert("您成功修改了"+result.code+"条数据")
                $("#update").modal("hide")
            },
            xhrFields: {
            	withCredentials: true
            }
         });
       },
       toEditUpdate(id){
          var obj=this
          $("#update").modal("show")
          $.ajax({
             url:"http://localhost:8082/crm/linkmanController/enidlinkman",
             type:"POST",
             data:{time:new Date().getTime(),
                   id:id
             },
             success:function(result){
                if(result.code=="200"){
                  if(result.linkman.userId=="0"){
                     $("#uid2").attr("disabled",false);
                     obj.enidlinkman=result.linkman
                  }else{
                    $("#uid2").attr("disabled",true);
                    obj.enidlinkman=result.linkman
                  }
                }
             },
             xhrFields: {
             	withCredentials: true
             }
          });
       },
       deleteById(id,name){
         var obj=this
          if(confirm("你确定删除"+name+"联系人的信息吗")){
            $.ajax({
               url:"http://localhost:8082/crm/linkmanController/deletelinkman",
               type:"POST",
               data:{time:new Date().getTime(),
                     id:id
               },
               success:function(result){
                 if(result.yes=="删除成功"){
                   alert("删除成功")
                 }
               },
               xhrFields: {
               	withCredentials: true
               }
            });
          }
       },
       addliaison(){
         var obj=this
         alert(obj.linkman.u_id)
         $.ajax({
            url:"http://localhost:8082/crm/linkmanController/addlinkman",
            type:"POST",
            data:{time:new Date().getTime(),
                name:obj.linkman.i_name,
                phone:obj.linkman.i_phone,
                email:obj.linkman.i_email,
                qq:obj.linkman.i_qq,
                userId:obj.linkman.u_id

            },
            success:function(result){
              if(result.yes=="添加成功"){
                alert("添加成功")
                 $("#add").modal("hide")
              }
            },
            xhrFields: {
            	withCredentials: true
            }
         });
       },
       liaison(){
         $("#add").modal("show")
       },
         getlinkman(){
            var obj=this
            $.ajax({
               url:"http://localhost:8082/crm/linkmanController/getlinkmans",
               type:"POST",
               data:{time:new Date().getTime(),
                     currentPage:obj.currentPage,
                     pageSize:obj.pageSize
               },
               success:function(result){
                   obj.linksmans=result.linkmans
                   obj.pageCount=result.countpage
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
                     id:id,
                     currentPage:obj.currentPage,
                     pageSize:obj.pageSize
               },
               success:function(result){
                   obj.linksmans=result.IDlinkman
                   obj.pageCount=result.countpage
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
