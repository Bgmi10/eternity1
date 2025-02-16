import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // Using Lucide Icons for a clean look

export default function StarRating({ totalStars }: { totalStars: string }) {
    const StarNum = parseInt(totalStars);
    console.log(StarNum)
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="flex space-x-2">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <motion.div
                        key={index}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.8, rotate: -10 }}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star
                            size={36}
                            className="transition-all duration-200"
                            color={starValue <= (hover || rating) ? "#FFD700" : "#555"}
                            fill={starValue <= (hover || rating) ? "#FFD700" : "none"}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
