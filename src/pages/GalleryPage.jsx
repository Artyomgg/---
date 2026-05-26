// src/pages/GalleryPage.jsx
import { useEffect, useState } from 'react'
import { GallerySkeletonGrid } from '../components/Skeleton'
import { fetchGallery } from '../services/googleSheets'

function GalleryPage() {
	const [images, setImages] = useState([])
	const [filteredImages, setFilteredImages] = useState([])
	const [loading, setLoading] = useState(true)
	const [selected, setSelected] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const loadGallery = async () => {
			setLoading(true)
			const data = await fetchGallery()
			setImages(data)
			setFilteredImages(data)
			setLoading(false)
		}
		loadGallery()
	}, [])

	// Поиск по названию фото
	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredImages(images)
		} else {
			const query = searchQuery.toLowerCase()
			const filtered = images.filter(img => img.title?.toLowerCase().includes(query))
			setFilteredImages(filtered)
		}
	}, [searchQuery, images])

	// Показываем скелетоны во время загрузки
	if (loading) {
		return (
			<div className='gallery-page'>
				<div className='container'>
					<div className='gallery-hero'>
						<h1>Фотогалерея</h1>
						<p>Моменты из жизни нашего клуба</p>
					</div>
					<GallerySkeletonGrid count={6} />
				</div>
			</div>
		)
	}

	return (
		<div className='gallery-page'>
			<div className='container'>
				{/* Hero секция */}
				<div className='gallery-hero'>
					<h1>Фотогалерея</h1>
					<p>Моменты из жизни нашего клуба</p>
				</div>

				{/* Поиск */}
				<div className='gallery-search'>
					<div className='search-wrapper'>
						<span className='search-icon'>🔍</span>
						<input
							type='text'
							placeholder='Поиск по названию фото...'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className='search-input'
						/>
						{searchQuery && (
							<button className='search-clear' onClick={() => setSearchQuery('')}>
								✕
							</button>
						)}
					</div>
					<div className='search-results-info'>
						{searchQuery && <p>Найдено: {filteredImages.length} фото</p>}
					</div>
				</div>

				{/* Сетка фото */}
				{filteredImages.length === 0 ? (
					<div className='no-images'>
						<span className='no-images-icon'>📸</span>
						<p>Фотографий не найдено</p>
						{searchQuery && (
							<button className='reset-search-btn' onClick={() => setSearchQuery('')}>
								Сбросить поиск
							</button>
						)}
					</div>
				) : (
					<div className='gallery-grid-full'>
						{filteredImages.map((img, index) => (
							<div
								key={img.id}
								className='gallery-item-full'
								onClick={() => setSelected(img)}
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								<img src={img.src} alt={img.title} loading='lazy' />
								<div className='gallery-overlay-full'>
									<span className='gallery-title-full'>{img.title}</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Модальное окно */}
			{selected && (
				<div className='gallery-modal' onClick={() => setSelected(null)}>
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<button className='modal-close' onClick={() => setSelected(null)}>
							✕
						</button>
						<img src={selected.src} alt={selected.title} />
						<div className='modal-info'>
							<h3>{selected.title}</h3>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default GalleryPage
