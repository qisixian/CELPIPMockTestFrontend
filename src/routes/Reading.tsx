import getArticle from "../requests/Requests";
import {useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import axios from "axios";
import DoubleScroller from "../components/DoubleScroller";


const layoutStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    // width: '100vw',
    width: '100%',
    height: '100vh',
    // maxHeight: '100vh',
    // maxWidth: 'calc(100%)',
};


function Reading() {

    const [data, setData] = useState(null); //这个数据如果（用setData方法）发生改变，组件就会重新渲染


    useEffect(() => {

        axios.get("http://localhost:8080/")
            .then((response) => {
            setData(response.data);
        });


    }, []);

    if (!data) return "null";


    return (
        <Layout style={layoutStyle}>
            <Footer>{data.articleTitle}</Footer>
            <DoubleScroller
                articleInstruction={data.articleInstruction}
                articleContent1={data.articleContent1}
                questionInstruction1={data.questionInstruction1}
                articleContent2Index={data.articleContent2Index}
                articleContent2={data.articleContent2}
                questionInstruction2={data.questionInstruction2}
            />
            <Footer>Footer</Footer>
        </Layout>
        );
}

export default Reading;

