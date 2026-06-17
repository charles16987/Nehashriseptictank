import { motion } from "motion/react";

export default function SepticTankLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />

      {/* Truck */}
      <motion.div
        animate={{
          x: [-30, 30, -30],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative text-7xl"
      >
        🚛

        {/* Suction Effect */}
        <motion.div
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="absolute -right-8 top-1/2 -translate-y-1/2 text-3xl"
        >
          💨
        </motion.div>
      </motion.div>

      {/* Loading Text */}
      <motion.h2
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="mt-8 text-2xl font-bold text-white"
      >
        Neha Shri
      </motion.h2>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.2,
        }}
        className="mt-2 text-sm tracking-widest uppercase text-blue-200"
      >
        Septic Tank Cleaning in Progress...
      </motion.p>

      {/* Loading Dots */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((item) => (
          <motion.div
            key={item}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: item * 0.2,
            }}
            className="h-3 w-3 rounded-full bg-blue-500"
          />
        ))}
      </div>
    </div>
  );
}