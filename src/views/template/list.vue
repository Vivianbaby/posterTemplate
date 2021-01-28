<template>
    <div class="temp-con">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <div class="temp-btn">
                <el-button type="primary" @click="uploadTemp">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <div class="temp-con-content">
                <poster-item
                        v-for="item in list"
                        :key="item.id"
                        :info="item"
                        :isEdit="true">
                </poster-item>
            </div>
        </div>
        <el-dialog title="上传模板" :visible.sync="dialogTempVisible"  width="400px">
            <div style="height: 230px; overflow:hidden;">
                <el-upload
                        class="upload-demo"
                        drag
                        action="/api/file/upload?psd=true"
                        :on-success	= "uploadSucess"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传zip文件，且不超过1024kb</div>
                </el-upload>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { templateList } from '@/api/template/poster'
    import leftMenu from '@/components/left-menu'
    import posterItem from '@/components/poster'
    export default {
        components:{ leftMenu, posterItem },
        data() {
            return {
                dialogTempVisible: false,
                list: [],
                searchForm: {
                    label: null,
                    timeActivity: '',
                    printSize: '',
                    pageNum: 1,
                    pageSize: 10
                },
            }
        },
        mounted() {
            this.init();
        },
        methods: {

            uploadTemp() {
                this.dialogTempVisible = true
            },
            uploadSucess(response) {
                response.datas.postType = 'tempInfo';
                this.$router.push({path: '/template/edit', query: {...response.datas}})
            },
            async init() {
                const res = await templateList(this.searchForm);
                if (res.errcode === 0) {
                    this.list = res.datas;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .temp-con{
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
            .temp-btn{
                margin: 20px;
                margin-bottom: 0;
            }
        }
        .temp-con-content{
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
