<template>
    <div class="temp-con" id="tempListWrap">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <div class="temp-btn">
                <el-button type="primary" @click="uploadTemp" size="small">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <div class="temp-con-content">
                <poster-item
                        @refresh="init"
                        v-for="item in list"
                        :key="item.id"
                        :info="item"
                        posterType="posterList">
                </poster-item>
            </div>
            <el-pagination
                    class="page-wrap"
                    background
                    @size-change="pageSizeChange"
                    @current-change="pageCurrentChange"
                    :current-page="searchForm.pageNum"
                    :page-sizes="[1,5, 10, 20]"
                    :page-size="searchForm.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
            </el-pagination>
        </div>
        <el-dialog title="上传模板" :visible.sync="dialogTempVisible"  width="400px">
            <div style="height: 230px; overflow:hidden;">
                <el-upload
                        class="upload-demo"
                        drag
                        :action="$baseApi + '/file/upload?psd=true'"
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
                    pageSize: 6
                },
                pagination: {
                    total: 0,
                }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            pageSizeChange() {

            },
            pageCurrentChange() {

            },

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
    #tempListWrap{
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
            margin-left: 20px;
            .temp-btn{
                margin: 20px 10px;
                margin-bottom: 0;
            }
        }
        .poster-item-wrap{
            margin: 10px 0px 0;
            .li-con{
                margin: 10px 0;
                .temp-img{
                    width: 308px;
                    height: 240px;
                    overflow: hidden;
                }
                .li-option-btn{
                    width: 110px;
                }
            }
        }
        .temp-con-content{
            display: flex;
            flex-wrap: wrap;
            margin: 10px 0 0 ;
            min-height: 750px;
        }
        .page-wrap{
            width: 600px;
            margin: 30px auto 30px auto;
            text-align: center;
        }

    }
</style>
