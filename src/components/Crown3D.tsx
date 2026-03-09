import { motion, useScroll, useTransform } from 'framer-motion'

const LOGO_SRC = '/assets/images/logos/world-beauty-gold.png'

export function Crown3D() {
  const { scrollYProgress } = useScroll()

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, -5, 15])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

  const smallRotateY1 = useTransform(scrollYProgress, [0, 1], [0, -360])
  const smallRotateZ1 = useTransform(scrollYProgress, [0, 1], [0, 30])

  const smallRotateY2 = useTransform(scrollYProgress, [0, 1], [180, -180])
  const smallRotateZ2 = useTransform(scrollYProgress, [0, 1], [-15, 15])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden crown-3d-container">
      {/* Main large logo - center */}
      <motion.div
        style={{ rotateY, rotateX, scale, transformStyle: 'preserve-3d' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] md:w-[700px] md:h-[560px]"
      >
        <img
          src={LOGO_SRC}
          alt=""
          className="w-full h-full object-contain"
          style={{ opacity: 0.06 }}
        />
      </motion.div>

      {/* Small decorative logo - top right */}
      <motion.div
        style={{ rotateY: smallRotateY1, rotateZ: smallRotateZ1, transformStyle: 'preserve-3d' }}
        className="absolute top-[15%] right-[10%] w-[150px] h-[120px] md:w-[200px] md:h-[160px]"
      >
        <img
          src={LOGO_SRC}
          alt=""
          className="w-full h-full object-contain"
          style={{ opacity: 0.04 }}
        />
      </motion.div>

      {/* Small decorative logo - bottom left */}
      <motion.div
        style={{ rotateY: smallRotateY2, rotateZ: smallRotateZ2, transformStyle: 'preserve-3d' }}
        className="absolute bottom-[20%] left-[5%] w-[120px] h-[96px] md:w-[180px] md:h-[144px]"
      >
        <img
          src={LOGO_SRC}
          alt=""
          className="w-full h-full object-contain"
          style={{ opacity: 0.03 }}
        />
      </motion.div>
    </div>
  )
}
