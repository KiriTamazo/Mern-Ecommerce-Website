import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import GigCard from "../../components/GigCard/GigCard";
// import { gigs } from "../../data";
import "./Gigs.scss";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../ultis/apiRequest";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("price");
  const minRef = useRef();
  const maxRef = useRef();
  const handleOpen = () => {
    setOpen(!open);
  };
  const { search } = useLocation();

  const { isLoading, isFetching, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      apiRequest
        .get(
          `/gigs${search ? search : "?"}&min=${minRef.current.value}&max=${
            maxRef.current.value
          }&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });
  

  
  // to filter
  const handleApply = () => {
    refetch();
  };
  // for refect after sorting
  useEffect(() => {
    refetch();
  }, [sort]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  return (
    <section className="gigs">
      <div className="container">
        {/* <span className="breadcrumb">Allure > Graphics & Design</span> */}
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Allure's AI artists
        </p>
        {/* Menu */}
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <div className="inputField">
              <input ref={minRef} type="number" placeholder="min" min={1} />
              <input ref={maxRef} type="number" placeholder="max" max={1} />
              <button onClick={handleApply}>Apply</button>
            </div>
          </div>
          <div className="right" onClick={handleOpen}>
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              {sort === "price" ? "Best Selling" : "Newest"}
              <ChevronDownIcon
                className={open ? "downArrow open" : "downArrow"}
              />
            </span>

            <div className="rightMenu" aria-hidden={open}>
              {sort === "price" ? (
                <span onClick={() => reSort("createAt")}>Newest</span>
              ) : (
                <span onClick={() => reSort("price")}>Best Selling</span>
              )}{" "}
            </div>
          </div>
        </div>
        {/* Menu */}

        {/* Card */}
        <div className="cards">
          {isLoading || isFetching ? (
            "Loading"
          ) : error ? (
            "Something went wrong!"
          ) : data?.length < 1 ? (
            <p> No Gig To Show</p>
          ) : (
            data?.map((item) => <GigCard key={item.id} item={item} />)
          )}
        </div>
        {/* Card */}
      </div>
    </section>
  );
};

export default Gigs;
