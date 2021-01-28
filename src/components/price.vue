<template>
    <div id="price-wrap">
        <div class="item-wrap">
            <div class="item-wrap-img">
                <img :src="info.thumbnail" />
            </div>
            <div v-if="type === 'item'" :class="[active, 'item-wrap-title']">
                {{info.name}}
            </div>
            <div v-if="type === 'collect'" class="info-option">
                <div class="option-left">
                    {{info.name}}
                </div>
                <div class="option-right">
                    <el-button v-if="info.favoriteId"  type="warning" size="mini" icon="el-icon-star-off" @click="onCollect(info)"></el-button>
                    <el-button v-else  type="info" size="mini" icon="el-icon-star-off" @click="onCollect(info)"></el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { collectOrCancel } from '@/api/collect/index'
    export default {
        name: 'priceItem',
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
                    type: 'price'
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
<style lang="scss" scoped >
   .item-wrap{
            width: 230px;
            height: 240px;
            margin:10px 10px  10px 0;
            border:1px solid #f1f1f1;
            padding: 5px;
            cursor: pointer;
            .item-wrap-img{
                text-align: center;
                height: 197px;
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
</style>
