import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import CodeColor from './CodeColor';

interface Props {
    tsxCode: string;
    cssCode: string;
    githubUrl?: string;
    TSXName: string;
    CSSName: string;
}

const CodePreview: React.FC<Props> = ({ tsxCode, cssCode, githubUrl, TSXName, CSSName }) => {
    const [view, setView] = useState<'tsx' | 'css'>('tsx');

    return (

        <>
            <ButtonGroup size="small" variant="outlined" color="primary" sx={{ mb: 1 }}>
                <Button onClick={() => setView('tsx')} variant={view === 'tsx' ? 'contained' : 'outlined'}>
                    TSX
                </Button>
                <Button onClick={() => setView('css')} variant={view === 'css' ? 'contained' : 'outlined'}>
                    CSS
                </Button>
            </ButtonGroup>

            {view === 'tsx' && (
                <CodeColor code={tsxCode} language="tsx" githubUrl={githubUrl} fileName={TSXName} />
            )}
            {view === 'css' && (
                <CodeColor code={cssCode} language="css" githubUrl={githubUrl} fileName={CSSName} />
            )}
        </>

    );
};

export default CodePreview;
