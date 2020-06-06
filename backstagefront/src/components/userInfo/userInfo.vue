<template>
    <div class="userInfo">
        <el-table
                :data="userList"
                style="width: 100%">
            <el-table-column
                    type="index"
                    min-width="50">
            </el-table-column>
            <el-table-column
                    prop="headUrl"
                    class="name"
                    min-width="180"
                    label="头像"
            >
                <template slot-scope="scope">
                    <el-image
                            style="width: 50px; height: 50px;border-radius: 50%;"
                            :src="url+scope.row.imgUrl"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="nickName"
                    label="昵称"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    min-width="180"
            >
            </el-table-column>
            <el-table-column
                    align="right"
                    min-width="180"
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
    </div>
</template>

<script>
    export default {
        name: "userInfo",
        data(){
            return{

            }
        },
        methods:{

        },
        created() {

        }
    }
</script>

<style scoped>

</style>