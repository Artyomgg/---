// src/components/GalleryWidget.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { GallerySkeletonGrid } from './Skeleton'
import { fetchGallery } from '../services/googleSheets'

function GalleryWidget() {
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(true)
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		const load = async () => {
			const data = await fetchGallery()
			// Показываем только 6 фото на виджете
			setImages(data.slice(0, 6))
			setLoading(false)
		}
		load()
	}, [])

	if (loading) {
		return (
			<div className='gallery-widget'>
				<div className='gallery-widget-header'>
					<h3>Фотогалерея</h3>
					<Link to='/gallery' className='gallery-widget-link'>
						Все фото →
					</Link>
				</div>
				<GallerySkeletonGrid count={4} />
			</div>
		)
	}
	if (images.length === 0) return null

	return (
		<div className='gallery-widget'>
			<div className='gallery-widget-header'>
				<h3>Фотогалерея</h3>
				<Link to='/gallery' className='gallery-widget-link'>
					Все фото →
				</Link>
			</div>
			<div className='gallery-widget-grid'>
				{images.map(img => (
					<div key={img.id} className='gallery-widget-item' onClick={() => setSelected(img)}>
						<img src={img.src} alt={img.title} loading='lazy' />
						<div className='gallery-widget-overlay'>
							<span className='gallery-widget-title'>{img.title}</span>
						</div>
					</div>
				))}
			</div>

			{/* Модальное окно */}
			{selected && (
				<div className='gallery-modal' onClick={() => setSelected(null)}>
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<button className='modal-close' onClick={() => setSelected(null)}>
							✕
						</button>
						<img src={selected.src} alt={selected.title} />
						<h3 className='modal-title'>{selected.title}</h3>
					</div>
				</div>
			)}
		</div>
	)
}

export default GalleryWidget
