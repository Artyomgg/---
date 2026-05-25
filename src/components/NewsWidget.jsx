// src/components/NewsWidget.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { fetchNews } from '../services/googleSheets'

function NewsWidget() {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadNews = async () => {
			const data = await fetchNews()
			// Показываем только 3 последние новости на виджете
			setNews(data.slice(0, 3))
			setLoading(false)
		}
		loadNews()
	}, [])

	if (loading) return <div className='loading-spinner'>Загрузка новостей...</div>

	if (news.length === 0) {
		return (
			<div className='news-widget'>
				<div className='empty-news-small'>
					<span>📰</span>
					<p>Новости появятся позже</p>
				</div>
			</div>
		)
	}

	return (
		<div className='news-widget'>
			<div className='news-widget-header'>
				<h3>Последние новости</h3>
				<Link to='/news' className='news-widget-link'>
					Все новости →
				</Link>
			</div>
			<div className='news-widget-list'>
				{news.map(item => (
					<div key={item.id} className='news-widget-item'>
						{item.imageUrl && (
							<img src={item.imageUrl} alt={item.title} className='news-widget-image' />
						)}
						<div className='news-widget-content'>
							<div className='news-widget-date'>{item.date}</div>
							<h4>{item.title}</h4>
							<p>{item.desc.length > 100 ? item.desc.slice(0, 100) + '...' : item.desc}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default NewsWidget
