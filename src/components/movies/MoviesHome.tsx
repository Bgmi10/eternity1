import HeroSlider from "../home/Slider";
import { featuredData, sliderData } from "../../utils/constants";
import Featured from "./Featured";

export default function MoviesHome() {
    return(
        <div className="mb-20">
            <HeroSlider data={sliderData} />
            <Featured data={featuredData} />
        </div>
    )
}