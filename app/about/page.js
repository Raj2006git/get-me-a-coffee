"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="text-white flex flex-col items-center px-6 py-16">
      
      {/* Header */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        About <span className="text-blue-400">Get Me A Coffee</span>
      </motion.h1>

      <p className="text-gray-400 text-center max-w-2xl mb-10">
        Get Me A Coffee is a crowdfunding platform designed to help creators, artists, and developers
        receive financial support directly from their fans and followers. Think of it as your digital tip jar — 
        simple, secure, and fun.
      </p>

      {/* How it Works */}
      <div className="max-w-5xl w-full grid md:grid-cols-3 gap-10 mb-20">
        {[
          {
            title: "1️⃣ Create Your Page",
            desc: "Sign up and personalize your page with your name, profile image, and story.",
          },
          {
            title: "2️⃣ Share Your Link",
            desc: "Share your profile with your fans on social media, YouTube, or anywhere online.",
          },
          {
            title: "3️⃣ Get Supported",
            desc: "Fans buy you a ‘coffee’ — small donations that show appreciation and fund your work.",
          },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="bg-[#151515] p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-blue-400 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-400">{step.title}</h2>
            <p className="text-gray-300">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="max-w-4xl text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-blue-400">💡 Why Choose Us?</h2>
        <p className="text-gray-300 leading-relaxed">
          Unlike complicated crowdfunding platforms, <span className="font-semibold text-white">Get Me A Coffee </span> 
          focuses on simplicity. No long campaigns, no approval process — just create, share, and get support instantly.
          We empower creators to connect directly with their audience and grow sustainably.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">❓ Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Is it free to join?</h3>
            <p className="text-gray-400">
              Yes! You can sign up and start receiving support for free. We only take a small processing fee per transaction.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">How do I withdraw my earnings?</h3>
            <p className="text-gray-400">
              You can withdraw funds directly to your PayPal or bank account, depending on your region.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Can my fans leave a message?</h3>
            <p className="text-gray-400">
              Absolutely! Supporters can leave messages of encouragement when they buy you a coffee ☕.
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-800 pt-8 mt-10 text-gray-500 text-sm text-center w-full">
        © {new Date().getFullYear()} Get Me A Coffee. All Rights Reserved.
      </footer>
    </div>
  );
};

export default About;
