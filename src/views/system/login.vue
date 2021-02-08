<template>
    <div id="login-wrap">
        <div class="login-container">
            <div class="login-title">用户登录</div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-form">
                <el-form-item  prop="account">
                    <el-input v-model.number="loginForm.username" placeHolder="请输入账号"   prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <el-form-item  prop="pass">
                    <el-input type="password" v-model="loginForm.password" placeHolder="请输入密码"   prefix-icon="el-icon-s-goods"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="warning" @click="submitForm('ruleForm')" style="width: 100%">
                        <span v-if="!loading">登录</span>
                        <span v-else>登录中。。。</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                loading: false,
                loginForm: {
                    username: 'xiaoqi',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, trigger: "blur", message: "用户名不能为空" }
                    ],
                    password: [
                        { required: true, trigger: "blur", message: "密码不能为空" }
                    ]
                },
            }
        },
        methods:{
            submitForm() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch("Login", this.loginForm).then(() => {
                            this.$router.push({ path: "/" }).catch(()=>{});
                        }).catch(() => {
                            this.loading = false;
                        });
                    }
                })
            },
            resetForm() {

            }
        }
    }
</script>
<style lang="scss">
    #login-wrap{
        background: #409eff;
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        .login-container{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 400px;
            height: 300px;
            padding: 10px;
            margin-left: -250px;
            margin-top: -200px;
            border-radius: 10px;
            background: #66b1ff;
            .login-title{
                height: 42px;
                line-height: 42px;
                color: #fff;
                text-align: center;
            }
            .login-form{
                width: 300px;
                margin: 30px auto;
                .el-form-item__content{
                    text-align: center;
                }
            }
        }
    }
</style>
