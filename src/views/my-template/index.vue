<template>
    <div class="temp-con">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <div class="temp-con-content">
                <poster-item
                        @refresh="init"
                        v-for="item in list"
                        :key="item.id"
                        :info="item"
                        posterType="myTemList">
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
                    :total="pagination.total">
            </el-pagination>


        </div>
    </div>
</template>
<script>
    import { myTempList, myTempUpdate } from '@/api/my-template/index'
    import posterItem from '@/components/poster'
    import leftMenu from '@/components/left-menu'
    export default {
        components:{ leftMenu, posterItem },
        data() {
            return {
                list: [],
                searchForm: {
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
            pageSizeChange(e) {
                this.searchForm.pageSize =e ;
                this.init();
            },
            pageCurrentChange(e) {
                this.searchForm.pageNum =e ;
                this.init();
            },
            async onDownload() {
                // const res = await downloadFile({htmlCode:'123'});

                let routeUrl = '/api/downloadImageByCode?htmlCode=123'
                window.open(routeUrl, '_blank');

            },
            onEdit(item) {
                item.postType = 'info';
                this.$router.push({path: '/template/user', query: {...item}})
            },
            async onDelete(item) {
                item.disabled = true;
                const res = await myTempUpdate(item);
                if (res.errcode === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.init();
                }
            },
            async init() {
                const res = await myTempList(this.searchForm);
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
        .page-wrap{
            width: 600px;
            margin: 30px auto 30px auto;
            text-align: center;
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
            margin: 10px 0 0 ;
            min-height: 720px;
        }
        .temp-con-content{
            display: flex;
            flex-wrap: wrap;
            margin: 10px 10px 0 ;
            .li-con{
                border:1px solid #f1f1f1;
                padding: 10px;
                margin: 10px;
                img {
                    width: 340px;
                }
                .li-option{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    .li-option-title{
                        font-size: 12px;
                        line-height: 25px;
                        .color-grap{
                            color: #999999;
                        }
                    }
                }
            }
        }
    }
</style>
