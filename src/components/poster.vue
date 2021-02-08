<template>
    <div class="poster-item-wrap">
        <div class="li-con">
            <div class="temp-img">
                <img :src="info.thumbnail" v-if="info.thumbnail"/>
                <img src="../assets/temp/temp-goods.png" v-else/>
            </div>

            <div class="li-option">
                <span class="li-option-title">{{info.name}}（{{new Date(info.timeCreate).format()}}）</span>

                <div class="li-option-btn" v-if=" posterType === 'myTemList' ">
                    <el-button  type="primary" size="mini" icon="el-icon-tickets" @click="onPreview(info)"></el-button>

                    <el-button v-if="!info.finalize" type="primary" size="mini" icon="el-icon-edit" @click="onEdit(info)"></el-button>
                    <el-button v-else type="warning" size="mini" icon="el-icon-download" @click="onDownload(info)"></el-button>
                    <el-button v-if="!info.finalize" type="warning" size="mini" icon="el-icon-delete" @click="onDelete(info)"></el-button>
                </div>

                <div class="li-option-btn" v-else-if="posterType === 'posterList'">
                    <el-button v-if="!info.publish" type="primary" size="mini" icon="el-icon-edit-outline"
                               @click="onTempEdit(info)"></el-button>
                    <el-button v-if="!info.publish" type="primary" size="mini" icon="el-icon-finished"
                               @click="onPublic(info)"></el-button>
                    <el-button v-if="!info.publish" type="warning" size="mini" icon="el-icon-delete" @click="onTempDelete(info)"></el-button>
                    <el-button v-if="info.publish"  type="success" size="mini" >已发布</el-button>
                </div>

                <div class="li-option-btn"  v-else>

                    <el-button type="primary" size="mini" icon="el-icon-thumb" @click="onUser(info)"></el-button>
                    <el-button v-if="info.favoriteId" type="warning" size="mini" icon="el-icon-star-off"
                               @click="onCollect(info)"></el-button>
                    <el-button v-else type="info" size="mini" icon="el-icon-star-off"
                               @click="onCollect(info)"></el-button>
                </div>




            </div>
            <div class="label-wrap">
                <div v-if="info.label">
                    <el-tag size="mini" type="info" v-for="items in info.label.split(',')" :key="items">{{items}}
                    </el-tag>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {collectOrCancel} from '@/api/collect/index'
    import { templateUpdate, templatePublish,myTempUser, downloadAdd, myTempUpdate} from '@/api/template/poster'
    // downloadAdd
    // import $ from "jquery";
    export default {
        name: 'pictureItem',
        props: {
            info: {
                type: Object
            },
            active: {
                type: String
            },
            isEdit: {
                type: Boolean,
                default: false,
            },
            posterType: {
                type: String,
            }
        },
        mounted() {

        },
        data() {
            return {}
        },
        methods: {
            onPreview(item) {
                let routeUrl = this.$router.resolve({
                    path: "/preview",
                    query: {str: item.htmlContent}
                });
                window.open(routeUrl.href, '_blank');
            },

            async onUser(item) {
                this.$confirm('确认使用该模板?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await myTempUser({templateId: item.id});
                    this.$router.push({path: '/template/user', query: {id: res.datas, type: 'userType'}})
                }).catch(() => {

                });
            },
            async onCollect(item) {
                const params = {
                    templateId: item.id,
                    id: item.favoriteId,
                    type: 'template'
                };
                const res= await collectOrCancel(params);
                if(res) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                    this.$emit('refresh')
                }

            },
            onEdit(item) {
                item.postType = 'info';
                this.$router.push({path: '/template/user', query: {...item}})
            },
            async onDownload(item) {
                const str = ' <link rel="stylesheet" type="text/css" href="http://192.168.0.166:10087/static/file/Font/font.css">' + item.htmlContent
                const res = await downloadAdd({templateId: item.id, htmlContent: str});

                let routeUrl = `${this.$baseApi}/downloadImageById?id=${res.datas}`
                window.open(routeUrl, '_blank');

            },
            onTempEdit(item) {
                item.postType = 'info';
                this.$router.push({path: '/template/edit', query: {...item}})
            },
            onPublic(item) {
                this.$confirm('是否确认发布？发布后海报模板不能进行修改！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await  templatePublish({id: item.id});
                    if (res.errcode === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.$emit('refresh')
                    }
                }).catch(() => {

                });
            },

            async onTempDelete(item) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    item.disabled = true;
                    const res = await templateUpdate(item);
                    if (res.errcode === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.$emit('refresh')
                    }
                }).catch(() => {

                });
            },
            async onDelete(item) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    item.disabled = true;
                    const res = await myTempUpdate(item);
                    if (res.errcode === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.$emit('refresh')
                    }
                }).catch(() => {

                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .poster-item-wrap {
        display: flex;
        flex-wrap: wrap;
        margin: 10px 5px 0;
        width: 370px;
        .li-con {
            border: 1px solid #f1f1f1;
            padding: 10px;
            margin: 10px;
            max-height: 330px;

            .temp-img {
                width: 340px;
                height: 240px;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }

            .li-option {
                display: flex;
                justify-content: space-between;

                margin-top: 10px;

                .li-option-title {
                    font-size: 12px;
                    line-height: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: inline-block;
                    width: 180px;
                    .color-grap {
                        color: #999999;
                    }
                }
                .li-option-btn {
                    width: 160px;
                    text-align: right;
                }
            }

            .label-wrap {
                margin-top: 5px;
                border-top: 1px solid #f9f9f9;
                padding-top: 5px;

                .el-tag {
                    margin: 5px;
                }
            }
        }
    }
</style>
