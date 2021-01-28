<template>
    <div id="usePosterWrap">
        <div class="temp-btn" >
            <el-button type="primary" size="small" @click="onSave(false)">保存</el-button>
            <el-button type="default" size="small" @click="onPreview">预览</el-button>
            <el-button type="warning" size="small" @click="onPublish">定稿</el-button>
        </div>
        <div class="temp-con">
            <div class="temp-left" v-loading="loading">
                <div class="temp-html-wrap" >
                    <div class="temp-html" style="zoom: 0.2">
                        <div v-html="html" class="html" id="htmlDom"></div>
                    </div>
                </div>
                <div class="bottom">
                    <i class="el-icon-zoom-in" @click="zoomOption('big')"></i> &emsp;
                    <el-input v-model="zoom"  disabled style="width:100px;" size="mini"></el-input>
                    &emsp;<i class="el-icon-zoom-out" @click="zoomOption('small')"></i>
                </div>
            </div>
            <div class="temp-right">
                <div  class="right-property">
                    <div class="list">
                        <div class="title">海报信息</div>
                        <div class="list-item" >
                            <span class="list-item-left">海报尺寸</span>
                            <span class="list-item-right"> {{this.form.width}} * {{this.form.height}} px</span>
                        </div>
                        <div class="list-item" v-for="item in  markList" :key="item.key" >
                            <span class="list-item-left">{{item.name}}</span>
                            <span class="list-item-right"> {{item.num}} 张</span>
                        </div>
                        <div class="btn-wrap">
                            <el-button type="default" size="small" @click="onDownload" style="height: 32px;">模板下载</el-button>
                            <el-upload
                                    class="upload-demo"
                                    :action="uploadApi"
                                    multiple
                                    :limit="1"
                                    :on-success="uploadSuccess">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </div>
                    <div  v-if="curImgUrl">
                        <div class="title">更换产品</div>
                        <div class="img">
                            <img :src="curImgUrl" />
                        </div>
                        <div class="item">
                            <el-button type="default"  icon="el-icon-plus" @click="selectOption">选择图片</el-button>
                            <el-button type="primary">确定</el-button>
                        </div>
                    </div>
                </div>
                <div class="price" >
                    <div class="title">
                        <span class="font">设置默认价格模板</span>
                        <el-button type="text" @click="priceDialogVisible = true" >更多</el-button>
                    </div>
                    <div class="price-item">
                        <el-radio-group v-model="form.makeTemplateId" @change="priceTempChange">
                            <el-radio :label="item.id" v-for="item in curPriceList" :key="item.id" class="price-item-wrap">
                                <div class="price-img">
                                    <img :src="item.thumbnail" />
                                </div>
                                <div class="price-title">
                                    {{item.name}}
                                </div>
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="商品图库"  :close-on-click-modal="false" :close-on-press-escape ="false" :visible.sync="pictureVisible"  width="800px" height="600px">
            <el-tabs v-model="pictureTab" type="card"  @tab-click="picTabChange">
                <el-tab-pane label="在线图库" name="publist">
                    <picture-item   ref="publist"  @onSelectImg="onSelectImg" :isBtn="true" typeKey="publish"></picture-item>
                </el-tab-pane>
                <el-tab-pane label="我的图库" name="myTem">
                    <picture-item   ref="myTem"  @onSelectImg="onSelectImg" :isBtn="true" typeKey="myTem"></picture-item>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

        <el-dialog title="价格模板"  :close-on-click-modal="false"  :visible.sync="priceDialogVisible" width="800px" height="600px">
            <el-tabs v-model="priceTab" type="card" @tab-click="priceTabChange">
                <el-tab-pane label="在线模板库" name="publist">
                    <price-item ref="publist" @onSelectImg="onSelectImg" type="item" :isBtn="true" typeKey="publish" ></price-item>
                </el-tab-pane>
                <el-tab-pane label="我的模板库" name="myTem">
                    <price-item  ref="myTem" @onSelectImg="onSelectImg" type="item" :isBtn="true" typeKey="myTem"></price-item>
                </el-tab-pane>
                <el-tab-pane label="我的收藏" name="myCollect">
                    <price-item   ref="myCollect" @onSelectImg="onSelectImg" type="item" :isBtn="true" typeKey="myCollect"></price-item>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

    </div>
