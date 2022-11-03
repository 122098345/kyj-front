<template>
  <div class="login" >
    <el-form class="loginmain" ref="loginForm" :model="model" :rules="loginRules" >
      <div class="login-title">
        <span>空压机健康状态监控系统</span>
      </div>
      <div class="login-con">
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            type="text"
            auto-complete="off"
            placeholder="账号"
          >
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>

        <el-form-item prop="inputCode">
          <el-input
            v-model="model.inputCode"
            auto-complete="off"
            placeholder="验证码"
            style="width: 67%"
          >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="login-code">
            <img v-if="requestCodeSuccess" style="margin-top: 2px;" :src="randCodeImage" @click="handleChangeCheckCode"/>
            <img v-else style="margin-top: 2px;" src="../../assets/checkcode.png" @click="handleChangeCheckCode"/>
          </div>
        </el-form-item>

        <el-form-item style="width:100%;">
          <div class="login-btn">
            <input  type="button" value="登录" @click="handleLogin">
          </div>
        </el-form-item>
      </div>
    </el-form>

    <!--  底部  -->
    <div class="el-login-footer">
      <span>北京航空航天大学云南创新研究院-5G技术与应用研究中心</span>
    </div>
  </div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import { mapActions } from 'vuex'

  export default{
    name:"Login",
    data(){
      return{
        loginForm: {
          username: "",
          password: "",
          rememberMe: false,
          code: "",
          uuid: ""
        },
        model:{
          username: '',
          password: '',
          inputCode: ''
        },
        requestCodeSuccess: false,        // 获取验证码是否成功
        randCodeImage: '',                // 验证码
        currdatetime: '',                 // 当前时间

        // 验证规则
        loginRules: {
          username: [
            { required: true, trigger: "blur", message: "请输入您的账号" }
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入您的密码" }
          ],
          inputCode: [{ required: true, trigger: "change", message: "请输入验证码" }]
        },
      }
    },
    created() {
      this.handleChangeCheckCode();
    },
    methods:{
      ...mapActions(['Login']),
      /**刷新验证码*/
      handleChangeCheckCode(){
        this.currdatetime = new Date().getTime();
        this.model.inputCode = ''
        getAction(`/sys/randomImage/${this.currdatetime}`).then(res=>{
          if(res.success){
            this.randCodeImage = res.result
            this.requestCodeSuccess=true
          }else{
            this.$message.error(res.message)
            this.requestCodeSuccess=false
          }
        }).catch(()=>{
          this.requestCodeSuccess=false
        })
      },
      handleLogin(){
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            let loginParams = {
              username: this.model.username,
              password: this.model.password,
              captcha: this.model.inputCode,
              checkKey: this.currdatetime,
              remember_me: false,
            }
            console.log("登录参数", loginParams)
            this.Login(loginParams).then((res) => {
              this.loginSuccessOne()
            }).catch((err) => {
              console.log(err)
              let description = ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试"
              this.$notification[ 'error' ]({
                message: '登录失败',
                description: description,
                duration: 4,
              });
              //账户密码登录错误后更新验证码
              if(this.customActiveKey === 'tab1' && description.indexOf('密码错误')>0){
                this.$refs.alogin.handleChangeCheckCode()
              }
            });
          
          }
        });
      },

      loginSuccessOne(){
        this.loginSuccess();
      },
      loginSuccess(){
        this.$router.push({ path: "/dashboard/analysis" }).catch(()=>{
          console.log('登录跳转首页出错,这个错误从哪里来')
        })
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        });
      },


    },
    

  }
  
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url(~@/assets/images/login-bg.jpg);
  background-size: 100%;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}

.loginmain{
    background: rgba(0, 0, 0, 0.5);
    width: 540px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 100px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    z-index: 0;
}
.login-title{
    color: #D3D7F7;
    height: 60px;
    font-size:20px;
    text-align: center;
    margin-top: -20px;
}
.login-con{
    height: 208px;
    position: absolute;
    left: 0;
    width: 100%;
    margin:0 10%;
}
.login-user{
    position: relative;
}
.icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: 1;
}
.login-con input{
    width: calc(100% - 130px);
    margin-top: -2px;
    background: rgba(57, 61, 82, 0);
    left: 0;
    padding: 10px 65px;
    border-top: 2px solid rgba(57, 61, 82, 0);
    border-bottom: 2px solid rgba(57, 61, 82, 0);
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Gudea', sans-serif;
    box-shadow: none;
    color: #61BFFF !important;
}
.login-pwd, .login-yan{
    position: relative;
}
/*
.login-pwd .icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: .5;
}*/
.login-btn{
    width: 80%;
    margin: 0 auto;
    position: relative;
}
.login-btn input{
    border-radius: 3px;
    background: transparent;
    border: 2px solid #4FA1D9;
    color: #4FA1D9;
    text-transform: uppercase;
    font-size: 11px;
    cursor: pointer;
    position: absolute;
    top: 0px;
    left: 0;
    right: 10;

    margin: auto;
    width: 80%;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
.login-btn input:hover{
    color: white !important;
    background: #4FA1D9;
    cursor: pointer;
    -webkit-transition-property: background,color;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
</style>
