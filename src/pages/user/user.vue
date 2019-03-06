<template>
  <section>
    <dialog />
  </section>
</template>

<script>
import common from 'utils/common'
import user from 'service/user-service'
  export default {
    mixins: [common, user],
    data() {
      return {
        page: {
          pageSize: 15,
          pageNum: 1
        }
      }
    },
    created() {
      //do something after creating vue instance
      this.getUserList()
    },
    methods: {
      getUserList() {
        this.userList(this.page).then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.modalShow('dialog', {
            text: err.msg,
            buttons: [
              { title: '确定', handler: () => this.modalHide() }
            ]
          })
        })
      }
    }
  }
</script>
