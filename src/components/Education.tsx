"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaGraduationCap, FaSchool, FaCalendarAlt } from "react-icons/fa";
import educationData from "@/data/education.json";

const iconMap = [FaGraduationCap, FaSchool];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 md:py-40 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            My Background
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30" />

          <div className="space-y-12">
            {educationData.map((edu, i) => {
              const Icon = iconMap[i] || FaGraduationCap;
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-base-100 z-10 mt-8" />

                  {/* Card */}
                  <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)]">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card rounded-2xl p-6 sm:p-8"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                          <Icon size={22} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-base-content/50">
                          <FaCalendarAlt size={12} />
                          <span>{edu.year}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                      <p className="text-primary font-medium mb-3">
                        {edu.institution}
                      </p>
                      <p className="text-base-content/60 text-sm leading-relaxed mb-4">
                        {edu.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
