import { Table } from 'antd'
import './index.scss'
import type { ColumnsType } from 'antd/es/table';
import fontData from './fontData.json'

interface DataType {
    fontName: string;
    EngName: string;
    common?: string
}
export default function FontComparison() {

    const columns: ColumnsType<DataType> = [
        {
            title: '字体名称',
            dataIndex: 'fontName',
            key: 'fontName',
            align: "center"
        },
        {
            title: '英文名称',
            dataIndex: 'EngName',
            key: 'EngName',
            align: "center"
        },
        {
            title: '字体展示',
            dataIndex: 'show',
            key: 'show',
            align: "center",
            render: (_, record) => (
                <span style={{ fontFamily: record.EngName, fontSize: "18px" }}>
                    {record.fontName}
                </span>
            )
        },
        {
            title: '',
            dataIndex: 'common',
            key: 'common',
            align: "center"
        },
    ];

    const data: DataType[] = fontData;

    return (
        <div className='FontComparison-page'>
            <div className='FontComparison-title'>
                CSS font-family 常用中文字体
            </div>
            <div className='FontComparison-content'>
                <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: true, }} />
            </div>
        </div>
    )
}