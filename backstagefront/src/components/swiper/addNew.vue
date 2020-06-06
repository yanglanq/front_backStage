<template>
    <div class="addNew">
        <div
                class="avatar-uploader"
        >
            <input ref="file" type="file" @change="uploadImg">
            <img v-if="info.pic" :src="base64" class="avatar">
            <i v-show="!info.pic" class="el-icon-plus"></i>
        </div>
        <el-form
                ref="info"
                :model="info"
                label-width="80px"
                :label-position="labelPosition"
                :rules="rules"
        >
            <el-form-item label="描述" prop="intro">
                <el-input placeholder="请输入轮播图描述" v-model="info.intro"
                ></el-input>
            </el-form-item>
            <el-form-item label="优先级" prop="num">
                <el-input-number v-model="info.num" :min="1" :max="len+1"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('info')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {uploadImg} from "../../api/swiper";

    export default {
        name: "addNew",
        data(){
            return{
                info:{
                    pic:null,
                    intro:"",
                    num:1
                },
                labelPosition:"left",
                base64:"",
                rules:{
                    intro:[
                        { required: true, message: '请输入描述', trigger: 'blur' },
                    ],
                    num:[
                        { required: true, message: '请输入优先级', trigger: 'change' },
                    ],
                },
                formData:null
            }
        },
        props:{
            len:{
                type:Number,
                required:true
            }
        },
        methods:{
            uploadImg(){
                let file = this.$refs.file.files[0];
                this.formData = new FormData();
                this.formData.append("pic",file)
                this.info.pic = this.formData;
                let reader = new FileReader(file);
                reader.readAsDataURL(file);
                reader.onload = (e)=>{
                    this.base64 = e.currentTarget.result;
                }
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {//表单验证成功
                        this.formData.append("intro",this.info.intro)
                        this.formData.append("num",this.info.num)
                        uploadImg(this.formData).then(res=>{
                            if(res.data){
                                this.formData = null;
                                this.info = {
                                    pic:null,
                                    intro:"",
                                    num:1
                                }
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }
                        }).catch(err=>{
                            throw err;
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .avatar-uploader {
        position: relative;
        width: 300px;
        height: 150px;
        margin: 15px auto;
        overflow: hidden;
        cursor: pointer;
        /*border-radius: 50%;*/
        border: 1px solid #ddd;

        input[type="file"] {
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            position: relative;
            z-index: 1;
            cursor: pointer;
        }
    }

    .avatar-uploader .el-icon-plus {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 28px;
        color: #8c939d;
        width: 300px;
        height: 150px;
        line-height: 150px;
        text-align: center;

    }

    .avatar-uploader:hover .el-icon-plus {
        display: block !important;
        color: #424242;
    }

    .avatar-uploader:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .avatar {
        position: absolute;
        top: 0;
        width: 300px;
        height: 150px;
        display: block;
    }
</style>