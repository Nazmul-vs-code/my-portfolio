"use client";

import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiDownload,
  FiArrowDownRight,
} from "react-icons/fi";
import profile from "@/data/profile.json";
import Image from "next/image";
import toast from "react-hot-toast";
import LiquidClick from "@/components/LiquidClick";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Facebook: FiFacebook,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const textReveal = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      <div className="noise-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        
        {/* Left Side: Typography & Info */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col items-start text-left w-full"
        >
          {/* Top Metadata */}
          <div className="flex items-center gap-4 mb-8 overflow-hidden font-mono text-sm tracking-widest uppercase text-text-secondary">
            <motion.div variants={textReveal} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              Available for work
            </motion.div>
            <motion.div variants={textReveal} className="hidden sm:block">
              // {new Date().getFullYear()}
            </motion.div>
          </div>

          {/* Name & Title (Oversized Typography) */}
          <div className="mb-8 w-full">
            <div className="overflow-hidden">
              <motion.h1
                variants={textReveal}
                className="font-display text-[12vw] leading-none tracking-tighter uppercase font-bold text-text-primary mb-2 sm:text-7xl md:text-8xl lg:text-9xl"
              >
                NAZMUL
              </motion.h1>
            </div>
            <div className="overflow-hidden flex items-center gap-4 sm:gap-6">
              <motion.div variants={textReveal} className="h-[2px] w-12 sm:w-24 bg-accent"></motion.div>
              <motion.h1
                variants={textReveal}
                className="font-display text-[12vw] leading-none tracking-tighter uppercase font-bold text-text-primary sm:text-7xl md:text-8xl lg:text-9xl"
              >
                HUDA
              </motion.h1>
            </div>
          </div>

          <div className="overflow-hidden mb-10 w-full max-w-xl">
            <motion.p
              variants={textReveal}
              className="text-lg sm:text-xl text-text-secondary leading-relaxed font-sans font-light"
            >
              {profile.tagline}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <div className="overflow-hidden">
            <motion.div variants={textReveal} className="flex flex-wrap items-center gap-6 mt-4">
              <LiquidClick className="rounded-full">
                <a href="#projects" className="glass-btn">
                  <span className="font-mono uppercase text-sm font-semibold tracking-widest mr-2">Selected Works</span>
                  <FiArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </a>
              </LiquidClick>
              <LiquidClick className="rounded-full">
                <a
                  href="https://drive.google.com/file/d/1CbaikTN6Tce9937U63ypT0Qs4qaUJPQa/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn"
                >
                  <FiDownload className="mr-2" />
                  <span className="font-mono uppercase text-sm font-semibold tracking-widest">Show CV</span>
                </a>
              </LiquidClick>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Abstract Visual / Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="flex-1 w-full flex justify-center md:justify-end relative"
        >
          <div className="relative w-64 h-80 sm:w-80 sm:h-[450px] lg:w-[400px] lg:h-[550px]">
            {/* Minimalist image container */}
            <div className="absolute inset-0 glass-panel overflow-hidden">
              <Image
                src={profile.profileImage}
                alt={profile.name}
                width={400}
                height={550}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out mix-blend-luminosity"
                unoptimized
                priority
              />
            </div>
            {/* Accents */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent"></div>
            
            {/* Social Links Vertical */}
            <div className="absolute top-1/2 -right-16 -translate-y-1/2 flex flex-col gap-6 hidden xl:flex">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.platform] || FiGithub;
                return (
                  <LiquidClick key={social.platform} className="rounded-full">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-accent transition-colors p-2"
                      title={social.platform}
                    >
                      <Icon size={20} />
                    </a>
                  </LiquidClick>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator for mobile/tablet */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 xl:hidden"
      >
        <a href="#about" className="animate-bounce block text-text-secondary">
          <FiArrowDownRight size={24} className="rotate-45" />
        </a>
      </motion.div>
    </section>
  );
}
