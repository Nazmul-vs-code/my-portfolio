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
      className="glass-card rounded-2xl p-6 cursor-default"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image
            src={iconUrl}
            alt={name}
            width={48}
            height={48}
            className="w-12 h-12"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-base-content">{name}</h4>
          <span className="text-xs text-base-content/50">{level}%</span>
        </div>
      </div>
      <div className="w-full h-2 bg-base-300 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
          className="h-full skill-bar rounded-full"
        />
      </div>
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
      className="glass-card rounded-xl p-4 cursor-default"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <Image
            src={iconUrl}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-base-content">{name}</h4>
          {level !== undefined && (
            <span className="text-xs text-base-content/50">{level}%</span>
          )}
        </div>
      </div>
      {level !== undefined && (
        <div className="w-full h-1.5 bg-base-300 rounded-full overflow-hidden mt-3">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : {}}
            transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
            className="h-full skill-bar rounded-full"
          />
        </div>
      )}
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
