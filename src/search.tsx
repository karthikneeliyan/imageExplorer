import { useContext, useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
async function fetchurl(val: any) {
  const urls = await fetch(
    `https://pixabay.com/api/?key=29218888-86f75d770c8acd96879f0be50&q=${val}&per_page=200`
  );
  const res: any = await urls.json();
  console.log(res.hits);
  return res.hits;
}
export const SearchBox = ({ setImages }: { setImages: any }) => {
  const [url, setURL] = useState("");
  const inputref = useRef<any>();

  useEffect(() => {}, []);
  const handleChange = (e: any) => {
    if (e.keyCode == 13) {
      if (inputref.current) {
        inputref.current.blur();
        (async () => {
         const images= await fetchurl(e.target.value);
          setImages(images)
        })();
      }
    }
    setURL(e.target.value);
  };
  const handleSubmit = async () => {
    const images = await fetchurl(url);
    setImages(images);
  };

  return (
    <div className="search">
      <input
        ref={inputref}
        onKeyDown={handleChange}
        placeholder="Find Images"
        className="search_input"
        onChange={handleChange}
        value={url}
      />
      <span>
        <FaSearch onClick={handleSubmit} className="searchicon" />
      </span>
    </div>
  );
};
