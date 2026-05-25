// src/pages/HomePage.jsx
import AboutSection from '../components/AboutSection'
import EventsAndAchievements from '../components/EventsAndAchievements'
import GalleryWidget from '../components/GalleryWidget'
import Hero from '../components/Hero'
import LogosSection from '../components/LogosSection'
import MargelovSection from '../components/MargelovSection'
import NewsWidget from '../components/NewsWidget'
import StatsCounter from '../components/StatsCounter'
import TrainingProgram from '../components/TrainingProgram'

function HomePage() {
	return (
		<>
			<Hero />
			<StatsCounter />
			<main className='main-content container'>
				<AboutSection />
			</main>

			{/* Виджет новостей */}
			<section className='widget-section'>
				<div className='container'>
					<NewsWidget />
				</div>
			</section>

			{/* Виджет галереи */}
			<section className='widget-section'>
				<div className='container'>
					<GalleryWidget />
				</div>
			</section>

			<MargelovSection />
			<TrainingProgram />
			<EventsAndAchievements />
			<LogosSection />
		</>
	)
}

export default HomePage
