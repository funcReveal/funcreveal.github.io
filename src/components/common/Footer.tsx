import React from 'react'

const Footer = () => {
    return (
        <footer>
            © 2025{new Date().getFullYear() > 2025 ? ` ~ ${new Date().getFullYear()}` : ''} funcReveal. All rights reserved. <br />
            CSS and JavaScript effects are licensed under the MIT License. Other content and branding are reserved.
        </footer>
    )
}

export default Footer