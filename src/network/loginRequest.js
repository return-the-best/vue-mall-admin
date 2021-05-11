import{request}from'./request'
export function loginRequest(LoginForm){
  return request({
    url:'/login',
    method:'post',
    data:{
      username:LoginForm.username,
      password:LoginForm.password
    }
  })
}