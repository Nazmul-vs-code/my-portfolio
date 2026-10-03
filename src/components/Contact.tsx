"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiMail,
  FiMessageCircle,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import contactData from "@/data/contact.json";
import LiquidClick from "@/components/LiquidClick";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FiMail,
  FiMessageCircle,
  FiMapPin,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    const whatsappNumber = "8801311834044";
    const text = `Hi, I am ${name} (${email}).%0A%0A${message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, "_blank");
    form.reset();
  };

  return (
    <section id="contact" className="py-24 md:py-40 px-4 sm:px-6 relative border-t border-border-color">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block">
            // Get In Touch
          </span>
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-text-primary">
            Contact Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="font-display text-3xl font-bold uppercase tracking-tighter mb-4">{contactData.title}</h3>
              <p className="text-text-secondary leading-relaxed font-sans text-lg">
                {contactData.description}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {contactData.info.map((info, i) => {
                const Icon = iconMap[info.icon] || FiMail;
                return (
                  <LiquidClick key={`${info.label}-${i}`} className="w-full text-left rounded-xl">
                    <motion.a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        info.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-6 group w-full p-2"
                    >
                      <div className="w-14 h-14 rounded-full border border-border-color flex items-center justify-center text-text-primary group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-colors duration-500">
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-1">
                          {info.label}
                        </p>
                        <p className="font-sans text-lg font-medium text-text-primary group-hover:text-accent transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  </LiquidClick>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 md:p-12 space-y-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 space-y-8">
                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-text-secondary mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full bg-transparent border-b border-border-color pb-4 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors font-sans text-lg"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-text-secondary mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    className="w-full bg-transparent border-b border-border-color pb-4 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors font-sans text-lg"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs tracking-widest uppercase text-text-secondary mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-border-color pb-4 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors font-sans text-lg resize-none"
                  />
                </div>

                <LiquidClick className="w-full rounded-full">
                  <button
                    type="submit"
                    className="glass-btn w-full py-4 uppercase tracking-widest text-sm"
                  >
                    <FiSend className="mr-2" />
                    Send via WhatsApp
                  </button>
                </LiquidClick>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
