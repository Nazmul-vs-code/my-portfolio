"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import projectsData from "@/data/projects.json";

function ProjectModal({
  project,
  id,
}: {
  project: (typeof projectsData)[0];
  id: string;
}) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-w-2xl bg-base-100 border border-base-300">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{project.image}</span>
          <div>
            <h3 className="font-bold text-xl text-base-content">
              {project.name}
            </h3>
            <p className="text-sm text-primary">{project.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-base-content/70 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-base-content">
            Key Features
          </h4>
          <ul className="space-y-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-base-content/70"
              >
                <span className="text-primary mt-0.5">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-base-content">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="mb-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-base-content">
            Challenges Faced
          </h4>
          <p className="text-sm text-base-content/70 leading-relaxed">
            {project.challenges}
          </p>
        </div>

        {/* Improvements */}
        <div className="mb-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-base-content">
            Future Improvements
          </h4>
          <p className="text-sm text-base-content/70 leading-relaxed">
            {project.improvements}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-base-300">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm rounded-full"
          >
            <FiExternalLink className="mr-1" />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm rounded-full"
          >
            <FiGithub className="mr-1" />
            Source Code
          </a>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const modalId = `project-modal-${index}`;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
      >
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-2xl overflow-hidden group"
        >
          {/* Project Image */}
          <div className="relative h-48 bg-base-300/30 flex items-center justify-center text-7xl">
            <span className="relative z-10">{project.image}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1 text-base-content group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-primary mb-3">{project.tagline}</p>
            <p className="text-base-content/60 text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full text-[11px] bg-base-300/50 text-base-content/60 font-medium"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-base-300/50 text-base-content/60 font-medium">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  (document.getElementById(modalId) as HTMLDialogElement)?.showModal()
                }
                className="btn btn-primary btn-sm rounded-full"
              >
                View Details
              </motion.button>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm rounded-full"
              >
                <FiExternalLink size={14} />
                Live
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm rounded-full"
              >
                <FiGithub size={14} />
                Code
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <ProjectModal project={project} id={modalId} />
    </>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 md:py-40 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            My Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 text-base-content">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-sm text-base-content/50 mt-4 max-w-md mx-auto">
            If you can&apos;t access the live demos, please connect to a VPN and try again.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
