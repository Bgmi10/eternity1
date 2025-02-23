import { sliderData } from "../../utils/constants";
import Section from "../section/Section";
import Slider from "./Slider";

export default function LandingPage() {

    
    return(
        <div>
             <Slider />
             <Section data={sliderData} title="Trending Movies" />
        </div>
    )
}