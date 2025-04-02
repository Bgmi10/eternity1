import HeroSlider from "../home/Slider";
import { featuredData, sliderData, moviesNew } from "../../utils/constants";
import Featured from "./Featured";
import NewReleases from "./NewReleases";

export default function MoviesHome() {
    return(
        <div className="mb-20">
            <HeroSlider data={sliderData} />
            <Featured data={featuredData} />
            <NewReleases data={moviesNew} />
        </div>
    )
}