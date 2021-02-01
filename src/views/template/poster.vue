<template>
    <div id="posterWrap"  v-loading="loading">
        <div class="temp-btn" >
            <el-button type="primary" size="small"  style="float: left" @click="$router.back()">返回</el-button>
            <el-button type="primary" size="small" @click="onSave(false)">保存</el-button>
            <el-button type="default" size="small" @click="onPreview">预览</el-button>
            <el-button type="warning" size="small" @click="onPublish">发布</el-button>
        </div>

        <div class="temp-con" >
            <div class="temp-left">
                <div class="temp-html-wrap" >
                    <div class="temp-html" style="zoom: 0.2" id="htmlDomWrap">
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
                <div v-if="!isNext" class="right-info" >
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="海报尺寸">
                           {{form.width}}*{{form.height}}
                        </el-form-item>
                        <el-form-item label="印刷尺寸">
                            <el-select v-model="form.printSize"  placeholder="请选择" style="width: 100%" size="small">
                                <el-option label="大16K" value="大16K"></el-option>
                                <el-option label="8K" value="8K"></el-option>
                                <el-option label="4K" value="4K"></el-option>
                                <el-option label="16K8P" value="16K8P"></el-option>
                                <el-option label="16K16P" value="16K16P"></el-option>
                                <el-option label="8K8P" value="8K8P"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="海报名称">
                            <el-input v-model="form.name" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="活动日期">
                            <el-date-picker
                                    size="small"
                                    style="width: 100% "
                                    v-model="form.timeActivity"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="海报标签">
                            <el-input v-model="form.labelStr" size="small" placeholder="按下回车键添加标签" @change="onAddLable"></el-input>
                            <el-tag closable @close="closeTag(item)" v-for="(item,index) in labelList" :key="index">{{item}}</el-tag>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-if="!isNext" class="right-property">
                    <div class="title" v-if="curImgUrl">图标属性</div>
                    <div class="img" v-if="curImgUrl">
                        <img :src="curImgUrl" />
                    </div>
                    <div class="item" v-if="curImgUrl">
                        <el-radio-group v-model="property">
                            <el-radio :label="item.key" v-for="item in markList" :key="item.key">{{item.name}}</el-radio>
                        </el-radio-group>
                        <div class="item-btn">
                            <el-button type="primary" size="small" @click="onProperty">保 存</el-button>
                        </div>
                    </div>
                    <div class="list">
                        <div class="title">已设置清单列表</div>
                        <div class="list-item" v-for="item in  markList" :key="item.key" >
                            <span class="list-item-left">{{item.name}}</span>
                            <span class="list-item-right"> {{item.num}} 张</span>
                        </div>
                    </div>
                </div>
                <div class="price" v-if="isNext">
                    <div class="title">
                        <span class="font">设置默认价格模板</span>
                        <el-button type="text" @click="priceDialogVisible = true" >更多</el-button>
                    </div>
                    <div class="price-item">
                        <el-radio-group v-model="form.makeTemplateId" @change="priceTempChange">
                            <el-radio :label="item.id" v-for="item in priceTemp" :key="item.id" class="price-item-wrap">
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
                <div class="right-btn">
                    <el-button v-if="!isNext" type="warning" size="small" @click="onNext(true)">下一步</el-button>
                    <el-button v-else  type="warning" size="small" @click="onNext(false)">上一步 </el-button>
                </div>
            </div>
        </div>


        <el-dialog title="预览" :visible.sync="tempVisible"  width="400px">
           <div id="dialogPre">
               <div v-html="html"></div>
           </div>
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
    import {templateInfo, templateUploadInfo, templateUpdate, templateAdd, templatePublish} from '@/api/template/poster.js'
    import {priceList} from '@/api/price-template/index'
    import priceItem from '@/components/price-item'
    import html2canvas from "html2canvas";
    export default {
        components: {priceItem},
        data() {
            return {
                priceTab: 'publist',
                loading: false,
                tabActive: '',
                tempVisible: false,
                priceDialogVisible: false,
                isNext: false,
                labelList:[],
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
                property: '',   // 属性值
                html: '',       // 从后台返回的html代码
                zoom: '20',
                curImgUrl: '',
                form: {
                },
                type: '',
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
            // 价格模板以及图片选择
            onSelectImg(item) {
                this.priceDialogVisible = false;
                this.curPriceTem = item;
                this.showTemplate();
            },

            // 下一步 or  上一步
            onNext(bo) {
                if (bo && this.curPriceTem.id) {
                    this.showTemplate();
                } else {
                    $('#htmlDom').find('.temp-price').remove();
                }
                this.isNext = bo;
            },
            // 保存
            async onSave(state) {
                this.loading = true;
                if (state) {
                    $('#htmlDom').find('td').removeClass('.temp-tag');
                    this.showTemplate();
                } else {
                    $('#htmlDom').find('.temp-price').remove();
                }

                this.form.label = this.labelList.join(',');
                this.form.htmlContent = $('#htmlDom').html();
                this.form.priceTemplateId = this.curPriceTem.id;
                let res = null;

                if (!this.form.name) {
                    this.$message('必填项：模板名称');
                    this.loading = false;
                    return false;
                }

                html2canvas($('#htmlDom table')[0],{
                    useCORS: true,
                    scale: 0.1, //设置放大的倍数
                    height: this.form.height,
                    windowHeight: this.form.height
                }).then(async canvas => {
                    let dataURL = canvas.toDataURL("image/png");
                    this.form.thumbnail = dataURL;
                    if (this.form.id) {
                        res = await templateUpdate(this.form);
                    } else {
                        const params = Object.assign({}, this.form, {psTemplateId: this.nextParams.id})
                        res = await templateAdd(params);
                        this.form.id = res.datas;
                        console.log('看到的this', this.form)
                    }
                    console.log('稍等', this.form)
                    if (state) {
                        res =  await templatePublish({id: this.form.id});
                    }

                    if (res.errcode === 0) {
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        if (state) this.$router.back();
                        if (!state && this.isNext){
                            this.showTemplate()
                        }
                        this.loading = false;
                    } else {
                        this.loading = false;
                    }
                })

            },
            // 预览
            onPreview() {
                this.loading = true;
                this.showTemplate();
                let routeUrl = this.$router.resolve({
                    path: "/preview",
                    query: {str: $('#htmlDom').html()}
                });
                window.open(routeUrl.href, '_blank');
                if (!this.isNext) {
                    $('#htmlDom').find('.temp-price').remove();
                }
                this.loading = false;
            },
            // 处理节点  添加价格标签
            showTemplate() {
                if (!this.curPriceTem.id) {
                    return false;
                }
                const _this = this;
                $('#htmlDom').find('img').each(function(e, index) {
                    const data = $(this).attr('data-property');
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
            // 发布
            onPublish() {
                this.$confirm('此操作将不能进行删除和修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    this.onSave(true)
                }).catch(() => {
                    this.loading = false;
                });

            },
            // 初始化
            async init() {
                let data = null;
                if (this.nextParams.postType === 'info') {
                   data =  await templateInfo({id: this.nextParams.id});
                    this.html = data.datas.htmlContent;
                    this.form = data.datas;
                } else {
                    data =  await templateUploadInfo({templateId: this.nextParams.id});
                    this.html = data.datas.htmlContent;
                    this.form.bgUrl = `${this.$api}${data.datas.bjHexUrl}`;
                }

                this.$nextTick(()=> {
                    this.initDom();
                    this.getNumber();
                });
                const priceData = await priceList({});
                for (let i=0 ; i <3 ;i ++) {
                    if (priceData.datas[i]) {
                        this.priceTemp.push(priceData.datas[i])
                    }

                }

                console.log('拿到了值', this.priceTemp)
                if (!this.form.priceTemplateId) {
                    return  false
                }
                this.priceTemp.forEach(item=> {
                    if (item.id === this.form.priceTemplateId) {
                        this.curPriceTem = item
                    }
                })

            },
            priceTempChange(item) {
                console.log(item)
                this.priceTemp.forEach(items => {
                    if (items.id === this.form.makeTemplateId) {
                        this.curPriceTem = items;
                        this.showTemplate();
                    }
                })
            },
            initDom() {
                let _this = this;
                $('#htmlDom img').click(function () {
                    _this.property = $(this).attr('data-property');
                    _this.curImgUrl = $(this).attr('src');
                    _this.selectDom =  this;
                });
                $('#htmlDom').find('td').each(function () {
                    $(this).css('position','relative')
                });
                if(this.form.bgUrl) {
                    $('#htmlDom table').css('background-image', `url(${this.form.bgUrl})`).css('background-repeat', 'no-repeat');
                }



                // 获取table 的 宽度和高度
                const table = $('#htmlDom table');
                this.form.width = table.attr('width');
                this.form.height = table.attr('height');
                this.labelList = this.form.label ? this.form.label.split(',') : [];
            },
            // 属性保存
            onProperty() {
                const dom = $(this.selectDom);
                if (dom && dom[0]) {
                    dom.attr('data-property', this.property);
                    dom.parent().addClass('temp-tags');
                }
                this.getNumber();
            },
            getNumber() {
                const _this  = this;
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
                   const data = $(e).data('property');
                   if (data){
                        obj[data]++
                   }
                })
                this.markList.forEach(item => {
                    item.num = obj[item.key]
                });

            },
            // 删除标签
            closeTag(item) {
                const num = this.labelList.indexOf(item);
                if (num !== -1) {
                    this.labelList.splice(num , 1)
                }
            },
            // 添加标签
            onAddLable() {
                if (this.labelList.length > 5) {
                    this.$message('标签数量不能超过6个');
                    return false;
                }
                if (this.labelList.includes(this.form.labelStr)) {
                    return false;
                }

                this.labelList.push(this.form.labelStr)
                this.form.labelStr = '';

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
    #posterWrap{
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
        .temp-tags{
            position: relative;
        }
        .temp-tags:before{
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            font-weight: bold;
            color: #000;
            height: 0px;
            line-height: 0px;
            border: #0614cb 50px solid;
            border-left-color: transparent;
            border-bottom-color: transparent;
            content: "";
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
