export default function EternityReady() {
    return (
      <>
        {/* Desktop Version (lg and up) */}
        <div className="relative w-full h-full overflow-hidden hidden lg:block">
          <img 
            src="https://tv.eternityready.com/main-epics/assets/images/if-not.webp" 
            alt="Eternity Ready promotional content"
            className="w-full h-80 object-cover"
          />
          
          <div 
            className="absolute inset-0 bg-gradient-to-r from-red-500/50 via-red-500/50 to-transparent"
            aria-hidden="true"
          />
          
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Are You Eternity Ready?
              </h1>
              <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
                IF NOT LEARN HOW
              </p>
              <button className="gap-2 bg-gradient-to-b from-red-500 to-red-600 cursor-pointer p-1 rounded-lg text-white font-semibold lg:py-2 lg:px-7 lg:text-lg px-5 text-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]">
                Learn More
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Version (lg and down) */}
        <div className="flex justify-center flex-col bg-gradient-to-r from-red-500/80 lg:hidden">
          <div>
            <div className="inset-0 flex items-center justify-center p-4 text-center">
              <div className="text-white max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  Are You Eternity Ready?
                </h1>
                <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
                  IF NOT LEARN HOW
                </p>
                <button className="gap-2 bg-gradient-to-b from-red-500 to-red-600 cursor-pointer p-1 rounded-lg text-white font-semibold lg:py-2 lg:px-7 lg:text-lg px-5 text-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.7)]">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://tv.eternityready.com/main-epics/assets/images/inner-girl.webp" 
                alt="Eternity Ready mobile content"
                className="w-80"
              />
            </div>
          </div>
        </div>
      </>
    );
  }