</template>
<script>
    /* eslint-disable no-unused-vars */
    import $ from 'jquery'
    import {myTempInfo,myTempUpdate, myTempFinalize,uploadInfo} from '@/api/template/poster.js'
    import {priceList} from '@/api/price-template/index'

    import priceItem from '@/components/price-item'
    import pictureItem from '@/components/picture-item'

    export default {
        components: {priceItem, pictureItem},
        data() {
            return {
                loading: false,
                pictureVisible: false,
                pictureTab: 'publist',
                priceTab: 'publist',
                curPicList: [],
                curPriceList: [],
                uploadApi: '',
                tabActive: '',
                tempVisible: false,
                priceDialogVisible: false,
                itemInfoList: [],

                priceTemp:[],
                selectDom: {},
                markList: [
                    {key: 'logo', name: 'Logo图', num: 0},
                    {key: 'theme', name: '主题图', num:0},
                    {key: 'commodity', name: '商品', num: 0},
                    {key: 'qrCode', name: '二维码底图', num: 0},
                    {key: 'address', name: '地址底图', num: 0},
                    {key: 'time', name: '时间底图', num: 0},
                    {key: 'other', name: '其他图', num: 0},
                ],

                html: '',     // 从后台返回的html代码
                zoom: '20',
                curImgUrl: '',
                imageUrl: '',
                form: {},

                curPriceTem: {},
                nextParams: {},
            }
        },
        mounted() {
           this.nextParams = this.$route.query;
           this.init();


        },
        methods: {
            priceTabChange() {
                this.$refs[this.priceTab].initPic();
            },
            picTabChange() {
                this.$refs[this.pictureTab].initPicture();
            },
            // 处理节点  添加价格标签
            showTemplate() {
                if (!this.curPriceTem.id) {
                    return false;
                }
                const _this = this;
                $('#htmlDom').find('img').each(function(e, index) {
                    const data = $(this).data("property");

                    if (data === 'commodity') {
                        const str = _this.curPriceTem.style;
                        if ($(this).siblings().attr('class') === 'temp-price'){
                            $('.temp-price').html(str)
                        } else{
                            $(this).after('<div style="position:absolute;z-index: 6;right:10px;bottom:10px" class="temp-price">' + _this.curPriceTem.style + '</div> ');
                        }
                    }
                });
            },

            // 商品信息回显到dom节点上
            initHtml() {
                const data = this.itemInfoList;
                let num = 0;

                $('#htmlDom').find('td').each((index,item)=> {
                    const imgDom = $(item).find('img').data();   // 图片节点
                    const priceDom = $(item).find('.cl-canvas');   // 价格节点

                    if (priceDom.length && imgDom.property && imgDom.property === 'commodity'){
                        const curData = data[num];
                        if (!curData){
                            return false;
                        }


                        $(item).find('img').attr('src', curData.imgUrl)


                        $(priceDom).find('div').each((index, items) => {
                            const itemData = $(items).data();
                            if (itemData.attribute && itemData.attribute === 'temp-price'){
                                $(items).html(curData.price)
                            }
                            if (itemData.attribute && itemData.attribute === 'temp-unit'){
                                $(items).html(curData.unit)
                            }
                            if (itemData.attribute && itemData.attribute === 'temp-name'){
                                $(items).html(curData.name)
                            }
                        });
                        num++;
                    }


                })
            },
            // 上传商品信息
            async uploadSuccess (res) {
                if (res.datas) {
                    const res = await uploadInfo({makeTemplateId: this.form.id});
                    this.itemInfoList = res.datas;
                    this.initHtml();
                }
            },

            // 保存
            async onSave(state) {
                this.form.htmlContent = $('#htmlDom').html();
                let res = await myTempUpdate(this.form);

                console.log('保存',state)
                if (state) {
                    res =  await myTempFinalize({id: this.form.id});
                }
                if (res.errcode === 0) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.$router.back();

                } else {
                    this.loading = false;
                }
            },


            // 定稿
            async onPublish() {
                this.loading = true;
                this.onSave(true)
            },
            // 价格模板以及图片选择
            onSelectImg(item) {
                if (item.selectType === 'picture') {
                    this.pictureVisible = false;
                    this.imageUrl = item.productImgUrl;
                    $(this.selectDom).attr('src', item.productImgUrl);
                } else {
                    this.priceDialogVisible = false;
                    this.curPriceTem = item;
                    console.log('选择的价格模板', this.curPriceTem)
                    this.showTemplate();
                    this.initHtml()
                }
            },
            priceTempChange(item) {
                this.curPriceList.forEach(items => {
                    if (items.id === this.form.makeTemplateId) {
                        this.curPriceTem = items;
                        this.showTemplate();
                        this.initHtml()
                    }
                })
            },
            // 更多图片
            selectOption() {
                this.pictureVisible = true;
            },
            // 下载模板
            onDownload() {
                window.open("/api/excel/download");
            },
            // 预览
            onPreview() {
                this.loading = true;
                let routeUrl = this.$router.resolve({
                    path: "/preview",
                    query: {id: this.form.id}
                });
                window.open(routeUrl.href, '_blank');

               // this.$router.push('')
                // let newwin= window.open('','', "");  //打开一个窗口并赋给变量newwin。
                // newwin.opener = null; // 防止代码对论谈页面修改
                // let html = $('#htmlDom').html();
                // newwin.document.write(html);  //向这个打开的窗口中写入代码code，这样就实现了运行代码功能。
                // newwin.document.close();
                this.loading = false;
            },
            // 初始化
            async init() {
                let data = await myTempInfo({id: this.nextParams.id});
                this.html = data.datas.htmlContent;
                this.form = data.datas;
                this.uploadApi = `/api/excel/upload?makeTemplateId=${this.form.id}`;
                this.$nextTick(()=> {
                   this.initDom();
                    this.getNumber();
                });
                this.initPrice();
            },
            initDom() {
               let _this = this;
                $('#htmlDom td').find('img').click(function () {
                    const img = $(this).attr('src');
                    _this.curImgUrl = img;
                    _this.selectDom = this;
                });
            },
            getNumber() {
                const obj = {
                    logo: 0,
                    theme: 0,
                    commodity: 0,
                    qrCode: 0,
                    address: 0,
                    time: 0,
                    other: 0,

                }
                $('#htmlDom').find('img').each(function (index, e) {
                   const data = $(e).attr('data-property');
                   if (data){
                        obj[data]++
                   }
                })
                this.markList.forEach(item => {
                    item.num = obj[item.key]
                });
            },
            async initPrice() {
                const res = await priceList({});
                for (let i=0 ; i <3 ;i ++) {
                    if (res.datas[i])
                    this.curPriceList.push(res.datas[i])
                }

            },
            // 画布放大缩小
            zoomOption(name) {
                if (name === 'big') {
                    this.zoom = +this.zoom + 20;

                } else {
                    if (this.zoom > 20) this.zoom = +this.zoom - 20;
                }
                if (this.zoom > 0) {
                    $('.temp-html').css('zoom', this.zoom/100)
                }
            },
        }
    }
