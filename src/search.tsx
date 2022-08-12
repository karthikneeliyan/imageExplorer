import { useContext, useEffect, useState, useRef } from "react";

export const SearchBox = ({ setImages }: { setImages: any }) => {
  const [url, setURL] = useState("");
  const inputref = useRef<any>();

  useEffect(() => {}, []);
  const handleChange = (e: any) => {
    async function fetchurl(val: any) {
      const urls = await fetch(
        `https://pixabay.com/api/?key=29218888-86f75d770c8acd96879f0be50&q=${val}&per_page=200`
      );
      const res: any = await urls.json();
      console.log(res.hits);
      setImages(res.hits);
    }
    if (e.keyCode == 13) {
      if (inputref.current) {
        inputref.current.blur();

        fetchurl(e.target.value);
      }
    }
    setURL(e.target.value);
  };

  return (
    <div className="search">
      <h3>Please place the link to short</h3>
      <input
        ref={inputref}
        onKeyDown={handleChange}
        placeholder="Find Images"
        className="search_input"
        onChange={handleChange}
        value={url}
      />
    </div>
  );
};
