"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FiMail,
  FiMessageCircle,
  FiSend,
  FiMapPin,
  FiCheck,
  FiLoader,
} from "react-icons/fi";
import contactData from "@/data/contact.json";
import toast from "react-hot-toast";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FiMail,
  FiMessageCircle,
  FiMapPin,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/26463e69736c50810d984fc58a60488c", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
        toast.success("Message sent successfully! I'll get back to you soon.");
        form.reset();
        setTimeout(() => setSent(false), 3000);
      } else {
        toast.error("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
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
            Contact Me
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
                      key={`${info.label}-${i}`}
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
              {/* Hidden fields for FormSubmit */}
              <input type="hidden" name="_subject" value="New message from Portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://nazmul-huda-portfolio.vercel.app/#contact" />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="input input-bordered w-full bg-base-300/30 border-base-300/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  className="input input-bordered w-full bg-base-300/30 border-base-300/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="textarea textarea-bordered w-full bg-base-300/30 border-base-300/50 focus:border-primary focus:outline-none resize-none transition-colors"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                className={`btn w-full rounded-full text-base ${
                  sent
                    ? "btn-success"
                    : "btn-primary btn-glow"
                } ${sending ? "loading" : ""}`}
              >
                {sending ? (
                  <>
                    <FiLoader className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <FiCheck className="mr-2" />
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
