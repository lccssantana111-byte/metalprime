'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

const mobilePositions = [
	{ w: '45vw', h: '35vh', top: 'auto', left: 'auto' },           // 0: centro
	{ w: '40vw', h: '28vh', top: '-12vh', left: '8vw' },           // 1: top left
	{ w: '38vw', h: '32vh', top: '-8vh',  left: '-8vw' },          // 2: top right (leve overlap)
	{ w: '42vw', h: '26vh', top: 'auto', left: '12vw' },           // 3: meio direita
	{ w: '38vw', h: '26vh', top: '22vh', left: '6vw' },            // 4: baixo esq
	{ w: '40vw', h: '26vh', top: '22vh', left: '-8vw' },           // 5: baixo dir
	{ w: '32vw', h: '20vh', top: '18vh', left: '12vw' },           // 6: baixo centro
];

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(max-width: 767px)');
		setIsMobile(mq.matches);
		const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, []);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	// Desktop scales (4x–9x)
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
	const desktopScales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// Mobile scales (1x–2.5x — suave, não engole a tela)
	const mScale1 = useTransform(scrollYProgress, [0, 1], [1, 2]);
	const mScale2 = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
	const mobileScales = [mScale1, mScale2, mScale1, mScale2, mScale1, mScale2, mScale1];

	if (isMobile) {
		return (
			<div ref={container} className="relative h-[150vh]">
				<div className="sticky top-0 h-screen overflow-hidden">
					{images.map(({ src, alt }, index) => {
						const scale = mobileScales[index % mobileScales.length];
						const pos = mobilePositions[index] ?? mobilePositions[0];

						return (
							<motion.div
								key={index}
								style={{ scale }}
								className="absolute top-0 flex h-full w-full items-center justify-center"
							>
								<div style={{
									position: 'absolute',
									width: pos.w,
									height: pos.h,
									top: pos.top,
									left: pos.left,
								}}>
									<img
										src={src || '/placeholder.svg'}
										alt={alt || `Imagem ${index + 1}`}
										style={{ width: '100%', height: '100%', objectFit: 'cover' }}
									/>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt }, index) => {
					const scale = desktopScales[index % desktopScales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw]">
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
