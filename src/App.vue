<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>

export default {
    name: 'App',
    created () {
        // 在页面加载时读取sessionStorage
        if (sessionStorage.getItem('userInfo')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, {userInfo: JSON.parse(sessionStorage.getItem('userInfo'))}))
        }

        // // 在页面刷新时将store保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            if(this.$store.state.userInfo && this.$store.state.userInfo.userId) {
                sessionStorage.setItem('userInfo', JSON.stringify(this.$store.state.userInfo))
            }
        })

        console.log(this.$store.state)
    }
}
</script>

<style>
    body{
        margin: 0px;
        padding: 0px;
    }

</style>
