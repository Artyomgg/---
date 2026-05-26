// src/components/Header.jsx
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

function Header() {
	const location = useLocation()
	const pathname = location.pathname
	const [scrolled, setScrolled] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Блокируем скролл при открытом меню
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [mobileMenuOpen])

	// Закрываем меню при ресайзе окна
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768 && mobileMenuOpen) {
				setMobileMenuOpen(false)
			}
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [mobileMenuOpen])

	const navItems = [
		{ path: '/', label: 'О клубе' },
		{ path: '/news', label: 'Новости' },
		{ path: '/gallery', label: 'Галерея' },
		{ path: '/rules', label: 'Правила и документы' },
	]

	return (
		<header className={`header ${scrolled ? 'scrolled' : ''}`}>
			<div className='header-container'>
				<Link to='/' className='logo' onClick={() => setMobileMenuOpen(false)}>
					<span className='logo-icon'>
						<img src='/img/1000003261_removebg_preview.png' alt='Логотип ВПК Мужество' />
					</span>
					<div className='logo-text'>
						<span className='logo-title'>ВПК "МУЖЕСТВО"</span>
						<span className='logo-subtitle'>Военно-патриотический клуб</span>
					</div>
				</Link>

				<button
					className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label='Меню'
				>
					<span></span>
					<span></span>
					<span></span>
				</button>

				<nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
					{navItems.map(item => (
						<Link
							key={item.path}
							to={item.path}
							className={pathname === item.path ? 'nav-link active' : 'nav-link'}
							onClick={() => setMobileMenuOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	)
}

export default Header
