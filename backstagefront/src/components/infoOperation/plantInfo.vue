<template>
    <div class="plantInfo">
        <el-button style="display: block" type="primary" size="mini" @click="back">返回</el-button>
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
                label-position="left"
        >
            <el-form-item label="图片">
                <el-image
                        style="width: 70px; height: 70px;border-radius: 50%;"
                        :src="url+form.imgUrl"
                ></el-image>
            </el-form-item>
            <el-form-item label="名称" prop="pname">
                <el-input placeholder="" v-model="form.pname"
                ></el-input>
            </el-form-item>
            <el-form-item label="别名" prop="alias">
                <el-input placeholder="请输入用户名" v-model="form.alias"
                ></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="classification">
                <el-input placeholder="请输入用户名" v-model="form.classification"
                ></el-input>
            </el-form-item>
            <el-form-item label="花期" prop="florescence">
                <el-input placeholder="请输入用户名" v-model="form.florescence"
                ></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="intro">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        v-model="form.intro">
                </el-input>
            </el-form-item>
            <el-form-item label="生态习性" prop="habits">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        v-model="form.habits">
                </el-input>
            </el-form-item>
            <el-form-item label="形态特征" prop="feature">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        v-model="form.feature">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {updateInfo} from "../../api/infoOperation";

    export default {
        name: "plantInfo",
        data(){
            return{
                url:"http://yanglq.xyz:4430"
            }
        },
        props:{
            form:{
                type:Object,
                required:true
            }
        },
        methods:{
            back(){
                this.$emit("back");
            },
            submitForm(){
                updateInfo(this.form).then(res=>{
                    if(res.data){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                }).catch(err=>{
                    throw err;
                })
            }
        },
        created() {
        },

    }
</script>

<style scoped>

</style>