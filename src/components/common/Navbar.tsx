import Link from "next/link"
import { useRouter } from "next/router"
// import { useMemo } from "react"
import styles from './Navbar.module.css' // We'll create this

const Navbar = () => {
    const router = useRouter()
    const { asPath } = router

    // Detect current language
    let currentLang: 'en' | 'zh-TW' | 'zh-CN' = 'en'
    if (asPath.startsWith('/zh-TW')) currentLang = 'zh-TW'
    else if (asPath.startsWith('/zh-CN')) currentLang = 'zh-CN'

    const prefix = currentLang === 'en' ? '' : `/${currentLang}`

    // Pages
    const pages = [
        { path: `${prefix}/notes`, label: currentLang === 'en' ? 'Notes' : '筆記' },
        { path: `${prefix}/effects-gallery`, label: currentLang === 'en' ? 'Effects' : '特效' },
    ]

    return (
        <nav>
            <ul className={styles.navList}>
                {pages.map(page => (
                    <li key={page.path}>
                        <Link
                            href={page.path}
                            className={asPath.startsWith(page.path) ? styles.activeLink : styles.link}
                        >
                            {page.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
