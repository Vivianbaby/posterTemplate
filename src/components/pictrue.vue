<template>
    <div class="picture-item-wrap">
        <div class="item-wrap-img">
            <img :src="$baseApi + info.productImgUrl" />
        </div>
        <div v-if="type === 'item'" class="item-wrap-title" :class="[active, 'item-wrap-title']">
            {{info.productName}}
        </div>
        <div v-if="type === 'collect'" class="list-title-big" >
            {{info.productName}}
        </div>
        <div v-if="type === 'collect'" class="list-title-small" >
            <div class="option-left">
                条形码:{{info.productBarCode}}
            </div>
            <div  class="option-right">
                <el-button v-if="info.favoriteId"  type="warning" size="mini" icon="el-icon-star-off" @click="onCollect(info)"></el-button>
                <el-button v-else  type="info" size="mini" icon="el-icon-star-off" @click="onCollect(info)"></el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { collectOrCancel } from '@/api/collect/index'
    export default {
        name: 'pictureItem',
        props: {
            info: {
                type: Object
            },
            active: {
                type: String
            },
            type: {
                type: String,
                default: 'item'
            }
        },
        mounted() {

        },
        data() {
            return {

            }
        },
        methods: {
            async onCollect (item) {
                const params = {
                    templateId: item.id,
                    id: item.favoriteId,
                    type: 'images'
                };
                await collectOrCancel(params);
                this.$message({
                    type:'success',
                    message: '操作成功'
                });
                this.$emit('refresh')
            },
        }
    }
</script>
<style lang="scss" scoped>
    .picture-item-wrap{
        width: 230px;
        max-height: 270px;
        margin:10px 10px  10px 0;
        border:1px solid #f1f1f1;
        padding: 5px;
        cursor: pointer;
        .item-wrap-img{
            text-align: center;
            height: 195px;
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
        .list-title-big{
            height: 32px;
            line-height: 32px;
            text-align: center;
        }
        .list-title-small{
           display: flex;
            justify-content: space-between;
            border-top: 1px solid #f1f1f1;
            padding-top: 10px;
        }
    }
</style>
