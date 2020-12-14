import "./carousel.scss";
import { ImageCard } from "../schema";
import { useState } from "react";

export function Carousel({ images }: { images: ImageCard[] }) {
  const [currentImageIdx, setCurrentImagIdx] = useState(0);

  const prevSlide = () => {
    setCurrentImagIdx(currentImageIdx - 1);
  };

  const nextSlide = () => {
    setCurrentImagIdx(currentImageIdx + 1);
  };

  const displayedItems = images.slice(currentImageIdx, currentImageIdx + 5);

  return (
    <div className={"carousel_wrapper"}>
      {currentImageIdx > 0 && <button onClick={prevSlide}>Prev</button>}
      {displayedItems.map((image, index) => (
        <div className={"image_wrapper"}>
          <img
            key={image.id}
            src={image.img_src}
            alt=""
            style={{ maxWidth: "10vw" }}
          />
        </div>
      ))}
      {currentImageIdx + 5 < images.length && (
        <button onClick={nextSlide}>Next</button>
      )}
    </div>
  );
}
