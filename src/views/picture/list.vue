<template>
    <div class="temp-con" id="myPicture">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <div class="temp-btn">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item>
                        <el-input v-model="searchForm.user" placeholder="请输入名称搜索"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="uploadTemp" icon="el-icon-upload" size="small">
                        上传图片
                    </el-button>
                </el-form>
            </div>
            <div class="temp-con-wrap" v-loading="loading">
                <div class="item-wrap" v-for="item in list" :key="item.id">
                    <div class="item-wrap-img">
                        <img :src=" $baseApi + item.productImgUrl"/>
                    </div>
                    <div class="item-wrap-info">
                        <div class="info-text">
                            {{item.productName}} <span class="color-grap">（{{new Date(item.timeCreate).format('yyyy-MM-dd')}}）</span>
                        </div>
                        <div class="info-option">
                            <div>
                                <i class="el-icon-download"></i> 4 次
                            </div>
                            <div class="option-right">
                                <i class="el-icon-edit-outline" title="编辑" @click="onEdit(item)" v-if="!item.publish"></i> &emsp;&emsp;
                                <i class="el-icon-delete" title="删除" @click="onDelete(item)"></i>&emsp;
                            </div>
                        </div>
                        <div class="label-wrap">
                            <div v-if="item.productLabel">
                                <el-tag size="mini" type="info" v-for="items in item.productLabel.split(',')" :key="items">{{items}}</el-tag>
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


        <el-dialog title="上传本地图片"  :close-on-click-modal="false"  :visible.sync="addVisible"  width="500px">
            <el-form :model="form"  ref="ruleForm" label-width="85px" class="dialog-form" size="small">
                <el-form-item label="商品名称" prop="productName">
                    <el-input  v-model="form.productName" autocomplete="off" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品条码" prop="productBarCode">
                    <el-input v-model="form.productBarCode" placeholder="请输入商品条码"></el-input>
                </el-form-item>
                <el-form-item label="商品类目" prop="productType">
                    <el-select v-model="form.productType" placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in typeList"
                                :key="item.dictValue"
                                :label="item.dictLabel"
                                :value="item.dictLabel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品图片" prop="imageUrl" >
                    <el-upload
                            class="avatar-uploader"
                            :action="$uploadApi"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                           >
                        <img v-if="form.imageUrl" :src=" $baseApi +form.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品标签" prop="labelStr">
                    <el-input v-model="form.labelStr" autocomplete="off" placeholder="请输入回车添加标签" @keyup.enter.native="onAddLable"></el-input>
                    <el-tag closable @close="closeTag(item)" v-for="(item,index) in labelList" :key="index">{{item}}</el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onFormSave">确定</el-button>
                    <el-button @click="onFormReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </div>
</template>
<script>
    import {pictureList, pictureUpdate, pictureAdd, pictureInfo} from '@/api/my-picture/index'
    import leftMenu from '@/components/left-menu'
    import {getDicts} from '@/api/system/label.js'
    export default {
        components:{ leftMenu },
        data() {
            return {
                loading: false,
                list: [],
                searchForm: {
                    name: '',
                    pageSize: 8,
                    pageNum: 1,
                },
                form: {
                    productName: '',
                    productCode: '',
                    productType: '',
                    productLabel: '',
                    labelStr: '',
                    productImgUrl: '',
                    imageUrl: '',

                },
                addVisible: false,
                labelList:[],
                typeList: [],
                pagination: {
                    total: 0,
                }
            }
        },
        mounted() {
            this.init()
            getDicts('sys_common_picture').then(res=> {
               this.typeList = res.datas
            })
        },
        methods: {
            pageSizeChange(e) {
                this.searchForm.pageSize = e;
                this.init();
            },
            pageCurrentChange(e) {
                this.searchForm.pageNum = e;
                this.init();
            },
            onSearch () {

            },
            uploadSuccess(response) {
                this.form = Object.assign({}, this.form,{imageUrl: response.datas.path, productImgUrl: response.datas.path})
            },
            async onFormSave() {
                this.form.productLabel = this.labelList.join(',');
                if (this.form.id) {
                    await pictureUpdate(this.form);
                } else {
                    await pictureAdd(this.form);
                }

                this.init();
                this.$message({
                    message: '操作成功！',
                    type:'success'
                });
                this.addVisible = false;
            },
            onFormReset() {
                this.$refs['ruleForm'].resetFields();
                this.labelList = [];
                this.form.productImgUrl = '';
            },
            // 添加标签
            onAddLable() {
                if (this.labelList.length > 5) {
                    this.$message('标签数量不能超过6个');
                    return false;
                }
                if (this.labelList.includes(this.form.labelStr)) {
                    return false;
                }
                this.labelList.push(this.form.labelStr)
                this.form.labelStr = '';
            },
            // 删除标签
            closeTag(item) {
                const num = this.labelList.indexOf(item);
                if (num !== -1) {
                    this.labelList.splice(num , 1)
                }
            },
            uploadTemp() {
                this.addVisible = true;
                 this.$nextTick(()=>{
                     this.form = {}
                     this.onFormReset();
                 })
            },
            async onEdit(items) {
                this.addVisible = true;
                const res = await pictureInfo({id: items.id});
                const item = res.datas;

                this.$nextTick(() => {
                    this.form = JSON.parse(JSON.stringify(item));
                    this.form.imageUrl = item.productImgUrl;
                    this.labelList = this.form.productLabel ?  this.form.productLabel.split(',')  : [];
                })

            },
            onDelete(item) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    item.disabled = true;
                    await pictureUpdate(item);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.init();
                }).catch(() => {

                });
            },

            async init() {
                this.loading = true;
                const res = await pictureList(this.searchForm);
                this.list = res.datas;
                this.pagination.total = res.total;
                this.loading = false;
            }
        }
    }
</script>
<style lang="scss">
    #myPicture{
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
        .temp-con-wrap{
            display: flex;
            flex-wrap: wrap;
            margin: 10px 10px 0 ;
            .item-wrap{
                border:1px solid #f1f1f1;
                padding: 10px;
                margin: 10px;
                .item-wrap-img{
                    width: 220px;
                    height: 200px;
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
