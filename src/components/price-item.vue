<template>
    <div id="price-item-wrap">
        <el-form :inline="true" :model="searchForm" class="pic-form" size="small">
            <el-form-item>
                <el-input v-model="searchForm.productName" placeholder="请输入名称搜索"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right" v-if="isBtn">
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
        <div class="price-item-container">
            <price-item
                    v-for="item in curPicList.list"
                    :key="item.id"
                    :info = "item"
                    :type = "type"
                    :active="selectItem.id === item.id ? 'title-acitve' : '' "
                    @refresh="initPic"
                    @click.native="selectOption(item)">
            </price-item>

        </div>
        <el-pagination
                class="page-wrap"
                background
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
                :current-page="searchForm.pageNum"
                :page-sizes="[1,5, 10, 20]"
                :page-size="searchForm.pageSize"
                :total="curPicList.total">
        </el-pagination>

    </div>
</template>
<script>
    import {priceList,  myPriceList} from '@/api/price-template/index'
    import priceItem from './price'

    export default {
        components: {priceItem},
        name: 'price',
        props: {
            pageSize: {
                type: Number
            },
            isBtn: {
                type: Boolean,
            },
            type: {
                type: String,
            },
            typeKey: {
                type: String,
            }
        },
        mounted() {
            this.initPic();
            if (this.pageSize) {
                this.searchForm.pageSize = this.pageSize;
            }
        },
        data() {
            return {
                searchForm: {
                    name: '',
                    pageSize: 8,
                    pageNum: 1,
                },
                curPicList: {
                    list: [],
                    total: 0,
                },
                selectItem: {}
            }
        },
        methods: {
            selectOption(item) {
                if (item.id === this.selectItem.id) {
                    this.selectItem = {}
                } else {
                    this.selectItem = item;
                }
                console.log(this.selectItem)
            },
            pageSizeChange(e) {
                this.searchForm.pageSize = e;
                this.initPic();
            },
            pageCurrentChange(e) {
                this.searchForm.pageNum = e;
                this.initPic();
            },
            onSearch() {
                this.searchForm.pageNum = 1;
                this.initPic();
            },
            onSubmit() {
                this.selectItem.selectType='price';
                this.$emit('onSelectImg', this.selectItem);
            },
            async initPic() {
                console.log(this.typeKey);
                let params = this.searchForm;
                let res = null;

                if (this.typeKey === 'myTem') {
                    res = await myPriceList(params)
                } else {
                    if (this.type === 'collect' || this.typeKey === 'myCollect') {
                        params = {
                            ...this.searchForm,
                            isPublish: true
                        };
                    }
                    res =  await priceList(params);
                }


                this.curPicList = {
                    list: res.datas,
                    total: res.total
                }
            },
        }
    }
</script>
<style lang="scss" scoped >
    #price-item-wrap{
        .pic-form{
            margin-bottom: -10px;
            height: 50px;
            overflow: hidden;
        }
        .price-item-container{
            min-height: 400px;
            display: flex;
            flex-wrap: wrap;

        }
        .page-wrap{
            margin-top: 50px;
            text-align: center;
        }
    }
</style>
