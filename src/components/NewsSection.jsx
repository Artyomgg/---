// src/components/NewsSection.jsx
import { useEffect, useState } from 'react'
import { fetchNews } from '../services/googleSheets'

function NewsSection() {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadNews = async () => {
			const data = await fetchNews()
			setNews(data)
			setLoading(false)
		}
		loadNews()
	}, [])

	if (loading) return <div className='loading-spinner'>Загрузка новостей...</div>
	if (news.length === 0)
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

	return (
		<div className='section news-section'>
			<h2>Новости клуба</h2>
			<div className='news-grid'>
				{news.map(item => (
					<div key={item.id} className='news-card'>
						{item.imageUrl && <img src={item.imageUrl} alt={item.title} className='news-image' />}
						<div className='news-date'>{item.date}</div>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default NewsSection
