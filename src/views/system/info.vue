<template>
    <div id="systemInfoWrap">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <el-form :model="form" ref="numberValidateForm"  label-width="100px" class="form-wrap" >
                <el-form-item label="我的头像"  prop="age"  >
                    <el-upload
                            class="avatar-uploader"
                            :action="$uploadApi"
                            :show-file-list="false"
                            :on-success="uploadSuccess">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="我的昵称"  prop="name"  >
                    <el-input type="age" v-model.number="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="我的邮箱"  prop="email"  >
                    <el-input type="age" v-model.number="form.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号码"  prop="mobileTelephone"  >
                    <el-input type="age" v-model.number="form.mobileTelephone"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button v-loading="loading" type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
    import leftMenu from '@/components/left-menu'
    import {getUserInfo, editUserInfo} from '@/api/system/user'
    export default {
        components: {leftMenu},
        data() {
            return {
                loading: false,
                formRules: [],
                form: {},
            }
        },
        mounted() {
          this.getInfo()
        },
        methods: {
            async submitForm() {
                this.loading = true;
                await editUserInfo(this.form);
                this.loading = false;
                this.$message({
                    type: 'success',
                    message: '操作成功！'
                })
                // if (res.erroce)
            },
            resetForm() {

            },
            uploadSuccess(res) {
                console.log(res)
            },
            async getInfo() {
                const res = await getUserInfo({userId: this.$store.state.userInfo.userId});
                this.form = res.datas;
            }
        }
    }
</script>
<style lang="scss">
    #systemInfoWrap{
        display: flex;
        .temp-con-asider{
            width: 220px;
            height: 100%;
            .line{
                height:1px;
                background: #f1f1f1;
            }
        }
        .temp-con-right{
            flex:1;
            margin: 10px;
            .form-wrap{
                width: 50%;
            }
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 108px;
                height: 108px;
                line-height: 108px;
                text-align: center;
            }
            .avatar {
                width: 108px;
                height: 108px;
                display: block;
            }
        }
    }
</style>
