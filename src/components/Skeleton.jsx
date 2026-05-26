// Скелетон для карточки новости
export const NewsSkeleton = () => {
	return (
		<div className='skeleton-card'>
			<div className='skeleton-image'></div>
			<div className='skeleton-content'>
				<div className='skeleton-title'></div>
				<div className='skeleton-text'></div>
				<div className='skeleton-text short'></div>
			</div>
		</div>
	)
}

// Скелетон для карточки галереи
export const GallerySkeleton = () => {
	return (
		<div className='skeleton-gallery-item'>
			<div className='skeleton-gallery-image'></div>
			<div className='skeleton-gallery-overlay'></div>
		</div>
	)
}

// Сетка скелетонов для новостей
export const NewsSkeletonGrid = ({ count = 3 }) => {
	return (
		<div className='news-grid-full'>
			{Array(count)
				.fill()
				.map((_, i) => (
					<NewsSkeleton key={i} />
				))}
		</div>
	)
}

// Сетка скелетонов для галереи
export const GallerySkeletonGrid = ({ count = 6 }) => {
	return (
		<div className='gallery-grid-full'>
			{Array(count)
				.fill()
				.map((_, i) => (
					<GallerySkeleton key={i} />
				))}
		</div>
	)
}
