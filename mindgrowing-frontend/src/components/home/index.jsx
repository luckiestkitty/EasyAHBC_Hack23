import React, {useState} from 'react'
import { Input, Button } from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import './index.css'
import './ghost.css'


export default function() {
  const [maskOpened, setMaskOpened] = useState(true); // mask is the search result
  const {Search} = Input; // use antd's input as search bar
  const navigate = useNavigate();

  const clickSearch = () => {
    navigate('/zora', {
      replace: true,
    })
  }

  return (
    <div className="index ghost">
        {/* LOGO */}
        <div style={{textAlign: 'center', margin: '104px 0 34px'}}>
            <img src="/mindGarden-logo.png"
            alt="mind-garden logo"
            className="search-logo"></img>
        </div>
        {/* SEARCH BAR */}
        <div className="search-wrapper">
            <Search enterButton={<Button type='ghost'
                                          onClick={() => clickSearch()}><SearchOutlined/></Button>} 
                size="large"
                className="search"
                onFocus={() => setMaskOpened(false)}
                onBlur={() => setMaskOpened(true)}
            />
        </div>
        {/* BACKGROUND */}
        <div className={"mask" + (maskOpened ? "" : " hidden")} />
        <iframe title="myIframe" className="bg" src="/stars/index.html" />
    </div>
  )
}
