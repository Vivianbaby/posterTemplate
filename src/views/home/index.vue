<template>
    <div id="home-wrap">
        <div class="template-search-wrap">
            <el-form ref="form" :model="searchForm" label-width="100px">
                <el-form-item label="">
                    <el-input v-model="searchForm.name" style="width: 50%" ></el-input>
                    <el-button type="primary" style="margin-left: 10px;" @click="onSearch">搜索</el-button>
                </el-form-item>
                <el-form-item v-if="curTagList.length">
                    <el-tag size="small" type="warning"  closable  @close="tagClose(item)" v-for="item in curTagList" :key="item" >{{item}}</el-tag>
                </el-form-item>

            </el-form>
        </div>
        <div class="temp-con-content">
            <poster-item
                    v-for="item in list"
                    :key="item.id"
                    @refresh="init"
                    :info="item">
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
</template>
<script>
    import { publishTemList,  } from '@/api/template/poster'
    import { getLabelList,  } from '@/api/system/label'
    import posterItem from '@/components/poster'
    export default {
        components:{ posterItem },
        data() {
            return {
                dialogTempVisible: false,
                list: [],
                sizeList: ['16k', '8k', '4k', '16KBP', '16K16p','8k8p', '86lk'],
                dateList: ['1月', '2月', '3月', '4月', '5月','6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                tagList: [ '蔬菜', '水果', '元旦', '超市','生活', '国庆','春节'],
                curTagList: ['蔬菜', '水果', '元旦', '超市','生活', '国庆','春节'],
                searchForm: {
                    label: null,
                    timeActivity: '',
                    printSize: '',
                    publish: true,
                    pageNum: 1,
                    pageSize: 10
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
            async onUser(item) {
                //  await templateUser({templateId: item.id});
                this.$router.push({path: '/template/user', query: {id: item.id, type: 'userType'}})
            },
            onCollect () {

            },
            // 搜索
            onSearch() {
                this.init();
            },
            pageSizeChange() {

            },
            pageCurrentChange() {

            },
            tabClick(item, name) {
                if (this.curTagList.includes(item)) {
                    const num = this.curTagList.indexOf(item);
                    this.curTagList.splice(num, 1);
                    // const num2 = this.searchForm[name].indexOf(item);
                    // this.searchForm[name].splice(num2, 1);
                    this.searchForm[name] = '';
                } else {
                    this.curTagList.push(item);
                    // this.searchForm[name].push(item)
                    this.searchForm[name] = item;
                }
                console.log(this.searchForm)
            },
            tagClose(item) {
                if (this.curTagList.includes(item)) {
                    const num = this.curTagList.indexOf(item)
                    this.curTagList.splice(num, 1)
                }
            },

            async init() {
                const res = await publishTemList(this.searchForm);
                const labelRes = await getLabelList({isDetail: true});
                console.log(labelRes, 'labelRes')
                if (res.errcode === 0) {
                    this.list = res.datas;
                }
            }
        }
    }
</script>
<style lang="scss">
    #home-wrap{
        .template-search-wrap{
            padding: 10px;
            margin-top: 20px;
            background: url("../../assets/banner.png") no-repeat center top;
            height: 150px;
            .el-form{
                margin-left: 300px;
                margin-top: 30px;
            }
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
        .poster-item-wrap{
            width: 330px;
            margin: 10px 10;
            .li-con{
                margin: 10px 0;
                .temp-img{
                    width: 308px;
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
        }
        .page-wrap{
            width: 600px;
            margin: 50px auto auto;
            text-align: center;
        }
    }

</style>
