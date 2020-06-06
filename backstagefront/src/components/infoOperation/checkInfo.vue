<template>
    <div class="checkInfo">
        <div class="list" v-show="!currentInfo.plantid">
            <el-table
                    :data="currentList"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="imgUrl"
                        class="name"
                        label="图片"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 50px; height: 50px;border-radius: 50%;"
                                :src="url+scope.row.imgUrl"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="pname"
                        label="名称"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="classification"
                        label="分类"
                        min-width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="florescence"
                        label="花期"
                        min-width="180"
                >
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
                                @click="handleCheck(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pageTool :step="step" :list="plantList" @check="changeList"></pageTool>
        </div>
        <div class="check" v-if="currentInfo.plantid">
            <plantInfo :form="currentInfo" @back="back"></plantInfo>
        </div>
    </div>
</template>

<script>
    import {getPlantInfo} from "../../api/infoOperation";
    import pageTool from "../pageTool";
    import plantInfo from "./plantInfo";
    export default {
        name: "checkInfo",
        data(){
            return{
                plantList:[],
                currentList:[],
                step:6,
                url:"http://yanglq.xyz:4430",
                currentInfo:{}
            }
        },
        created() {
            if(localStorage.getItem("plantInfo")){
                this.plantList = JSON.parse(localStorage.getItem("plantInfo"))
                this.currentList = this.plantList.slice(0,this.step);
            }else {
                getPlantInfo().then(res=>{
                    this.plantList = res.data;
                    this.currentList = this.plantList.slice(0,this.step);
                    localStorage.setItem("plantInfo",JSON.stringify(res.data));
                }).catch(err=>{
                    throw err;
                })
            }
        },
        methods:{
            changeList(list){
                this.currentList = list;
            },
            handleCheck(index,row){
                this.currentInfo = row;
            },
            back(){
                this.currentInfo = {};
            }
        },
        components:{
            pageTool,
            plantInfo
        }
    }
</script>

<style scoped>

</style>