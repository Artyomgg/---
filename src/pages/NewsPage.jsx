// src/pages/NewsPage.jsx
import { useEffect, useState } from 'react'
import { NewsSkeletonGrid } from '../components/Skeleton'
import { fetchNews } from '../services/googleSheets'

function NewsPage() {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedNews, setSelectedNews] = useState(null)
	const [fullscreenImage, setFullscreenImage] = useState(null)

	useEffect(() => {
		const loadNews = async () => {
			setLoading(true)
			const data = await fetchNews()
			setNews(data)
			setLoading(false)
		}
		loadNews()
	}, [])

	// Закрытие модалки по Escape
	useEffect(() => {
		const handleEsc = e => {
			if (e.key === 'Escape') {
				setSelectedNews(null)
				setFullscreenImage(null)
			}
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	if (loading) {
		return (
			<div className='news-page'>
				<div className='container'>
					<div className='news-hero'>
						<h1>Новости клуба</h1>
						<p>Актуальные события и объявления</p>
					</div>
					<NewsSkeletonGrid count={3} />
				</div>
			</div>
		)
	}

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
						{news.map(item => (
							<div key={item.id} className='news-card-full' onClick={() => setSelectedNews(item)}>
								{item.imageUrl && (
									<div className='news-image-wrapper-full'>
										<img src={item.imageUrl} alt={item.title} loading='lazy' />
									</div>
								)}
								<div className='news-content-full'>
									<div className='news-date-full'>{item.date}</div>
									<h3>{item.title}</h3>
									<p>{item.desc.length > 120 ? item.desc.slice(0, 120) + '...' : item.desc}</p>
									<span className='news-read-more-trigger'>Читать подробнее →</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Модальное окно новости */}
			{selectedNews && (
				<div className='news-modal-overlay' onClick={() => setSelectedNews(null)}>
					<div className='news-modal-content' onClick={e => e.stopPropagation()}>
						<button className='news-modal-close' onClick={() => setSelectedNews(null)}>
							✕
						</button>

						{selectedNews.imageUrl && (
							<div
								className='news-modal-image'
								onClick={e => {
									e.stopPropagation()
									setFullscreenImage(selectedNews.imageUrl)
								}}
							>
								<img src={selectedNews.imageUrl} alt={selectedNews.title} />
							</div>
						)}

						<div className='news-modal-body'>
							<div className='news-modal-date'>{selectedNews.date}</div>
							<h2 className='news-modal-title'>{selectedNews.title}</h2>
							<div className='news-modal-text'>
								{selectedNews.desc.split('\n').map((paragraph, idx) => (
									<p key={idx}>{paragraph}</p>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Полноэкранный просмотр фото */}
			{fullscreenImage && (
				<div className='fullscreen-image-overlay' onClick={() => setFullscreenImage(null)}>
					<button className='fullscreen-close' onClick={() => setFullscreenImage(null)}>
						✕
					</button>
					<img src={fullscreenImage} alt='Полноэкранный режим' onClick={e => e.stopPropagation()} />
				</div>
			)}
		</div>
	)
}

export default NewsPage
