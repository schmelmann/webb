import { useState, useEffect } from "react";
import { set, get, del } from "idb-keyval";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const TOTAL_DAYS = 31;
const START_DATE = new Date("2025-04-20");

const loveMessages = [
  "You're my sunshine.", "Your smile lights up my world.", "Can't wait to hug you.",
  "You're my favorite person.", "Thinking of you always.", "You're everything to me.",
  "Your laugh is my favorite song.", "I'm so lucky to have you.", "You're my home.",
  "I adore you.", "You're my heart.", "Love grows with you every day.", "You're my magic.",
  "You're my dream come true.", "Forever yours.", "You make life better.", "You're my peace.",
  "You're the sweetest part of my day.", "You're a blessing.", "You're my muse.",
  "Every day with you is special.", "You complete me.", "You are cherished.",
  "You're pure love.", "You light up everything.", "You make life sparkle.",
  "You’re my everything.", "Love you endlessly.", "You're my forever.",
  "The best is yet to come.", "One day to go!", "Today is your special day! 💖"
];

const finaleMessage =
  "🎉 My love, this was more than a countdown—it was a journey through how much I adore you. Happy Birthday, Kiznaiver! 🎂💖 Let’s make today unforgettable!";

const birthdayAudio = new Audio("/sounds/welcome.mp3");
birthdayAudio.loop = true;
birthdayAudio.volume = 0.1;

export default function App() {
  const [dayIndex, setDayIndex] = useState(0);
  const [mediaMap, setMediaMap] = useState({});
  const [direction, setDirection] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioPausedAt, setAudioPausedAt] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      let loaded = {};
      for (let i = 0; i < TOTAL_DAYS; i++) {
        await del(`media-day-${i}`); // Remove any existing media
      }
      setMediaMap({});
    };

    loadMedia();
    setTimeout(() => setShowWelcome(false), 4000);
  }, []);

  const handlePlayMusic = () => {
    if (audioPausedAt > 0) {
      birthdayAudio.currentTime = audioPausedAt;
    }
    birthdayAudio.play().catch((e) => console.log("Autoplay failed:", e));
    setIsMusicPlaying(true);
  };

  const handleStopMusic = () => {
    birthdayAudio.pause();
    setAudioPausedAt(birthdayAudio.currentTime);
    setIsMusicPlaying(false);
  };

  const handleResetMusic = () => {
    birthdayAudio.pause();
    birthdayAudio.currentTime = 0;
    setAudioPausedAt(0);
    setIsMusicPlaying(false);
  };

  const handleMediaChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);
    if (
      ((file.type.startsWith("image") || file.type.startsWith("video")) && sizeMB > 5) ||
      (file.type.startsWith("audio") && sizeMB > 2)
    ) {
      alert("File too large. Images/videos max 5MB. Audio max 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const data = { url: reader.result, type: file.type };
      await set(`media-day-${index}`, data);
      setMediaMap((prev) => ({ ...prev, [index]: data }));
    };
    reader.readAsDataURL(file);
  };

  const renderMedia = (media) => {
    if (!media) return null;
    if (media.type.startsWith("image")) {
      return <img src={media.url} alt="Uploaded" className="w-full rounded-xl shadow hover:scale-105 transition-transform" />;
    } else if (media.type.startsWith("video")) {
      return (
        <video controls className="w-full rounded-xl shadow hover:scale-105 transition-transform">
          <source src={media.url} type={media.type} />
        </video>
      );
    } else if (media.type.startsWith("audio")) {
      return (
        <audio controls className="w-full mt-2">
          <source src={media.url} type={media.type} />
        </audio>
      );
    }
    return null;
  };

  const variants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      transition: { duration: 0.6 },
    }),
  };

  const currentDate = new Date(START_DATE);
  currentDate.setDate(currentDate.getDate() + dayIndex);
  const formattedDate = currentDate.toLocaleDateString("en-GB");

  return (
    <div className="relative min-h-screen p-6 font-serif text-ink overflow-hidden">
      <div className="fixed inset-0 z-0 bg-cover bg-center blur-md" style={{ backgroundImage: `url('/IMG_3219.jpg')` }} />

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-white to-pink-100 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -150, opacity: [0, 1, 0] }}
                transition={{
                  delay: Math.random() * 2,
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {["💖", "💘", "💕", "❤", "💗"][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl font-bold text-pink-700 drop-shadow-2xl"
            >
              🎉 Happy Birthday Kiznaiver 💖
            </motion.h1>
            <motion.p className="mt-4 text-xl text-pink-600" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              Let the magic begin...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-4xl font-bold text-pink-800 drop-shadow"
        >
          📖 Day {dayIndex + 1} – {formattedDate}
        </motion.h1>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={dayIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <Card className="bg-white bg-opacity-90 backdrop-blur-xl border border-ink shadow-2xl rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <p className="text-lg italic first-letter:text-4xl first-letter:font-bold first-letter:text-pink-600">
                  {loveMessages[dayIndex]}
                </p>

                {renderMedia(mediaMap[dayIndex])}

                <Input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={(e) => handleMediaChange(e, dayIndex)}
                  className="mt-2"
                />

                {dayIndex === TOTAL_DAYS - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 mt-6 text-center bg-pink-100 border border-ink rounded-xl"
                  >
                    <p className="text-lg font-bold">{finaleMessage}</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center space-x-4">
          {!isMusicPlaying && (
            <Button onClick={handlePlayMusic} className="mt-6">
              Play Music 🎶
            </Button>
          )}
          {isMusicPlaying && (
            <>
              <Button onClick={handleStopMusic} className="mt-6">
                Stop Music 🛑
              </Button>
              <Button onClick={handleResetMusic} className="mt-6">
                Reset Music 🔄
              </Button>
            </>
          )}
        </div>

        <div className="relative mt-4">
          <div className="w-full bg-gray-200 h-2 rounded-lg">
            <div
              style={{ width: `${((dayIndex + 1) / TOTAL_DAYS) * 100}%` }}
              className="bg-pink-600 h-2 rounded-lg"
            ></div>
          </div>
          <p className="text-center text-sm mt-2">
            {dayIndex + 1} of {TOTAL_DAYS} days
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={() => {
              setDirection(-1);
              setDayIndex((i) => Math.max(i - 1, 0));
            }}
          >
            Previous Day
          </Button>
          <Button
            onClick={() => {
              setDirection(1);
              setDayIndex((i) => Math.min(i + 1, TOTAL_DAYS - 1));
            }}
          >
            Next Day
          </Button>
        </div>
      </div>

      {dayIndex === TOTAL_DAYS - 1 && <Confetti />}
    </div>
  );
}
