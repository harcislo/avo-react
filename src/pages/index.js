import React from "react";
import "./index.scss";
import TopBlock from "../components/home/TopBlock/TopBlock";
import SliderTeam from "../components/home/SliderTeam/SliderTeam";
import SliderAdvantage from "../components/home/SliderAdvantage/SliderAdvantage";
import HowIsWork from "../components/home/HowItWorks/HowItWorks";
import PopularJob from "../components/home/PopularJobs/PopularJobs";
import About from "../components/home/About/About";

const Home = () => {
	return (
		<div className="container">
			<TopBlock />
			<PopularJob />
			<About />
			<HowIsWork />
			<SliderAdvantage />
			<SliderTeam />
			<div className="footer-fix"></div>
			{/* <SliderNews /> */}
		</div>
	);
};

export default Home;
