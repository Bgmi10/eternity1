import { sliderData, trendingMovies } from "../../utils/constants";
import Section from "../section/Section";
import Slider from "./Slider";
import EternityReady from "../EternityReady";
import Favorite from "./Favorite";


export default function LandingPage() {

    return(
        <div>
          <Slider data={sliderData} />
          <Section
           //@ts-ignore
          data={trendingMovies} title="Trending Movies" sectionNavigation="/section/trendingmovies"/>
          <EternityReady />
          <Favorite />
        </div>
    )
}