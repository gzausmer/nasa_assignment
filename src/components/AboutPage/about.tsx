import { Header } from "../Header/header";
import { Carousel } from "../Carousel/carousel";
import { useHistory } from "react-router-dom";
import { ImageCard, Page } from "../schema";
import { missionDesc } from "../../consts";
import mainImage from "../assets/mars-curiosity-rover-msl-horizon-sky-self-portrait-PIA19808-full.jpg";
import bgImage from "../assets/ivana-cajina-asuyh-_ZX54-unsplash.jpg";
import { useGetRequests } from "../ApiClient";
import { useContext } from "react";
import { ApiClientContext } from "../../App";
import "./about.scss";

export function About() {
  const history = useHistory();
  const apiClient = useContext(ApiClientContext);
  const images = useGetRequests<{ latest_photos: ImageCard[] }>(
    apiClient.getLatestImages,
    undefined
  );

  function navigate(page: Page) {
    switch (page) {
      case "date":
        history.push("/date");
        return;
      case "weather":
        history.push("/weather");
        return;
    }
  }

  return (
    <div className={"about_wrapper"}>
      <Header text={"About the program"} style={{ display: "flex" }} />
      <section className={"info_wrapper"}>
        <div className={"info_wrapper_image"}>
          <img src={mainImage} alt={"not found"} width={"50%"} />
          <p>Curiosity rover image</p>
        </div>
        <article className={"desc"}>
          <p>{missionDesc}</p>
          <div>
            <button onClick={() => navigate("date")}>
              View images by date
            </button>
            <button onClick={() => navigate("weather")}>View Weather</button>
          </div>
        </article>
      </section>
      {images.state === "resolved" && (
        <section className={"carousel_section"}>
          <div className={"about_subtitle"}>
            <h2>{`Curiosity rover images \u00A0`}</h2>
            <h2 style={{ color: "orange" }}>from today</h2>
          </div>
          <Carousel images={images.value.latest_photos} />
        </section>
      )}
    </div>
  );
}
