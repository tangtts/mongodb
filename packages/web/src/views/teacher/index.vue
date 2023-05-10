<template>
    <el-form :model="queryForm" label-width="120px" ref="ruleFormRef">

        <el-row>
            <el-col :span="8">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="queryForm.userName" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="queryForm.phoneNumber" />
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="年龄" prop="age">
                    <el-slider class="w-full" v-model="ageSlider" range :min="20" :max="70" />
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="民族" prop="nation">

                    <el-select v-model="queryForm.nation" class="w-full">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option v-for="(nation, index) of nations" :key="index" :label="nation" :value="nation">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="queryForm.email" />
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="性别" prop="address">
                    <el-select v-model="queryForm.sex" class="w-full">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option label="男" value="1">
                        </el-option>
                        <el-option label="女" value="0">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

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

            <el-col :span="8">
                <el-form-item prop="class" label="毕业院校">
                    <el-input v-model="queryForm.school" />
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item prop="class" label="入职时间">
                    <el-date-picker v-model="date" type="daterange" range-separator="To" start-placeholder="开始时间"
                        end-placeholder="结束时间" />
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

            <el-table-column prop="sex" label="班级">
                <template #default="scope">
                    {{ scope.row.class.join(',') }}
                </template>
            </el-table-column>

            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="project" label="学科">
                <template #default="scope">
                    <span v-for="(project,index) of projects" :key="index">
                        <span v-if="project.value == scope.row.project">
                            {{project.label}}
                        </span>
                    </span>
                </template>
                
                </el-table-column>
            <el-table-column prop="sex" label="性别">
                <template #default="scope">
                    {{ scope.row.sex == 1 ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column prop="nation" label="民族" />
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

    <el-dialog v-model="dialogFormVisible" :title="type == 'add' ? '添加教师' : '修改教师'">
        <el-form :model="form" ref="dialogForm" label-width="80px" size="large">

            <el-form-item label="头像" prop="userName">
                <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                    name="file" action="http://localhost:3000/upload">

                    <img v-if="form.avatar" :src="form.avatar" class="w-[100px] aspect-square" />
                    <el-icon v-else class="avatar">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>


            <!-- <el-form-item label="关联学生" prop="userName" required>
                <el-input :value="chooseStudents.map(i => i.userName).join(',')" disabled autocomplete="off">
                    <template #append>
                        <el-button @click="dialogStudentFormVisible = true">关联学生</el-button>
                    </template>
                </el-input>
            </el-form-item> -->

            <el-form-item label="用户名" prop="userName" required>
                <el-input v-model="form.userName" autocomplete="off" />
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input v-model="form.age" autocomplete="off" />
            </el-form-item>

            <el-form-item label="性别" prop="phoneNumber">
                <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%">
                    <el-option label="男" value="1" />
                    <el-option label="女" value="0" />
                </el-select>
            </el-form-item>

            <el-form-item label="手机号" prop="phoneNumber">
                <el-input v-model="form.phoneNumber" autocomplete="off" />
            </el-form-item>


            <el-form-item prop="class" label="班级">
                <el-select v-model="form.class" multiple class="w-full" placeholder="请选择班级">
                    <el-option v-for="(className, index) of classes" :key="index" :label="className" :value="className">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="class" label="学科">
                <el-select v-model="form.project"  class="w-full" placeholder="请选择学科">
                    <el-option v-for="(project, index) of projects" 
                    :key="index" :label="project.label" :value="project.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="毕业院校" prop="school">
                <el-input v-model="form.school" autocomplete="off" />
            </el-form-item>


            <el-form-item prop="studyStartTime" label="入职时间">
                <el-date-picker class="studyStartTime" v-model="form.startJobTime" type="date" range-separator="To"
                    placeholder="入职时间" />
            </el-form-item>



            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>

            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>

            <el-form-item label="民族" prop="age">
                <el-select v-model="form.nation" class="w-full">
                    <el-option v-for="(nation, index) of nations" :key="index" :label="nation" :value="nation">
                    </el-option>
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

    <el-dialog v-model="dialogStudentFormVisible">

        <el-table :data="studentTableData" border empty empty-text="暂无数据" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="sex" label="性别">
                <template #default="scope">
                    {{ scope.row.sex == 1 ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号" />
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
    userName: "",
    age: '',
    sex: '1',
    nation: "汉族",
    phoneNumber: "18623806693",
    email: "2939117014@qq.com",
    address: "",
    class: [],
    startJobTime: "", // 入职时间
    school: "",
    avatar: "",
    project:"" // 学科
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

const studentTableData = ref([])
const confirmConnect = () => {
    dialogStudentFormVisible.value = false
    // form.studentIds = (chooseStudents.value.map(student => student._id) as any)
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


axios({
    method: "post",
    data: {
        startAge: 0,
        endAge: 100,
        currentPage: 1,
        pageSize: 100
    },
    url: "http://localhost:3000/students/search",
}).then(res => {
    const data = res.data.data
    studentTableData.value = data.data;
})


const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    form.avatar = response.data.path
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

const tableData = ref([])
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
    dialogForm.value?.resetFields()
}

const edit = (row: any) => {
    dialogFormVisible.value = true;
    type.value = 'edit';
    dialogForm.value?.resetFields()
    axios({
        url: `http://localhost:3000/teachers/details?id=${row._id}`,
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
        url: "http://localhost:3000/teachers/update",
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
        url: "http://localhost:3000/teachers/add",
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
    axios({
        method: "post",
        data: {
            ...queryForm,
            startAge: ageSlider.value[0],
            endAge: ageSlider.value[1],
        },
        url: "http://localhost:3000/teachers/search",
    }).then(res => {
        const data = res.data.data
        tableData.value = data.data;
        count.value = data.count
    })
}
fetchAllStudent()

const reset = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
    ageSlider.value = [20, 70];
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
                url: `http://localhost:3000/teachers/remove?id=${row._id}`,
            }).then(res => {
                fetchAllStudent()
            })
        })
}

</script>
<style scoped>
.studyStartTime {
    @apply w-full !important
}

.avatar {
   @apply  w-[100px]  h-[100px];
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