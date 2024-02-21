import React, { useEffect } from 'react'
import './index.scss'
import Markdown from 'react-markdown';

const accumulation = require('./markDown/积累（整合）.md')
const latexSkill = require('./markDown/latex牛掰小技巧.md')
const binarySearch = require('./markDown/二分查找.md')

export default function ReadMarkDown() {

    const [markdownContent, setMarkdownContent] = React.useState<string | null>(null);  //  md文件
    const [keys, setKeys] = React.useState<boolean>(true);

    const fetchMD = (md: any) => {
        fetch(md).then(res => res.text()).then(text => setMarkdownContent(text));
        setKeys(!keys)
    }


    return (
        <div className='ReadMarkDown'>
            <div className='menu'>
                <div className='mdCard' onClick={() => fetchMD(accumulation)}>
                    积累<br />（整合）
                </div>
                <div className='mdCard' onClick={() => fetchMD(latexSkill)}>
                    latex<br />技巧
                </div>
                <div className='mdCard' onClick={() => fetchMD(binarySearch)}>
                    JavaScript<br />二分查找
                </div>
            </div>
            <div className='content'>
                <div className='md' key={keys ? "aa" : "bb"}>
                    <Markdown>{markdownContent}</Markdown>
                </div>
            </div>
        </div >
    )
}