"use client";

import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiHeart,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { HiArrowUp, HiCode } from "react-icons/hi";
import { SiCodeforces } from "react-icons/si";
import profile from "@/data/profile.json";
import contactData from "@/data/contact.json";
import Image from "next/image";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Codeforces: SiCodeforces,
  Twitter: FiTwitter,
  Facebook: FiFacebook,
};

const contactIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  FiMail,
  FiPhone,
  FiMapPin,
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-base-200/50 border-t border-base-300/30">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand + About */}
          <div>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 text-2xl font-bold gradient-text mb-4"
            >
              <HiCode size={28} />
              {"<Dev />"}
            </motion.a>
            <p className="text-base-content/50 text-sm leading-relaxed mb-6 max-w-sm">
              {profile.tagline}
            </p>
            {/* Profile pic small */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-base-300/30 w-fit">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                <Image
                  src={profile.profileImage}
                  alt={profile.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="text-xs text-primary">{profile.designation}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-base-content/80">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-sm text-base-content/50 hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-base-content/80">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {contactData.info.slice(0, 3).map((info) => {
                const Icon = contactIcons[info.icon] || FiMail;
                return (
                  <li key={info.label}>
                    <a
                      href={info.href}
                      className="flex items-center gap-3 text-sm text-base-content/50 hover:text-primary transition-colors group"
                    >
                      <span
                        className={`p-2 rounded-lg bg-gradient-to-br ${info.color} text-white group-hover:scale-110 transition-transform`}
                      >
                        <Icon size={14} />
                      </span>
                      <span>{info.value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.platform] || FiGithub;
              return (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-lg bg-base-300/50 text-base-content/40 hover:text-primary hover:bg-base-300 transition-all"
                  title={social.platform}
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-xs text-base-content/30 flex items-center gap-1">
            &copy; {new Date().getFullYear()} {profile.name}. Made with{" "}
            <FiHeart className="text-red-500 fill-red-500 mx-0.5" size={12} />{" "}
            using Next.js
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <motion.a
        href="#home"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-content shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all z-50"
      >
        <HiArrowUp size={20} />
      </motion.a>
    </footer>
  );
}
