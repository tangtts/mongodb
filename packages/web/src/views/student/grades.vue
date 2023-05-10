<template>
    <el-form :model="queryForm" label-width="120px" ref="ruleFormRef">

        <el-row>

            <el-col :span="8">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="queryForm.userName" />
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="考试名称" prop="phoneNumber">
                    <el-input v-model="queryForm.phoneNumber" />
                </el-form-item>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="语文" prop="nation">
                    <el-select v-model="queryForm.nation" class="w-full">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option v-for="(grades, index) of gradesSelect" :key="index" :label="grades.label"
                            :value="grades.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="数学" prop="nation">
                    <el-select v-model="queryForm.nation" class="w-full">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option v-for="(grades, index) of gradesSelect" :key="index" :label="grades.label"
                            :value="grades.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="英语" prop="nation">
                    <el-select v-model="queryForm.nation" class="w-full">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option v-for="(grades, index) of gradesSelect" :key="index" :label="grades.label"
                            :value="grades.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>

            <el-col :span="8">
                <el-form-item prop="class" label="按照班级查询">
                    <el-select v-model="queryForm.class" class="w-full" placeholder="请选择班级">
                        <el-option v-for="(className, index) of classes" :key="index" :label="className" :value="className">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <el-form-item>
                    <el-button type="primary" @click="fetchAllStudent">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

    <el-card>
        <template #header>
            <div class="clear-right h-[30px]">
                <el-button type="primary" class="float-right" @click="add">新增</el-button>
            </div>
        </template>

        <el-table :data="tableData" border empty empty-text="暂无数据">
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="nation" label="民族" />
            <el-table-column prop="sex" label="性别">
                <template #default="scope">
                    {{ scope.row.sex == 1 ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="address" label="地址" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="mt-4" background layout="prev, pager, next" v-model:current-page="queryForm.currentPage"
            v-model:page-size="queryForm.pageSize" @current-change="fetchAllStudent" :total="count" />
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="type == 'add' ? '添加学生成绩' : '修改学生成绩'">
        <el-form :model="form" ref="dialogForm" label-width="80px" size="large">

            <el-form-item label="用户名" prop="userName" required>
                <el-input v-model="form.userName" autocomplete="off">
                    <template #append>
                        <el-button type="primary">关联学生</el-button>
                    </template>
                </el-input>
            </el-form-item>

            <!-- 自动带出来年级 -->
            <el-form-item label="性别" prop="phoneNumber">
                <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%" disabled>
                    <el-option label="男" value="1" />
                    <el-option label="女" value="0" />
                </el-select>
            </el-form-item>


            <el-form-item prop="class" label="班级">
                <el-select v-model="form.class" class="w-full" placeholder="请选择班级" disabled>
                    <el-option v-for="(className, index) of classes" :key="index" :label="className" :value="className">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="考试名称" prop="phoneNumber">
                <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>

            <el-form-item label="语文成绩" prop="address">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>

            <el-form-item label="数学成绩" prop="address">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>

            <el-form-item label="英语成绩" prop="address">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirm">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import axios from "axios";
import { reactive, ref, toRaw, watch } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addGrades, search } from "@/axios/student";
const ruleFormRef = ref<FormInstance>()
const dialogForm = ref<FormInstance>()
const dialogFormVisible = ref(false)
const form = reactive({
    userName: "",
    age: '',
    sex: '1',
    nation: "汉族",
    phoneNumber: "18623806693",
    email: "2939117014@qq.com",
    address: "",
    class: "",
    studyStartTime: "",
})
const ageSlider = ref([10, 30])
const type = ref('add')

const gradesSelect = ref([
    {
        label: "不及格",
        value: 0
    },
    {
        label: "良好",
        value: 1
    }, {
        label: "优秀",
        value: 2
    }
])


const queryForm = reactive({
    userName: "",
    sex: '1',
    nation: "",
    class: "",
    phoneNumber: "",
    email: "",
    address: "",
    pageSize: 2,
    currentPage: 1,
    startTime: '',
    endTime: ""

})
const tableData = ref([])
const count = ref(0)



axios.get("http://localhost:3000/chineseNation").then(res => {
    if (res.data.code == 200) {
        nations.value = res.data.data
    }
})



const date = ref('')
const nations = ref([])
axios.get("http://localhost:3000/chineseNation").then(res => {
    if (res.data.code == 200) {
        nations.value = res.data.data
    }
})

const classes = ref([])

axios.get("http://localhost:3000/classes").then(res => {
    if (res.data.code == 200) {
        classes.value = res.data.data
    }
})

const add = () => {
    dialogFormVisible.value = true;
    type.value = 'add';
    dialogForm.value?.resetFields()
}

const edit = (row: any) => {
    dialogFormVisible.value = true;
    type.value = 'edit';
    dialogForm.value?.resetFields()
    axios({
        url: `http://localhost:3000/students/details?id=${row._id}`,
    }).then(res => {
        if (res.data.code == 200) {
            Object.assign(form, res.data.data)
        }
    })
}

const confirm = () => {
    if (type.value == 'add') {
        fetchAddStudent()
    } else {
        fetchUpdateStudent()
    }

}

const fetchUpdateStudent = () => {
    axios({
        method: "post",
        data: form,
        url: "http://localhost:3000/students/update",
    }).then(res => {
        if (res.data.code == 200) {
            dialogFormVisible.value = false;
            fetchAllStudent()
        } else {
            console.log(res.data.message.join(','))
        }
    })
}

const fetchAddStudent = () => {
    axios({
        method: "post",
        data: form,
        url: "http://localhost:3000/students/add",
    }).then(res => {
        if (res.data.code == 200) {
            dialogFormVisible.value = false;
            fetchAllStudent()
        }
    })
}

watch(date, function (newVal) {
    if (newVal) {
        queryForm.startTime = newVal[0]
        queryForm.endTime = newVal[1]
    } else {
        queryForm.startTime = ''
        queryForm.endTime = ''
    }
})

const fetchAllStudent = () => {

    addGrades({
        studentId: "6458fe61e3a1d0db055b8217",
        testName: "第一次",
        chineseGrades: 50,
        mathGrades: 50,
        englishGrades: 50,
    }).then(res => {
        console.log(res)
    })
    
    search({
        ...queryForm,
        startAge: ageSlider.value[0],
        endAge: ageSlider.value[1]
    }).then((res: any) => {
        const data = res.data
        tableData.value = data.data;
        count.value = data.count
    })
}
fetchAllStudent()



const reset = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
    ageSlider.value = [10, 30];
    fetchAllStudent()
}
const del = (row: any) => {
    ElMessageBox.confirm(
        '是否要删除这一项?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            axios({
                method: "get",
                url: `http://localhost:3000/students/remove?id=${row._id}`,
            }).then(res => {
                fetchAllStudent()
            })
        })
}


</script>
<style>
.studyStartTime {
    @apply w-full !important
}
</style>