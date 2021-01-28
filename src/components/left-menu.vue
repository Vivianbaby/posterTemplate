<template>
    <el-menu
            :default-active="$route.path"
            class="temp-con-menu"
            @select="handleSelect">
        <el-menu-item index="/myTemplate">
            <i class="el-icon-menu"></i>
            <span>我的海报</span>
        </el-menu-item>
        <el-menu-item index="/template/list">
            <i class="el-icon-menu"></i>
            <span>我的海报模板</span>
        </el-menu-item>
        <el-menu-item index="/price/list">
            <i class="el-icon-document"></i>
            <span>我的价格模板</span>
        </el-menu-item>
        <el-menu-item index="/picture/list">
            <i class="el-icon-setting"></i>
            <span slot="title">我的图库</span>
        </el-menu-item>
        <el-menu-item index="/collect">
            <i class="el-icon-setting"></i>
            <span slot="title">我的收藏</span>
        </el-menu-item>
        <div class="line"></div>
        <el-menu-item index="/info">
            <i class="el-icon-setting"></i>
            <span slot="title">我的信息</span>
        </el-menu-item>
<!--        <el-menu-item index="/account">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">账户设置</span>-->
<!--        </el-menu-item>-->
    </el-menu>
</template>
<script>
    export default {
        name: 'left-menu',
        data() {
            return {
                curPath: '',
            }
        },
        mounted() {
        },
        methods: {
            handleSelect(key) {
                if (this.$route.path !== key) {
                    this.curPath = key;
                    this.$router.push(key);
                }
            },
            handleClose() {

            },
        }
    }
</script>
<style lang="scss" scoped>
    .temp-con-menu{
        position: fixed;
        top: 80px;
        bottom:0;
        z-index: 1;
        width: 220px;
        border:1px solid #f1f1f1;
        border-top: none;
        border-bottom: none;
    }
</style>
