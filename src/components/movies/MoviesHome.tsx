import { sliderData, trendingMovies, mostWatched } from "../../utils/constants";
import Section from "../section/Section";
import Slider from "./Slider";
import Section2 from "../section/Section2"

export default function MoviesHome() {

    return(
        <div>
          <Slider data={sliderData} />
          <Section
           //@ts-ignore
          data={trendingMovies} title="Trending Movies" sectionNavigation="/section/trendingmovies"/>
          <Section2 
           //@ts-ignore
          data={mostWatched} />
        </div>
    )
}