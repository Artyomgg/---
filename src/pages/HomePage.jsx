// src/pages/HomePage.jsx
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import AboutSection from '../components/AboutSection'
import EventsAndAchievements from '../components/EventsAndAchievements'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import LogosSection from '../components/LogosSection'
import ParallaxSection from '../components/ParallaxSection'
import StatsCounter from '../components/StatsCounter'
import TrainingProgram from '../components/TrainingProgram'

function HomePage() {
	useEffect(() => {
		AOS.init({ duration: 800, once: true })
	}, [])

	return (
		<>
			<Hero />
			<StatsCounter />
			<main className='main-content container'>
				<AboutSection />
			</main>
			<TrainingProgram />
			<EventsAndAchievements />
			<Gallery />
			<ParallaxSection />
			<LogosSection />
		</>
	)
}

export default HomePage
