<template>
    <div id="priceAddWrap">
        <div class="temp-btn">
            <div class="btn-left">
                <el-button v-if="!info.id" type="primary" size="small" icon="el-icon-plus" @click="newCanvas">新建</el-button>
            </div>
            <div class="btn-right">
                <el-button type="primary" size="small" @click="onSave(false)">保存</el-button>
                <el-button type="default" size="small" @click="onPreview">预览</el-button>
                <el-button type="warning" size="small" @click="onPublic">发布</el-button>
            </div>
        </div>

        <div v-if="isCanvas" class="temp-con">
            <div class="con-left">
                <div class="font-style">
                    <div class="naicha" @click="fontFm('naicha')" data-key="naicha">焦糖奶茶</div>
                    <div class="rimanfeng" @click="fontFm('rimanfeng')"  data-key="rimanfeng">南构日漫风</div>
                    <div class="test" @click="fontFm('test')"   data-key="test">叶根友伟刚崇安</div>
                    <div class="W05" @click="fontFm('W05')"  data-key="W05">苍耳近楷W05</div>
                    <div class="yegenyou" @click="fontFm('yegenyou')"   data-key="yegenyou">叶根友伟刚崇安</div>
                    <div class="FZY1JW" @click="fontFm('FZY1JW')"   data-key="FZY1JW">叶根友伟刚崇安</div>
                    <div class="HYQIHEI" @click="fontFm('HYQIHEI')"   data-key="HYQIHEI">叶根友伟刚崇安</div>

                    <div class="simyou" @click="fontFm('simyou')"   data-key="yegenyou">simyou</div>
                    <div class="IMPACT" @click="fontFm('IMPACT')"   data-key="IMPACT">IMPACT</div>
                    <div class="AGENCYB" @click="fontFm('AGENCYB')"   data-key="AGENCYB">AGENCYB</div>

                    <div class="CONSTANB" @click="fontFm('CONSTANB')"   data-key="CONSTANB">CONSTANB</div>
                    <div class="CONSOLA" @click="fontFm('CONSOLA')"   data-key="CONSOLA">CONSOLA</div>
                    <div class="ARIAL" @click="fontFm('ARIAL')"   data-key="ARIAL">ARIAL</div>
                    <div class="ARIALBD" @click="fontFm('ARIALBD')"   data-key="ARIALBD">ARIALBD</div>
                    <div class="BAHNSCHRIFT" @click="fontFm('BAHNSCHRIFT')"   data-key="BAHNSCHRIFT">BAHNSCHRIFT</div>
                    <div class="BLACKSWORD" @click="fontFm('BLACKSWORD')"   data-key="BLACKSWORD">BLACKSWORD</div>

                    <div class="sanjihua" @click="fontFm('sanjihua')"   data-key="sanjihua">三极花信简体</div>
                </div>
            </div>
            <div class="con-middle">
                <div class="con-middle-wrap" >

                        <div id="canvas" ref="canvas" class="cl-canvas" :style="'width:'+form.width+'px;height:'+form.height+'px;'">
                        </div>

                </div>
                <div class="middle-botton">
                    <i class="el-icon-zoom-in" @click="zoomOption('big')"></i> &emsp;
                    <el-input v-model="zoom"  disabled style="width:100px;" size="mini"></el-input>
                    &emsp;<i class="el-icon-zoom-out" @click="zoomOption('small')"></i>
                </div>
            </div>
            <div class="con-right">
                <div class="right-wrap">
                    <div class="right-item-wrap">
                        <div class="title"> 背景图片设置 </div>
                        <div class="text">画布大小： {{form.width}}*{{form.height}}px</div>
                        <el-upload
                                class="upload-demo"
                                action="/api/file/upload"
                                multiple
                                :limit="1"
                                :on-success	= "uploadSucess"
                               >
                            <el-button type="primary">更换背景图片</el-button>
                        </el-upload>
                    </div>
                    <div class="right-item-wrap">
                        <div class="title"> 模板设置 </div>
                        <el-radio-group v-model="formAttr.attribute" @change="attrChange">
                            <el-radio label="temp-price">价格</el-radio>
                            <el-radio label="temp-name">名称</el-radio>
                            <el-radio label="temp-unit">单位</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="right-item-wrap">
                        <div class="title"> 字体样式设置 </div>
                        <div class="item-title">设置宽度</div>
                        <el-input style="width: 180px;margin-top: 10px;" v-model="formAttr.width" placeholder="请输入合理的宽度" size="mini"></el-input>
                        <div class="item-title">字体大小</div>
                        <el-select  style="width: 180px;margin-top: 10px;" size="small" v-model="formAttr.fontSize" placeholder="请选择" @change="fontChange" class="input">
                            <el-option

                                    v-for="item in fontSizeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="item-title">字体颜色</div>
                        <el-color-picker style="width: 180px;margin-top: 10px; text-align: left"  v-model="formAttr.fontColor"  @change="fontColorChange"></el-color-picker>

                        <div class="item-title">其他设置</div>
                        <div class="item-other">
                            <div class="item-list" title="加粗" @click="fontStyleSet('weight')">
                                <i class="iconfont icon-b"></i>
                            </div>
                            <div class="item-list" title="字体倾斜" @click="fontStyleSet('italic')">
                                <i class="iconfont icon-I"></i>
                            </div>
                            <div class="item-list" title="下划线" @click="fontStyleSet('underline')">
                                <i class="iconfont icon-U"></i>
                            </div>
                            <div class="item-list" title="左对齐"  @click="fontStyleSet('left')">
                                <i class="iconfont icon-duiqifangshi"></i>
                            </div>
                            <div class="item-list" title="居中"  @click="fontStyleSet('center')">
                                <i class="iconfont icon-duiqifangshi_zhong"></i>
                            </div>
                            <div class="item-list" title="右对齐" @click="fontStyleSet('right')">
                                <i class="iconfont icon-youduiqi"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="新建价格模板" :visible.sync="markVisible"  width="450px">
            <el-form :model="form"  ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input  v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="宽度" prop="width">
                    <el-input v-model.number="form.width"></el-input>
                </el-form-item>
                <el-form-item label="高度" prop="height">
                    <el-input v-model="form.height" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="价格模板预览" :visible.sync="previewVisible"  :width = "+form.width + 200 +'px'" :height="+form.height + 200 + 'px'">
            <div id="previewCanvas" style="border:1px solid #f9f9f9">

            </div>
        </el-dialog>


    </div>
