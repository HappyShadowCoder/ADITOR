import { motion } from "framer-motion";
import profilePic from "../../assets/react.svg"; 

export default function ProfileSection() {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl text-white"
      style={{ fontFamily: "Satoshi" }}
    >
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-white object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">BoywithUke</h2>
          <p className="text-sm text-white/70">Creative Coder | Music Lover</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white text-sm">
        <div>
          <p className="font-semibold">Username</p>
          <p className="text-white/80">boywithuke</p>
        </div>

        <div>
          <p className="font-semibold">Location</p>
          <p className="text-white/80">India</p>
        </div>

        <div>
          <p className="font-semibold">Language</p>
          <p className="text-white/80">English</p>
        </div>

        <div>
          <p className="font-semibold">Joined</p>
          <p className="text-white/80">March 2024</p>
        </div>

        <div className="md:col-span-2">
          <p className="font-semibold">Bio</p>
          <p className="text-white/80">
            A passionate developer building futuristic code editors, with weather, Gemini AI, and voice features.
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 text-black px-6 py-2 rounded-full font-bold shadow-md hover:bg-white"
        >
          Edit Profile
        </motion.button>
      </div>
    </motion.div>
    </>
  );
};
