"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import skillsData from "@/data/skills.json";
import Image from "next/image";

function SkillCard({
  iconUrl,
  name,
  level,
  index,
}: {
  iconUrl: string;
  name: string;
  level: number;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card rounded-2xl p-6 cursor-default flex flex-col items-center justify-center text-center group hover:border-accent/50 transition-colors"
    >
      <div className="w-14 h-14 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <Image
          src={iconUrl}
          alt={name}
          width={56}
          height={56}
          className="w-14 h-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
          unoptimized
        />
      </div>
      <h4 className="font-mono text-sm tracking-wider uppercase text-text-primary group-hover:text-accent transition-colors">
        {name}
      </h4>
    </motion.div>
  );
}

function LanguageCard({
  iconUrl,
  name,
  level,
  index,
}: {
  iconUrl: string;
  name: string;
  level?: number;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card rounded-xl p-4 cursor-default flex items-center justify-center gap-3 group hover:border-accent/50 transition-colors"
    >
      <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <Image
          src={iconUrl}
          alt={name}
          width={32}
          height={32}
          className="w-8 h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
          unoptimized
        />
      </div>
      <h4 className="font-mono text-xs tracking-wider uppercase text-text-primary group-hover:text-accent transition-colors">
        {name}
      </h4>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 md:py-40 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            What I Know
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 text-base-content">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-16">
          {skillsData.categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-base-content">
                <span>{category.emoji}</span>
                <span>{category.title}</span>
                <div className="flex-1 h-px bg-base-300" />
              </h3>

              {/* Programming Languages - special layout */}
              {"languages" in category && category.languages ? (
                <div className="space-y-6">
                  {/* Current language */}
                  <div>
                    <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
                      Currently Using
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category.languages.map((lang, i) => (
                        <SkillCard
                          key={lang.name}
                          iconUrl={lang.icon}
                          name={lang.name}
                          level={lang.level}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Previously practiced */}
                  {"previouslyPracticed" in category && category.previouslyPracticed && (
                    <div>
                      <h4 className="text-sm font-medium text-base-content/60 mb-4 uppercase tracking-wider">
                        Previously Practiced
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {category.previouslyPracticed.map((lang, i) => (
                          <LanguageCard
                            key={lang.name}
                            iconUrl={lang.icon}
                            name={lang.name}
                            index={i}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Standard skills layout */
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {"skills" in category && category.skills && category.skills.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      iconUrl={skill.icon}
                      name={skill.name}
                      level={skill.level}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {"extras" in category && category.extras && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {category.extras.map((extra) => (
                    <span
                      key={extra}
                      className="px-3 py-1.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                    >
                      {extra}
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
