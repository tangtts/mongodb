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
                    <el-input v-model="queryForm.testName" />
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
                    <el-button type="primary" @click="fetchAllStudentGrades">查询</el-button>
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
            <el-table-column type="index" label="序号" width="80px" />
            <el-table-column prop="userName" label="学生名称" />
            <el-table-column prop="testName" label="考试名称" />
            <el-table-column prop="className" label="班级名称" />
            <el-table-column prop="chineseTeacher.userName" label="语文老师" />
            <el-table-column prop="mathTeacher.userName" label="数学老师" />
            <el-table-column prop="englishTeacher.userName" label="英语老师" />

            <el-table-column prop="chineseGrade" label="语文成绩" />
            <el-table-column prop="mathGrade" label="数学成绩" />
            <el-table-column prop="englishGrade" label="英语成绩" />
            <!-- <el-table-column prop="englishGrade" label="平均语文成绩" />
            <el-table-column prop="englishGrade" label="平均数学成绩" />
            <el-table-column prop="englishGrade" label="平均英语成绩" /> -->
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="mt-4" background layout="prev, pager, next" v-model:current-page="queryForm.currentPage"
            v-model:page-size="queryForm.pageSize" @current-change="fetchAllStudentGrades" :total="count" />
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="type == 'add' ? '添加学生成绩' : '修改学生成绩'">
        <el-form :model="form" ref="dialogForm" label-width="80px" size="large">

            <el-form-item label="用户名" prop="student.userName" required>
                <el-input disabled v-model="form.student.userName" autocomplete="off">
                    <template #append>
                        <el-button type="primary" @click="dialogStudentFormVisible = true">关联学生</el-button>
                    </template>
                </el-input>
            </el-form-item>

            <!-- 自动带出来年级 -->
            <el-form-item label="性别" prop="phoneNumber">
                <el-select v-model="form.student.sex" placeholder="请选择性别" style="width:100%" disabled>
                    <el-option label="男" value="1" />
                    <el-option label="女" value="0" />
                </el-select>
            </el-form-item>


            <el-form-item prop="class" label="班级">
                <el-select v-model="form.student.class" class="w-full" placeholder="请选择班级" disabled>
                    <el-option v-for="(className, index) of classes" :key="index" :label="className" :value="className">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="考试名称" prop="phoneNumber">
                <el-input v-model="form.testName" autocomplete="off" />
            </el-form-item>

            <el-form-item label="语文成绩" prop="chineseGrades">
                <el-input v-model="form.chineseGrade" autocomplete="off" />
            </el-form-item>

            <el-form-item label="数学成绩" prop="mathGrades">
                <el-input v-model="form.mathGrade" autocomplete="off" />
            </el-form-item>

            <el-form-item label="英语成绩" prop="englishGrades">
                <el-input v-model="form.englishGrade" autocomplete="off" />
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


    <!-- 关联学生 -->
    <el-dialog v-model="dialogStudentFormVisible" title="关联学生">
        <el-table :data="studentsTable" border empty empty-text="暂无数据" @current-change="handleCurrentChange">
            <el-table-column width="80" label="序号">
                <template #default="scope">
                    <el-radio v-model="radio" :label="scope.row._id">
                        {{ scope.$index }}
                    </el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="名称" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="nation" label="民族" />
            <!-- <el-table-column prop="englishTeacher" label="语文平均分" /> -->
            <!-- <el-table-column prop="englishTeacher" label="数学平均分" /> -->
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogStudentFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmConnect">
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
import { addGrades, searchGrades } from "@/axios/student";
import { ElTable } from 'element-plus'
import Mock from "mockjs"
const ruleFormRef = ref<FormInstance>()
const dialogForm = ref<FormInstance>()
const dialogFormVisible = ref(false)
const dialogStudentFormVisible = ref(false)


const createForm = () => {
    return ({
        student: {
            userName: "",
            sex: "",
            class: "",
            _id: ""
        },
        studentId: "",
        testName: Mock.mock('@word(3, 5)'),
        chineseGrade: Mock.mock('@integer(0, 100)'),
        mathGrade: Mock.mock('@integer(0, 100)'),
        englishGrade: Mock.mock('@integer(0, 100)'),
    })
}

let form = reactive(createForm(),)

const confirmConnect = () => {
    dialogStudentFormVisible.value = false
    form.student = currentRow.value
    console.log(currentRow.value, "aa")
}
const studentsTable = ref([])
axios.post("http://localhost:3000/students/search").then(res => {
    studentsTable.value = res.data.data.data;

})

const currentRow = ref()
const handleCurrentChange = (val: any) => {
    console.log(val)
    currentRow.value = { ...val }
    radio.value = val._id
}



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
    class: "",
    pageSize: 2,
    currentPage: 1,
    testName:""

})
const tableData = ref([])
const count = ref(0)
const radio = ref("")


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
    form = reactive(createForm())
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
            fetchAllStudentGrades()
        } else {
            console.log(res.data.message.join(','))
        }
    })
}

const fetchAddStudent = () => {
    form.studentId = form.student._id
    axios({
        method: "post",
        data: form,
        url: "http://localhost:3000/grades/add",
    }).then(res => {
        if (res.data.code == 200) {
            dialogFormVisible.value = false;
            fetchAllStudentGrades()
        }
    })
}



const fetchAllStudentGrades = () => {
    searchGrades(queryForm).then((res: any) => {
        if (res.code == 200) {
            const data = res.data
            tableData.value = data.data;
            count.value = data.count
        }
    })
}
fetchAllStudentGrades()



const reset = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
    fetchAllStudentGrades()
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
                url: `http://localhost:3000/grades/remove?id=${row._id}`,
            }).then(res => {
                fetchAllStudentGrades()
            })
        })
}




</script>
<style>
.studyStartTime {
    @apply w-full !important
}
</style>