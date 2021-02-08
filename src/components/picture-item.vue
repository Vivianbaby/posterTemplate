<template>
    <div id="pic-item-wrap">
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
        <div class="pic-container">
            <picture-item
                v-for="item in curPicList.list"
                :key="item.id"
                :info = "item"
                :type = "type"
                :active="selectItem.id === item.id ? 'title-acitve' : '' "
                @refresh="initPicture"
                @click.native="selectOption(item)"
            ></picture-item>
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
    import {pictureList} from '@/api/my-picture/index'
    import {commonList} from '@/api/my-picture/index'
    import pictureItem from './pictrue'
    export default {
        name: 'picture',
        components: {pictureItem},
        props: {
            pageSize: {
                type: Number
            },
            isBtn: {
                type: Boolean
            },
            typeKey: {
                type: String
            },
            type: {
                type: String,
            }
        },
        mounted() {
            if (this.pageSize) {
                this.searchForm.pageSize = this.pageSize;
            }
            this.initPicture()
        },
        data() {
            return {
                searchForm: {
                    name: '',
                    pageSize: 6,
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
            },
            pageSizeChange(e) {
                this.searchForm.pageSize = e;
                this.initPicture();
            },
            pageCurrentChange(e) {
                this.searchForm.pageNum = e;
                this.initPicture();
            },
            onSearch() {
              this.searchForm.pageNum =1;
              this.initPicture();
            },
            onSubmit() {
                this.selectItem.selectType='picture';
                this.$emit('onSelectImg', this.selectItem);
            },
            async initPicture() {
                let params = this.searchForm;
                let res = null;

                if (this.typeKey === 'myTem') {
                    res = await pictureList(params)
                } else {
                    if (this.type === 'collect' || this.typeKey === 'myCollect') {
                        params = {
                            ...this.searchForm,
                            isPublish: true
                        };
                    }
                    res =  await commonList(params);
                }
                this.curPicList = {
                    list: res.datas,
                    total: res.total
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
#pic-item-wrap{
    .pic-form{
        margin-bottom: -10px;
        height: 50px;
        overflow: hidden;
    }
    .pic-container{
        min-height: 540px;
        display: flex;
        flex-wrap: wrap;
    }
    .page-wrap{
        margin-top: 50px;
        text-align: center;
    }
}
</style>
