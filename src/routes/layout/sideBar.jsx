import { Outlet } from 'react-router-dom';
import '../../assets/css/sidebar.css'
import logoImg from '../../assets/img/logo.png'
import { GlobalOutlined,BarChartOutlined,InboxOutlined,SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useLocation,useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react'

export default function Success() {

    const navigate = useNavigate();

    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });

    const location = useLocation();
    const [sideBars, setBar] = useState([
        {
            url:'stock',
            name:'Stock',
            icon:<GlobalOutlined />
        },{
            url:'collect',
            name:'Collect',
            icon:<InboxOutlined />
        },{
            url:'predict',
            name:'Predict',
            icon:<BarChartOutlined />
        },{
            url:'setting',
            name:'Setting',
            icon:<SettingOutlined />,
            hasChildren:true,
            show:false,
            childrens:[
                {
                    url:'information',
                    name:'Information',
                },{
                    url:'security',
                    name:'Security',
                }
            ]
        },
    ])

    const showBarItem = (index) => {
        const newVisibilityArray = [...sideBars];
        newVisibilityArray[index].show = !newVisibilityArray[index].show;
        setBar(newVisibilityArray)        
    }


    let sideBarElement = sideBars.map((item, index)=>{
        if(item.hasChildren){
            let act = false
            item.childrens.forEach((child)=>{
                if(location.pathname.includes(child.url)){
                    act = true
                }
            })
            return <React.Fragment key={index}>
                <Button
                    className={{'side-bar-button':true,'active':act}}
                    onClick={()=>showBarItem(index)}
                    style={{ border:0,width:'100%',padding:"20px 25px",justifyContent:'start',marginBottom:'10px' }}>
                        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%' }}>
                            <div>
                                {item.icon}
                                <span style={{marginLeft:'10px'}}>{item.name}</span>
                            </div>
                            <svg className={`${!item.show ? 'svg-roate-form' : 'svg-roate-return'}`} width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 0.5L8.5 8L1 0.499999" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                </Button>
                <div>
                    {item.show && item.childrens.map((child,childIndex)=>{
                        return <React.Fragment key={childIndex}>
                            <div style={{ color:'rgb(178,180,185)',paddingLeft:'28px' }}>|</div>
                            <div className={`side-bar-button-item ${location.pathname.includes(child.url) ? 'active' : ''}`} onClick={()=>{navigate(`${child.url}`)}}>
                                <div>●</div>
                                <div style={{marginLeft:'10px'}}>{child.name}</div>
                            </div>
                        </React.Fragment>
                    })}
                </div>
            </React.Fragment>
        }
        
        return <React.Fragment key={index}>
            <div>
                <Button
                className={{'side-bar-button':true,'active':location.pathname.includes(item.url)}}
                onClick={()=>{navigate(`${item.url}`)}}
                style={{ border:0,width:'100%',padding:"20px 25px",justifyContent:'start',marginBottom:'10px' }}>
                    {item.icon}
                    {item.name}
                </Button>
            </div>
        </React.Fragment>
    })
    

  return (
    <>
        <div id='background'>
            <div className='side-bar'>
                <div className="side-bar-logo">
                    <img width='100px' src={logoImg} alt="" />
                    <h2 style={{ color:'rgb(255,255,255)' }} >AIFinances</h2>
                </div>
                <div className='side-bar-bar'>
                    <div>
                        {sideBarElement}
                    </div>
                    <div className='side-bar-logout' onClick={()=>{navigate('/login')}}>
                        <IconFont type="icon-tuichu" />
                        <span style={{ marginLeft:"12px" }}>Logout</span>
                    </div>
                </div>
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </div>
    </>
  )
}

