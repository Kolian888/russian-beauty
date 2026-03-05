import { motion, useScroll, useTransform } from 'framer-motion'

const CROWN_SVG = (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Crown body */}
    <path
      d="M20 140 L20 90 L50 45 L70 90 L100 15 L130 90 L150 45 L180 90 L180 140 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    {/* Crown base band */}
    <rect x="15" y="140" width="170" height="15" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Jewels at peaks */}
    <circle cx="50" cy="42" r="5" fill="currentColor" opacity="0.6" />
    <circle cx="100" cy="12" r="7" fill="currentColor" opacity="0.8" />
    <circle cx="150" cy="42" r="5" fill="currentColor" opacity="0.6" />
    {/* Cross-band decoration */}
    <path d="M25 115 L175 115" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M30 125 L170 125" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
)

const LAYER_COUNT = 6
const LAYER_DEPTH = 4

export function Crown3D() {
  const { scrollYProgress } = useScroll()

  // Main crown transforms
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, -5, 15])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

  // Small crown top-right transforms
  const smallRotateY1 = useTransform(scrollYProgress, [0, 1], [0, -360])
  const smallRotateZ1 = useTransform(scrollYProgress, [0, 1], [0, 30])

  // Small crown bottom-left transforms
  const smallRotateY2 = useTransform(scrollYProgress, [0, 1], [180, -180])
  const smallRotateZ2 = useTransform(scrollYProgress, [0, 1], [-15, 15])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden crown-3d-container">
      {/* Main large crown - center */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] md:w-[700px] md:h-[560px]"
      >
        {Array.from({ length: LAYER_COUNT }).map((_, i) => {
          const z = (i - LAYER_COUNT / 2) * LAYER_DEPTH
          const opacity = i === 0 || i === LAYER_COUNT - 1 ? 0.03 : 0.015
          const isGold = i % 2 === 0

          return (
            <div
              key={i}
              className="absolute inset-0 crown-3d-layer"
              style={{
                transform: `translateZ(${z}px)`,
                color: isGold
                  ? 'var(--color-gold)'
                  : 'var(--color-cherry)',
                opacity,
              }}
            >
              {CROWN_SVG}
            </div>
          )
        })}
      </motion.div>

      {/* Small decorative crown - top right */}
      <motion.div
        style={{
          rotateY: smallRotateY1,
          rotateZ: smallRotateZ1,
          transformStyle: 'preserve-3d',
        }}
        className="absolute top-[15%] right-[10%] w-[150px] h-[120px] md:w-[200px] md:h-[160px]"
      >
        <div
          className="absolute inset-0"
          style={{
            color: 'var(--color-cherry-light)',
            opacity: 0.04,
          }}
        >
          {CROWN_SVG}
        </div>
      </motion.div>

      {/* Small decorative crown - bottom left */}
      <motion.div
        style={{
          rotateY: smallRotateY2,
          rotateZ: smallRotateZ2,
          transformStyle: 'preserve-3d',
        }}
        className="absolute bottom-[20%] left-[5%] w-[120px] h-[96px] md:w-[180px] md:h-[144px]"
      >
        <div
          className="absolute inset-0"
          style={{
            color: 'var(--color-gold)',
            opacity: 0.03,
          }}
        >
          {CROWN_SVG}
        </div>
      </motion.div>
    </div>
  )
}
