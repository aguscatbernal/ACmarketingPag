import { motion, useScroll, useSpring } from "framer-motion";
import { waLink } from "../data/content";
import { WhatsAppIcon } from "./Shared";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export function WhatsAppFloat() {
  return (
    <motion.a
      className="wa-float"
      href={waLink("¡Hola! Vi la página y quiero info 🙌")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="wa-ping" />
      <WhatsAppIcon size={28} />
    </motion.a>
  );
}
