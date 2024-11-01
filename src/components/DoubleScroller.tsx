import {Element} from 'react-scroll';
import {Radio, Button, Dropdown, Space, Select, Col, Row} from 'antd';
import type {MenuProps, RadioChangeEvent } from 'antd';
import {useRef, useState} from "react";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

interface Props {
    articleInstruction: String;
    articleContent1: String;
    questionInstruction1: String;
    articleContent2Index: int;
    articleContent2: String;
    questionInstruction2: String;
}

const highlightStyle = {
    fontWeight: 'bold',
    color: 'blue',
};

function DoubleScroller({articleInstruction, articleContent1, questionInstruction1, articleContent2Index, articleContent2, questionInstruction2}: Props) {

    const colStyle = {
        height: '77vh',
        // height: '100%',
        // maxHeight: '100%',
        // overflowY: scroll,
        overflowY: 'scroll',
        overflowX: 'hidden'
        // border: '1px solid black',
    }

    const div1Ref = useRef(null);
    const div2Ref = useRef(null);
    const [isSyncing, setIsSyncing] = useState(false); // 用于防止循环滚动的标记

    let initalized = false;
    let div1scrollBarHeight = -1;
    let div2scrollBarHeight = -1;

    // 处理第一个元素滚动事件
    const handleScroll1 = (e) => {
        if (!initalized) {
            div1scrollBarHeight = div1Ref.current.scrollHeight - div1Ref.current.clientHeight;
            div2scrollBarHeight = div2Ref.current.scrollHeight - div2Ref.current.clientHeight;
            initalized = true;
        }
        if (isSyncing) return;
        setIsSyncing(true);
        const scrollRatio = Math.round(div1Ref.current.scrollTop * 100 / div1scrollBarHeight) / 100;
        div2Ref.current.scrollTop = Math.round(div2scrollBarHeight * scrollRatio * 100)/100; // 同步滚动位置
        setIsSyncing(false);
    };

    // 处理第二个元素滚动事件
    const handleScroll2 = () => {
        if (!initalized) {
            div1scrollBarHeight = div1Ref.current.scrollHeight - div1Ref.current.clientHeight;
            div2scrollBarHeight = div2Ref.current.scrollHeight - div2Ref.current.clientHeight;
            initalized = true;
        }
        if (isSyncing) return;
        setIsSyncing(true);
        const scrollRatio = Math.round(div2Ref.current.scrollTop * 100 / div2scrollBarHeight) / 100;
        div1Ref.current.scrollTop = Math.round(div1scrollBarHeight * scrollRatio); // 同步滚动位置
        setIsSyncing(false);
    };

    // const splitedContent = articleContent2.split('{{}}');

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div>
            <Row>
                <Col span={12}>
                    <div style={colStyle} ref={div1Ref} onScroll={handleScroll1}>
                        <p style={highlightStyle}>{articleInstruction}</p>
                        <p>{articleContent1}</p>
                        {/*<Element name="section1">*/}
                        {/*    <section style={{ height: '120vh', backgroundColor: 'lightblue' }}>*/}
                        {/*    </section>*/}
                        {/*</Element>*/}
                    </div>
                </Col>
                <Col span={12}>
                    <div style={colStyle} ref={div2Ref} onScroll={handleScroll2}>
                        <p style={highlightStyle}>{questionInstruction1}</p>

                        <Select
                            style={{ width: 100 }}
                            onChange={handleChange}
                            options={[
                                { value: 'jack'},
                                { value: 'lucy'},
                                { value: 'Yiminghe'},
                                { value: 'disabled'},
                            ]}
                        />
                        <p>{articleContent2}</p>
                        <p style={highlightStyle}>{questionInstruction2}</p>

                        <Select
                            style={{ width: 100 }}
                            onChange={handleChange}
                            options={[
                                { value: 'jack'},
                                { value: 'lucy'},
                                { value: 'Yiminghe'},
                                { value: 'disabled'},
                            ]}
                        />
                        {/*<Element name="section2">*/}
                        {/*    <section style={{ height: '150vh', backgroundColor: 'lightgreen' }}>*/}
                        {/*    </section>*/}
                        {/*</Element>*/}
                    </div>
                </Col>
            </Row>
        </div>);
}

export default DoubleScroller;