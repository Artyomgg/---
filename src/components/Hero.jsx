// src/components/Hero.jsx
import { useNavigate } from 'react-router'

function Hero() {
	const navigate = useNavigate()

	return (
		<div
			className='hero'
			style={{
				backgroundImage: "url('/img/gallery/gallery9.jpg')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='hero-overlay'></div>
			<div className='container'>
				<h1>CИЛА. МУЖЕСТВО. ОТВАГА</h1>
				<p>Воспитываем защитников Отечества в Октябрьском районе Минска с 2022 года.</p>
			</div>
		</div>
	)
}

export default Hero
