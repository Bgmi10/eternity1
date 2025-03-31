import { sliderData, trendingMovies, mostWatched } from "../../utils/constants";
import Section from "../section/Section";
import Slider from "./Slider";
import Section2 from "../section/Section2"
import DownloadApp from "../DownloadApp"
import GlobalReachStats from "./GlobalReachStats";
import DiscoverContent from "./DiscoverContent";
import PopularContent from "./PopularContent";
import MultiItemSlider from "./MultiGridSlider";

export default function Home() {

  return(
    <div>
      <Slider data={sliderData} />
      <Section
       //@ts-ignore
      data={trendingMovies} title="Trending Movies" sectionNavigation="/section/trendingmovies"/>
      <Section2 
       //@ts-ignore
      data={mostWatched} />
      <PopularContent title={"Popular Content"}/>
      <MultiItemSlider title="Newest Stuff"/>
      <DiscoverContent />
      <GlobalReachStats />
      <DownloadApp />
    </div>
  )
}