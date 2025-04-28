import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            © 2025{new Date().getFullYear() > 2025 ? ` ~ ${new Date().getFullYear()}` : ''} funcReveal. All rights reserved. <br />
            CSS and JavaScript effects are licensed under the MIT License. Other content and branding are reserved.
        </footer>
    )
}

export default Footer