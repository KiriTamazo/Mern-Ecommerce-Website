import { CheckCircleIcon } from "@heroicons/react/24/outline";
import "./Features.scss";
const Features = () => {
  return (
    <>
      <section className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingetips</h1>
            <div className="title">
              <CheckCircleIcon />
              The Best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project base pricing
            </p>

            <div className="title">
              <CheckCircleIcon />
              The Best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project base pricing
            </p>

            <div className="title">
              <CheckCircleIcon />
              The Best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project base pricing
            </p>

            <div className="title">
              <CheckCircleIcon />
              The Best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project base pricing
            </p>
          </div>
          <div className="item">
            <video
              src="./img/video.mp4"
              disablePictureInPicture
              muted
              autoPlay
              loop
              controls
              preload="metadata"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Features;
