"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiSend,
  FiMapPin,
} from "react-icons/fi";
import contactData from "@/data/contact.json";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <section id="contact" className="py-32 md:py-40 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">{contactData.title}</h3>
              <p className="text-base-content/60 leading-relaxed mb-8">
                {contactData.description}
              </p>

              <div className="space-y-4">
                {contactData.info.map((info, i) => {
                  const Icon = iconMap[info.icon] || FiMail;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        info.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-base-300/30 transition-all group"
                    >
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${info.color} text-white group-hover:scale-110 transition-transform`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-base-content/50">
                          {info.label}
                        </p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full bg-base-300/30 border-base-300/50 focus:border-primary focus:outline-none transition-colors"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full bg-base-300/30 border-base-300/50 focus:border-primary focus:outline-none transition-colors"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="textarea textarea-bordered w-full bg-base-300/30 border-base-300/50 focus:border-primary focus:outline-none resize-none transition-colors"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full rounded-full btn-glow text-base"
              >
                <FiSend className="mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
