import "./CategoryCard.scss";
import { Link } from "react-router-dom";

const CategoryCard = ({ item }) => {
  return (
    <Link to="/gigs?category=music">
      <section className="categoryCard">
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </section>
    </Link>
  );
};
export default CategoryCard;
