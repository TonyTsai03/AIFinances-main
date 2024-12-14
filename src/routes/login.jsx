import '../assets/css/login.css'
import logoImg from '../assets/img/logo.png'
import logo2Img from '../assets/img/logo2.png'
import google from '../assets/img/google.png'
import { Carousel,Space,Checkbox,Button,Divider,message,Spin } from 'antd';
import { UserOutlined,LockOutlined,MailOutlined,EyeInvisibleOutlined,EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from 'react-router-dom';
import React,{ useState,useEffect } from 'react'
import '../assets/css/carousel.css'
import request from '../requests/index.js';
import Cookies from 'universal-cookie';

export default function Login({ status }) {
  
  const navigate = useNavigate();
  const cookies = new Cookies();
  const contentStyle = {
    textAlign: 'center',
    margin:'auto',
    paddingBottom:'20px'
  };

  const iptIcon = {
    position:'absolute',
    top:'50%',
    color:'rgb(178,180,185)',
    left:'15px',
    transform:'translate(0,30%)'
  }

  const iptPasswordIcon = {
    position:'absolute',
    top:'50%',
    color:'rgb(178,180,185)',
    right:'15px',
    transform:'translate(0,30%)'
  }

  const [showPassword, setShowPassword] = useState({
    loginPassword:false,
    registerPassword:false,
    resetPassword:false,
  })

  const [loginInput, setLoginInput] = useState({ userId: '', password: '' });
  const [registerInput, setRegisterInput] = useState({ userId: '', email: '', password: '' });
  const [forgetPasswordInput, setForgetPasswordInput] = useState({ email: '' });
  const [resetPasswordInput, setResetPasswordInput] = useState({ password: '' });
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = React.useState(false);
  const [rmChecked, setRmChecked] = useState(false);

  const resetInputs = () => {
    switch (status) {
        case 'login':
            setLoginInput({ userId: '', password: '' });
            break;
        case 'register':
            setRegisterInput({ userId: '', email: '', password: '' });
            break;
        case 'forgetPassword':
            setForgetPasswordInput({ email: '' });
            break;
        case 'resetPassword':
            setResetPasswordInput({ password: '' });
            break;
        default:
            break;
    }
};

// 登入
const login = async() =>{  
  if( loginInput.password === '' || loginInput.userId === '') {
    messageApi.open({
      type: 'error',
      content: 'Email 與 Password 不得為空'
    });
    return;
  }
  setSpinning(true);
  await request({
    url:'/users/login/',
    method: 'post',
    data:{
      email:loginInput.userId,
      password:loginInput.password
    }
  }).then((response) => {
    if( response.status === 200 ){
      messageApi.open({
        type: 'success',
        content: '登入成功'
      });
      if(rmChecked){
        cookies.set('rember', {
          ck:true,
          password:loginInput.password,
          userId:loginInput.userId
        });
      }
      cookies.set('token', response.data.token);
      cookies.set('user', response.data.user);
      navigate('/system/stock')
    }else{
      messageApi.open({
        type: 'error',
        content: (response.msg)?response.msg:'帳號或密碼錯誤'
      });
    }    
  }).finally(() => {
    setSpinning(false);
  })
}

// 註冊
const register = async() => {
  if( registerInput.password === '' || registerInput.userId === '' || registerInput.email === '' ) {
    messageApi.open({
      type: 'error',
      content: 'userId Email 和 Password 不得為空'
    });
    return;
  }
  setSpinning(true);
  await request({
    url:'/users/register/',
    method: 'post',
    data:{
      username:registerInput.userId,
      email:registerInput.email,
      password:registerInput.password
    }
  }).then((response) => {
    if( response.status === 201 ){
      messageApi.open({
        type: 'success',
        content: '註冊成功'
      });
      cookies.set('token', response.data.token);
      cookies.set('user', response.data.user);
      navigate('/system/stock')
    }else{
      messageApi.open({
        type: 'error',
        content: (response.msg)?response.msg:'輸入資料錯誤'
      });
    }    
  }).finally(() => {
    setSpinning(false);
  })
}

// 忘記密碼
const forgetPassword = async() => {
  if( forgetPasswordInput.email === '') {
    messageApi.open({
      type: 'error',
      content: 'Email 不得為空'
    });
    return;
  }
  setSpinning(true);
  await request({
    url:'/users/forget-password/',
    method: 'post',
    data:{
      email:forgetPasswordInput.email
    }
  }).then((response) => {
    if( response.status === 200 ){
      messageApi.open({
        type: 'success',
        content: '已寄送驗證信'
      });      
      navigate('/verify',{state:{email:forgetPasswordInput.email}})
    }else{
      messageApi.open({
        type: 'error',
        content: (response.msg)?response.msg:'輸入資料錯誤'
      });
    }    
  }).finally(() => {
    setSpinning(false);
  })
}
const location = useLocation();

const resetPassword = async() => {
  if( resetPasswordInput.password === '') {
    messageApi.open({
      type: 'error',
      content: 'Password 不得為空'
    });
    return;
  }
  setSpinning(true);
  await request({
    url:'/users/ResetPassword/',
    method: 'post',
    data:{
      email:location.state.email,
      new_password :resetPasswordInput.password
    }
  }).then((response) => {
    if( response.status === 200 ){
      navigate('/success')
    }else{
      messageApi.open({
        type: 'error',
        content: (response.msg)?response.msg:'發生錯誤，請稍後再試'
      });
    }    
  }).finally(() => {
    setSpinning(false);
  })
}

  useEffect(() => {
      resetInputs();
      const rember = cookies.get('rember')
      if( rember && rember.ck && rember.userId && rember.password ){
        setLoginInput({
          userId:rember.userId,
          password:rember.password
        })
        setRmChecked(true);
      }
  }, [status]);

  const onChange = (e) => {
    setRmChecked(e.target.checked);
  };

  let html;
  switch (status) {
    case 'login':
      html = (<>
        <h1 style={{ color:'rgb(255,255,255)' }}>Hi,welcome back!</h1>
        <div style={{ color:'rgb(178,180,185)' }}>Login to your account</div>
        <div style={{ position:'relative' }}>
          <MailOutlined style={ iptIcon } />
          <input type="text" placeholder='Email' value={loginInput.userId}
            onChange={(e) => setLoginInput({ ...loginInput, userId: e.target.value })} /> 
        </div>
        <div style={{ position:'relative' }}>
          <LockOutlined style={ iptIcon } />
          <input type={(showPassword.loginPassword)?'text':'password'} placeholder='Password' value={loginInput.password}
            onChange={(e) => setLoginInput({ ...loginInput, password: e.target.value })} /> 
          <EyeInvisibleOutlined style={{ ...iptPasswordIcon,display:(showPassword.loginPassword)?'none':'inline' }} onClick={()=>{setShowPassword(prevState=>({
              ...prevState,
              loginPassword:true
          }))}}/>
          <EyeOutlined style={{ ...iptPasswordIcon,display:(showPassword.loginPassword)?'inline':'none' }} onClick={()=>{setShowPassword(prevState=>({
                ...prevState,
                loginPassword:false
            }))}}/>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between',marginTop:'20px' }}>
          <div style={{ display:'flex' }}>
            <Checkbox checked={rmChecked} onChange={onChange} />
            <div style={{ color:'rgb(178,180,185)',marginLeft:'5px' }}>Remember Me</div>
          </div>
          <div style={{ color:'rgb(100,187,128)',fontWeight:'600' }}><Link to='/forgetPassword'>Forget Password?</Link></div>
        </div>
        <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',marginTop:'25px',background:'rgb(100,187,128)',border:0 }} size="large" onClick={()=>{login()}}>Sign In</Button>
        <Divider  style={{  color:'rgb(178,180,185)',borderColor: 'rgb(178,180,185)',margin:"40px 0" }} plain>
          <div style={{ margin:"0 40px"}}>or</div>
        </Divider>
        <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',background:'none',borderColor:'rgb(178,180,185)' }} size="large">
          <img width='24px' src={google} alt="" />
          Continue with google
        </Button>
        <div style={{ marginTop:'100px',color:'rgb(178,180,185)',textAlign:'center' }}>
          Dont't have an account?<Link to='/register'><span className='fk-a'>Register</span></Link>
        </div>
      </>)
      break;
    case 'register':
      html = (<>
        <h1 style={{ color:'rgb(255,255,255)' }}>Create an account to "start"</h1>
        <div style={{ color:'rgb(178,180,185)' }}>sign up to start</div>
        <div style={{ position:'relative' }}>
          <UserOutlined style={ iptIcon } />
          <input type="text" placeholder='UserID' value={registerInput.userId}
            onChange={(e) => setRegisterInput({ ...registerInput, userId: e.target.value })} /> 
        </div>
        <div style={{ position:'relative' }}>
          <MailOutlined style={ iptIcon } />
          <input type="text" placeholder='Email' value={registerInput.email}
            onChange={(e) => setRegisterInput({ ...registerInput, email: e.target.value })}/> 
        </div>
        <div style={{ position:'relative' }}>
          <LockOutlined style={ iptIcon } />
          <input type={(showPassword.registerPassword)?'text':'password'} placeholder='Password' value={registerInput.password}
            onChange={(e) => setRegisterInput({ ...registerInput, password: e.target.value })}/> 
          <EyeInvisibleOutlined style={{ ...iptPasswordIcon,display:(showPassword.registerPassword)?'none':'inline' }} onClick={()=>{setShowPassword(prevState=>({
              ...prevState,
              registerPassword:true
          }))}}/>
          <EyeOutlined style={{ ...iptPasswordIcon,display:(showPassword.registerPassword)?'inline':'none' }} onClick={()=>{setShowPassword(prevState=>({
                ...prevState,
                registerPassword:false
          }))}}/>
        </div>
        <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',marginTop:'25px',background:'rgb(100,187,128)',border:0 }} size="large" onClick={()=>{register()}}>Sign Up</Button>
        <Divider  style={{  color:'rgb(178,180,185)',borderColor: 'rgb(178,180,185)',margin:"40px 0" }} plain>
          <div style={{ margin:"0 40px"}}>or</div>
        </Divider>
        <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',background:'none',borderColor:'rgb(178,180,185)' }} size="large">
          <img width='24px' src={google} alt="" />
          Continue with google
        </Button>
        <div style={{ marginTop:'100px',color:'rgb(178,180,185)',textAlign:'center' }}>
          Already have an account?<Link to='/login'><span className='fk-a'>Log In</span></Link>
        </div>
      </>)
      break;
    case 'forgetPassword':
      html = (<>
        <h1 style={{ color:'rgb(255,255,255)' }}>Forget Password?</h1>
        <div style={{ color:'rgb(178,180,185)' }}>Enter your email and we will send you a confirmation code</div>
        <div style={{ position:'relative' }}>
          <MailOutlined style={ iptIcon } />
          <input type="text" placeholder='Email' value={forgetPasswordInput.email}
            onChange={(e) => setForgetPasswordInput({ ...forgetPasswordInput, email: e.target.value })}/> 
        </div>
        <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',marginTop:'25px',background:'rgb(100,187,128)',border:0 }} size="large" onClick={()=>{forgetPassword()}} >Sign In</Button>
        <div style={{ color:'rgb(100,187,128)',fontWeight:'600',marginTop:'20px' }}><Link to='/login'>Back to login</Link></div>
        <div style={{ marginTop:'100px',color:'rgb(178,180,185)',textAlign:'center' }}>
          Dont't have an account?<Link to='/register'><span className='fk-a'>Register</span></Link>
        </div>
      </>)
      break;
    case 'resetPassword':
      html = (<>
        <h1 style={{ color:'rgb(255,255,255)' }}>Reset Your Password?</h1>
        <div style={{ color:'rgb(178,180,185)' }}>Choose a strong password;also,do not reuse it on other accounts</div>
        <div style={{ position:'relative' }}>
          <LockOutlined style={ iptIcon } />
          <input type={(showPassword.resetPassword)?'text':'password'} placeholder='Password' value={resetPasswordInput.password}
            onChange={(e) => setResetPasswordInput({ ...resetPasswordInput, password: e.target.value })}/> 
          <EyeInvisibleOutlined style={{ ...iptPasswordIcon,display:(showPassword.resetPassword)?'none':'inline' }} onClick={()=>{setShowPassword(prevState=>({
              ...prevState,
              resetPassword:true
          }))}}/>
          <EyeOutlined style={{ ...iptPasswordIcon,display:(showPassword.resetPassword)?'inline':'none' }} onClick={()=>{setShowPassword(prevState=>({
                ...prevState,
                resetPassword:false
          }))}}/>
        </div>
        <Button 
          style={{ color:'rgb(255,255,255)',fontWeight:'600',marginTop:'25px',background:'rgb(100,187,128)',border:0 }} 
          size="large"
          onClick={()=>{resetPassword()}}>Sign In</Button>
        <div style={{ color:'rgb(100,187,128)',fontWeight:'600',marginTop:'20px' }}><Link to='/login'>Back to login</Link></div>
        <div style={{ marginTop:'100px',color:'rgb(178,180,185)',textAlign:'center' }}>
          Dont't have an account?<Link to='/register'><span className='fk-a'>Register</span></Link>
        </div>
      </>)
      break;
    default:
      html = <h1>Unknown status</h1>;
  }

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div id='container'>
        <div id='left-base'>
          <div style={{ display:'flex' }}>
            <img width='100px' src={logoImg} alt="" />
            <h1 style={{ color:'rgb(255,255,255)' }} >AIFinances</h1>
          </div>
          { html }
        </div>
        <div id='right-base'>
          <div style={{ width: '100%' }}>
            <Carousel className='customer-carousel' >
              <div>
                <img style={contentStyle} src={logoImg} alt="" />
              </div>
              <div>
                <img style={contentStyle} src={logo2Img} alt="" />
              </div>
            </Carousel>
          </div>
          <Space direction="vertical" size="large" style={{ textAlign:'center' }}>
            {/* <h1 style={{ color:'rgb(255,255,255)',marginTop:'80px' }}>Title</h1> */}
            {/* <div style={{ color:'rgb(178,180,185)' }}>Text</div> */}
          </Space>
        </div>
      </div>
    </>
  );
}
