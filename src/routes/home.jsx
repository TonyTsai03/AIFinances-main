import { Carousel,Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import pageImg1 from '../assets/img/page1.png'
import pageImg2 from '../assets/img/page2.png'
import pageImg3 from '../assets/img/page3.png'
import logoImg from '../assets/img/logo.png'
import logo2Img from '../assets/img/logo2.png'
export default function Home() {

    const navigate = useNavigate();

    const coverStyle = {
        background:'rgba(0,0,0,0.3)',
        display:'flex',
        padding:'15px',
        marginTop:'60px',
    }

    const contentStyle = {
        textAlign: 'center',
        margin:'auto',
        paddingBottom:'20px',
        width:'70%',
    };

  return (
    <>
        <div style={{background:'rgb(41,44,56)',width:'100%',color:'white'}}>
            <div style={{textAlign:'center'}}>
                <div style={{display:'flex',justifyContent:'end'}}>
                    <div style={{marginTop:'25px',background:'rgb(100,187,128)',display:'flex',fontSize:'40px',borderRadius:'35px 0px 0px 35px'}}>
                        <div style={{padding:'5px 30px',cursor:'pointer'}}>Introduction</div>
                        <a href="#aboutus" style={{padding:'5px 30px',cursor:'pointer',color:'white'}}>About us</a>
                        <a href="#contectus" style={{padding:'5px 30px',cursor:'pointer',color:'white'}}>Contect us</a>
                    </div>
                </div>
                <div style={{fontSize:'80px',fontWeight:'600',marginTop:'150px'}}>Welcome</div>
                <div style={{fontSize:'80px',fontWeight:'600'}}>AIFinances</div>
                <div style={{ color:'rgb(178,180,185)' }}>text</div>
                <Button style={{ color:'rgb(255,255,255)',fontWeight:'600',marginTop:'40px',background:'rgb(100,187,128)',border:0,width:'400px',borderRadius:'30px' }} size="large" onClick={()=>{navigate('/register')}}>Join us</Button>
            </div>
            <div style={{padding:'0 20px',background:'rgb(41,44,56)'}}>
                <div style={coverStyle}>
                    <div style={{width:'55%',paddingLeft:'50px'}}>
                        <div style={{fontSize:'80px',fontWeight:'600'}}>Welcome</div>
                        <div style={{fontSize:'60px',fontWeight:'600'}}>text</div>
                    </div>
                    <div style={{width:'45%',background:'rgb(75,80,96)',padding:'20px 5px'}}>
                        <Carousel className='customer-carousel' >
                            <div>
                                <img style={contentStyle} src={pageImg1} alt="" />
                            </div>
                            <div>
                                <img style={contentStyle} src={pageImg2} alt="" />
                            </div>
                            <div>
                                <img style={contentStyle} src={pageImg3} alt="" />
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div style={coverStyle} id='aboutus'>
                    <div style={{width:'45%',background:'rgb(75,80,96)',padding:'20px 5px'}}>
                        <Carousel className='customer-carousel' >
                            <div>
                                <img style={contentStyle} src={logoImg} alt="" />
                            </div>
                            <div>
                                <img style={contentStyle} src={logo2Img} alt="" />
                            </div>
                        </Carousel>
                    </div>
                    <div style={{width:'55%',paddingLeft:'50px'}}>
                        <div style={{fontSize:'80px',fontWeight:'600'}}>About us</div>
                        <div style={{fontSize:'60px',fontWeight:'600'}}>text</div>
                    </div>
                </div>
            </div>
            <div style={{textAlign:'center',background:'rgb(41,44,56)'}}>
                <div id='contectus' style={{fontSize:'50px',fontWeight:'600'}}>Contect us</div>
                <div style={{fontSize:'30px',fontWeight:'600'}}>exanple@gmail.com</div>
            </div>
            
        </div>
     
    </>
  )
}

