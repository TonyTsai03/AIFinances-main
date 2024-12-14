import { Button,Table,message,Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../../assets/css/table.css'
import request from '../../requests/index.js';
import React,{ useState,useEffect } from 'react'


export default function Stock() {

    const titleStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:'100%',
        paddingTop:'80px',
        paddingBottom:'40px',
    }

    const tableContenttyle = {
        backgroundColor:'rgb(41,44,56)',
        borderRadius:'15px',
        padding: '25px',
        height: '715px',
        overflow:'auto'
    }

    const tagStyle = {
        backgroundColor:'rgba(100,187,128,0.4)',
        textAlign:'center',
        borderRadius:'15px',
        padding: '10px',
        width:'180px',
        cursor:'pointer'
    }

    const conStyle = {
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        backgroundColor:'white',
        color:'rgb(100,187,128)',
        fontWeight:'900',
        fontSize:'28px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginRight:'10px'
    }

    const columns = [
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
          render: (text) => {
            return <>
                <div style={{display:'flex',alignItems:'center'}}>
                    <div style={conStyle}>＄</div>
                    <div>{text}</div>
                </div>
            </>
          },
        },
        {
          title: 'Nature',
          dataIndex: 'nature',
          key: 'nature',
        },
        {
          title: 'Collect',
          dataIndex: 'collect',
          key: 'collect',
          render: (_, { key,nature }) => (
            <>
              <div style={tagStyle} onClick={()=>favorites(key,nature)}>collect</div>
            </>
          ),
        },{
            title: 'Introduce',
            dataIndex: 'introduce',
            key: 'introduce',
            render: (_, { introduce,introduce2 }) => (
                <>
                    <div >{ introduce }</div>
                    <div style={{ color:'rgb(178,180,185)',fontSize:'12px' }}>{ introduce2 }</div>
                </>
              ),
        },{
          title: '',
          key: 'action',
          render: () => (
            <SearchOutlined style={{fontSize:'20px'}} />
          ),
        },
      ];
      
    const [spinning, setSpinning] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

      const getData = async() =>{  
        setSpinning(true);
        await request({
          url:'/stocks/random-stocks/',
          method: 'get',
          data:{
            count:50
          }
        }).then(async(response) => {
          if( response.status === 200 ){
            let responseData = []
            await response.data.data.forEach(element => {
              responseData.push({
                key:element.stock_id,
                nature:element['公司簡稱'], // 中文命名??

                code: element.stock_id,
                introduce: 'Link',
                introduce2: 'Company Profile',
              })
            });
            setData(responseData)            
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

      const favorites = async(id,name)=>{
        setSpinning(true);
        await request({
          url:'/stocks/favorites/add/',
          method: 'post',
          data:{
            stock_id:id,
            stock_name :name,
          }
        }).then(async(response) => {
          if( response.status === 200 ){
            messageApi.open({
              type: 'success',
              content: '收藏成功'
            });
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

    const getSearchData = async() =>{
      setSpinning(true);
      await request({
        url:'/stocks/search/?q=' + search,
        method: 'get'
      }).then(async(response) => {
        if( response.status === 200 ){
          let responseData = []
          await response.data.data.forEach(element => {
            responseData.push({
              key:element.stock_id,
              nature:element['公司簡稱'], // 中文命名??
              code: element.stock_id,
              introduce: '上市日期'+element['上市日期'],
              introduce2: '代理發言人'+element['代理發言人']
            })
          });
          setData(responseData)                      
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
        <div>
            <div style={titleStyle}>
                <h2 style={{ color:'rgb(255,255,255)' }} >Stock</h2>
                <div style={{display:'flex',alignItems:'center'}}>
                  <input style={{marginTop:0,paddingLeft:'10px'}} type="text" placeholder='Search' value={search}
                      onChange={(e) => setSearch(e.target.value )} /> 
                  <Button 
                  onClick={()=>getSearchData()}
                  style={{ width:'220px',color:'rgb(255,255,255)',background:'rgb(100,187,128)',border:0,position:'relative',marginLeft:'20px' }} 
                  size="large">
                      <SearchOutlined style={{ position:'absolute',left:'15px' }} />
                      search
                  </Button>
                </div>
            </div>
            <div style={tableContenttyle}>
                <Table 
                    className='customer-table'
                    pagination={false} 
                    rowHoverable={false} 
                    columns={columns} 
                    dataSource={data} />
            </div>
        </div>
    </>
  )
}

