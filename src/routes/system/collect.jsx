import { Button, Dropdown, Space,message,Spin  } from 'antd';
import { AccountBookOutlined,SearchOutlined,DownloadOutlined,DownOutlined } from '@ant-design/icons';
import '../../assets/css/table.css'
import React,{ useState,useEffect } from 'react'
import request from '../../requests/index.js';
import { useNavigate } from 'react-router-dom';

export default function Collect() {

  const navigate = useNavigate();

    const titleStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'100%',
        paddingTop:'80px',
        paddingBottom:'40px',
    }

    const cardStyle = {
      backgroundColor:'rgba(255,255,255,0.05)',
      width:'350px',
      height:'220px',
      borderRadius:'10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection:'column',
      padding:'10px',
      marginRight:'20px',
      marginBottom:'20px',
      position:'relative'
    }

    const iconBtnStyle = {
        width:'50px',
        height:'50px',
        backgroundColor:'rgb(75,80,96)',
        borderRadius:'15px',
        color:'rgb(178,180,185)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px',
        fontSize:'20px'
    }

    const cardCrossStyle = {
      position:'absolute',
      top:'5px',
      right:'10px',
      color:'white',
      fontSize:'20px',
      cursor:'pointer'
    }

    const [spinning, setSpinning] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState([]);
    const getData = async() =>{  
      setSpinning(true);
      await request({
        url:'/stocks/favorites/',
        method: 'get',
        data:{
          count:50
        }
      }).then(async(response) => {
        if( response.status === 200 ){
          setData(response.data)
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

    const cross = async(id) =>{
      setSpinning(true);
      await request({
        url:`/stocks/favorites/${id}/remove/`,
        method: 'delete'
      }).then(async(response) => {
        if( response.status === 200 ){
          getData()
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
      getData()
    }, []);

    const items = [
      {
        key: '1',
        label: 'sort by:default'
      },
      {
        key: '2',
        label: 'sort by:name'
      },
      {
        key: '3',
        label: 'sort by:collection'
      },
    ];


  return (
    <>
    {contextHolder}
    <Spin spinning={spinning} fullscreen />
        <div>
            <div style={titleStyle}>
                <h2 style={{ color:'rgb(255,255,255)' }} >Stocks in your collection</h2>
                {/* <div style={{display:'flex'}}>
                  <div style={iconBtnStyle}><SearchOutlined /></div>
                  <div style={iconBtnStyle}><DownloadOutlined /></div>
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <Space style={{
                      color:'rgb(178,180,185)',
                      cursor:'pointer',
                      backgroundColor:'rgb(75,80,96)',
                      borderRadius:'15px',
                      padding:'5px 25px',
                    }}>sort by:default<DownOutlined /></Space>
                  </Dropdown>
                </div> */}
            </div>
            <div>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                  {
                    data.map((item,index) => {
                      return <div style={cardStyle} key={item.id}>
                          <div style={cardCrossStyle} onClick={()=>cross(item.stock_id)}>✖</div>
                          <div style={{color:'white',display:'flex',fontSize:'28px',paddingTop:'10px'}}>{item.stock_name}</div>
                          <div style={{color:'white',display:'flex',fontSize:'40px'}}>
                            <AccountBookOutlined style={{marginRight:'10px'}} />
                            <div>{item.stock_id}</div>
                          </div>
                          <Button style={{ color:'rgb(255,255,255)',background:'rgb(100,187,128)',border:0,width:'100%',borderRadius:'25px' }} size="large" onClick={()=>{
                            navigate('/system/predict',{state:{company_code:item['stock_id'],company_name:item['stock_name']}})
                          }} >
                            Check
                          </Button>
                        </div>
                    } )
                  }
                </div>
            </div>
        </div>
    </>
  )
}

