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

	// Mobile: zoom suave aplicado no grid inteiro
	const mobileScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

	if (isMobile) {
		// Grid 2×3 + 1 imagem extra centralizada na última linha
		// Imagens 0-5 em grid 2 colunas, imagem 6 centralizada abaixo
		const gridImages = images.slice(0, 6);
		const lastImage = images[6];

		return (
			<div ref={container} style={{ position: 'relative', height: '160vh' }}>
				<div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<motion.div style={{ scale: mobileScale, width: '100%', transformOrigin: 'center center' }}>
						<div style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '4px',
							padding: '0 4px',
						}}>
							{gridImages.map(({ src, alt }, index) => (
								<div key={index} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
									<img
										src={src || '/placeholder.svg'}
										alt={alt || `Imagem ${index + 1}`}
										style={{ width: '100%', height: '100%', objectFit: 'cover' }}
									/>
								</div>
							))}
						</div>
						{lastImage && (
							<div style={{ padding: '4px 4px 0', aspectRatio: '16/7', overflow: 'hidden' }}>
								<img
									src={lastImage.src || '/placeholder.svg'}
									alt={lastImage.alt || 'Imagem 7'}
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							</div>
						)}
					</motion.div>
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
