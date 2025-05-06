import { Box } from '@mui/material'

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                textAlign: 'center',
                py: 2,
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '0.8rem'
            }}
        >
            © 2025{new Date().getFullYear() > 2025 ? ` ~ ${new Date().getFullYear()}` : ''} funcReveal. All rights reserved. <br />
            CSS and JavaScript effects are licensed under the MIT License. Other content and branding are reserved.
        </Box>
    )
}