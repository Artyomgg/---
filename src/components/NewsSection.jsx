// src/components/NewsSection.jsx
import { useEffect, useState } from 'react'
import { fetchNews } from '../services/googleSheets'

function NewsSection() {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)
	const [expandedNews, setExpandedNews] = useState({})

	useEffect(() => {
		const loadNews = async () => {
			const data = await fetchNews()
			// Ограничиваем количество новостей на главной (например, 3 или 6)
			setNews(data.slice(0, 6))
			setLoading(false)
		}
		loadNews()
	}, [])

	const toggleReadMore = id => {
		setExpandedNews(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	const truncateText = (text, maxLength = 120) => {
		if (text.length <= maxLength) return text
		return text.slice(0, maxLength) + '...'
	}

	if (loading) return <div className='loading-spinner'>Загрузка новостей...</div>

	if (news.length === 0) {
		return (
			<div className='section news-section'>
				<h2>Новости клуба</h2>
				<div className='empty-news'>
					<span className='empty-icon'>📰</span>
					<p>Новости появятся позже</p>
					<small>Следите за обновлениями</small>
				</div>
			</div>
		)
	}

	return (
		<div className='section news-section'>
			<h2>Новости клуба</h2>
			<div className='news-grid'>
				{news.map(item => {
					const isExpanded = expandedNews[item.id]
					const displayText = isExpanded ? item.desc : truncateText(item.desc, 120)
					const needsTruncation = item.desc.length > 120

					return (
						<div key={item.id} className='news-card'>
							{item.imageUrl && (
								<div className='news-image-wrapper'>
									<img src={item.imageUrl} alt={item.title} className='news-image' />
									<div className='news-image-overlay'>
										<span className='news-date-badge'>{item.date}</span>
									</div>
								</div>
							)}
							<div className='news-content'>
								{!item.imageUrl && <div className='news-date'>{item.date}</div>}
								<h3>{item.title}</h3>
								<p className='news-description'>{displayText}</p>
								{needsTruncation && (
									<button className='news-read-more' onClick={() => toggleReadMore(item.id)}>
										{isExpanded ? 'Свернуть ↑' : 'Читать далее →'}
									</button>
								)}
							</div>
						</div>
					)
				})}
			</div>

			{/* Кнопка перехода на страницу всех новостей */}
			<div className='news-view-all'>
				<a href='/news' className='btn-view-all'>
					Все новости →
				</a>
			</div>
		</div>
	)
}

export default NewsSection
