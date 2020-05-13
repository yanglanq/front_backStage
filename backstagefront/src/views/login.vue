<template>
    <div class="login">
        <background :ball_color="ball_color" :bg_color="bg_color"></background>

        <el-row class="card">
            <el-col class="con"
                    :xs="{span:10,offset:6}"
                    :sm="{span:10,offset:6}"
                    :md="{span:8,offset:8}"
                    :lg="{span:6,offset:9}"
                    :xl="{span:6,offset:9}"
            >
                <div class="title">
                    管理员登录
                </div>
                <el-form
                        ref="form"
                        :model="form"
                        label-width="80px"
                        :label-position="labelPosition"
                        :rules="rules"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="请输入用户名" v-model="form.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">立即登陆</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import background from "../components/background";
    import {mapMutations} from "vuex";
    export default {
        name:"login",
        data () {
            return {
                ball_color:{//小球颜色
                    r: 64,
                    g: 158,
                    b: 255
                },
                bg_color:"rgba(236, 245, 255,0.3)",//背景颜色
                form: {//表单数据内容
                    username: '',//用户名
                    password: '',//密码
                },
                labelPosition:"left",
                coverShow:false,
                rules:{
                    //表单基础验证内容
                    username:[
                        {
                            required:true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        }
                    ],
                    password:[
                        {
                            required:true,
                            message: '请输入密码',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        components:{
            background,
        },
        methods:{
            submitForm(){
                this.$refs.form.validate((valid) => {
                    if (valid) {//表单验证成功
                        if(this.form.password=="123456"&&this.form.username=="admin"){
                            this.setLogin("true");// 成功登录
                            sessionStorage.setItem("login","true");
                            this.$router.push("/Home");
                        }else {
                            alert("请重新登录")
                        }
                        // alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            ...mapMutations({
                setLogin:"setLogin"
            }),
            aaa(){
            }

        },
        created() {
        }
    }
</script>

<style lang="less">
    .login {
        padding-top: 100px;
        width: 100%;
        min-height: 100%;

        .card {
            /*height:400px;*/

            .titleL {
                position: relative;
                top: 120px;
                margin: 0 auto;
                width: 570px;
                text-align: center;
                font-family: "PingFang SC";
                font-size: 55px;
                font-weight: bold;
                color: #fff;
                background-color: #409EFF;
                letter-spacing: 20px;
            }

            .con {
                padding: 0 20px 20px;
                height: 100%;
                background-color: #fff;
                box-shadow: 4px 6px 12px 0 rgba(64, 158, 255, 0.25);
                border-radius: 10px;
                min-width: 300px !important;

                .nav {
                    text-align: center;
                }
                .title{
                    margin-bottom: 20px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    color: #409EFF;
                    font-size: 18px;
                    border-bottom: 1px solid #ddd;
                }

            }

        }
    }
</style>
