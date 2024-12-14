import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/img/logo.png'


export default function Success() {

    const navigate = useNavigate();

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
        backgroundColor:'rgb(100,187,128)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

  return (
    <>
        <div style={containerStyle}>
            <div style={{ display:'flex',position:'absolute',left:'50px',top:'50px' }}>
                <img width='100px' src={logoImg} alt="" />
                <h1 style={{ color:'rgb(255,255,255)' }} >AIFinances</h1>
            </div>
            <div style={successIconStyle}>
                <CheckOutlined style={{ color:'white',fontSize:'56px' }} />
            </div>
            <h1>SUCCESS</h1>
            <div style={{ color:'rgb(178,180,185)' }}>Congratulations,your account has been successfully created.</div>
            <Button 
                style={{ width:'550px',color:'rgb(255,255,255)',fontWeight:'600',marginTop:'25px',marginBottom:'25px',background:'rgb(100,187,128)',border:0 }} 
                size="large"
                onClick={()=>{navigate('/login')}}>Continue</Button>
            <div style={{ color:'rgb(178,180,185)' }}>Back to Login</div>
        </div>
     
    </>
  )
}

