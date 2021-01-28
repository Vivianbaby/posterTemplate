<template>
    <div id="price-temp-index">
        <div class="template-search-wrap">
            <el-form ref="form" :model="searchForm" label-width="100px">
                <el-form-item label="">
                    <el-input v-model="searchForm.name" style="width: 50%" ></el-input>
                    <el-button type="primary" style="margin-left: 10px;"  @click="onSearch">搜索</el-button>
                </el-form-item>
                <el-form-item label="类型">
                    <el-tag size="small" :effect="searchForm.type === item ? 'dark' : 'plain'" v-for="item in tyleTagList" :key="item" @click="tabClick(item)">{{item}}</el-tag>
                </el-form-item>
            </el-form>
        </div>

        <div class="temp-con-content">
            <div class="item-wrap" v-for="item in list" :key="item.id">
                    <div class="item-wrap-img">
                        <img :src="item.thumbnail"/>
                    </div>
                    <div class="item-wrap-info">

                        <div class="info-option">
                            <div class="option-left">
                                {{item.name}}
                            </div>
                            <div class="option-right">
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
                :total="searchForm.total">
        </el-pagination>
    </div>
</template>
<script>
    import {priceList, priceUpdate, pricePublish} from '@/api/price-template/index'
    import { collectOrCancel } from '@/api/collect/index'
    export default {
        data() {
            return {
                list: [],
                curTagList: [],
                tyleTagList: ['全部', '促销', '特价'],
                searchForm: {
                    pageNum: 1,
                    pageSize: 15,
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
                    type: 'price'
                };
                await collectOrCancel(params);
                this.$message({
                    type:'success',
                    message: '操作成功'
                });
                this.init();
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
            // 搜索
            onSearch() {
                this.init();
            },
            tabClick(item) {

                this.searchForm.type = item;

                console.log(this.searchForm)
                this.init()
            },

            handleOpen() {

            },
            handleClose() {

            },
            uploadTemp() {
                this.$router.push({path: 'price/template'})
            },
            onEdit(item) {
                this.$router.push({path: 'price/template', query:{...item}})
            },
            onPublic(item) {
                this.$confirm('是否确认发布？发布后价格模板不能进行修改！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await  pricePublish({id: item.id});
                    if (res.errcode === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.init()
                    }
                }).catch(() => {

                });
            },
            onDelete(item) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    item.disabled = true;
                    const res = await priceUpdate(item);
                    console.log(res, 'fsdfsfsdf')
                    if (res.errcode === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.init();
                    }

                }).catch(() => {

                });
            },

            async init() {
                const res = await priceList(this.searchForm);
                if (res.errcode === 0) {
                    this.list = res.datas;
                    this.searchForm.total = res.total;
                }
            }
        }
    }
</script>
<style lang="scss">
   #price-temp-index{
        .template-search-wrap{
            padding: 20px 10px 1px  10px;
            margin-top: 20px;
            background: #f1f1f1;
            .el-form-item{
                margin-bottom: 0;
            }
            .el-form-item__content{
                height: 40px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }
            .el-tag{
                margin:  3px 5px 3px 0;
                cursor: pointer;
            }

        }
        .temp-con-content{
            display: flex;
            flex-wrap: wrap;
            margin: 10px 0 0 ;
            .item-wrap{
                border:1px solid #f1f1f1;
                padding: 10px;
                margin: 10px 19px 0 19px;
                .item-wrap-img{
                    display: flex;
                    align-items: center;
                    width: 220px;
                    height: 180px;
                    overflow: hidden;
                    img {
                        width: 100%;
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
                    .option-left{
                        width:120px;/*要显示文字的宽度*/
                        text-overflow :ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
                        white-space :nowrap; /*让文字不换行*/
                        overflow : hidden; /*超出要隐藏*/
                    }
                }
            }
        }
        .page-wrap{
            width: 600px;
            margin: 50px auto 50px auto;
            text-align: center;
        }
    }
</style>
