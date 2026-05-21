// src/components/StatsCounter.jsx
import { motion, useInView } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function Counter({ end, duration = 2, suffix = '' }) {
	const [count, setCount] = useState(0)
	const ref = React.useRef()
	const isInView = useInView(ref, { once: true })

	useEffect(() => {
		if (isInView) {
			let start = 0
			const increment = end / (duration * 60)
			const timer = setInterval(() => {
				start += increment
				if (start >= end) {
					setCount(end)
					clearInterval(timer)
				} else {
					setCount(Math.floor(start))
				}
			}, 16)
			return () => clearInterval(timer)
		}
	}, [isInView, end, duration])

	return (
		<span ref={ref}>
			{count}
			{suffix}
		</span>
	)
}

function StatsCounter() {
	const stats = [
		{ value: 20, suffix: '+', label: 'Воспитанников' },
		{ value: 100, suffix: '%', label: 'Дисциплина' },
	]

	return (
		<div className='stats-section'>
			<div className='container'>
				<div className='stats-grid'>
					{stats.map((stat, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							viewport={{ once: true }}
							className='stat-card'
						>
							<div className='stat-number'>
								<Counter end={stat.value} suffix={stat.suffix} />
							</div>
							<div className='stat-label'>{stat.label}</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}

export default StatsCounter