</template>
<script>
    /* eslint-disable no-unused-vars */
    import $ from 'jquery'

    import html2canvas from 'html2canvas'

    import {priceAdd, priceInfo, priceUpdate, pricePublish} from '@/api/price-template/index'
    export default {
        data() {
            return {
                isCanvas: false,
                markVisible: false,
                previewVisible: false,
                zoom: '100',         // 设置画布的大小
                selectDom: '',       // 选中的dom节点
                fontSizeList:[
                    {value: '12', label: '12'},
                    {value: '14', label: '14'},
                    {value: '18', label: '18'},
                    {value: '20', label: '20'},
                    {value: '24', label: '24'},
                    {value: '28', label: '28'},
                    {value: '34', label: '34'},
                    {value: '38', label: '38'},
                    {value: '40', label: '40'},
                    {value: '42', label: '42'},
                    {value: '44', label: '44'},
                    {value: '46', label: '46'},
                    {value: '48', label: '48'},
                    {value: '50', label: '50'},
                    {value: '60', label: '60'},
                    {value: '70', label: '70'},
                ],
                info: {},
                form: {
                    name: '',
                    width: '',
                    height: '',
                },
                formAttr: {
                    fontSize: '12',      // 设置字体的大小
                    fontColor: '',     // 设置字体的颜色
                    attribute: '',
                    width: '',
                },
            }
        },
        mounted() {
            this.initJquery();
            const params = this.$route.query;
            if (params.id){
                this.initData(params)
            }
        },
        watch: {
            'formAttr.width'(val) {
                if (this.selectDom) {
                    $(this.selectDom).css('width',`${val}px`)
                } else {
                    this.$message('请选择需要设置的节点');
                }
            }
        },
        methods: {
            // 发布
            onPublic() {
                this.$confirm('是否确认发布？发布后价格模板不能进行修改！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                 this.onSave(true);
                }).catch(() => {

                });

            },
            // 保存
            async onSave(state) {
                $('#canvas').find('.drag-wrap').removeClass('active');

                html2canvas($('#canvas')[0],{
                    useCORS: true,
                    scale: 1, //设置放大的倍数
                    height: this.form.height,
                    windowHeight: document.getElementById('priceAddWrap').scrollHeight
                }).then(async canvas => {
                    let dataURL = canvas.toDataURL("image/png");
                    this.form.style = $('.con-middle-wrap').html();
                    this.form.thumbnail = dataURL;
                    let res = {};
                    if (this.form.id) {
                        res = await  priceUpdate(this.form);
                    } else {
                        res = await  priceAdd(this.form);
                        this.form.id = res.datas.data;
                    }
                    if (state) {
                        res = await  pricePublish({id: this.form.id});
                    }
                    if (+res.errcode === 0){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.$router.back()
                    }
                });
            },
            // 预览
            async onPreview() {
                this.previewVisible = true;
                this.$nextTick(() => {
                    const data = $('.con-middle-wrap').html();
                    $('#previewCanvas').html(data);
                })
            },

            // 字体设置
            fontFm(name) {
                if (this.selectDom) {
                    $(this.selectDom).css({
                        fontFamily: name
                    });
                } else {
                    $('#canvas').append('<div class="drag-wrap" style="font-size: 12px;position: absolute;left:10px; top:10px;font-family: ' + name + '" id="move-' + new Date().getTime()+ '">添加文本</div>');
                    this.initFontFun();
                }
            },
            // 属性设置
            attrChange(e) {
                console.log(e);
                $(this.selectDom).attr('data-attribute', e)
            },
            // 字体样式变化
            fontChange() {
                if (this.selectDom) {
                    $(this.selectDom).css('fontSize',`${this.formAttr.fontSize}px`)
                } else {
                    this.$message('请选择需要设置的节点');
                }
            },
            fontColorChange(e) {
                if (this.selectDom) {
                    $(this.selectDom).css('color',`${this.formAttr.fontColor}`)
                } else {
                    this.$message('请选择需要设置的节点');
                }
            },
            fontStyleSet(name) {
                let cssObj = {};
                const dom = $(this.selectDom);
                switch (name) {
                    case 'weight':
                        if (+dom.css('fontWeight') === 400) {
                            cssObj.fontWeight = 'bold';
                        } else {
                            cssObj.fontWeight = 'normal';
                        }
                        break;
                    case 'italic':
                        if (dom.css('fontStyle') === 'italic') {
                            cssObj.fontStyle = 'inherit';
                        } else {
                            cssObj.fontStyle = 'italic';
                        }
                        break;
                    case 'underline':
                        if( dom.css('textDecoration') === 'line-through solid rgb(0, 0, 0)') {
                            cssObj.textDecoration = 'none';
                        } else {
                            cssObj.textDecoration = 'line-through';
                        }
                        break;
                    case 'left':
                        cssObj.textAlign = 'left';
                        break;
                    case 'right':
                        cssObj.textAlign = 'right';
                        break;
                    case 'center':
                        cssObj.textAlign = 'center';
                        break;
                }
                $(this.selectDom).css(cssObj);
            },

            // 背景图片
            uploadSucess(response) {
                $('#canvas').css('background-image', 'url('+ response.datas.url +')')
                    .css('background-size', '100%')
                    .css('background-repeat', 'no-repeat');
            },
            // 初始化jquery
            initJquery() {
                const _this = this;
                $(document).keydown(function(e) {
                    if (e && +e.keyCode === 46) {
                        if (_this.selectDom) {
                            $(_this.selectDom).remove();
                            _this.selectDom = '';
                        }
                    }
                })
            },
            async initData(params) {
                const res = await priceInfo({id: params.id});
                this.info = res.datas;
                this.isCanvas = true;
                this.$nextTick(()=> {
                    $('.con-middle-wrap').html(res.datas.style);
                    this.form = res.datas;
                    this.initFontFun();
                })
            },
            // 拖拽功能初始化
            initFontFun() {
                const that= this;
                // 拖动效果
                $('.drag-wrap').mousedown(function (event) {
                    event.stopPropagation();
                    const old_left = event.pageX;
                    const old_top = event.pageY;
                    const old_position_left = $(this).position().left;
                    const old_position_top = $(this).position().top;
                    const _this = this;

                    $('#canvas').mousemove(function (event) {
                        const new_left = event.pageX;    //新的鼠标左侧偏移量
                        const new_top = event.pageY;     //新的鼠标竖直方向上的偏移量

                        //计算发生改变的偏移量是多少
                        const chang_x = new_left - old_left;
                        const change_y = new_top - old_top;
                        let new_position_left = old_position_left + chang_x;
                        let new_position_top = old_position_top + change_y;

                        if(new_position_left < 0){//当上边的偏移量小于0的时候，就是上边的临界点，就让新的位置为0
                            new_position_left = 0;
                        }
                        if( new_position_top < 0 ){//当上边的偏移量小于0的时候，就是上边的临界点，就让新的位置为0
                            new_position_top = 0;
                        }
                        $(_this).css({
                            left: new_position_left + 'px',
                            top: new_position_top + 'px'
                        })
                    });
                });

                // 拖动发ing下的效果
                $('.drag-wrap').mouseup(function(event){
                    event.stopPropagation();
                    $('#canvas').off("mousemove");
                });

                // 双击编辑文本
                $('.drag-wrap').dblclick(function (event) {
                    $(this).attr('contenteditable', true)
                });

                // 点击不可文本编辑
                $('#canvas').click(function (e) {
                    const target = e.target;
                    if (!($(target).attr("class").includes('drag-wrap')) ) {
                        that.selectDom = null;
                        $('.drag-wrap').removeAttr('contenteditable').removeClass('active');
                    }
                });

                // // 选中的效果
                $('.drag-wrap').click(function () {
                    that.selectDom = this;
                    const form = {
                        width: $(this).css('width').replace('px', ''),
                        fontSize: $(this).css('fontSize').replace('px', ''),
                        fontColor: $(this).css('color'),
                        attribute: $(this).data('attribute')
                    };

                    that.formAttr = Object.assign({}, that.formAttr, form)
                    $(this).addClass('active').siblings().removeClass('active');
                });

            },
            // 新建一个图层
            newCanvas() {
                this.markVisible = true;
                this.$nextTick( ()=> {
                    this.onReset();
                })

            },
            // dialog保存
            onSubmit() {
                this.isCanvas = true;
                this.markVisible = false;
            },
            // dialog重置
            onReset() {
                console.log(this.$refs['ruleForm'])
                this.$refs['ruleForm'].resetFields();
            },
            // 画布放大缩小
            zoomOption(name) {
                if (name === 'big') {
                    this.zoom = +this.zoom + 25;

                } else {
                    if (this.zoom > 25) this.zoom = +this.zoom - 25;
                }
                if (this.zoom > 0) {
                    $('.con-middle-wrap').css('zoom', this.zoom/100)
                }
            },
        }
    }
