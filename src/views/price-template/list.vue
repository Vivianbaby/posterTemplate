<template>
    <div class="temp-con">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <div class="temp-btn">
                <el-button type="primary" @click="uploadTemp" size="small">
                 设计模板 <i class="el-icon-thumb"></i>
                </el-button>
            </div>
            <div class="temp-con-wrap">
                <div class="item-wrap" v-for="item in list" :key="item.id">
                    <div class="item-wrap-img">
                        <img :src="item.thumbnail"/>
                    </div>
                    <div class="item-wrap-info">
                        <div class="info-text">
                            {{item.name}} <span class="color-grap">（{{new Date(item.timeCreate).format('yyyy-MM-dd')}}）</span>
                        </div>
                        <div class="info-option">
                            <div>
                                <i class="el-icon-download"></i> 3 次
                            </div>
                            <div class="option-right">
                                <i class="el-icon-finished" title="发布" @click="onPublic(item)" v-if="!item.publish"></i> &emsp;
                                <i class="el-icon-edit-outline" title="编辑" @click="onEdit(item)" v-if="!item.publish"></i> &emsp;&emsp;

                                <i class="el-icon-delete" title="删除" @click="onDelete(item)"></i>&emsp;
<!--                                <el-switch v-model="item.disabled" ></el-switch>-->
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
    import {myPriceList, priceUpdate, pricePublish} from '@/api/price-template/index'
    import leftMenu from '@/components/left-menu'
    export default {
        components:{ leftMenu },
        data() {
            return {
                list: [],
                searchForm: {
                    pageNum: 1,
                    pageSize: 15,
                    total: 0,
                },
                pagination: {
                    total: 0,
                 }
            }
        },
        mounted() {
          this.init()
        },
        methods: {
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
            handleOpen() {

            },
            handleClose() {

            },
            uploadTemp() {
                this.$router.push({path: '/price/template'})
            },
            onEdit(item) {
                this.$router.push({path: '/price/template', query:{...item}})
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
                const res = await myPriceList(this.searchForm);
                if (res.errcode === 0) {
                    this.list = res.datas;
                    this.pagination.total = res.total;
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
        .temp-con-wrap{
            display: flex;
            flex-wrap: wrap;
            margin: 10px 10px 0 ;
            min-height: 500px;
            .item-wrap{
                border:1px solid #f1f1f1;
                padding: 10px;
                margin: 10px;
                height: 245px;
                .item-wrap-img{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 220px;
                    height: 180px;
                    overflow: hidden;
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
                }
            }
        }
        .page-wrap{
            width: 600px;
            margin: 30px auto 30px auto;
            text-align: center;
        }
    }
</style>
