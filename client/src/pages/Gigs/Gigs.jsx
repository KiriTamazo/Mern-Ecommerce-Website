import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import GigCard from "../../components/GigCard/GigCard";
import { gigs } from "../../data";
import "./Gigs.scss";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const handleOpen = () => {
    setOpen(!open);
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  const sorts = sort === "sales";
  return (
    <section className="gigs">
      <div className="container">
        <span className="breadcrumb">Allure > Graphics & Design</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Allure's AI artists
        </p>
        {/* Menu */}
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <div className="inputField">
              <input type="text" placeholder="min" />
              <input type="text" placeholder="max" />
              <button>Apply</button>
            </div>
          </div>
          <div className="right" onClick={handleOpen}>
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              {sorts ? "Best Selling" : "Newest"}
              <ChevronDownIcon
                className={open ? "downArrow open" : "downArrow"}
              />
            </span>

            <div className="rightMenu" aria-hidden={open}>
              {sorts ? (
                <span onClick={() => reSort("createAt")}>Newest</span>
              ) : (
                <span onClick={() => reSort("sales")}>Best Selling</span>
              )}
            </div>
          </div>
        </div>
        {/* Menu */}

        {/* Card */}
        <div className="cards">
          {gigs.map((item, i) => (
            <GigCard key={i} item={item} />
          ))}
        </div>
        {/* Card */}
      </div>
    </section>
  );
};

export default Gigs;
