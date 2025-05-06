import React, { useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 支援的主題動態載入
const PrismStyles = {
    duotoneLight: () => import('react-syntax-highlighter/dist/esm/styles/prism').then(m => m.duotoneLight),
    coldarkDark: () => import('react-syntax-highlighter/dist/esm/styles/prism').then(m => m.coldarkDark),
};
interface CodeBlockProps {
    code: string;
    language: 'tsx' | 'css' | 'ts' | 'js';
    githubUrl?: string;
    fileName?: string;
}

const CodeColor: React.FC<CodeBlockProps> = ({ code, language, githubUrl, fileName }) => {
    const [mounted, setMounted] = useState(false);
    type PrismStyle = Record<string, React.CSSProperties>;
    const [style, setStyle] = useState<PrismStyle | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        setMounted(true);
        // 載入主題（你也可以替換成 duotoneLight）
        PrismStyles.coldarkDark().then(setStyle);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setSnackbar({ open: true, message: '複製成功', severity: 'success' });
        } catch (err) {
            console.error('複製失敗:', err);
            setSnackbar({ open: true, message: '複製失敗', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (!mounted || !style) return null;

    return (
        <Box sx={{ bgcolor: '#1e1e1e', borderRadius: 1, overflow: 'hidden', mb: 2 }}>
            {/* 頂部控制列 */}
            <Box
                sx={{
                    px: 1.5,
                    py: 0.5,
                    bgcolor: '#2d2d2d',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="caption" sx={{ color: '#ccc' }}>
                    {(fileName ? fileName : language)}
                </Typography>
                <Box>
                    <IconButton size="small" onClick={handleCopy} color="inherit">
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    {githubUrl && (
                        <IconButton
                            size="small"
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                        >
                            <GitHubIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <SyntaxHighlighter
                language={language === 'tsx' ? 'typescript' : language}
                style={vscDarkPlus}
                showLineNumbers
                wrapLines
                customStyle={{ margin: 0, padding: '1rem', background: '#1e1e1e', fontSize: 13 }}
                lineNumberStyle={{ minWidth: '2.5em', paddingRight: '10px', color: '#888' }}
            >
                {code}
            </SyntaxHighlighter>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CodeColor;
