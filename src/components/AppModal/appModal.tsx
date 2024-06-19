import { useEffect, useRef, useState } from 'react';
import _ from 'lodash'
import './appModal.scss'
import { Button, Image } from 'antd';
import DesktopIcon, { DesktopIconType } from '../../components/DesktopIcon';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export interface ModalProps {
    title: React.ReactNode;  // 弹框标题
    desktopApp: DesktopIconType[];
}

export default function AppModal(props: ModalProps) {
    const { title, desktopApp } = props;
    const [handleData, setHandleData] = useState<DesktopIconType[][]>([])   //  处理数据分页展示
    const [pageNum, setPageNum] = useState<number>(0)  //  当前页码

    const [centerPointPosition, setCenterPointPosition] = useState({ x: 0, y: 0 })  // 屏幕中心点位置
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })  //  记录点击位置
    // 动态动画样式
    const [containerAnimation, setContainerAnimation] = useState('')
    const [backgroundAnimation, setBackgroundAnimation] = useState('')
    const [mainAnimation, setMainAnimation] = useState('')

    const modalRef = useRef<HTMLDivElement>(null);  //  background 
    const contentRef = useRef<HTMLDivElement>(null);  //  content 
    const appRef = useRef<HTMLDivElement>(null);  //  app 

    const [appMargin, setAppMargin] = useState<number>(32.5)

    useEffect(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        setCenterPointPosition({ x: windowWidth / 2, y: windowHeight / 2 })

        // 处理desktopApp数据，将其分页
        setHandleData(_.chunk(desktopApp, 12))
    }, []);


    // 点击按钮弹出modal
    const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
        setClickPosition({ x: e.pageX, y: e.pageY })
        setContainerAnimation('containerScaleUp 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards')
        setBackgroundAnimation('fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards')
        setMainAnimation('scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards')

        // 计算每个app margin
        let contentWidth = contentRef.current?.offsetWidth ?? 800
        let appWidth = appRef.current?.offsetWidth ?? 110
        let margin = ((contentWidth - 100) - (appWidth * 4)) / 8
        setAppMargin(margin)
    }

    // 点击背景触发关闭
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalRef.current) {
            setContainerAnimation('containerScaleDown 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards')
            setBackgroundAnimation('fadeOut 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards')
            setMainAnimation('scaleDown 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards')

            // 关闭弹窗将页码恢复至首页
            setPageNum(0)
        }
    }

    // 换页
    const forward = () => {
        if (pageNum > 0) {
            setPageNum(pageNum - 1)
        }
    }
    const backward = () => {
        if (pageNum < handleData.length - 1) {
            setPageNum(pageNum + 1)
        }
    }


    return (
        <div>
            <div className='appGroupBtn' onClick={openModal}>
                <div className='appGroupBtn-content'>
                    {handleData[0]?.map((item) => {
                        return <div className="appGroupBtn-content-item">
                            <div className="appGroupBtn-content-items">
                                <Image src={item.icon} preview={false} fallback="data:image/png;base64,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"></Image>
                            </div>
                        </div>
                    })}
                </div>
                <div className='appGroupBtn-title'>{title}</div>
            </div>

            {/* modal 主体内容 */}
            <div className='modal-container' style={{ animation: containerAnimation }}>
                <div className='modal-background' ref={modalRef} onClick={handleBackgroundClick} style={{ animation: backgroundAnimation }}>
                    <div className='modal-main' style={{ animation: mainAnimation }}>
                        <div className='modal-title'>
                            {title}
                        </div>
                        <div className='modal-content' ref={contentRef}>
                            {handleData[pageNum]?.map((item) => {
                                return <div ref={appRef} className='modal-content-item' style={{ margin: appMargin }}><DesktopIcon icon={item.icon} name={item.name} route={item.route} ribbon={item.ribbon}></DesktopIcon></div>
                            })}
                        </div>
                        <div className='modal-pagination'>
                            {handleData.length > 1 ? <Button disabled={pageNum == 0} onClick={forward} shape="circle" type="text" icon={<LeftOutlined />}></Button> : ""}
                            {handleData.length > 1 ? handleData.map((item, index) => {
                                return <div className='modal-pagination-item' style={pageNum == index ? { backgroundColor: '#333333' } : {}} onClick={() => setPageNum(index)}></div>
                            }) : ''}
                            {handleData.length > 1 ? <Button disabled={pageNum == handleData.length - 1} onClick={backward} shape="circle" type="text" icon={<RightOutlined />}></Button> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}