<template>
    <div class="temp-con">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <div class="temp-con-content">
                <div class="li-con" v-for="item in list" :key="item.id">
                    <img src="../../assets/temp/temp-goods.png" />
                    <div class="li-option">
                        <span class="li-option-title">{{item.name}}（{{new Date(item.timeCreate).format()}}）</span>
                        <div class="li-option-btn">
                            <el-button v-if="!item.finalize" type="primary" size="mini" icon="el-icon-edit" @click="onEdit(item)"></el-button>
                            <el-button v-else type="warning" size="mini" icon="el-icon-download" @click="onDelete(item)"></el-button>
                            <el-button v-if="!item.finalize" type="warning" size="mini" icon="el-icon-delete" @click="onDelete(item)"></el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { myTempList, templateUpdate } from '@/api/my-template/index'
    import leftMenu from '@/components/left-menu'
    export default {
        components:{ leftMenu },
        data() {
            return {
                list: [],
            }
        },
        mounted() {
            this.init();
        },
        methods: {

            onEdit(item) {
                item.postType = 'info';
                this.$router.push({path: '/template/user', query: {...item}})
            },
            async onDelete(item) {
                item.disabled = true;
                const res = await templateUpdate(item);
                if (res.errcode === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.init();
                }
            },
            async init() {
                const res = await myTempList({});
                if (res.errcode === 0) {
                    this.list = res.datas;
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