</script>
<style lang="scss">
    @import "../../../static/Font/font.css";
    #usePosterWrap{
        margin-top: 20px;
        .temp-btn{
            text-align: right;
        }
        .temp-con{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;

            .temp-left{
                width: 1040px;
                overflow: hidden;
                .temp-html-wrap{
                    width: 1050px;
                    height: 700px;
                    overflow: scroll;
                }
                .bottom{
                    margin-top: 15px;
                    background: #f1f1f1;
                    padding: 5px 10px;
                }
            }
            .temp-right{
                width: 320px;
                padding: 10px;
                background: #f9f9f9;
                .right-info{
                    margin-top: 15px;
                }
                .btn-wrap{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                }
                .el-form-item{
                    margin-bottom: 5px;
                    .el-form-item__content{
                        line-height: 30px;
                    }
                    .el-form-item__label{
                        line-height: 30px;
                    }
                    .el-tag{
                        margin: 5px;
                    }
                }
                .right-btn{
                    border-top: 1px dashed #ccc;
                    text-align: center;
                    padding-top: 15px;
                    margin-top: 25px;
                }
                .right-property{
                    margin-top: 20px;
                    .title{
                         font-size: 16px;
                         line-height: 32px;
                         border-bottom: 1px #ccc dashed;
                     }
                    .img{
                        padding: 10px;
                        background: #f1f1f1;
                        width: 90%;
                        height: 250px;
                        margin: 10px auto auto;
                        overflow: hidden;
                        vertical-align: middle;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        text-align: center;
                        justify-content: center;
                        img{
                            width: auto;
                            height: auto;
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                    .item{
                        margin-top: 10px;
                        text-align: center;
                        .el-radio{
                            margin-top: 10px;
                        }
                        .item-btn{
                            margin-top: 10px;
                            text-align: center;
                        }
                    }
                }
                .list{
                    margin-top: 10px;
                    border-top: 1px #ccc dashed;
                    .list-item{
                        display: flex;
                        justify-content: space-between;
                        line-height: 20px;
                        font-size: 12px;
                        color: #333;
                        .list-item-right{
                            color: #999;
                        }
                        .item-radio{
                            text-align: center;
                        }
                    }
                }
                .price{
                    margin-top: 20px;
                    border-top: 1px #ccc dashed;
                    .title{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        font-size: 16px;
                        line-height: 32px;
                        border-bottom: 1px #ccc dashed;
                    }
                    .item{
                        display: flex;
                        justify-content: space-around;
                        .item-radio{
                            border: 1px solid #f1f1f1;
                            padding: 5px 10px;
                            line-height: 24px;
                            text-align: center;
                            width: 64px;
                            .font{
                                font-size: 12px;
                            }
                            img {
                                width: 80%;
                                height: 50px;
                            }
                        }
                    }
                    .option{
                        margin-top: 10px;
                    }

                }
            }
            .temp-html{
                width: 1040px;

                .html{
                    // zoom: 0.2
                }

            }
        }
        .price-item{
            .el-radio-group{
                font-size: 0;
                display: flex;
                text-align: center;
            }
            .el-radio {
                color: #606266;
                cursor: pointer;
                margin-right: 10px;
                width: 30%;
                border: 1px solid #eee;
                padding: 2px;
                border-radius: 5px;
            }
            .price-item-wrap{
                .price-img{
                    text-align: center;
                    height: 80px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    margin: 5px;
                    img{
                        width: 80%;
                    }
                }
                .price-title{
                    height: 24px;
                    line-height:24px;
                    font-size: 12px;
                    text-align: center;
                    color: #000;
                }
            }
        }
    }
</style>
