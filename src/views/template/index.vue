<template>
    <div class="template-wrap">
       <div class="template-search-wrap">
           <el-form ref="form" :model="searchForm" label-width="100px">
               <el-form-item label="">
                   <el-input v-model="searchForm.name" style="width: 50%" size="small"></el-input>
                   <el-button type="primary" style="margin-left: 10px;" size="small" @click="onSearch">搜索</el-button>
               </el-form-item>
               <el-form-item v-if="curTagList.length">
                   <el-tag size="small" type="warning"  closable  @close="tagClose(item)" v-for="item in curTagList" :key="item" >{{item}}</el-tag>
               </el-form-item>
               <el-form-item label="尺寸">
                   <el-tag size="small" :effect="curTagList.includes(item) ? 'dark' : 'plain'" v-for="item in sizeList" :key="item" @click="tabClick(item, 'printSize')">{{item}}</el-tag>
               </el-form-item>
               <el-form-item label="日期">
                   <el-tag size="small"  :effect="curTagList.includes(item) ? 'dark' : 'plain'" v-for="item in dateList" :key="item" @click="tabClick(item, 'timeActivity')">{{item}}</el-tag>
               </el-form-item>
               <el-form-item label="节日">
                   <el-tag size="small" :effect="curTagList.includes(item) ? 'dark' : 'plain'" v-for="item in tagList" :key="item" @click="tabClick(item, 'label')" >{{item}}</el-tag>
               </el-form-item>
           </el-form>
       </div>

        <div class="temp-con-content">
            <poster-item
                    v-for="item in list"
                    :key="item.id"
                    :info="item"
                    :isEdit="false">
            </poster-item>

<!--            <div class="li-con" v-for="item in list" :key="item.id">-->
<!--                <div class="label-size">{{item.width}} * {{item.height}}</div>-->
<!--                <img src="../../assets/temp/temp-goods.png" />-->
<!--                <div class="li-option">-->
<!--                    <span class="li-option-title">{{item.name}}（{{new Date(item.timeCreate).format()}}）</span>-->
<!--                    <div class="li-option-btn">-->
<!--                        <el-button  type="primary" size="mini" icon="el-icon-thumb" @click="onUser(item)"></el-button>-->
<!--                        <el-button v-if="item.favoriteId" type="warning" size="mini" icon="el-icon-star-off" @click="onCollect(item)"></el-button>-->
<!--                        <el-button  v-else type="info" size="mini" icon="el-icon-star-off" @click="onCollect(item)"></el-button>-->
<!--                    </div>-->
<!--                </div>-->

<!--                <div class="label-wrap">-->
<!--                    <div v-if="item.label">-->
<!--                        <el-tag size="mini" type="info" v-for="items in item.label.split(',')" :key="items">{{items}}</el-tag>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
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
    import { publishTemList  } from '@/api/template/poster'
    import posterItem from '@/components/poster'
    export default {
        components:{posterItem  },
        data() {
            return {
                dialogTempVisible: false,
                list: [],
                sizeList: ['16k', '8k', '4k', '16KBP', '16K16p','8k8p', '86lk'],
                dateList: ['1月', '2月', '3月', '4月', '5月','6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                tagList: [ '蔬菜', '水果', '元旦', '超市','生活', '国庆','春节'],
                curTagList: [],
                searchForm: {
                    label: null,
                    timeActivity: '',
                    printSize: '',
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
                if (res.errcode === 0) {
                    this.list = res.datas;
                }
            }
        }
    }
</script>
<style lang="scss" >
    .template-wrap{
        .template-search-wrap{
            padding: 10px;
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
            margin: 10px 10px 0 ;
            .li-con{
                border:1px solid #f1f1f1;
                padding: 10px;
                margin: 10px;
                img {
                    width: 340px;
                }
                .label-size{
                    text-align: center;
                    height: 24px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #42b983;
                }
                .label-wrap{
                    margin-top: 5px;
                    border-top: 1px solid #f9f9f9;
                    padding-top: 5px;
                    .el-tag{
                        margin: 5px;
                    }
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
        .page-wrap{
            width: 600px;
            margin: 50px auto auto;
            text-align: center;
        }
    }

</style>
