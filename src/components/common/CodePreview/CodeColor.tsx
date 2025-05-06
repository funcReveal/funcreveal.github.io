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

import { createHighlighter } from 'shiki';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

interface CodeBlockProps {
    code: string;
    language: 'tsx' | 'css' | 'ts' | 'js';
    githubUrl?: string;
    fileName?: string;
}

const CodeColor: React.FC<CodeBlockProps> = ({ code, language, githubUrl, fileName }) => {
    const [mounted, setMounted] = useState(false);
    const [highlightedCode, setHighlightedCode] = useState<string>('');
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        setMounted(true);

        const loadHighlighter = async () => {
            const highlighter = await createHighlighter({
                themes: ['dark-plus'],
                langs: ['tsx', 'css', 'jsx'],
                engine: createOnigurumaEngine(import('shiki/wasm'))
            });

            const highlighted = highlighter.codeToHtml(
                code,
                {
                    lang: language,
                    theme: 'dark-plus',
                }
            );
            setHighlightedCode(highlighted);
        };

        loadHighlighter();
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setSnackbar({ open: true, message: 'copied', severity: 'success' });
        } catch (err) {
            console.error('copied fail:', err);
            setSnackbar({ open: true, message: 'failed', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (!mounted) return null;

    return (
        <Box sx={{ bgcolor: '#1e1e1e', borderRadius: 1, overflow: 'hidden', mb: 2 }}>
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
                    {fileName ? fileName : language}
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

            <Box
                sx={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '1rem',
                    overflowX: 'auto',
                    '& pre': {
                        backgroundColor: 'transparent !important',
                    },
                }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />

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
