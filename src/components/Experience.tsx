"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import experienceData from "@/data/experience.json";

const iconMap = [FaBriefcase, FaBuilding];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 md:py-40 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            What I&apos;ve Done
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            My <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experienceData.map((exp, i) => {
            const Icon = iconMap[i] || FaBriefcase;
            return (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 sm:p-8 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/50">
                      <FaCalendarAlt size={12} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-base-content/60 leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full text-xs bg-base-300/50 text-base-content/70 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
