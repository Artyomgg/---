// src/components/Hero.jsx

function Hero({ setActiveTab }) {
	return (
		<section className='hero'>
			<div className='container'>
				<h1>CИЛА. МУЖЕСТВО. ОТВАГА</h1>
				<p>Воспитываем защитников Отечества в Октябрьском районе Минска с 2022 года.</p>
				<button onClick={() => setActiveTab('register')} className='btn-hero'>
					Поступить сейчас →
				</button>
			</div>
		</section>
	)
}

export default Hero
