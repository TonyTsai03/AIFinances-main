import { Button,message,Spin } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
import verifyImg from '../assets/img/verify.png'
import logoImg from '../assets/img/logo.png'
import React,{ useState,useEffect } from 'react'
import request from '../requests/index.js';

export default function Success() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if( location.state === undefined && location.state.email === undefined ){
            navigate('/forgetPassword')
        }
    }, []);

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'100vh',
        backgroundColor:'rgb(41,44,56)',
        flexDirection:'column',
        color:'rgba(255,255,255)',
        position:'relative'
    }

    const successIconStyle = {
        width:'100px',
        height:'100px',
        borderRadius:'50%',
        backgroundColor:'rgb(74,78,96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const iptStyle = {
        width:'60px',
        height:'60px',
        backgroundColor:'white',
        color:'black',
        fontSize:'40px',
        padding:'0',
        textAlign:'center',
        marginRight:'20px',
    }

    const iptChange = (e,index) =>{
        if( e.target.value != '' && index < 3){
            e.target.nextSibling.focus()
        }        
        let newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp)
    }
    const [messageApi, contextHolder] = message.useMessage();
    const [otp, setOtp] = useState(['','','','']);
    const [spinning, setSpinning] = React.useState(false);

    const submit = async() =>{        
        let error = false;
        let otpvalue = ''
        await otp.forEach(element => {
            if(element === ''){
                error = true;
            }
            otpvalue += element;
        });
        if( error) {
            messageApi.open({
              type: 'error',
              content: 'OTP 不得為空'
            });
            return;
          }
          setSpinning(true);
        await request({
            url:'/users/verify-otp/',
            method: 'post',
            data:{
              otp:otpvalue,
              email:location.state.email
            }
          }).then((response) => {
            if( response.status === 200 ){
              navigate('/resetPassword',{state:{email:location.state.email,otp:otpvalue}})
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
        <div style={containerStyle}>
            <div style={{ display:'flex',position:'absolute',left:'50px',top:'50px' }}>
                <img width='100px' src={logoImg} alt="" />
                <h1 style={{ color:'rgb(255,255,255)' }} >AIFinances</h1>
            </div>
            <div style={successIconStyle}>
                <img width='100px' src={verifyImg} alt="" />
            </div>
            <h1>ENTER OTP</h1>
            <div style={{ color:'rgb(178,180,185)' }}>We have sent alink to your email address:artenthusiast@gmail.com</div>
            <div style={{display:'flex'}}>
                <input value={otp[0]} style={iptStyle} type="text" maxLength="1" onChange={(event)=>iptChange(event,0)} />
                <input value={otp[1]} style={iptStyle} type="text" maxLength="1" onChange={(event)=>iptChange(event,1)} />
                <input value={otp[2]} style={iptStyle} type="text" maxLength="1" onChange={(event)=>iptChange(event,2)} />
                <input value={otp[3]} style={iptStyle} type="text" maxLength="1" onChange={(event)=>iptChange(event,3)}/>
            </div>
            <Button 
                style={{ width:'550px',color:'rgb(255,255,255)',fontWeight:'600',marginTop:'25px',marginBottom:'25px',background:'rgb(100,187,128)',border:0 }} 
                size="large"
                onClick={()=>{submit()}}>Skip</Button>
            <div style={{ color:'rgb(178,180,185)' }}>You did not receive the message?Resend</div>
        </div>
     
    </>
  )
}

