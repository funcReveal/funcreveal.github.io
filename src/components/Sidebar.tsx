import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, List, ListItem, ListItemText, Typography, ListItemIcon, } from '@mui/material';

interface SidebarProps {
    items: { slug: string; label: string }[];
    locale: string;
}

const Sidebar: React.FC<SidebarProps> = ({ items, locale }) => {
    const router = useRouter();
    const currentPath = router.asPath;
    // const [isOpen, setIsOpen] = useState(true);

    return (
        <Box
            sx={{
                // width: isOpen ? '100%' : '40%',
                width: '100%',
                padding: 2,
            }}
        >
            <Typography
                variant="h6"
                // onClick={() => setIsOpen((prev) => !prev)}
                sx={{
                    // cursor: 'pointer',
                    mb: 2,
                    fontWeight: 'bold',
                    // textAlign: isOpen ? 'left' : 'center',
                }}
            >
                Effects
            </Typography>

            {/* {isOpen && ( */}
            <List sx={{ width: '100%' }}>
                {items.map(({ slug, label }) => {
                    const path = locale === 'en'
                        ? `/effects/${slug}`
                        : `/${locale}/effects/${slug}`;
                    const normalize = (url: string) => url.replace(/\/+$/, '');
                    const isActive = normalize(currentPath) === normalize(path);

                    return (
                        <Link href={path} key={slug} passHref legacyBehavior>
                            <ListItem
                                component="a"
                                sx={(theme) => ({
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    borderRadius: 1,
                                    py: 1,
                                    px: 2,
                                    transition: 'background-color 0.2s',
                                    backgroundColor: isActive
                                        ? theme.palette.action.selected
                                        : 'transparent',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    },
                                })}
                            >
                                <ListItemIcon sx={{ minWidth: 0, mr: 2, color: 'white' }}>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            border: isActive ? 'none' : '2px solid white',
                                            backgroundColor: isActive ? 'white' : 'transparent',
                                            transform: 'rotate(45deg)',
                                            transition: 'all 0.2s',
                                            borderRadius: 0,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
            {/* )} */}
        </Box>
    );
};

export default Sidebar;