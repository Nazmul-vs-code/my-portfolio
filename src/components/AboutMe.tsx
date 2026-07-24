"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaCode, FaRocket, FaHeart } from "react-icons/fa";
import about from "@/data/about.json";

const highlights = [
  {
    icon: FaCode,
    title: "Clean Code",
    desc: "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: FaRocket,
    title: "Performance",
    desc: "Optimizing for speed and efficiency in every project.",
  },
  {
    icon: FaHeart,
    title: "User First",
    desc: "Designing intuitive experiences that users love.",
  },
];

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 md:py-40 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Get To Know Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                My Programming Journey 🎯
              </h3>
              <p className="text-base-content/70 leading-relaxed mb-4">
                {about.intro}
              </p>
              <p className="text-base-content/70 leading-relaxed mb-4">
                {about.journey}
              </p>

              {/* Current Activities */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-base-content/90">
                  Current Activities 🚀
                </h4>
                <ul className="space-y-2">
                  {about.currentActivities.map((activity) => (
                    <li
                      key={activity.text}
                      className="text-base-content/60 text-sm flex items-center gap-2"
                    >
                      <span>{activity.emoji}</span>
                      <span>{activity.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm italic text-base-content/60">
                  &ldquo;{about.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.num}
                  </div>
                  <div className="text-xs sm:text-sm text-base-content/50 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                whileHover={{ x: 8 }}
                className="glass-card rounded-2xl p-6 flex items-start gap-5 group cursor-default"
              >
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{title}</h4>
                  <p className="text-base-content/60 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Hobbies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass-card rounded-2xl p-6"
            >
              <h4 className="font-semibold mb-3">Beyond Code 🎨</h4>
              <div className="flex flex-wrap gap-2">
                {about.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="px-3 py-1.5 rounded-full text-xs bg-base-300/50 text-base-content/70 hover:bg-primary/20 hover:text-primary transition-all cursor-default"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
