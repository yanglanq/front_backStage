<template>
    <div class="infoOperation">
        <el-tabs v-model="activeName">
            <el-tab-pane label="多肉信息" name="first">
                <checkInfo></checkInfo>
            </el-tab-pane>
            <el-tab-pane label="上传信息" name="third">
                <uploadInfo></uploadInfo>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import checkInfo from "./checkInfo";
    import uploadInfo from "./uploadInfo";
    export default {
        name: "infoOperation",
        data(){
            return{
                activeName:"first"
            }
        },
        components:{
            checkInfo,
            uploadInfo
        }
    }
</script>

<style scoped>

</style>