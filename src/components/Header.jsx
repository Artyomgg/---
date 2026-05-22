// src/components/Header.jsx
import { Link, useLocation } from 'react-router'

function Header() {
	const location = useLocation()
	const pathname = location.pathname

	const navItems = [
		{ path: '/', label: 'О клубе' },
		{ path: '/news', label: 'Новости' },
		{ path: '/rules', label: 'Правила и документы' },
	]

	return (
		<header className='header'>
			<div className='container header-container'>
				<Link to='/' className='logo'>
					<span className='logo-icon'>
						<img src='/img/1000003261_removebg_preview.png' alt='Логотип ВПК Мужество' />
					</span>
					<span className='logo-text'>ВПК "Мужество"</span>
				</Link>
				<nav className='nav'>
					{navItems.map(item => (
						<Link
							key={item.path}
							to={item.path}
							className={pathname === item.path ? 'nav-link active' : 'nav-link'}
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
