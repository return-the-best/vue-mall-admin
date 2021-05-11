<template>
  <div class="login-container">
    <div class="login-box">
      <div class="input">
    <el-form label-width="0px" :model="login" :rules="rules" ref="LoginForm">
  <el-form-item label="" prop="username">
    <el-input placeholder="请输入用户名" v-model="login.username"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
  </el-form-item>
  <el-form-item label="" prop="password">
    <el-input type="password" placeholder="请输入密码" v-model="login.password"><i slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
  </el-form-item>
    </el-form>
      </div>
      <div class="btn">
        <el-row>
          <el-button type="primary" @click="LoginClick">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {loginRequest}from'network/loginRequest'
export default {
  name:"Login",
  data(){
    return{
      login:{
        username:'',
        password:''
      },
      rules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    reset(){
      this.$refs.LoginForm.resetFields()
    },
    LoginClick(){
      this.$refs.LoginForm.validate(valid=>{
        if(!valid)return;
        loginRequest(this.login).then((res)=>{
          console.log(res);
          if(res.data.meta.status!==200) return this.$alert('登陆失败','',{
            confirmButtonText: '确定',
            type:'error',
            center:true
          })
          this.$alert('登陆成功','',{
            confirmButtonText: '确定',
            center:true
          })
          window.sessionStorage.setItem("token",res.data.data.token)
          this.$router.push('/home')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  height: 100vh;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box{
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow:5px 5px 5px gray
}
.input{
  position: absolute;
  left: 50%;
  top: 30%;
  width: 70%;
  transform: translate(-50%);
}
.btn{
  position: absolute;
  float: right;
  top: 75%;
  right: 10%;
}
</style>