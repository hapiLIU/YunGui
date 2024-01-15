import { Alert, Button, Card, ColorPicker, Input, Popover, QRCode, QRCodeProps, Radio, Segmented, Space, Tooltip, theme } from 'antd'
import './index.scss'
import { DownOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useState } from 'react';
import React from 'react';
import Marquee from 'react-fast-marquee';

const { useToken } = theme;

export default function PracticeUI() {
    // Button
    const [size, setSize] = useState<SizeType>('large');
    // ColorPicker
    const [open, setOpen] = useState(false);
    // QRCode
    const [text, setText] = React.useState('https://ant.design/');
    const { token } = useToken();
    const [level, setLevel] = useState<string | number>('L');
    const src = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
    const downloadQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    const { ErrorBoundary } = Alert;
    const ThrowError: React.FC = () => {
        const [error, setError] = useState<Error>();
        const onClick = () => {
            setError(new Error('An Uncaught Error'));
        };

        if (error) {
            throw error;
        }
        return (
            <Button danger onClick={onClick}>
                Click me to throw a error
            </Button>
        );
    };

    return (
        <div className='PracticeUI-page'>
            <div className='PracticeUI-title'>
                Ant Design - React 组件展示及使用练习
            </div>
            <Card title="Button 按钮" extra={<a href="https://ant-design.antgroup.com/components/button-cn">更多</a>} >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                    <Tooltip title="search">
                        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button type="primary" shape="circle">
                        A
                    </Button>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button icon={<SearchOutlined />}>Search</Button>
                    <Tooltip title="search">
                        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                    <Button type="dashed" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Button icon={<SearchOutlined />} href="https://www.google.com" />
                    <Button type="primary" danger>
                        Primary
                    </Button>
                    <Button danger>Default</Button>
                    <Button type="dashed" danger>
                        Dashed
                    </Button>
                    <Button type="text" danger>
                        Text
                    </Button>
                    <Button type="link" danger>
                        Link
                    </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: '20px' }}>
                    <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    <Button type="primary" size={size}>
                        Primary
                    </Button>
                    <Button size={size}>Default</Button>
                    <Button type="dashed" size={size}>
                        Dashed
                    </Button>
                    <Button type="link" size={size}>
                        Link
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} size={size} />
                    <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                        Download
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} size={size}>
                        Download
                    </Button>
                </div>
            </Card>
            <Card title="ColorPicker 颜色选择器" extra={<a href="https://ant-design.antgroup.com/components/color-picker-cn">更多</a>} >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <ColorPicker size="small" />
                    <ColorPicker />
                    <ColorPicker size="large" />
                    <ColorPicker size="small" showText />
                    <ColorPicker showText />
                    <ColorPicker size="large" showText />
                    <ColorPicker showText={(color) => <span>Custom Text ({color.toHexString()})</span>} />
                    <ColorPicker
                        open={open}
                        onOpenChange={setOpen}
                        showText={() => (
                            <DownOutlined
                                rotate={open ? 180 : 0}
                                style={{
                                    color: 'rgba(0, 0, 0, 0.25)',
                                }}
                            />
                        )}
                    />
                    <ColorPicker
                        presets={[
                            {
                                label: 'Recommended',
                                colors: [
                                    '#000000',
                                    '#000000E0',
                                    '#000000A6',
                                    '#00000073',
                                    '#00000040',
                                    '#00000026',
                                    '#0000001A',
                                    '#00000012',
                                    '#0000000A',
                                    '#00000005',
                                    '#F5222D',
                                    '#FA8C16',
                                    '#FADB14',
                                    '#8BBB11',
                                    '#52C41A',
                                    '#13A8A8',
                                    '#1677FF',
                                    '#2F54EB',
                                    '#722ED1',
                                    '#EB2F96',
                                    '#F5222D4D',
                                    '#FA8C164D',
                                    '#FADB144D',
                                    '#8BBB114D',
                                    '#52C41A4D',
                                    '#13A8A84D',
                                    '#1677FF4D',
                                    '#2F54EB4D',
                                    '#722ED14D',
                                    '#EB2F964D',
                                ],
                            },
                            {
                                label: 'Recent',
                                colors: [],
                            },
                        ]}
                    />
                </div>
            </Card>
            <Card title="QRCode 二维码" extra={<a href="https://ant-design.antgroup.com/components/qr-code-cn">更多</a>} >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Space direction="vertical" align="center">
                        <QRCode value={text || '-'} />
                        <Input
                            placeholder="-"
                            maxLength={60}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Space>
                    <QRCode
                        errorLevel="H"
                        value="https://ant.design/"
                        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    />
                    <QRCode value="https://ant.design/" status="loading" />
                    <QRCode value="https://ant.design/" status="expired" onRefresh={() => console.log('refresh')} />
                    <QRCode type="canvas" value="https://ant.design/" />
                    <QRCode type="svg" value="https://ant.design/" />
                    <QRCode value="https://ant.design/" color={token.colorSuccessText} />
                    <QRCode
                        value="https://ant.design/"
                        color={token.colorInfoText}
                        bgColor={token.colorBgLayout}
                    />
                    <Space direction="vertical" align="center">
                        <QRCode
                            style={{ marginBottom: 16 }}
                            errorLevel={level as QRCodeProps['errorLevel']}
                            value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        />
                        <Segmented options={['L', 'M', 'Q', 'H']} value={level} onChange={setLevel} />
                    </Space>
                    <Popover overlayInnerStyle={{ padding: 0 }} content={<QRCode value={src} bordered={false} />}>
                        <img width={100} height={100} src={src} alt="icon" />
                    </Popover>
                    <div id="myqrcode">
                        <QRCode value="https://ant.design/" bgColor="#fff" style={{ marginBottom: 16 }} />
                        <Button type="primary" onClick={downloadQRCode}>
                            Download
                        </Button>
                    </div>
                </div>
            </Card>
            <Card title="Alert 警告提示" extra={<a href="https://ant-design.antgroup.com/components/alert-cn">更多</a>} >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Alert message="Success Text" type="success" />
                    <Alert message="Info Text" type="info" />
                    <Alert message="Warning Text" type="warning" />
                    <Alert message="Error Text" type="error" />
                </Space>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Alert message="Success Tips" type="success" showIcon />
                    <Alert message="Informational Notes" type="info" showIcon />
                    <Alert message="Warning" type="warning" showIcon closable />
                    <Alert message="Error" type="error" showIcon />
                    <Alert
                        message="Success Tips"
                        description="Detailed description and advice about successful copywriting."
                        type="success"
                        showIcon
                    />
                    <Alert
                        message="Informational Notes"
                        description="Additional description and information about copywriting."
                        type="info"
                        showIcon
                    />
                    <Alert
                        message="Warning"
                        description="This is a warning notice about copywriting."
                        type="warning"
                        showIcon
                        closable
                    />
                    <Alert
                        message="Error"
                        description="This is an error message about copywriting."
                        type="error"
                        showIcon
                    />
                </Space>
                <Alert
                    banner
                    message={
                        <Marquee pauseOnHover gradient={false}>sss
                            I can be a React component, multiple React components, or just some text.
                        </Marquee>
                    }
                />
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Alert
                        message="Success Tips"
                        type="success"
                        showIcon
                        action={
                            <Button size="small" type="text">
                                UNDO
                            </Button>
                        }
                        closable
                    />
                    <Alert
                        message="Error Text"
                        showIcon
                        description="Error Description Error Description Error Description Error Description"
                        type="error"
                        action={
                            <Button size="small" danger>
                                Detail
                            </Button>
                        }
                    />
                    <Alert
                        message="Warning Text"
                        type="warning"
                        action={
                            <Space>
                                <Button type="text" size="small" ghost>
                                    Done
                                </Button>
                            </Space>
                        }
                        closable
                    />
                    <Alert
                        message="Info Text"
                        description="Info Description Info Description Info Description Info Description"
                        type="info"
                        action={
                            <Space direction="vertical">
                                <Button size="small" type="primary">
                                    Accept
                                </Button>
                                <Button size="small" danger ghost>
                                    Decline
                                </Button>
                            </Space>
                        }
                        closable
                    />
                </Space>
                <ErrorBoundary>
                    <ThrowError />
                </ErrorBoundary>
            </Card>
        </div>
    )
}