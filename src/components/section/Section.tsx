import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function EnhancedSection({ data, title }: { data: any, title: string }) {
  const [active, setActive] = useState(0);
  const [groupedData, setGroupedData] = useState<any>([]);
  const [isHovering, setIsHovering] = useState(false);
  const imagesPerSlide = 4;

  const chunkData = (data: any) => {
    const groups = [];
    for (let i = 0; i < data.length; i += imagesPerSlide) {
      groups.push(data.slice(i, i + imagesPerSlide));
    }
    return groups;
  };

  useEffect(() => {
    const groups = chunkData(data);
    setGroupedData(groups);
    if (active >= groups.length) {
      setActive(groups.length - 1);
    }
  }, [data]);

  const handleNextSlide = () => {
    if (active < groupedData.length - 1) {
      setActive((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (active > 0) {
      setActive((prev) => prev - 1);
    }
  };

  return (
    <div className="relative px-10 py-12 overflow-hidden">
      {/* Title Section */}
      <h2 className="text-4xl font-bold text-white mb-8 ">{title}</h2>

      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Images Container with Smooth Transition */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * (100 / groupedData.length)}%)` }}
        >
          {data.map((item: any, index: any) => (
            <div 
              key={item.objectId || index}
              className="relative flex-shrink-0 px-2 group cursor-pointer"
              style={{ width: `${100 / imagesPerSlide}%` }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={item.backdropURL}
                  alt={`Slide ${index}`}
                  className="w-full h-44 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {active > 0 && (
          <button
            onClick={handlePrevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full backdrop-blur-sm transform transition-all duration-300 z-10 ${
              isHovering ? ('opacity-100 -translate-x-2') : 'opacity-0 -translate-x-8'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {active < groupedData.length - 1 && (
          <button
            onClick={handleNextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full backdrop-blur-sm transform transition-all duration-300 z-10 ${
              isHovering ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-8'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {groupedData.map((_: any, index: any) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              active === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}