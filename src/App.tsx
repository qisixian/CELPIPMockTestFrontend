import {createContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyList from "./components/MyList";
import { Button, notification } from 'antd';

import {Routes, Route} from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    const [api, contextHolder] = notification.useNotification();

  const handleSelectedItem = (item: String) => {
      api.info({
          message: 'Notification title',
          description: item,
      });
  }


    const openNotification = (item: String) => {
        api.info({
            message: 'Notification',
            description: item,
        });
    };

  return (
<>
            <MyList items={data} heading={"heading"} onSelectItem={openNotification}>1</MyList>
            {contextHolder}
            <Button type="primary" onClick={()=>openNotification("hi")}>Button</Button>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
</>
  )
}

export default App
