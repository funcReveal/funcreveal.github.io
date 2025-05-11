import Link from "next/link"
import { useRouter } from "next/router"
import styles from './Navbar.module.css'

import { detectLang, navLabels, defaultLang, Lang } from '@/lib/i18n'

const Navbar = () => {
    const router = useRouter()
    const { asPath } = router

    const currentLang: Lang = detectLang(asPath)
    const prefix = currentLang === defaultLang ? '' : `/${currentLang}`

    const pages = [
        // { key: 'notes', path: `${prefix}/notes` },
        { key: 'effects', path: `${prefix}/effects-gallery` },
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
                            {navLabels[currentLang][page.key]}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar