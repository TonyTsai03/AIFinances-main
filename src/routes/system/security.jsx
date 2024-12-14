import { Button,message,Spin } from 'antd';
import { EyeInvisibleOutlined,LockOutlined,EyeOutlined } from '@ant-design/icons';
import React,{ useState } from 'react'
import request from '../../requests/index.js';
import Cookies from 'universal-cookie';

export default function Security() {

    const cookies = new Cookies();

    const contentStyle = {
        display: 'flex',
        justifyContent: 'center',
        width:'650px',
        padding:'25px 25px 25px 25px',
        backgroundColor:'rgb(41,44,56)',
        borderRadius:'15px',
        flexDirection:'column',
        color:'rgb(255,255,255)'
    }

    const userStyle = {
        width:'60px',
        height:'60px',
        borderRadius:'50%',
        backgroundColor:'rgb(75,80,96)',
        color:'white',
        fontWeight:'900',
        fontSize:'20px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }

    const iptIcon = {
        position:'absolute',
        top:'50%',
        color:'rgb(178,180,185)',
        left:'15px',
        transform:'translate(0,-46%)'
    }

    const iptPasswordIcon = {
        position:'absolute',
        top:'50%',
        color:'rgb(178,180,185)',
        right:'15px',
        transform:'translate(0,-46%)'
    }

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    const [spinning, setSpinning] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [passwordData, setPasswordData] = useState({ old_password: '',new_password:'',ck_new_password:'' });

    const submit = async() =>{
        if( passwordData.new_password == '' || passwordData.ck_new_password == '' || passwordData.old_password == '' ){
            messageApi.open({
                type: 'error',
                content: 'Current Password,New Password,Confirm Password 不得為空'
            });
            return;
        }
        if( passwordData.new_password !== passwordData.ck_new_password ){
            messageApi.open({
                type: 'error',
                content: 'New Password,Confirm Password 不一致'
            });
            return;
        }
        setSpinning(true);
        await request({
            url:'/users/update-password/',
            method: 'put',
            data:passwordData
          }).then(async(response) => {
            if( response.status === 200 ){
                messageApi.open({
                    type: 'success',
                    content: '密碼更新成功'
                });
                cookies.set('token',response.data.newToken); 
                 
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

   
  return (
    <>
        {contextHolder}
        <Spin spinning={spinning} fullscreen />
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'100vh' }}>
            <div style={contentStyle}>
                <div>
                    <div style={userStyle}>
                        <LockOutlined />
                    </div>
                </div>
                <h2>Change password</h2>
                <div style={{ color:'rgb(178,180,185)',marginBottom:'40px' }}>To change your password, please fill in the fields below.
                Your password must contain at least 8 characters and must also contain at least one uppercase letter, one lowercase letter, one number and one special character.</div>
                <div>Current Password</div>
                <div style={{ position:'relative' }}>
                    <LockOutlined style={ iptIcon } />
                    <input style={{marginBottom:'24px'}} type={(showPassword.currentPassword)?'text':'password'} placeholder='Current Password' value={passwordData.old_password} 
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })} /> 
                    <EyeInvisibleOutlined style={{ ...iptPasswordIcon,display:(showPassword.currentPassword)?'none':'inline' }} onClick={()=>{setShowPassword(prevState=>({
                        ...prevState,
                        currentPassword:true
                    }))}}/>
                    <EyeOutlined style={{ ...iptPasswordIcon,display:(showPassword.currentPassword)?'inline':'none' }} onClick={()=>{setShowPassword(prevState=>({
                        ...prevState,
                        currentPassword:false
                    }))}}/>
                </div>
                <div>New Password</div>
                <div style={{ position:'relative' }}>
                    <LockOutlined style={ iptIcon } />
                    <input style={{marginBottom:'24px'}} type={(showPassword.newPassword)?'text':'password'} placeholder='New Password' value={passwordData.new_password} 
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })} /> 
                    <EyeInvisibleOutlined style={{ ...iptPasswordIcon,display:(showPassword.newPassword)?'none':'inline' }} onClick={()=>{setShowPassword(prevState=>({
                        ...prevState,
                        newPassword:true
                    }))}}/>
                    <EyeOutlined style={{ ...iptPasswordIcon,display:(showPassword.newPassword)?'inline':'none' }} onClick={()=>{setShowPassword(prevState=>({
                        ...prevState,
                        newPassword:false
                    }))}}/>
                </div>
                <div>Confirm Password</div>
                <div style={{ position:'relative' }}>
                    <LockOutlined style={ iptIcon } />
                    <input style={{marginBottom:'24px'}} type={(showPassword.confirmPassword)?'text':'password'} placeholder='Confirm Password' value={passwordData.ck_new_password} 
                    onChange={(e) => setPasswordData({ ...passwordData, ck_new_password: e.target.value })} /> 
                    <EyeInvisibleOutlined style={{ ...iptPasswordIcon,display:(showPassword.confirmPassword)?'none':'inline' }} onClick={()=>{setShowPassword(prevState=>({
                        ...prevState,
                        confirmPassword:true
                    }))}}/>
                    <EyeOutlined style={{ ...iptPasswordIcon,display:(showPassword.confirmPassword)?'inline':'none' }} onClick={()=>{setShowPassword(prevState=>({
                        ...prevState,
                        confirmPassword:false
                    }))}}/>
                </div>
               
                <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',marginTop:'40px',background:'rgb(100,187,128)',border:0 }} size="large" onClick={()=>{submit()}} >Change password</Button>
            </div>
        </div>
    </>
  )
}

