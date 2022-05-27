<template>
  <div class="login" :style="'background-image:url(' + Background + ');'">
    <el-form ref="loginForm" :model="loginForm" class="login-form">
      <h3 class="title">{{ types }}固体废物综合管理平台</h3>
      <el-form-item>
        <el-input v-model="loginForm.username" type="text" auto-complete="off">
          <template slot="prepend"
            ><img src="@/assets/images/usn.png"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        >
          <template slot="prepend"
            ><img src="@/assets/images/psw.png"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          style="width: 300px"
          v-model="verifyCode"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        >
          <template slot="prepend"
            ><img src="@/assets/images/ver.jpg"
          /></template>
        </el-input>
        <img class="verifyImg" :src="imgSrc" alt="" @click="changeImg" />
      </el-form-item>
      <div style="width: 100%">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 440px; height: 48px; font-size: 20px; margin-top: 50px"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Background from "@/assets/images/bg.png";
import { setToken } from "@/utils/auth";
import { JSEncrypt } from 'jsencrypt'
import store from "@/store";
export default {
  name: "Login",
  data() {
    return {
      uuid: this.createUuid(),
      regShow: false,
      
      imgSrc: `${process.env.VUE_APP_BASE_URL}system/login/captcha?sessionId=${this.uuid}`,
      Background: Background,
      loginForm: {
        username: "",
        password: "",
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        grant_type: "password",
        code: "",
      },
      verifyCode: "",
      loading: false,
      redirect: undefined,
      loading_submit: true,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
    },
  },
  created(){
    this.$api.login.getKeys().then((res)=>{
      if(res.data){
        const newData = res.data;
        window.sessionStorage.setItem('publicKey', newData.pubk);
        window.sessionStorage.setItem('publicToken', newData.token);
      }
    })
  },
  computed:{
    types(){
      return this.$store.state.types
    }
  },
  methods: {
    changeImg() {
      let timeStr = new Date().getTime() + Math.floor(Math.random() * 100000);
      this.imgSrc = `${process.env.VUE_APP_BASE_URL}system/login/captcha?sessionId=${this.uuid}&timeStr=${timeStr}`;
      this.verifyCode = "";
    },
    createUuid(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      this.uuid = uuid.join("");
      return uuid.join("");
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loginForm.code = this.uuid + ":" + this.verifyCode;
          const encrypt = new JSEncrypt();
          const userJson = {
            username: this.loginForm.username,
            password: this.loginForm.password,
          }
          encrypt.setPublicKey(window.sessionStorage.getItem('publicKey')); // 加入公钥
          const encryptStr = encrypt.encrypt(JSON.stringify(userJson)); // 加密 用户名密码
          const params = {
              ...this.loginForm,
              usermsg: encryptStr,
              token:window.sessionStorage.getItem('publicToken')
          };
          delete params.username;
          delete params.password;
          this.$api.login.login(params).then((res) => {
              if (res) {
                this.$api.systemApi.getUserInfo().then((resp) => {
                  sessionStorage.setItem("userInfo", JSON.stringify(resp));
                  store.commit("saveNickname", resp.nickname);
                });
                setToken(res.access_token);
                this.loading = false;
                this.$router.push({ path: this.redirect || "/" });
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error(err.msg || "验证码输入错误！");
              this.changeImg();
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  font-size: 26px;
  color: #2288ff;
}

.login-form {
  margin-top: 160px;
  border-radius: 6px;
  background: #ffffff;
  padding: 50px 50px;
  font-size: 20px;
  color: #222;
  height: 402px;
  .el-input {
    height: 48px;
    width: 440px;
    margin-top: 20px;
    input {
      background-color: #f5f5f5;
      height: 48px;
    }
  }
  .verifyImg {
    height: 48px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
