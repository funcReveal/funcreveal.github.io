import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
// import CodeColor from './CodeColor';

interface Props {
    tsxCode: string;
    cssCode: string;
    githubUrl?: string;
    TSXName: string;
    CSSName: string;
}

const CodePreview: React.FC<Props> = ({ tsxCode, cssCode, githubUrl, TSXName, CSSName }) => {
    console.log(tsxCode)
    console.log(cssCode)
    console.log(githubUrl)
    console.log(TSXName)
    console.log(CSSName)
    const [view, setView] = useState<'tsx' | 'css'>('tsx');

    return (

        <>
            {/* 左上角：語言切換 */}
            <ButtonGroup size="small" variant="outlined" color="primary" sx={{ mb: 1 }}>
                <Button onClick={() => setView('tsx')} variant={view === 'tsx' ? 'contained' : 'outlined'}>
                    TSX
                </Button>
                <Button onClick={() => setView('css')} variant={view === 'css' ? 'contained' : 'outlined'}>
                    CSS
                </Button>
            </ButtonGroup>

            {/* 對應語言的程式碼區塊
            {view === 'tsx' && (
                // <CodeColor code={tsxCode} language="tsx" githubUrl={githubUrl} fileName={TSXName} />
            )}
            {view === 'css' && (
                // <CodeColor code={cssCode} language="css" githubUrl={githubUrl} fileName={CSSName} />
            )} */}
        </>

    );
};

export default CodePreview;
