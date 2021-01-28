<template>
    <div id="pic-item-wrap">
        <el-form :inline="true" :model="searchForm" class="pic-form" size="small">
            <el-form-item>
                <el-input v-model="searchForm.productName" placeholder="请输入名称搜索"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>

        <div class="pic-container">
            <div class="item-wrap" v-for="item in curPicList.list" :key="item.id" @click="selectOption(item)">
                <div class="item-wrap-img">
                    <img :src="item.productImgUrl" />
                </div>
                <div class="item-wrap-title" :class="selectItem.id === item.id ? 'title-acitve' : '' ">
                    {{item.productName}}
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
                :total="curPicList.total">
        </el-pagination>

    </div>
</template>
<script>
    import {pictureList} from '@/api/my-picture/index'
    export default {
        name: 'pictureItem',
        mounted() {
            this.initPic()
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
              this.searchForm.pageNum =1;
              this.initPic();
            },
            onSubmit() {
                this.selectItem.selectType='picture';
                this.$emit('onSelectImg', this.selectItem);
            },
            async initPic() {
                const res =  await pictureList(this.searchForm);
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
        min-height: 400px;
        display: flex;
        flex-wrap: wrap;
        .item-wrap{
            width: 168px;
            height: 165px;
            margin:10px 10px  10px 0;
            border:1px solid #f1f1f1;
            padding: 5px;
            cursor: pointer;
            .item-wrap-img{
                text-align: center;
                height: 120px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 80%;
                }
            }
            .item-wrap-title{
                height: 32px;
                line-height: 32px;
                margin-top: 10px;
                background: #f9f9f9;
                font-size: 12px;
                text-align: center;
                color: #000;
            }
            .title-acitve{
                background: #409EFF;
                color: #fff;
            }
        }

    }
    .page-wrap{
        margin-top: 50px;
        text-align: center;
    }
}
</style>
