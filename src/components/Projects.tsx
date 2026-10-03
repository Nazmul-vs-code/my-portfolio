"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiExternalLink, FiGithub, FiArrowUpRight, FiPlus } from "react-icons/fi";
import projectsData from "@/data/projects.json";
import LiquidClick from "@/components/LiquidClick";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: index * 0.1 }}
      className="glass-panel flex flex-col rounded-3xl overflow-hidden group h-full"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-bg-secondary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
        {project.imageSrc ? (
          <img
            src={project.imageSrc}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0"
          />
        ) : (
          <span className="text-8xl relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0">
            {project.image}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-text-secondary">/{formattedIndex}</span>
        </div>
        
        <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tighter text-text-primary mb-2 group-hover:text-accent transition-colors duration-500">
          {project.name}
        </h3>
        
        <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="font-mono text-[10px] uppercase tracking-widest text-text-secondary border border-border-color px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary border border-border-color px-2 py-1 rounded-full">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6 border-t border-border-color flex-wrap">
          <LiquidClick className="flex-1 rounded-full">
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="glass-btn font-mono text-xs tracking-widest uppercase w-full whitespace-nowrap">
              Live <FiArrowUpRight className="ml-1" />
            </a>
          </LiquidClick>
          <LiquidClick className="flex-1 rounded-full">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="glass-btn font-mono text-xs tracking-widest uppercase w-full whitespace-nowrap">
              Code <FiGithub className="ml-1" />
            </a>
          </LiquidClick>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-40 px-4 sm:px-6 w-full relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block">
            // Selected Works
          </span>
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-text-primary mb-6">
            Featured Projects
          </h2>
          <p className="font-mono text-xs text-text-secondary max-w-md uppercase tracking-widest leading-loose">
            If you can&apos;t access the live demos, please connect to a VPN and try again.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
