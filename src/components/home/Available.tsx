export default function Available() {

    const data = [
        {
            id: 1,
            image: "https://dev.goodvuenetwork.com/wp-content/uploads/2019/06/android-min.png",
            name: "Android",
            color: "bg-green-500"
        },
        {
            id: 2,
            image: "https://dev.goodvuenetwork.com/wp-content/uploads/2019/06/ios-min.png",
            name: "IOS App",
            color: "bg-gray-500"
        },
        {
            id: 3,
            image: "https://dev.goodvuenetwork.com/wp-content/uploads/2019/06/appletv-min.png",
            name: "Apple Tv",
            color: "bg-yellow-500"
        },
        {
            id: 4,
            image: "https://dev.goodvuenetwork.com/wp-content/uploads/2019/06/androidtv-min.png",
            name: "Android Tv",
            color: "bg-teal-500"
        },
        {
            id: 5,
            image: "https://dev.goodvuenetwork.com/wp-content/uploads/2019/06/roku-min.png",
            name: "Roku",
            color: "bg-purple-500"
        },
        {
            id: 6,
            image: "https://dev.goodvuenetwork.com/wp-content/uploads/2019/06/firetv-min.png",
            name: "Fire Tv",
            color: "bg-orange-500"
        }
    ]
    return(
        <div className="p-4 justify-between flex mb-10 mt-10">
            <img src="https://goodvuenetwork.com/wp-content/uploads/2024/06/responsive.png" />
            <div className="text-white flex flex-col gap-5 mt-10">
                <span className="font-bold lg:text-4xl">Available for you to enjoy</span>
                <span className="font-bold lg:text-4xl">on</span>
                <span className="font-bold lg:text-4xl text-red-500">any device</span>
                <span className="text-md font-semibold">The Eternity Network is accessible on your favorite device, anywhere, anytime!</span>
                <div className="flex gap-5 items-center">
                    {
                        data.map((item) => (
                            <div className={`flex flex-col items-center w-20 h-22 transition hover:scale-105 ${item.color}`}>
                            <img src={item.image} className="w-16" />
                            <span className="bg-black/40 w-full text-center text-xs mt-2">{item.name}</span>
                          </div>
                          
                        ))
                    }
                </div>
            </div>
        </div>
    )
}