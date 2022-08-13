import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { SearchBox } from "./search";

interface Iimage {
  webformatURL?: string;
  pageURL?: string;
  tags?: string;
}

const StyledImage = styled.img<any>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export default function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=29218888-86f75d770c8acd96879f0be50&image_type=photo&pretty=true"
    )
      .then((res) => res.json())
      .then((iages) => {
        setImages(iages.hits);
      });
  }, []);
  return (
    <>
      <SearchBox setImages={setImages} />
      <div className="container">
        {images.length > 0 &&
          images.map((img: any) => {
            return <Gallery key={img.id} img={img} />;
          })}
        {images.length == 0 && (
          <p className="notfound">No images found . Please modify the search text</p>
        )}
      </div>
    </>
  );
}

function Gallery({ img }: { img: Iimage }) {
  // Import result is the URL of your image
  return (
    <div
      onClick={() => {
        window.open(img.webformatURL, "_blank");
      }}
      className="items"
    >
      <StyledImage src={img.webformatURL} alt={img.tags} />
      <p className="img__description">{img.tags}</p>
    </div>
  );
}
