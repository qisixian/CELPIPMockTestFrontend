import {createContext, useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import MyList from "../components/MyList";
import { Button, notification } from 'antd';

import {Routes, Route} from "react-router-dom";
import MyCard from "../components/MyCard";



function Home() {
    const data = [
        'Mock Test 1',
        'Mock Test 2',
        'Mock Test 3',
        'Mock Test 4',
        'Mock Test 5',
    ];

    const [api, contextHolder] = notification.useNotification();



    const openNotification = (desc: String) => {
        api.info({
            message: 'Notification',
            description: desc,
        });
    };

    return (
        <>
            <h1>CELPIP Test</h1>
            <MyList items={data}>1</MyList>
            {contextHolder}
            <Button type="primary" onClick={() => openNotification("hi")}>Hi</Button>
        </>
    );
}

export default Home;
