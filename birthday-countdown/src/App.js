import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { differenceInSeconds } from "date-fns";
import "./App.css";

const targetDate = new Date("2025-04-23T16:20:00");

const App = () => {
  const [timeLeft, setTimeLeft] = useState(differenceInSeconds(targetDate, new Date()));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const seconds = differenceInSeconds(targetDate, now);
      if (seconds <= 0) {
        clearInterval(timer);
        setIsComplete(true);
      } else {
        setTimeLeft(seconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-pink-700 mb-6 animate-pulse">
        forever loves
      </h1>
      {!isComplete ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="rounded-2xl p-6 bg-white shadow-xl max-w-md w-full"
        >
          <p className="text-lg text-pink-600 font-semibold mb-4">
            Countdown to something beautiful:
          </p>
          <div className="text-2xl text-pink-800 font-mono">
            {formatTime(timeLeft)}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="rounded-2xl p-6 bg-white shadow-xl max-w-md w-full"
        >
          <p className="text-pink-500 text-2xl md:text-3xl font-light font-[cursive]">
            Happy Surprise Day, Kiznaiver! 💖 Every second led to this moment.
            I love you more than words can say.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default App;