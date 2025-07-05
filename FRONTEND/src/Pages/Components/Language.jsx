import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function ProfileSection() {
  const { t, i18n } = useTranslation();
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

      <div className="flex flex-col p-5 space-y-4 pt-4 w-full">
        <button
        className={`${i18n.language === 'en' ? "bg-black/30 shadow-black/20 shadow-lg" : "bg-transparent shadow-none"} text-black px-6 py-2 w-full rounded-full font-bold shadow-md hover:bg-black/40`}
        onClick={() => i18n.changeLanguage('en')}>
            EN
        </button>

        <button
        className={`${i18n.language === 'hi' ? "bg-black/30 shadow-black/20 shadow-lg" : "bg-transparent shadow-none"} text-black px-6 py-2 w-full rounded-full font-bold shadow-md hover:bg-black/40`}
        onClick={() => i18n.changeLanguage('hi')}>
            हिन्दी
        </button>

        <button
        className={`${i18n.language === 'fr' ? "bg-black/30 shadow-black/20 shadow-lg" : "bg-transparent shadow-none"} text-black px-6 py-2 w-full rounded-full font-bold shadow-md hover:bg-black/40`}
        onClick={() => i18n.changeLanguage('fr')}>
            Français
        </button>
      </div>


      </div>
    </motion.div>
    </>
    )
}