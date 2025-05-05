import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import styles from './Header.module.css'
import Navbar from './Navbar'

import { AppBar, Box, Toolbar, Typography, Menu, MenuItem, Button } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import Image from 'next/image'

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const router = useRouter()
    const { asPath } = router

    // Detect current language
    let currentLang: 'en' | 'zh-TW' | 'zh-CN' = 'en'
    if (asPath.startsWith('/zh-TW')) currentLang = 'zh-TW'
    else if (asPath.startsWith('/zh-CN')) currentLang = 'zh-CN'

    const languageNames = {
        'en': 'English',
        'zh-TW': '繁體中文',
        'zh-CN': '简体中文'
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // Strip language prefix to get the rest of the path
    const strippedPath = asPath
        .replace(/^\/zh-TW/, '')
        .replace(/^\/zh-CN/, '') || '/'

    // Home path for the current language
    const homePath = currentLang === 'en' ? '/' : `/${currentLang}`

    return (
        <AppBar position="sticky" elevation={3} sx={{
            backgroundColor: 'rgba(175, 6, 0, 0.95)', // slightly transparent blue
            backdropFilter: 'blur(4px)',
        }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Link href={homePath} passHref>
                        <Box>
                            <Image alt='logo' src={'/logo.PSD'} width={50} height={50} />
                        </Box>
                    </Link>
                    <Navbar />
                </Box>

                <Box>
                    <Button
                        aria-label="select language"
                        aria-controls="language-menu"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Typography sx={{ mr: 1, fontSize: '0.9rem' }}>
                            {languageNames[currentLang]}
                        </Typography>
                        <LanguageIcon />
                    </Button>
                    <Menu
                        id="language-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: 'blanchedalmond',
                            }
                        }}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'language-button',
                            },
                        }}
                    >
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            href={`${strippedPath}`}
                            selected={currentLang === 'en'}
                        >
                            English
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            href={`/zh-TW${strippedPath}`}
                            selected={currentLang === 'zh-TW'}
                        >
                            繁體中文
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            href={`/zh-CN${strippedPath}`}
                            selected={currentLang === 'zh-CN'}
                        >
                            简体中文
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
