<template>
    <div class="uploadInfo">
        <el-button type="primary" class="button">
            <input type="file" class="input" ref="input" @change="readFile"/>
            点击上传
        </el-button>

        <transition name="fade">
            <div  v-if="fileList.length">
                <ul>
                    <li class="fileItem" v-for="item in fileList" v-bind:key="item.name">
                        <span class="el-icon-document"></span>
                        <span class="text">{{ item.name }}</span>
                        <span class="el-icon-error" @click="deleteItem"></span>
                    </li>
                </ul>
                <el-button type="primary" class="button submit" @click="submit">
                    确认提交
                </el-button>
            </div>

        </transition>


    </div>
</template>

<script>
    import XLSX from "xlsx";
    import {uploadInfo} from "../../api/infoOperation";

    export default {
        name: "uploadInfo",
        data() {
            return {
                detailData: [], // 解析出来的数据
                fileList:[],
                a: 0,
            };
        },
        created() {
            // console.log(this.formatDate(42618, '/'))
        },
        methods: {
            readFile(e) {
                let files = e.target.files;
                let reg = /.(xlsx|xlsm|xlsb|xls)/g;
                if (!reg.test(files[0].name)) {
                    this.$message.error('请上传类型相符的文件');
                    return;
                }
                this.fileList = [
                    {
                        name: files[0].name
                    }
                ];
                let fileReader = new FileReader();
                fileReader.onload = ev => {
                    let data = ev.target.result;
                    let workbook = XLSX.read(data, {
                        type: "binary"
                    }); // 以二进制流方式读取得到整份excel表格对象
                    let fromTo = "";
                    // 遍历每张表读取
                    for (let sheet in workbook.Sheets) {
                        // 遍历对象
                        if (workbook.Sheets) {
                            fromTo = workbook.Sheets[sheet]["!ref"]; // 开始和结束坐标
                            if (!fromTo) continue; // 这个表里没有内容
                            // 连接数组
                            this.detailData = this.detailData.concat(
                                XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                            );
                        }
                    }
                };
                fileReader.readAsBinaryString(files[0]);
                this.$refs.input.value = "";
            },
            deleteItem() {
                // this.listFinal = [];
                this.fileList = [];
                this.detailData = [];
                this.$refs.input.value = "";
            },
            submit(){
                console.log(this.detailData)
                this.detailData.forEach(item=>{
                    uploadInfo(item).then(res=>{
                        console.log(res)
                    }).catch(err=>{
                        throw err;
                    })
                })
                this.detailData = [];
                this.fileList = [];
                this.$refs.input.value = "";
            },
        }
    };
</script>

<style scoped lang="less">
    .upload {
        width: 100%;
        height: 100%;
    }

    ul {
        height: 40px;
    }

    .button {
        position: relative;
        margin: 0;
        overflow: hidden;
        display: block;
    }
    .submit{
        margin-top: 20px;
        transition: .3s;
    }
    .input {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
    }

    .fileItem {
        margin-top: 20px;
        list-style: none;
        padding: 10px;
        width: 200px;
        height: 20px;
        line-height: 20px;
        text-align: left;
        font-size: 14px;
        color: #999;
        border: 1px solid #999;
        cursor: pointer;

        span {
            display: block;
            height: 20px;
            line-height: 20px;
            float: left;
        }

        .el-icon-document {
            margin-right: 10px;
        }

        .el-icon-error {
            opacity: 0;
            float: right;
            transition: 0.3s;
        }

        .text {
            max-width: 160px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .fileItem:hover .el-icon-error {
        opacity: 1;
    }

    .fade-enter-active {
        transition: all 0.3s ease;
    }

    .fade-leave-active {
        transition: all 0.3s ease;
    }

    .fade-enter,
    .fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
