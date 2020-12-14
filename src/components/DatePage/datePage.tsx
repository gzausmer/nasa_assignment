import { Header } from "../Header/header";
import { ImageCard } from "../schema";
import { memo, useContext, useState } from "react";
import { ApiClientContext } from "../../App";
import { useGetRequests } from "../ApiClient";
import { getUTC } from "../../helpers";
import "./datePage.scss";

export function DatePage() {
  const [date, setDate] = useState<string>("");
  const [input, setInput] = useState<string>(getUTC(new Date()));

  return (
    <div className={"date_wrapper"}>
      <Header text={"Mars Images By Date"} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDate(input);
        }}
      >
        <p>Earth date</p>
        <input
          type={"date"}
          placeholder={"please enter date"}
          value={input}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            setInput(e.currentTarget.value);
          }}
        />
        <button type={"submit"}>search</button>
      </form>
      {date && <ImageList date={date} />}
    </div>
  );
}

const ImageList = memo(({ date }: { date: string }) => {
  const apiClient = useContext(ApiClientContext);
  const images = useGetRequests<{ photos: ImageCard[] }, string>(
    apiClient.getImages,
    date
  );
  return (
    <div>
      <ul className={"date_grid"}>
        {images.state === "resolved" &&
          images.value.photos.map((image) => (
            <li key={image.id}>
              <img
                src={image.img_src}
                alt={"not found"}
                style={{ maxHeight: "15vw", maxWidth: "20vw" }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
});