</script>
<style lang="scss">
    @import "../../../static/Font/font.css";
    @import "../../assets/css/price.css";
    #priceAddWrap{
        margin-top: 20px;
        .temp-btn{
            display: flex;
            justify-content: space-between;
        }

        .el-upload-list{
            height: 32px;
        }
    }
    .temp-con{
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        .con-left{
            width: 200px;
            position: relative;
            overflow: hidden;
            .font-style{
                position: absolute;
                top: 0px;
                bottom: 0;
                height: 100%;
                line-height: 42px;
                width: 212px;
                border: 1px solid #f1f1f1;
                text-align: center;
                overflow-y: scroll;
                div{
                    border-bottom: 1px #f1f1f1 dashed;
                }
            }
        }

        .con-middle{
            width:900px;
            min-height: 600px;
            margin-left: 10px;
            margin-right: 10px;
            .con-middle-wrap{
                position: relative;
                background: #f9f9f9;
                height: 100%;
                overflow: scroll;
                .active {
                    border:1px dashed #ccc;
                }
                .cl-canvas{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    background: #fff;
                }

            }
            .middle-botton{
                margin-top: 10px;
                background: #f9f9f9;
                padding: 10px 12px;
                text-align: right;
            }


        }
        .con-right{
            width: 280px;
            position: relative;
            .right-wrap{
                position: absolute;
                top: 0px;
                bottom: 0;
                height: 100%;
                width: 278px;
                border: 1px solid #f1f1f1;
                text-align: center;
                .right-item-wrap{
                    padding: 10px;
                    border-bottom: 1px solid #f9f9f9;
                    text-align: left;
                    .upload-demo{
                        text-align: center;
                    }
                    .title{
                        line-height: 32px;
                        font-size: 14px;
                        text-align: left;
                        font-weight: bold;
                    }
                    .item-title{
                        font-size: 12px;
                        line-height: 32px;
                        text-align: left;
                        display: inline-block;
                        width: 60px;
                    }
                    .item-other{
                        display: flex;
                        flex-wrap: wrap;
                        .item-list {
                            border: 1px solid #f9f9f9;
                            margin: 2px;
                            background: #f1f1f1;
                            width: 45px;
                            height: 45px;
                            line-height: 40px;
                            text-align: center;
                        }
                    }
                    .text{
                        font-size: 14px;
                        text-align: left;
                        text-indent: 10px;
                        line-height: 32px;
                    }
                }
            }
        }
    }
</style>
