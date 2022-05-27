<template>
    <el-card>
        当前人员：
        <el-dropdown type="primary" @command="selectStaff">
            <el-button type="primary">
                {{selectedUser.userId===0?'人员选择':selectedUser.nickName}} <i
                    class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :key="user.id" v-for="user in users" :command="user">{{user.nickName}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <br/><br/>
        <el-calendar v-model="value">
            <template slot="dateCell" slot-scope="{date, data}">
                <div class="schedule-item">
                    <span>{{date.getDate()}}</span>
                    <div v-for="(item,index) in schedules[data.day]" v-bind:key="index">
                        {{item}} <br /><br />
                    </div>
                </div>
            </template>
        </el-calendar>
    </el-card>
</template>

<script>
    export default {
        name: "Calendar",
        data() {
            return {
                value: new Date(),
                schedules: {},
                users: [],
                selectedUser: {userId: 0, nickName: '未选择'}
            }
        },
        created: function () {
            this.loadData();
        },
        watch: {
            value: function () {
                // 当月历改变时，重新载入相关月计划
                this.loadData();
            }
        },
        methods: {
            wrap(items) {
                console.log(items);
                if (items !== undefined) {
                    let result = '';
                    items.forEach(item => {
                        result += "<div>" + item + "</div><br />";
                    })
                    return result;
                }
            },
            loadData: function () {
                let self = this;
                self.$api.projectApi.listStaffCalendar({userId: self.selectedUser.userId, dt: self.value})
                    .then(resp => {

                        self.schedules = resp.schedules;
                        self.users = resp.users;
                    })
                    .catch(err => self.$message.error(err.msg));
            },
            selectStaff: function (user) {
                this.selectedUser = user;
                this.loadData();
            }
        }
    }
</script>

<style scoped>
    /*覆盖人员日历里的自定义内容高度*/
    /deep/ .el-calendar-table .el-calendar-day{
        height: auto;
        min-height:85px;
    }
</style>
