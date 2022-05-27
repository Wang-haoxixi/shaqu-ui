<template>
  <el-card class="card">
    <el-form :rules="rule" ref="form" :model="form" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          type="password"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请确认新密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="changePsw">提交</el-button>
      <el-button type="primary" @click="back">返回</el-button>
    </div>
  </el-card>
</template>

<script>
import { NAME_PASS } from "@/utils/regExps";
import {removeToken} from '@/utils/auth'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
     if(value===this.form.oldPassword){
        callback(new Error("新旧密码不能相同！"));
    }
      else if (this.form.confirmPassword !== "") {
        this.$refs.form.validateField("confirmPassword");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      userId:JSON.parse(sessionStorage.getItem('userInfo')).id,
      rule: {
        oldPassword: [
          {
            pattern: NAME_PASS,
            required: true,
            trigger: "blur",
            message: "旧密码格式有误！",
          },
        ],
        newPassword: [
          {
            pattern: NAME_PASS,
            required: true,
            trigger: "blur",
            message: "新密码格式有误！",
          },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        confirmPassword: [
         
          {
            validator: validatePass2,
            required:true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    changePsw() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {
            oldPassword: this.form.oldPassword,
            newPassword: this.form.newPassword,
          };
          this.$api.systemApi.changePsw(data,this.userId).then(res=>{
              if(res.code==='OK'){
                  this.$message.success('修改成功，即将跳转重新登陆！')
                  setTimeout(()=>{
                     removeToken();
                     this.$store.commit('removePermissionList');
                     this.$store.commit('saveBreadCrumbList',[]);
                    this.$router.push('/user/login');
                  },1000)
              }
          }).catch(err=>{
              this.$message.error(err.msg)
          });
        }
      });
    },
    back(){
        history.go(-1)
    }
  },
  
};
</script>

<style lang="less" scoped>
.card{
    width:60%;
    margin:0 auto;
}
</style>