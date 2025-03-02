import { motion } from "framer-motion";
import { reviews_1, reviews_2, reviews_3 } from "../../utils/constants";

const VerticalMarquee = ({ reviews, duration, reverse = false }: { reviews: string[], duration: number, reverse?: boolean }) => {

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ y: reverse ? "-100%" : "100%" }}
      animate={{ y: reverse ? "100%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {reviews.concat(reviews).map((review, index) => (
       <img src={review} className="rounded-2xl" key={index} />
      ))}
    </motion.div>
  );
};

export default function MoviePreview3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black text-white rounded-lg [perspective:1000px]">
      <div
        className="flex gap-3"
        style={{
          transform: "rotateX(20deg) rotateY(-10deg) rotateZ(10deg) translateZ(-100px)",
        }}
      >
        <VerticalMarquee reviews={reviews_1} duration={15} />
        <VerticalMarquee reviews={reviews_2} duration={18} reverse />
        <VerticalMarquee reviews={reviews_3} duration={20} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black"></div>
    </div>
  );
}