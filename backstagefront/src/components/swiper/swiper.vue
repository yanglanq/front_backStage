<template>
    <div class="swiper">
        <el-tabs v-model="activeName">
            <el-tab-pane label="查看信息" name="first">
                <el-table
                        :data="swiperList"
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            min-width="50">
                    </el-table-column>
                    <el-table-column
                            class="name"
                            min-width="180"
                            label="图片"
                    >
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 50px; height: 50px;border-radius: 50%;"
                                    :src="url+scope.row.url"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="intro"
                            label="描述"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="num"
                            label="优先级"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            align="right"
                            min-width="80"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="添加" name="third">
                <addNew :len="swiperList.length"></addNew>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getPic,deletePic} from "../../api/swiper";
    import addNew from "./addNew";
    export default {
        name: "swiper",
        data(){
            return{
                activeName:"first",
                swiperList:[],
                url:"http://yanglq.xyz:4430",
            }
        },
        created() {
            getPic().then(res=>{
                this.swiperList = res.data
            }).catch(err=>{
                throw err;
            })
        },
        components:{
            addNew
        },
        methods:{
            handleDelete(index,row){
                if(confirm("确定要删除吗")){
                    deletePic({
                        id:row.id,
                        num:row.num
                    }).then(res=>{
                        if(res.data){
                            this.swiperList.splice(index,1);
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>