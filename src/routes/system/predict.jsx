import { DatePicker,Space,Radio,message,Spin } from 'antd';
import { RiseOutlined,DownloadOutlined,FallOutlined,DashOutlined } from '@ant-design/icons';
import '../../assets/css/datePick.css'
import React, { PureComponent,useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import request from '../../requests/index.js';
import { useLocation } from 'react-router-dom';


export default function Predict() {

  const { RangePicker } = DatePicker;

    const titleStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'100%',
        paddingTop:'80px',
        paddingBottom:'20px',
    }

    const iconStyle = {
      width:'60px',
      height:'60px',
      backgroundColor:'rgba(255,255,255)',
      borderRadius:'50%',
      marginTop:'40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize:'30px'
    }

    const qutStyle = {
      width:'20px',
      height:'20px',
      border:'1px solid rgb(255,255,255)',
      borderRadius:'50%',
      textAlign:'center',
      lineHeight:'20px',
      position:'absolute',
      top:'20px',
      right:'20px'
    }

    const cardStyle = {
        width:'380px',
        height:'300px',
        backgroundColor:'rgb(41,44,56)',
        borderRadius:'15px',
        marginRight:'20px',
        color:'rgb(255,255,255)',
        textAlign:'center',
        padding:'10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        position:'relative'
    }

    const AreaStyle = {
      width:'1580px',
      height:'500px',
      backgroundColor:'rgb(41,44,56)',
      borderRadius:'15px',
      marginRight:'20px',
      color:'rgb(255,255,255)',
      padding:'10px 20px',
  }
  const location = useLocation();

  const [spinning, setSpinning] = React.useState(false);
  const [name, setName] = React.useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [predictions,setPredictions] = React.useState([
    {
      text:'Day1',
      value:0,
      xode:0,
      show:true,
      icon:<DashOutlined />,
      iconColor:'rgb(100,187,128)'
    },{
      text:'Day2',
      value:0,
      xode:0,
      show:true,
      icon:<DashOutlined />,
      iconColor:'rgb(100,187,128)'
    },{
      text:'Day3',
      value:0,
      xode:0,
      show:true,
      icon:<DashOutlined />,
      iconColor:'rgb(100,187,128)'
    },{
      text:'Day4',
      value:0,
      xode:0,
      show:true,
      icon:<DashOutlined />,
      iconColor:'rgb(100,187,128)'
    },{
      text:'Day5',
      value:0,
      xode:0,
      show:false,
      icon:null,
      iconColor:null
    }
  ]);
  const [data, setData] = React.useState([
    {
      name: 'Day1',
      uv: 0,
    },{
      name: 'Day2',
      uv: 0,
    },{
      name: 'Day3',
      uv: 0,
    },{
      name: 'Day4',
      uv: 0,
    },{
      name: 'Day5',
      uv: 0,
    },
  ]);

  const CustomerTooltip = ({ active,payload,label})=>{
    if ( active && payload?.length ) {
      return (
        <div style={{padding:'5px 15px',minWidth:'168px',borderRadius:'10px',background:'rgba(255,255,255,0.2)'}}>
          { payload.map((ele,index)=>(         
            <React.Fragment key={index}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{fontSize:'14px'}}>2024/12/{ele.payload.name}</div>
                <div style={{width:'22px',height:'22px',borderRadius:'50%',background:'rgb(20,42,75)',textAlign:'center'}}><RiseOutlined /></div>
              </div>
              <h2 style={{margin:'5px 0'}}>{ele.payload.uv}</h2>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>RISE</div>
                <div>+10%</div>
              </div>
            </React.Fragment>
          )) }
        </div>
      )
    }
    return null
  }

  const getData = async(company_code) => {
    setSpinning(true);
    await request({
      url:'/prediction/predict/',
      method: 'post',
      data:{
        company_code:company_code
      }
    }).then(async(response) => {
      if( response.status === 200 ){
        const Day1 = (response.data.predictions['Day1'])?(Math.round(response.data.predictions['Day1']*100)/100):0;
        const Day2 = (response.data.predictions['Day2'])?(Math.round(response.data.predictions['Day2']*100)/100):0;
        const Day3 = (response.data.predictions['Day3'])?(Math.round(response.data.predictions['Day3']*100)/100):0;
        const Day4 = (response.data.predictions['Day4'])?(Math.round(response.data.predictions['Day4']*100)/100):0;
        const Day5 = (response.data.predictions['Day5'])?(Math.round(response.data.predictions['Day5']*100)/100):0;
       

        setPredictions([
          {
            text:'Day1',
            value:Day1,
            xode:0,
            show:true,
            icon:<DashOutlined />,
            iconColor:'rgb(100,187,128)'
          },{
            text:'Day2',
            value:Day2,
            xode:Day2 - Day1,
            show:true,
            icon:( Day2 - Day1 == 0 ) ? <DashOutlined /> : (Day2 - Day1 < 0) ? <FallOutlined /> : <RiseOutlined /> ,
            iconColor: (Day2 - Day1 < 0) ? 'rgb(236,173,10)' : 'rgb(100,187,128)'
          },{
            text:'Day3',
            value:Day3,
            xode:Day3 - Day2,
            show:true,
            icon:( Day3 - Day2 == 0 ) ? <DashOutlined /> : (Day3 - Day2 < 0) ? <FallOutlined /> : <RiseOutlined /> ,
            iconColor: (Day3 - Day2 < 0) ? 'rgb(236,173,10)' : 'rgb(100,187,128)'
          },{
            text:'Day4',
            value:Day4,
            xode:Day4 - Day3,
            show:true,
            icon:( Day4 - Day3 == 0 ) ? <DashOutlined /> : (Day4 - Day3 < 0) ? <FallOutlined /> : <RiseOutlined /> ,
            iconColor: (Day4 - Day3 < 0) ? 'rgb(236,173,10)' : 'rgb(100,187,128)'
          },{
            text:'Day5',
            value:Day5,
            xode:Day5 - Day4,
            show:false,
            icon:null,
            iconColor:null
          }
        ])

        setData([
          {
            name: 'Day1',
            uv: Day1,
          },{
            name: 'Day2',
            uv: Day2,
          },{
            name: 'Day3',
            uv: Day3,
          },{
            name: 'Day4',
            uv: Day4,
          },{
            name: 'Day5',
            uv: Day5,
          },
        ])
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
    if( location.state && location.state.company_code){
      getData(location.state.company_code)
      setName(location.state.company_name)
    }else{
      messageApi.open({
        type: 'error',
        content: '請先前往選擇公司'
      });
    }
  }, []);

  return (
    <>
    {contextHolder}
    <Spin spinning={spinning} fullscreen />
        <div style={{ paddingBottom:'20px' }}>
            <div style={titleStyle}>
                <h2 style={{ color:'rgb(255,255,255)' }} >Main Predict</h2>
                {/* <div><RangePicker className='customer-date-pick'/></div> */}
            </div>
            <h1 style={{color:'white'}}>{name}</h1>
            <div>
                <div style={{display:'flex'}}>
                  { 
                    predictions.map((ele,index)=>{
                      return ele.show?(
                        <div key={index} style={cardStyle}>
                          {/* <div style={qutStyle}>?</div>  */}
                          <div style={{...iconStyle,...{backgroundColor:ele.iconColor}}}>{ele.icon}</div> 
                          <div style={{ fontSize:'40px' }}>{ ele.value }%</div> 
                          <div style={{ color:'rgb(178,180,185)' }}>{ele.text}</div> 
                          <div style={{ color:ele.xode >= 0 ?'rgb(100,187,187)':'red',marginTop:'20px' }}>{ ele.xode > 0 ? '+':''}{ ele.xode }%</div> 
                        </div>
                      ):null
                    })
                  }
                </div>
                <div style={{display:'flex',marginTop:'20px'}}>

                  {/* <div style={AreaStyle}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <h2>Exponential growth</h2>
                      <div style={{ width:'35px',height:'35px',border:'1px solid rgb(178,180,185)',borderRadius:'50%',textAlign:'center',lineHeight:'30px',fontSize:"20px" }}>
                        <DownloadOutlined />
                        </div>
                    </div>
                    <Radio.Group value={1} style={{marginBottom:'20px'}}>
                      <Radio value={1}><span style={{ color:'rgb(178,180,185)' }}>Financial Statements</span></Radio>
                      <Radio value={2}><span style={{ color:'rgb(178,180,185)' }}>Stcok price</span></Radio>
                    </Radio.Group>
                    <ResponsiveContainer width="100%" height="75%">
                      <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false}  />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomerTooltip active={false} payload={[]} label={''} />} />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div> */}

                  <div style={AreaStyle}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <h2>Stock transaction volume</h2>
                      {/* <div style={{ width:'35px',height:'35px',border:'1px solid rgb(178,180,185)',borderRadius:'50%',textAlign:'center',lineHeight:'30px',fontSize:"20px" }}>
                        <DownloadOutlined />
                        </div> */}
                    </div>
                    {/* <Radio.Group value={1} style={{marginBottom:'20px'}}>
                      <Radio value={1}><span style={{ color:'rgb(178,180,185)' }}>NOW</span></Radio>
                      <Radio value={2}><span style={{ color:'rgb(178,180,185)' }}>a weak</span></Radio>
                      <Radio value={3}><span style={{ color:'rgb(178,180,185)' }}>a month</span></Radio>
                    </Radio.Group> */}
                    <ResponsiveContainer width="100%" height="75%">
                      <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false}  />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomerTooltip active={false} payload={[]} label={''} />} />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                </div>
            </div>
        </div>
    </>
  )
}

