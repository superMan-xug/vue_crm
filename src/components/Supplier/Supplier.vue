<template>
  <div>
      <button class="btn btn-info b1" @click="toinsert"><i class="glyphicon glyphicon-plus i1">添加用户</i></button>
      <div style="margin-top: 45px;">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>供应商ID</th>
                <th>供应商名称</th>
                <th>供应商联系人</th>
                <th>联系电话</th>
                <th>供应商地址</th>
                <th>供应商分类编码</th>
                <th>相关操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in suppliers">
                <td>{{s.supplierId}}</td>
                <td>{{s.supplierName}}</td>
                <td>{{s.linkMan}}</td>
                <td>{{s.phoneNumber}}</td>
                <td>{{s.address}}</td>
                <td>{{s.supplierCode}}</td>
                <td><button class="btn btn-warning btn-sm b2"  @click="toEditUpdate(s.supplierId,s.supplierName)"><i class="glyphicon glyphicon-wrench"></i>&nbsp;修改</button></td>
                <td><button class="btn btn-success btn-sm b2" @click="deleteSupplier(s.supplierId,s.supplierName)"><i class="glyphicon glyphicon-trash"></i>&nbsp;删除</button></td>
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
      </div>
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
                  <label for="customerName">供应商名称</label>
                  <input type="text" class="form-control"  v-model="i_supplierName">
                </div>
                <div class="form-group">
                  <label for="customerName2">供应商联系人</label>
                  <input type="text" class="form-control"  v-model="i_linkMan">
                </div>
                <div class="form-group">
                  <label for="customerPhone">联系电话</label>
                  <input type="text" class="form-control"  v-model="i_phoneNumber">
                </div>
                <div class="form-group">
                  <label for="customerAddress">供应商地址</label>
                  <input type="text" class="form-control"  v-model="i_address">
                </div>
                <div class="form-group">
                  <label for="customerCode">供应商分类编码</label>
                  <input type="text" class="form-control"  v-model="i_supplierCode">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="save" @click="addSupplier()">保存</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 修改模态框 -->
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
                  <label for="customerName">供应商名称</label>
                  <input type="text" class="form-control"  v-model="supplierName">
                </div>
                <div class="form-group">
                  <label for="customerName2">供应商联系人</label>
                  <input type="text" class="form-control"  v-model="linkMan">
                </div>
                <div class="form-group">
                  <label for="customerPhone">联系电话</label>
                  <input type="text" class="form-control"  v-model="phoneNumber">
                </div>
                <div class="form-group">
                  <label for="customerAddress">供应商地址</label>
                  <input type="text" class="form-control"  v-model="address">
                </div>
                <div class="form-group">
                  <label for="customerCode">供应商分类编码</label>
                  <input type="text" class="form-control"  v-model="supplierCode">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary"  @click="updateSupplier()">保存</button>
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
        currentPage:1,
        pageSize:5,
        countPage:0,
        suppliers:[],
        i_supplierName:"",
        i_linkMan:"",
        i_phoneNumber:"",
        i_address:"",
        i_supplierCode:"",
        supplierName:"",
        linkMan:"",
        phoneNumber:"",
        address:"",
        supplierCode:"",
        supplierId:""

      }
    },
    mounted:function(){
      this.getSupplier();
    },
    computed:{
      indexs:function(){
        var arr = [];
        for(var i = 1;i<=this.countPage;i++){
          arr[i-1] = i;
        }
        return arr;
      }
    },
    updated(){
      this.getSupplier()
    },
    methods:{
      deleteSupplier:function(id,name){
          if(confirm("你确认删除"+name+"吗?")){
              var obj = this;
              $.ajax({
                url: "http://localhost:8082/crm/supplierController/deleteSupplier",
                type: "POST",
                data: {
                  time: new Date().getTime(),
                  supplierId:id
                },
                success: function(result) {
                  if (result.code == "200") {
                      alert("删除成功");
                  } else {
                    alert(result.msg);
                  }

                },
                xhrFields: {
                  withCredentials: true
                }
              });
          }
      },
      updateSupplier:function(){
          var obj = this;
          $.ajax({
            url: "http://localhost:8082/crm/supplierController/updateSupplier",
            type: "POST",
            data: {
              time: new Date().getTime(),
              supplierName:obj.supplierName,
              linkMan:obj.linkMan,
              phoneNumber:obj.phoneNumber,
              address:obj.address,
              supplierCode:obj.supplierCode,
              supplierId:obj.supplierId
            },
            success: function(result) {
              if (result.code == "200") {
                  alert("修改成功了");
                  $("#update").modal("hide");
              } else {
                alert("出问题了，联系管理员");
              }

            },
            xhrFields: {
              withCredentials: true
            }
          });
      },
      toEditUpdate:function(id,name){
        var obj = this;
        if(confirm("你确认修改"+name+"的供应商信息吗")){
          $.ajax({
            url: "http://localhost:8082/crm/supplierController/findOne",
            type: "POST",
            data: {
              time: new Date().getTime(),
              supplierId:id
            },
            success: function(result) {
              if (result.code == "200") {
                obj.supplierName=result.data.supplierName;
                obj.linkMan=result.data.linkMan;
                obj.phoneNumber=result.data.phoneNumber;
                obj.address=result.data.address;
                obj.supplierCode=result.data.supplierCode;
                obj.supplierId = result.data.supplierId;
              } else {
                alert("出问题了，联系管理员");
              }

            },
            xhrFields: {
              withCredentials: true
            }
          });
          $("#update").modal("show");
        }
      },
      addSupplier:function(){
        var obj = this;
        $.ajax({
          url: "http://localhost:8082/crm/supplierController/addSupplier",
          type: "POST",
          data: {
            time: new Date().getTime(),
            supplierName:obj.i_supplierName,
            linkMan:obj.i_linkMan,
            phoneNumber:obj.i_phoneNumber,
            address:obj.i_address,
            supplierCode:obj.i_supplierCode
          },
          success: function(result) {
            if (result.code == "200") {
              alert("添加成功");
              $("#add").modal("hide")
            } else {
              alert("出问题了，联系管理员");
            }

          },
          xhrFields: {
            withCredentials: true
          }
        });
      },
      toinsert:function(){
        $("#add").modal("show")
      },
      toPage:function(currentPage){
        var obj=this
        obj.currentPage=currentPage
        obj.getSupplier()
      },
      getSupplier:function(){
        var obj = this;
        $.ajax({
          url: "http://localhost:8082/crm/supplierController/getSupplier",
          type: "POST",
          data: {
            time: new Date().getTime(),
            currentPage:obj.currentPage,
            pageSize:obj.pageSize
          },
          success: function(result) {
            if (result.code == "200") {
              obj.suppliers = result.data;
              obj.countPage = result.countPage;
            } else {
              alert("出问题了，联系管理员");
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
  #inp {
    width: 300px;
    height: 40px;
    border-radius: 10px 0px 0px 10px;
    margin-left: 450px;
  }
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
