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
          <td><button class="btn btn-warning btn-sm b2" @click="toEditUpdate(m.id)"><i class="glyphicon glyphicon-wrench"></i>&nbsp;修改</button></td>
          <td><button class="btn btn-success btn-sm b2" @click="deleteById(m.id,m.name)"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</button></td>
        </tr>
      </tbody>


    </table>
    <!--分页-->
    <div id="di">
      <nav>
        <ul class="pagination">
          <li>
            <a href="javascript:void(0);" @click="toPage(--currectPage <= 1 ? 1: currectPage)">
              <span>&laquo;</span>
            </a>
          </li>
          <li v-for="index in indexs"><a href="javascript:void(0);" @click="toPage(index)">{{index}}</a></li>
          <li>
            <a href="javascript:void(0);" @click="toPage(++currectPage >= count?count:currectPage)">
              <span>&raquo;</span>
            </a>
          </li>
          <li> <a>共{{count}}页,当前第{{currectPage}}页</a></li>
        </ul>
      </nav>
    </div>
    <br />
 <!--添加的模态框-->
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
 			    <label for="customerName">客户名字</label>
 			    <input type="text" class="form-control" id="customerName" v-model="i_name">
 			  </div>
 			   <div class="form-group">
 			    <label for="customerAge">客户年龄</label>
 			    <input type="text" class="form-control" id="customerAge" v-model="i_age">
           </div>
          <div class="form-group">
            <label for="customerSex">客户性别</label>
            <input type="text" class="form-control" id="editCustomerSex" v-model="i_sex">
          </div>
           <div class="form-group">
             <label for="customerPhone">客户电话</label>
             <input type="text" class="form-control" id="customerPhone" v-model="i_phone">
           </div>
           <div class="form-group">
             <label for="customerEmail">客户邮箱</label>
             <input type="text" class="form-control" id="customerEmail" v-model="i_email">
           </div>
 			    <div class="form-group">
 			    <label for="customerBirth">客户生日</label>
 			    <input type="text" class="form-control" id="customerBirth" v-model="i_birth">
           </div>
           <div class="form-group">
             <label for="customerLevel">客户级别</label>
             <input type="text" class="form-control" id="customerlevel" v-model="i_level">
           </div>
 			</form>
 	      </div>
 	      <div class="modal-footer">
 	        <button type="button" class="btn btn-primary" id="save" @click="addCustomer()">保存</button>
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
                <label for="customerName">客户名字</label>
                <input type="text" class="form-control" v-model="up_name">
              </div>
              <div class="form-group">
                <label for="customerAge">客户年龄</label>
                <input type="text" class="form-control" v-model="up_age">
              </div>
              <div class="form-group">
                <label for="customerAge">客户性别</label>
                <input type="text" class="form-control" v-model="up_sex">
              </div>
              <div class="form-group">
                <label for="customerAge">客户电话</label>
                <input type="text" class="form-control" v-model="up_phone">
              </div>
              <div class="form-group">
                <label for="customerAge">客户生日</label>
                <input type="text" class="form-control" v-model="up_birth">
              </div>
              <div class="form-group">
                <label for="customerSex">客户邮箱</label>
                <input type="text" class="form-control" v-model="up_email">
              </div>
              <div class="form-group">
                <label for="customerSex">客户级别</label>
                <input type="text" class="form-control" v-model="up_level">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateCustomer()">修改</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: [],
        currectPage: 1,
        sizePage: 5,
        count: 0,
        name: "",
        up_id: "",
        up_name: "",
        up_age: "",
        up_sex: "",
        up_phone: "",
        up_birth: "",
        up_email: "",
        up_level: "",
        i_name:"",
        i_age:"",
        i_sex:"",
        i_email:"",
        i_phone:"",
        i_birth:"",
        i_level:""

      }
    },
    mounted() {
      this.getAll()
    },
    computed: {
      indexs() {
        var arr = []
        for (var i = 1; i <= this.count; i++) {
          arr[i - 1] = i
        }
        return arr;
      }
    },
    methods: {
      addCustomer:function(){
           var obj=this;
           $.ajax({
              url:"http://localhost:8082/crm/customerController/addCustomer",
              type:"POST",
              data:{time:new Date().getTime(),
                     name:obj.i_name,
                     age:obj.i_age,
                     sex:obj.i_sex,
                     email:obj.i_email,
                     phone:obj.i_phone,
                     birth:obj.i_birth,
                     level:obj.i_level
              },
              success:function(result){
                if(result.code =="200"){
                  alert("添加成功");
                   $("#add").modal("hide")
                }else{
                  alert("添加失败，联系管理员");
                }
      
              },
              xhrFields: {
               withCredentials: true
              }
           });
      },
      toEditUpdate(id) {
        var obj = this;
        if (confirm("您确定要修改" + id + "用户的信息吗")) {
          $.ajax({
            url: "http://localhost:8082/crm/customerController/findOne",
            type: "POST",
            data: {
              time: new Date().getTime(),
              id: id
            },
            success: function(result) {
              obj.up_id = result.customer.id,
                obj.up_name = result.customer.name,
                obj.up_age = result.customer.age,
                obj.up_sex = result.customer.sex,
                obj.up_phone = result.customer.phone,
                obj.up_birth = result.customer.birth,
                obj.up_email = result.customer.email,
                obj.up_level = result.customer.level
            },
            xhrFields: {
              withCredentials: true
            }
          });
          $("#update").modal("show")
        }
      },
      updateCustomer(){
        var obj=this
            $.ajax({
              url: "http://localhost:8082/crm/customerController/updateCustomer",
              type: "POST",
              data: {
                time: new Date().getTime(),
                   id:obj.up_id,
                  name:obj.up_name,
                  age:obj.up_age,
                  sex:obj.up_sex,
                  phone:obj.up_phone,
                  birth:obj.up_birth,
                  email:obj.up_email,
                  level:obj.up_level
              },
              success: function(result) {
                    if(result.core=="200"){
                      alert("修改成功")
                       $("#update").modal("hide")
                    }else{
                      alert("修改异常")
                    }
              },
              xhrFields: {
                withCredentials: true
              }
            });
            },
      toinsert() {
        $("#add").modal("show")
      },
      selectsubmit() {
        var obj = this
        obj.name = $("#inp").val();
        obj.currectPage = 1;
      },
      toPage(index) {
        var obj = this;
        obj.currectPage = index
      },
      deleteById(id, name) {

        if (confirm("你确定删除" + name + "的客户信息吗")) {
          $.ajax({
            url: "http://localhost:8082/crm/customerController/deleteById",
            type: "POST",
            data: {
              time: new Date().getTime(),
              id: id
            },
            success: function(result) {
              alert(result.yes)
            },
            xhrFields: {
              withCredentials: true
            }
          });
        }
      },
      getAll() {
        var obj = this
        $.ajax({
          url: "http://localhost:8082/crm/customerController/queryAll",
          type: "POST",
          data: {
            time: new Date().getTime(),
            currectPage: obj.currectPage,
            sizePage: obj.sizePage,
            name: obj.name
          },
          success: function(result) {
            obj.message = result.customer;
            obj.count = result.count;
            obj.getAll()
          },
          xhrFields: {
            withCredentials: true
          }
        });
      }
    },
    updated() {
      this.getAll
    }

  }
</script>

<style scoped>
  #inp {
    width: 300px;
    height: 40px;
    border-radius: 10px 0px 0px 10px;
    margin-left: 450px;
  }

  div {}

  .b1 {
    width: 110px;
    height: 50px;
    margin-bottom: -60px;
    border-radius: 8px;
  }

  .b2 {
    width: 80px;
    height: 40px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
  }

  .i1 {
    font-size: 15px;
    font-weight: bold;
  }

  .b3 {
    width: 80px;
    height: 40px;
    border-radius: 0px 10px 10px 0px;
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 3px;
  }

  #di {
    margin-left: 270px;
  }
</style>
