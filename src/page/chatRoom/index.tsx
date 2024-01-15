import './index.scss'
import React, { useEffect, useRef, useState } from 'react';

import { Avatar, Button, ColorPicker, Form, Input, Modal } from 'antd';
import FloatMenu from '../../components/FloatMenu';
const { TextArea } = Input;

interface inforList {
    key: number;
    type: string;
    data: string;
    identifier?: string;
    ip?: string;
    color?: string;
    name?: string;
}

export default function ChatRoom() {
    const [ws, setWS] = useState<WebSocket | null>(null)
    const list = useRef<inforList[]>([])    // 消息列表数据

    const identifiers = useRef<string>('')    // 加入聊天用户ID

    const [isJoin, setIsJoin] = useState<boolean>(false)    // 是否已加入聊天
    const [inputValue, setInputValue] = useState<string>('')    // 消息输入框数据

    const [refresh, setRefresh] = useState<boolean>(false)

    const color = useRef<string>('#1677FF')   //  用户昵称
    const name = useRef<string>('')   //  用户自选头像颜色

    const roomPeople = useRef<any[]>([])

    const outPut = (obj: { type: string; data: string; }) => {
        list.current = [...list.current, {
            key: list.current.length,
            ...obj,
        }]
        setRefresh(!refresh)
    }

    const send = (obj: { identifier: string; data: any; color: string; name: string; }) => {
        const sendMsg = JSON.stringify(obj)
        if (ws) {
            ws.send(sendMsg)
        }
        setInputValue('')
    }

    // 点击进入聊天室
    const connectBtnClick = () => {
        if (!ws) {
            setWS(new WebSocket('ws://localhost:1234/ws'));
            let wss = new WebSocket('ws://localhost:1234/ws')
            wss.onopen = (params) => {
                // outPut({
                //     type: 'system',
                //     data: `${name.current ? name.current : ''}加入聊天`,
                // })
                wss.send(JSON.stringify({
                    type: 'system',
                    data: `加入聊天`,
                    name: name.current,
                    color: color.current
                }))
                setIsJoin(true)
            };
            wss.onmessage = (e) => {
                const message = JSON.parse(e.data)
                console.log(message)
                if (message?.type == 'init') {
                    identifiers.current = message.identifier
                } else {
                    outPut({
                        ...message,
                        type: message.type ? message.type : (message.identifier == identifiers.current ? 'me' : 'people'),
                        name: message.name,
                        color: message.color
                    })
                }
            };
            wss.onclose = (evt) => {
                outPut({
                    type: 'system',
                    data: '聊天室关闭'
                })
                setIsJoin(false)
            };
            wss.onerror = (evt) => {
                outPut({
                    type: 'system',
                    data: '连接失败'
                });
                setIsJoin(false)
            };
        } else {
            outPut({
                type: 'system',
                data: '加入聊天'
            })
            setIsJoin(true)
        }
    }

    // 退出聊天室
    const exitBtnClick = () => {

    }

    // 点击发送按钮，发送消息
    const sendBtnClick = () => {
        if (!inputValue && inputValue === '') return
        send({
            identifier: identifiers.current,
            data: inputValue,
            color: color.current,
            name: name.current
        });
    }

    // 换行及发送消息的按键操作
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey) {
            // 当按下Shift + Enter时，执行换行操作
            const newValue = `${inputValue}`;
            setInputValue(newValue);
        } else if (e.keyCode === 13 && !e.shiftKey) {
            // 当只按下Enter时，取消默认执行的换行操作
            e.preventDefault()
            if (!inputValue && inputValue === '') return
            send({
                identifier: identifiers.current,
                data: inputValue,
                color: color.current,
                name: name.current
            });
        } else {
            return;
        }
    }

    useEffect(() => {
        setRefresh(!refresh)
        // 控制聊天消息最新
        let inforBox = document.getElementById("inforBox");
        inforBox!.scrollTop = inforBox?.scrollHeight ?? 0;
        // 加入人员头像展示
        roomPeople.current = []
        list.current.forEach(item => {
            if (item.type == "system" && item.data == "加入聊天") {
                // roomPeople.current = [...roomPeople.current, { name: item.name, color: item.color, identifiers: item.identifier }]
                roomPeople.current.push({ name: item.name, color: item.color, identifiers: item.identifier })
            }
        })
    }, [list.current])

    const aaa = () => {

    }

    return (
        <div className='chatRoom-page'>
            <div className='topBox'>
                <div className='topTitle'>XXX聊天室</div>
                <div className='avatar'>
                    <Avatar.Group>
                        {roomPeople.current.map((item) => {
                            return <Avatar style={{ backgroundColor: item.color }}>{item.name ? item.name : item.identifier}</Avatar>
                        })}
                    </Avatar.Group>
                </div>
            </div>
            <div id='inforBox' className='inforBox'>
                {list.current.map((item) => {
                    return (item.type == 'me' ? (
                        <div className="right">
                            <div className="info">
                                <span>{item.name ? item.name : item.identifier}</span>
                                {/* <span>{item.name}</span> */}
                                <div className="bubble">
                                    {item.data.split('\n').map((items) => (
                                        <p>{items}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="ava">
                                <Avatar style={{ backgroundColor: item.color, verticalAlign: 'middle' }} size="large" gap={0}>{item.name ? item.name : item.identifier}</Avatar>
                            </div>
                        </div>
                    ) : (item.type == 'people' ? (
                        <div className="left">
                            <div className="ava">
                                <Avatar style={{ backgroundColor: item.color, verticalAlign: 'middle' }} size="large" gap={0}>{item.name ? item.name : item.identifier}</Avatar>
                            </div>
                            <div className="info">
                                <span>{item.name ? item.name : item.identifier}</span>
                                {/* <span>{item.name}</span> */}
                                <div className="bubble">
                                    {item.data.split('\n').map((items) => (
                                        <p>{items}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (<div className="center">{item.name ? item.name : item.identifier}{item.data}</div>)))
                })}
            </div>
            <div className='actionBox'>
                <div className='btnGroup'>
                    {/* <Button onClick={exitBtnClick} disabled={!isJoin}>退出聊天室</Button> */}
                    <Button id="connectBtn" onClick={connectBtnClick} disabled={isJoin}>进入聊天室</Button>
                    <div className='inputAndColor'>
                        <span>昵称：</span><Input style={{ width: "50%" }} maxLength={4} placeholder='最大4个字符' onChange={(e) => name.current = e.target.value} disabled={isJoin} />
                    </div>
                    <div className='inputAndColor'>
                        <span>头像颜色：</span><ColorPicker defaultValue={'#1677FF'} showText onChange={(e) => { color.current = e.toHexString() }} disabled={isJoin} />
                    </div>
                    <Button id="sendBtn" onClick={sendBtnClick} disabled={inputValue ? false : true}>发送</Button>
                    <Button onClick={aaa}>测试</Button>
                </div>
                {/* <Input id="chat" placeholder="发送消息" onChange={(e) => { setInputValue(e.target.value) }} value={inputValue}  /> */}
                <TextArea id="chat" autoSize={{ minRows: 3, maxRows: 6 }} placeholder=" Enter 发送消息，按 Shift + Enter 换行" onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} onKeyDown={(e) => handleKeyDown(e)} />
            </div>
            <FloatMenu />
        </div>
    )
}