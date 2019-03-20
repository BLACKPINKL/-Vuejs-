<template>
  <section>
    <div class="form-horizontal">
      <div class="form-group">
        <label for="" class="col-md-2 control-label">所属品类</label>
          <div class="col-md-4">
            <select class="form-control">
              <option value="">/ 所有</option>
            </select>
          </div>
      </div>
    <div class="form-group">
      <label for="categoryName" class="col-md-2 control-label">品类名称</label>
        <div class="col-md-4">
          <input type="text"
          class="form-control input-md"
          id="categoryName"
          placeholder="请输入商品名称"/>
        </div>
    </div>
  </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.form-control {
  width: 100%;
}
</style>
