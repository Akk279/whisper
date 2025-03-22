import { useState } from "react"
import { useHref } from "react-router-dom";
import { Link } from "react-router-dom";
import { Room } from "./Room";
export const Landing = () => {
    const [name, setName] = useState("");
    
    return (
      <div>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        {/* <Link to={'Room/?name=${name}'} > join </Link> */}
        <Link to={`/Room?name=${encodeURIComponent(name)}`}>Join</Link>
      </div>
    );
}