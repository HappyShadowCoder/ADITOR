import {motion} from "framer-motion"

export default function Account() {
    return (
        <>
        <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-fit rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl
        text-left p-2 px-4 space-y-4 py-5">
        <p className="text-xl md:text-3xl font-bold"
        style={{fontFamily:"Oswald"}}>
            Account Settings
        </p>
            <hr></hr>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="">
          <label className="text-sm mb-1 block">Full Name</label>
          <input
            type="text"
            placeholder="New Guy"
            className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block">Username</label>
          <input
            type="text"
            placeholder="boywithuke"
            className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold placeholder:text-gray-700"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block">Email</label>
          <input
            type="email"
            disabled
            placeholder="example@email.com"
            className="w-full h-10 px-4 rounded-xl bg-white/40 text-black font-semibold placeholder:text-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block">Password</label>
          <input
            type="password"
            disabled
            placeholder="********"
            className="w-full h-10 px-4 rounded-xl bg-white/40 text-black font-semibold placeholder:text-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block">Gender</label>
          <select className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold">
            <option>Prefer not to say</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm mb-1 block">Country</label>
          <input
            type="text"
            placeholder="India"
            className="w-full h-10 px-4 rounded-xl bg-white/30 text-black font-semibold"
          />
        </div>

      </div>

      <div className="text-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 text-black px-8 py-2 rounded-full font-bold shadow-md hover:bg-white hover:scale-105 transition-all"
        >
          Save Changes
        </motion.button>
      </div>

        </motion.div>
    
        </>
    )
} 