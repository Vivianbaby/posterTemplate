<template>
    <div id="preview" v-loading="loading">
        <div v-html="htmlDom" id="htmlDom" ref="html">
        </div>
    </div>
</template>
<script>
    import {myTempInfo, downloadImage} from '@/api/template/poster.js'
    export default {
        data() {
            return {
                htmlDom: '',
                nextParams: {},
                loading: true,
            }
        },
        mounted() {
            this.nextParams = this.$route.query;
            this.init();

        },
        methods: {
            async init() {
                let data = await myTempInfo({id: this.nextParams.id});
                let datas = await downloadImage({id: this.nextParams.id});
                console.log(datas)
                // window.close()
                this.htmlDom = data.datas.htmlContent;
                this.form = data.datas;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../static/Font/font.css";
</style>
