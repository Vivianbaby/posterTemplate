<template>
    <div id="pictrueWrap">
        <div class="temp-search-wrap">
            <el-form ref="form" :model="searchForm" label-width="100px" class="temp-search-form">
                <el-form-item label="">
                    <el-input v-model="searchForm.name" style="width: 80%" ></el-input>
                    <el-button type="primary" style="margin-left: 10px;"  @click="onSearch">搜索</el-button>
                </el-form-item>
                <el-form-item label="类型">
                    <el-tag size="small" :effect="searchForm.type === item ? 'dark' : 'plain'" v-for="item in tyleTagList" :key="item" @click="tabClick(item)">{{item}}</el-tag>
                </el-form-item>
            </el-form>
        </div>

        <div class="temp-con-right">

            <div class="temp-con-wrap" v-loading="loading">
                <div class="item-wrap" v-for="item in list" :key="item.id">
                    <div class="item-wrap-img">
                        <img :src=" $baseApi + item.productImgUrl"/>
                    </div>
                    <div class="item-wrap-info">
                        <div class="info-option">
                            <div style="text-align: center; width: 100%">
                                {{item.productName}}
                            </div>
                        </div>
                        <div class="info-option">
                            <div >
                                条形码:{{item.productBarCode}}
                            </div>
                            <div  class="option-right">
                                <el-button v-if="item.favoriteId"  type="warning" size="mini" icon="el-icon-star-off" @click="onCollect(item)"></el-button>
                                <el-button v-else  type="info" size="mini" icon="el-icon-star-off" @click="onCollect(item)"></el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination
                    class="page-wrap"
                    background
                    @size-change="pageSizeChange"
                    @current-change="pageCurrentChange"
                    :current-page="searchForm.pageNum"
                    :page-sizes="[1,5, 10, 20]"
                    :page-size="searchForm.pageSize"
                    :total="pagination.total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    import {commonList} from '@/api/my-picture/index'
    import { collectOrCancel } from '@/api/collect/index'

    export default {
        components:{},
        data() {
            return {
                loading: false,
                list: [],
                searchForm: {
                    name: '',
                    pageSize: 15,
                    pageNum: 1,
                },
                tyleTagList:['全部'],
                labelList:[],
                typeList: [
                    {label: '酒水饮料', value: '酒水饮料'},
                    {label: '膨胀食品', value: '膨胀食品'},
                    {label: '压缩饼干', value: '压缩饼干'},
                ],
                pagination: {
                    total: 0,
                },
            }
        },
        mounted() {

            this.init()
        },
        methods: {
            async onCollect (item) {
                const params = {
                    templateId: item.id,
                    id: item.favoriteId,
                    type: 'images'
                };
                await collectOrCancel(params);
                this.$message({
                    type:'success',
                    message: '操作成功'
                });
               this.init()
            },

            tabClick(item) {
                console.log(item)
            },
            pageSizeChange(e) {
                this.searchForm.pageSize = e;
                console.log(this.searchForm)
                this.init();
            },
            pageCurrentChange(e) {
                this.searchForm.pageNum = e;
                console.log(this.searchForm)
                this.init();
            },
            onSearch () {

            },


            onFormReset() {
                this.$refs['ruleForm'].resetFields();
                this.labelList = [];
                this.form.productImgUrl = '';
            },

            async init() {
                this.loading = true;
                const res = await commonList(this.searchForm);
                this.list = res.datas;
                this.pagination.total = res.total;
                this.loading = false;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/common.css";

    #pictrueWrap{
        .temp-con-right{
            flex:1;
            .temp-btn{
                margin: 20px;
                margin-bottom: 0;
            }
        }
        .temp-con-wrap{
            display: flex;
            flex-wrap: wrap;
            margin: 10px 10px 0 ;
            .item-wrap{
                border:1px solid #f1f1f1;
                padding: 10px;
                margin: 10px 17px;
                .item-wrap-img{
                    width: 220px;
                    height: 200px;
                    margin-bottom: 5px;
                    overflow: hidden;
                    text-align: center;
                    img {
                        width: 80%;
                    }
                }
                .item-wrap-info{
                    font-size: 14px;
                    .info-text{
                        text-align: center;
                        line-height: 32px;
                        font-size: 12px;
                    }
                    .info-option{
                        border-top: 1px solid #f1f1f1;
                        display: flex;
                        justify-content: space-between;
                        padding-top: 10px;
                        height: 32px;
                        line-height: 32px;
                    }
                    .label-wrap{
                        margin-top: 5px;
                        border-top: 1px solid #f9f9f9;
                        padding-top: 5px;
                        .el-tag{
                            margin: 5px;
                        }
                    }
                }
            }
        }
        .dialog-form{
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
                width: 98px;
                height: 98px;
                line-height: 98px;
                text-align: center;
            }
            .avatar {
                width: 98px;
                height: 98px;
                display: block;
            }
            .el-tag{
                margin: 5px
            }
        }
        .page-wrap{
            width: 600px;
            margin: 50px auto 50px auto;
            text-align: center;
        }

    }
</style>
