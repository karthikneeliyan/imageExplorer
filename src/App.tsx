import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { SearchBox } from "./search";

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
        console.log(iages);
        setImages(iages.hits);
      });
  }, []);
  return (
    <>
      <SearchBox setImages={setImages}/>
      <div className="container">
        {images.map((img: any) => {
          return <Header key={img.id} img={img} />;
        })}
      </div>
    </>
  );
}

function Header({ img }: { img: any }) {
  // Import result is the URL of your image
  return (
    <div className="items">
      <StyledImage src={img.webformatURL} alt="Logo" />
    </div>
  );
}
