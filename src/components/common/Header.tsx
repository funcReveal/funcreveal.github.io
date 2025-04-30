import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header>
            <ul>
                <li>
                    <Link href="/">English</Link>
                </li>
                <li>
                    <Link href="/zh-TW">繁體中文</Link>
                </li>
                <li>
                    <Link href="/zh-CN">简体中文</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header