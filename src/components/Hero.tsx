"use client";

import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiDownload,
} from "react-icons/fi";
import { HiArrowDown } from "react-icons/hi";
import profile from "@/data/profile.json";
import Image from "next/image";
import toast from "react-hot-toast";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Facebook: FiFacebook,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient pt-24 md:pt-32"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 120, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Profile Image */}
        <motion.div variants={item} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative inline-block"
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/30">
              <Image
                src={profile.profileImage}
                alt={profile.name}
                width={192}
                height={192}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 border-2 border-dashed border-primary/20 rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-primary font-medium mb-4"
        >
          {profile.greeting} 👋 I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        {/* Designation */}
        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-base-content/80 mb-6"
        >
          {profile.designation} 🚀
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-base-content/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-glow px-8 py-3 rounded-full font-semibold text-base"
          >
            Let&apos;s Talk 💬
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.error("Resume is not added yet, sorry for the inconvenience!")}
            className="btn btn-outline border-primary/50 text-primary hover:bg-primary hover:text-primary-content px-8 py-3 rounded-full font-semibold text-base btn-glow"
          >
            <FiDownload className="mr-2" />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={item} className="flex items-center justify-center gap-4">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.platform] || FiGithub;
            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-base-300/50 text-base-content/60 hover:text-primary hover:bg-base-300 transition-all duration-300"
                title={social.platform}
              >
                <Icon size={22} />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-base-content/40 hover:text-primary transition-colors"
        >
          <span className="text-xs mb-2">Scroll Down</span>
          <HiArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
