import { Link } from 'react-router'

function NotFoundPage() {
	return (
		<div className='not-found-page'>
			<div className='container'>
				<div className='not-found-content'>
					<div className='not-found-code'>404</div>
					<h1 className='not-found-title'>Страница не найдена</h1>
					<p className='not-found-text'>
						Похоже, вы забрели на неизвестную территорию.
						<br />
						Но даже здесь мы не теряем боевой дух!
					</p>
					<div className='not-found-icon'>🪂</div>
					<Link to='/' className='btn-hero not-found-btn'>
						Вернуться на главную →
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFoundPage
