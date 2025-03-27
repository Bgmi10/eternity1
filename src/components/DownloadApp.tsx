export default function DownloadApp() {
  return (
    <div className="py-8 mt-10 mb-52 bg-gradient-to-t from-gray-400/20 via-black to-black text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left side - Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img 
            src="/assets/downloadapp.webp" 
            alt="GoodVue on multiple devices" 
            className="w-full max-w-xl"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Available for you to enjoy on <span className="text-red-600">any device.</span>
            </h2>
            
            <p className="text-lg text-gray-300">
              The Eternity Ready is accessible on your favorite device, anywhere, anytime!
              Stream your favorite content seamlessly across all platforms.
            </p>
          </div>
          
          {/* Device icons */}
          <div className="flex flex-wrap justify-start gap-6">
          <div className="flex flex-col items-center ">
             <img src="https://img.icons8.com/?size=48&id=txrCBRXRoE2b&format=png" />
              <span className="text-sm">Roku tv</span>
            </div>
            <div className="flex flex-col items-center">
             <img src="https://img.icons8.com/?size=48&id=nKPTBtE1Kt27&format=png" />
              <span className="text-sm">Smart Tv</span>
            </div>
            
            <div className="flex flex-col items-center">
              <img src="https://img.icons8.com/?size=48&id=IV1Fcbm30EBb&format=png" />
              <span className="text-sm">Fire Tv</span>
            </div>
          </div>
          
          {/* Download buttons */}
          <div className="space-y-2">
            <p className="font-medium text-gray-300">
              Download now on your preferred platform
            </p>
            <div className="flex flex-wrap">
              <a href="#android" className="flex items-center py-3 rounded-lg transition-colors">
                <img src="https://eternityready.net/assets/images/app.webp" className="w-32" />
              </a>
              <a href="#ios" className="flex items-center py-3 px-3 rounded-lg transition-colors">
                <img src="https://eternityready.net/assets/images/google.webp" className="w-32" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}