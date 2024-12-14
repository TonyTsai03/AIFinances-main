import { Button,DatePicker,message,Spin } from 'antd';
import { UserOutlined,MailOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import React,{ useState,useEffect } from 'react'
import request from '../../requests/index.js';

export default function Information() {

    const cookies = new Cookies();

    const contentStyle = {
        display: 'flex',
        justifyContent: 'center',
        width:'650px',
        padding:'10px 25px 25px 25px',
        backgroundColor:'rgb(41,44,56)',
        borderRadius:'15px',
        flexDirection:'column',
        color:'rgb(255,255,255)'
    }

    const userStyle = {
        width:'300px',
        height:'300px',
        borderRadius:'50%',
        backgroundColor:'rgb(75,80,96)',
        color:'rgb(100,187,128)',
        fontWeight:'900',
        fontSize:'168px',
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

    const [userData, setUserData] = useState({ email: '',username:'' });
    const [spinning, setSpinning] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const user = cookies.get('user')
        setUserData({ ...userData, email: user.email,username:user.username });
    }, []);

    const submit = async() =>{
        setSpinning(true);
        await request({
            url:'/users/update-profile/',
            method: 'put',
            data:userData
          }).then(async(response) => {
            if( response.status === 200 ){
                messageApi.open({
                    type: 'success',
                    content: '個人資料更新成功'
                });
                let userItem = cookies.get('user')    
                userItem.email = userData.email
                userItem.username = userData.username     
                cookies.set('user',userItem)           
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
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={userStyle}>
                        <UserOutlined />
                    </div>
                </div>
                <div>UserName</div>
                <div style={{ position:'relative' }}>
                    <UserOutlined style={ iptIcon } />
                    <input style={{marginBottom:'24px'}} type="text" placeholder='UserName' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value } )} /> 
                </div>
                <div>Email</div>
                <div style={{ position:'relative' }}>
                    <MailOutlined style={ iptIcon } />
                    <input style={{marginBottom:'24px'}} type="text" placeholder='Email' value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} /> 
                </div>
                {/* <div style={{marginBottom:'24px'}}>Death of birth</div> */}
                {/* <DatePicker placeholder='YYYY-MM-DD' className='customer-date-pick bg-none'  /> */}
                <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',marginTop:'40px',background:'rgb(100,187,128)',border:0 }} size="large" onClick={()=>{submit()}} >Complete</Button>
            </div>
        </div>
    </>
  )
}

