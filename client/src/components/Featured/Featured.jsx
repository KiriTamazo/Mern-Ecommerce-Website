import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";
const Featured = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`gigs?search=${inputRef.current.value}`);
  };
  return (
    <section className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Try building mobile app"
              />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Word Press</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Featured;
