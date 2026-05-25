// src/pages/NewsPage.jsx
import { useEffect, useState } from 'react'
import { fetchNews } from '../services/googleSheets'

function NewsPage() {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)
	const [expandedNews, setExpandedNews] = useState({})

	useEffect(() => {
		const loadNews = async () => {
			const data = await fetchNews()
			setNews(data)
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

	const truncateText = (text, maxLength = 150) => {
		if (text.length <= maxLength) return text
		return text.slice(0, maxLength) + '...'
	}

	if (loading) return <div className='loading-spinner'>Загрузка новостей...</div>

	return (
		<div className='news-page'>
			<div className='container'>
				<div className='news-hero'>
					<h1>Новости клуба</h1>
					<p>Актуальные события и объявления</p>
				</div>

				{news.length === 0 ? (
					<div className='empty-news'>
						<span className='empty-icon'>📰</span>
						<p>Новости появятся позже</p>
					</div>
				) : (
					<div className='news-grid-full'>
						{news.map(item => {
							const isExpanded = expandedNews[item.id]
							const displayText = isExpanded ? item.desc : truncateText(item.desc, 150)
							const needsTruncation = item.desc.length > 150

							return (
								<div key={item.id} className='news-card-full'>
									{item.imageUrl && (
										<div className='news-image-wrapper-full'>
											<img src={item.imageUrl} alt={item.title} />
										</div>
									)}
									<div className='news-content-full'>
										<div className='news-date-full'>{item.date}</div>
										<h3>{item.title}</h3>
										<p>{displayText}</p>
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
				)}
			</div>
		</div>
	)
}

export default NewsPage
