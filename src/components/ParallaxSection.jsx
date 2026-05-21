// src/components/ParallaxSection.jsx
import { motion } from 'framer-motion'

function ParallaxSection() {
	return (
		<div className='parallax-section'>
			<div className='parallax-overlay'></div>
			<div className='container'>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className='parallax-content'
				>
					<h2>Готов стать частью команды?</h2>
					<p>
						Присоединяйся к ВПК "Мужество" — здесь воспитывают характер и готовят защитников
						Отечества
					</p>
					<button className='btn-parallax' onClick={() => (window.location.href = '/register')}>
						Записаться сейчас →
					</button>
				</motion.div>
			</div>
		</div>
	)
}

export default ParallaxSection
