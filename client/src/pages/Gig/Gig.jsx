import "./Gig.scss";
import { ArrowPathIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";
import Slide from "../../components/Slide/Slide";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../ultis/apiRequest";
import { useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";

const User = ({ user }) => {
  // const { data: userData } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () =>
  //     apiRequest.get(`/users/${data?.userId}`).then((res) => {
  //       return res.data;
  //     }),
  // });
  // console.log(data, "user");
  return (
    <>
      {/* Seller */}
      <div className="seller">
        <h2>About The Seller</h2>
        <div className="user">
          <img className="pp" src={user?.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{user?.userName}</span>
            <Stars data={user} />
            <button>Contact Me</button>
          </div>
        </div>
        <div className="box">
          <div className="items">
            <div className="item">
              <span className="title">From</span>
              <span className="desc">{user?.country}</span>
            </div>
            <div className="item">
              <span className="title">Member since</span>
              <span className="desc">Aug 2022</span>
            </div>
            <div className="item">
              <span className="title">Avg. response time</span>
              <span className="desc">4 hours</span>
            </div>
            <div className="item">
              <span className="title">Last delivery</span>
              <span className="desc">1 day</span>
            </div>
            <div className="item">
              <span className="title">Languages</span>
              <span className="desc">English</span>
            </div>
          </div>
          <hr />
          <p>{user?.desc}</p>
        </div>
      </div>
    </>
  );
};

const Stars = ({ data }) => {
  return (
    <>
      {!isNaN(data?.totalStars / data?.starNumber) && (
        <div className="rate-star">
          {Array(Math.round(data?.totalStars / data?.starNumber))
            .fill()
            .map((item, i) => (
              <StarIcon key={i} />
            ))}

          <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
        </div>
      )}
    </>
  );
};
const Gig = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      apiRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const userId = data?.userId;
  const { data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      apiRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  console.log(data, "datauser");
  return (
    <section className="gig">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container gigContainer">
          <div className="left">
            {/* <span className="breadcrumbs">Allure > Graphic & Design</span> */}
            <h1>{data?.title}</h1>
            <div className="user">
              <img
                src={dataUser?.img || "./img/noavatar.jpg"}
                className="pp"
                alt=""
              />
              <span>{dataUser?.userName}</span>
              <Stars data={data} />
            </div>
            <Slide style="gigSlide" slidesToShow={1} arrowsScroll={1}>
              {data?.imgs?.map((item, i) => {
                return <img key={`${item}${i}`} src={item} alt="" />;
              })}
            </Slide>
            <h2>{data?.shortTitle}</h2>
            <p>{data?.desc}</p>
            <User user={dataUser} />
            <Reviews user={dataUser} gigId={id} />
          </div>
          {/* RightSidebar */}
          <div className="right">
            <div className="price">
              <h3>{data?.shortTitle}</h3>
              <h2>$ {data?.price}</h2>
            </div>
            <p>{data?.shortDesc}</p>
            <div className="details">
              <div className="item">
                <ClockIcon />
                <span>{data?.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <ArrowPathIcon />
                <span>{data?.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="gigfeatures">
              {data?.features?.map((item) => (
                <div className="item" key={item}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{item}</span>
                </div>
              ))}
              {data?.features.length < 1 && <p>No Feature to show</p>}
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gig;
