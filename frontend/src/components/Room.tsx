import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Landing } from "./Landing";
export const Room = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  useEffect(() => {
    
                  },[name]
           )

  return <div>
    hi {name} in 
    Room page</div>;
};
