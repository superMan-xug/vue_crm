<template>
  <div>
    <button class="btn btn-info b1" @click="toinsert()"><i class="glyphicon glyphicon-plus i1">添加用户</i></button>
     <form>
            <input type="text" id="inp" /><button class="btn btn-info b3" @click="selectsubmit()"><i class="glyphicon glyphicon-search"></i>&nbsp;搜索</button>
         </form>
         <table class="table table-hover">
       <thead>
         <tr>
           <th>客户编号</th>
           <th>客户姓名</th>
           <th>客户年龄</th>
           <th>客户电话</th>
           <th>客户邮箱</th>
           <th>客户生日</th>
           <th>相关操作</th>
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
  
  </div>
</template>

<script>
  export default{
     data(){
       return{
          message:[],
          currectPage:1,
          sizePage:5,
          count:0,
          name:""
       }
     },
     mounted(){
     this.getAll()
     },
     computed:{
        indexs(){
           var arr=[]
           for(var i=1;i<=this.count;i++){
              arr[i-1]=i
           }
           return arr;
        }
     },

     methods:{
       toinsert(){
         this.$router.push("/insert")
       },
       selectsubmit(){
          var obj=this
          obj.name=$("#inp").val();
          obj.currectPage=1;
       },
       toPage(index){
         var obj=this;
         obj.currectPage=index
       },
       deleteById(id,name){

         if(confirm("你确定删除"+name+"的客户信息吗")){
             $.ajax({
                url:"http://localhost:8082/crm/customerController/deleteById",
                type:"POST",
                data:{time:new Date().getTime(),
                      id:id
                },
                success:function(result){
                  alert(result.yes)
                },
                xhrFields: {
                	withCredentials: true
                }
             });
         }
       },
        getAll(){
           var obj=this
           $.ajax({
              url:"http://localhost:8082/crm/customerController/queryAll",
              type:"POST",
              data:{time:new Date().getTime(),
                     currectPage:obj.currectPage,
                     sizePage:obj.sizePage,
                     name:obj.name
              },
              success:function(result){
                  obj.message=result.customer;
                  obj.count=result.count;
                  obj.getAll()
              },
              xhrFields: {
              	withCredentials: true
              }
           });
        }
     },
     updated(){
        this.getAll
     }
  }
</script>

<style scoped>
  input{
     width: 300px;
     height: 40px;
     border-radius:10px 0px 0px 10px;
     margin-left: 450px;
   }
  div{
  }
  .b1{
    width: 110px;
    height: 50px;
    margin-bottom: -60px;
    border-radius: 8px;
  }
  .b2{
    width: 80px;
   height:40px;
   border-radius: 10px;
   font-size: 15px;
   font-weight: bold;
  }
  .i1{
    font-size: 15px;
    font-weight: bold;
  }
  .b3{
    width: 80px;
    height: 40px;
    border-radius: 0px 10px 10px 0px;
    font-size: 17px;
    font-weight:bold;
    margin-bottom: 3px;
  }
  #di{
    margin-left: 270px ;
  }

</style>
