<template>
    <div id="preview">
        <div v-html="htmlDom" id="htmlDom" ref="html">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                htmlDom: '',
                nextParams: {},
                loading: true,
            }
        },
        mounted() {
            this.htmlDom = this.$route.query.str;
        },
        methods: {

        }
    }
</script>
<style lang="scss">
    @import "../../../static/Font/font.css";
</style>
