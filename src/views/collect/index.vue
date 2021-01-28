<template>
    <div id="myCollect">
        <div class="temp-con-asider">
            <left-menu></left-menu>
        </div>
        <div class="temp-con-right">
            <el-tabs v-model="tab" type="card">
                <el-tab-pane label="海报模板" name="1">
                    <poster-item  :pageSize="12" :isBtn="false" type="collect"></poster-item>
                </el-tab-pane>
                <el-tab-pane label="价格模板" name="2">
                    <price-item  :pageSize="12" :isBtn="false" type="collect"></price-item>
                </el-tab-pane>
                <el-tab-pane label="我的图库" name="3">
                    <picture-item :pageSize="12"  :isBtn="false" type="collect"></picture-item>
                </el-tab-pane>
            </el-tabs>
        </div>



    </div>
</template>
<script>
    import leftMenu from '@/components/left-menu'
    import posterItem from '@/components/poster-item'
    import priceItem from '@/components/price-item'
    import pictureItem from '@/components/picture-item'

    export default {
        components:{ leftMenu,pictureItem,priceItem,posterItem},
        data() {
            return {
                tab: '1'
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style lang="scss">
    #myCollect{
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
            margin: 20px;

        }

    }
</style>
