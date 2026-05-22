// src/pages/HomePage.jsx
import AboutSection from '../components/AboutSection'
import EventsAndAchievements from '../components/EventsAndAchievements'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import LogosSection from '../components/LogosSection'
import MargelovSection from '../components/MargelovSection'
import NewsSection from '../components/NewsSection'
import StatsCounter from '../components/StatsCounter'
import TrainingProgram from '../components/TrainingProgram'

function HomePage() {
	return (
		<>
			<Hero />
			<StatsCounter />
			<MargelovSection />
			<main className='main-content container'>
				<AboutSection />
			</main>
			<NewsSection />
			<Gallery />
			<TrainingProgram />
			<EventsAndAchievements />
			<LogosSection />
		</>
	)
}

export default HomePage
