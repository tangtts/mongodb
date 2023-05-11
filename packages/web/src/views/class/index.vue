<template>
    <el-form :model="queryForm" label-width="120px" ref="ruleFormRef">

        <!-- 一个老师对应多个班级,一个班级对应多个老师 -->
        <el-row>
            <el-col :span="8">
                <el-form-item prop="class" label="班级">
                    <el-select v-model="queryForm.class" class="w-full" placeholder="请选择班级">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option v-for="(className, index) of classes" :key="index" :label="className" :value="className">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>


        </el-row>

        <el-row>
            <el-col>
                <el-form-item>
                    <el-button type="primary" @click="fetchAllClasses">查询</el-button>
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

        <el-table :data="classTableData" border empty empty-text="暂无数据">
            <el-table-column prop="className" label="班级名称" />
            <el-table-column prop="chineseTeacher" label="语文老师">
                <template #default="scope">
                    {{ scope.row.chineseTeacher.userName }}
                </template>
            </el-table-column>
            <el-table-column prop="mathTeacher" label="数学老师">
                <template #default="scope">
                    {{ scope.row.mathTeacher.userName }}
                </template>
            </el-table-column>

            <el-table-column prop="englishTeacher" label="英语老师">
                <template #default="scope">
                    {{ scope.row.englishTeacher.userName }}
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-pagination class="mt-4" background layout="prev, pager, next" v-model:current-page="queryForm.currentPage"
            v-model:page-size="queryForm.pageSize" @current-change="fetchAllClasses" :total="count" />
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="type == 'add' ? '添加教室' : '修改教室'">
        <el-form :model="form" ref="dialogForm" label-width="80px" size="large">

            <el-form-item prop="className" label="班级">
                <el-select v-model="form.className" class="w-full" placeholder="请选择班级">
                    <el-option v-for="(className, index) of classes" :key="index" :label="className" :value="className">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="关联学生" prop="userName" required>
                <el-input :value="chooseStudents.map(i => i.userName).join(',')" disabled autocomplete="off">
                    <template #append>
                        <el-button @click="dialogStudentFormVisible = true">关联学生</el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item label="语文老师" prop="chineseTeacher">
                <el-select v-model="form.chineseTeacher" placeholder="请选择老师" style="width:100%">
                    <el-option v-for="teacher of teachers.chineseTeachers" :label="teacher.userName" :value="teacher._id" />
                </el-select>
            </el-form-item>

            <el-form-item label="数学老师" prop="mathTeacher">
                <el-select v-model="form.mathTeacher" placeholder="请选择老师" style="width:100%">
                    <el-option v-for="teacher of teachers.mathTeachers" :label="teacher.userName" :value="teacher._id" />
                </el-select>
            </el-form-item>

            <el-form-item label="英语老师" prop="englishTeacher">
                <el-select v-model="form.englishTeacher" placeholder="请选择老师" style="width:100%">
                    <el-option v-for="teacher of teachers.englishTeachers" :label="teacher.userName" :value="teacher._id" />
                </el-select>
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
        <el-table :data="studentsTable" border empty empty-text="暂无数据" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
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
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const dialogForm = ref<FormInstance>()
const dialogFormVisible = ref(false)
const dialogStudentFormVisible = ref(false)
const form = reactive({
    chineseTeacher: "",
    className: "",
    mathTeacher: "",
    englishTeacher: "",
    studentIds: []
})
const ageSlider = ref([20, 70])
const type = ref('add')

const queryForm = reactive({
    userName: "",
    sex: '',
    nation: "",
    class: '',
    phoneNumber: "",
    email: "",
    address: "",
    pageSize: 2,
    currentPage: 1,
    startTime: '',
    endTime: "",
    school: ""
})

const studentsTable = ref([])
axios.post("http://localhost:3000/students/search").then(res => {
    studentsTable.value = res.data.data.data;

})
const classTableData = ref([])
const confirmConnect = () => {
    dialogStudentFormVisible.value = false
    form.studentIds = (chooseStudents.value.map(student => student._id) as any)
}
const chooseStudents = ref<any[]>([])
const handleSelectionChange = (e: any) => {
    chooseStudents.value = e
}

const projects = ref<any[]>([])
axios({
    url: "http://localhost:3000/project",
}).then(res => {
    const data = res.data.data
    projects.value = data;
})

const teachers = reactive<{
    chineseTeachers: any[],
    englishTeachers: any[],
    mathTeachers: any[],
}>({
    chineseTeachers: [],
    englishTeachers: [],
    mathTeachers: [],
})
axios.get("http://localhost:3000/classes/teachers").then(res => {
    console.log(res.data)
    if (res.data.code == 200) {
        teachers.chineseTeachers = res.data.data.chineseTeachers
        teachers.englishTeachers = res.data.data.englishTeachers
        teachers.mathTeachers = res.data.data.mathTeachers
    }
})


const count = ref(0)
const date = ref([])
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
    chooseStudents.value = []
    dialogForm.value?.resetFields()

}

const edit = (row: any) => {
    dialogFormVisible.value = true;
    type.value = 'edit';
    dialogForm.value?.resetFields()
    axios({
        url: `http://localhost:3000/classes/details?id=${row._id}`,
    }).then(res => {
        if (res.data.code == 200) {
            Object.assign(form, res.data.data)
            chooseStudents.value = res.data.data.students

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
        url: "http://localhost:3000/classes/update",
    }).then(res => {
        if (res.data.code == 200) {
            dialogFormVisible.value = false;
            fetchAllClasses()
        } else {
            console.log(res.data.message.join(','))
        }
    })
}

const fetchAddStudent = () => {
    axios({
        method: "post",
        data: form,
        url: "http://localhost:3000/classes/add",
    }).then(res => {
        if (res.data.code == 200) {
            dialogFormVisible.value = false;
            fetchAllClasses()
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

const fetchAllClasses = () => {
    axios({
        method: "post",
        data: {
            ...queryForm,
        },
        url: "http://localhost:3000/classes/search",
    }).then(res => {
        const data = res.data
        classTableData.value = data.data;
        count.value = data.count
    })
}
fetchAllClasses()

const reset = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
    ageSlider.value = [20, 70];
    fetchAllClasses()
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
                url: `http://localhost:3000/classes/remove?id=${row._id}`,
            }).then(res => {
                fetchAllClasses()
            })
        })
}

</script>
<style scoped>
.studyStartTime {
    @apply w-full !important
}

.avatar {
    @apply w-[100px] h-[100px];
    border: 1px dashed var(--el-border-color);
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>