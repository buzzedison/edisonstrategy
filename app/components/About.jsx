"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function About() {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(true);  // Set to true by default

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [controls, isVisible]);

  return (
    <section className="bg-gray-100 text-black py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2 pr-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl font-extrabold"
            >
              Meet Edison Ade
            </motion.h1>
            <motion.div initial={{ x: -100, opacity: 0 }} animate={controls} className="mt-4">
              <p className="text-lg">
                Hey there, I'm Edison. Stuck? Overwhelmed? Relax, I've got your playbook. 📖
              </p>
              <p className="mt-4">
                I've turned business obstacles into stepping stones. Ready to scale new heights together?
              </p>
              <p className="mt-4 font-medium text-lg">
                I write about startup growth. I'm the guy who can help you scale smartly. Want to know how? I've got books on it!
              </p>
              <p className="my-10 text-2xl font-semibold">
                Ready for some startup wisdom?
              </p>
              <Link href="/newsletter">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block cursor-pointer bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 text-white font-medium rounded-lg px-8 py-3 transition duration-300 ease-in-out transform"
                >
                  Join My Mailing List
                </motion.div>
              </Link>
            </motion.div>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/2">
            <Image 
              src="/image/edison.png"
              width={500}
              height={500}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
