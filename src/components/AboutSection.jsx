// src/components/AboutSection.jsx
import { useEffect, useState } from 'react'
import { fetchAboutText } from '../services/googleSheets'

function AboutSection() {
	const [aboutText, setAboutText] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadAbout = async () => {
			const data = await fetchAboutText()
			setAboutText(data)
			setLoading(false)
		}
		loadAbout()
	}, [])

	if (loading) {
		return (
			<div className='section about-section'>
				<h2>О военно-патриотическом клубе "Мужество"</h2>
				<div className='loading-spinner'>Загрузка...</div>
			</div>
		)
	}

	return (
		<div className='section about-section'>
			<h2>О военно-патриотическом клубе "Мужество"</h2>
			<p>{aboutText.main_text || 'Информация о клубе будет добавлена позже.'}</p>

			<div className='features'>
				<div className='feature'>
					<h3>🏅 Тактическая подготовка</h3>
					<p>Обращение с оружием, страйкбол, лазертаг, тактическая медицина.</p>
				</div>
				<div className='feature'>
					<h3>📜 История и Уставы</h3>
					<p>Изучение Вооружённых сил РБ, строевая подготовка, воинские звания.</p>
				</div>
				<div className='feature'>
					<h3>💪 Спорт и выживание</h3>
					<p>Кроссфит, турники, полоса препятствий, ориентирование на местности.</p>
				</div>
			</div>

			<div className='requirements-section'>
				<h3>Правила приема</h3>
				<p>{aboutText.requirements || 'Требования будут добавлены позже.'}</p>
			</div>
		</div>
	)
}

export default AboutSection
