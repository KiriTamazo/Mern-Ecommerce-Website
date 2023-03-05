import Featured from "../../components/Featured/Featured";
import Slide from "../../components/Slide/Slide";
import "./Home.module.scss";
import { cards, projects } from "../../data";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Features from "../../components/Featured/Features";
import Business from "../../components/Featured/Business";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const Home = () => {
  return (
    <section className="home">
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((item, i) => (
          <CategoryCard key={i} item={item} />
        ))}
      </Slide>
      <Features />
      <Business />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((item, i) => (
          <ProjectCard key={i} item={item} />
        ))}
      </Slide>
    </section>
  );
};

export default Home;
