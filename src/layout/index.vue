<template>
    <div class="m-con">
        <header class="m-con-hd">
            <div class="m-con-w hd-con">
                <div class="logo">
                    <img src="@/assets/logo.png" width="100" height="80">
                </div>
                <div class="m-con-nav">
                    <el-menu
                        :default-active="$route.path"
                        class="layout-menu"
                        mode="horizontal"
                        @select="handleSelect">
                        <el-menu-item index="/index">
                            <span>首页</span>
                        </el-menu-item>
                        <el-menu-item index="/template">
                            <span>模板中心</span>
                        </el-menu-item>
                        <el-menu-item index="/price">
                            <span>价格模板</span>
                        </el-menu-item>
                        <el-menu-item index="/picture">
                            <span>商品图库</span>
                        </el-menu-item>
                    </el-menu>
                </div>
                <div class="m-con-mem">
                    <div class="menu"><router-link to="/myTemplate">工作区</router-link></div>
                    <div class="notice"><i class="el-icon-bell"></i></div>
                    <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-submenu index="2">
                            <template slot="title">
                                <el-avatar :size="50" :src="circleUrl"></el-avatar>
                            </template>
                            <el-menu-item v-if="userName"  index="/info">用户名：{{userName}}</el-menu-item>
                            <el-menu-item v-if="userName" index="loginout">退出登录</el-menu-item>
                            <el-menu-item v-else index="loginout">未登录</el-menu-item>
                        </el-submenu>
                    </el-menu>

                </div>
            </div>
        </header>
        <section class="m-con-w">
            <router-view />
        </section>
    </div>
</template>

<script>
    export default {
        name: 'layout',
        data() {
            return {
                curPath: '',
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            }
        },
        computed: {
          userName () {
              return this.$store.state.userInfo.userName
          }
        },
        methods: {
            handleSelect(key) {
                if (key === 'loginout') {
                    this.$store.dispatch("Logout").then(() => {
                        this.$router.push({ path: "/login" }).catch(()=>{});
                    }).catch(() => {

                    });
                    return false;
                }
                if (this.$route.path !== key) {
                    this.curPath = key;
                    this.$router.push(key);
                }
            },
        }

    }
</script>

<style lang="scss">
    $cor: 12;
    .m-con{

    }
    .m-con-w{
        width: 1400px;
        margin: auto;

    }
    .m-con-hd{
        height: 80px;
        border-bottom: 1px solid #f1f1f1;
        .hd-con{
            display: flex;
            justify-content: space-around;
        }
        .m-con-nav{
            margin-left: 150px;
            ul {
                margin: 0;
                padding: 0;
                li {
                    display: inline-block;
                    height: 80px;
                    line-height: 80px;
                    margin: 0 50px;
                    color: #333;
                    font-size: 16px;
                    text-decoration: none
                }
            }
        }
        .m-con-mem{
            display: flex;
            justify-content: flex-end;
            align-items: center;

            line-height: 80px;
            div {
                padding: 0px 10px;
            }
            .el-menu.el-menu--horizontal{
                border: none;
            }
            .menu{
                a{
                    font-size: 12px;
                    color: #333;
                    text-decoration: none
                }
            }
        }
    }
    .m-con-nav{
        .el-menu.el-menu--horizontal{
            border-bottom: none;
        }
    }

</style>
