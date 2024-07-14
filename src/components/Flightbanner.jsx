import React, { useEffect, useState } from "react";
import { flightBanner } from "../store/api/flightPage";

const Flightbanner = () => {
  const [data, setData] = useState([]);
  const flightBannderApi = async () => {
    const getData = await flightBanner();
    setData(getData.data.findData);
  };
  useEffect(() => {
    Promise.allSettled([flightBannderApi()]);
  }, []);
  return (
    <>
      {data &&
        data.map((ele, index) => {
          return (
            <div className="flight-banner pt-5">
              <img src={ele.url} alt="" />
            </div>
          );
        })}
    </>
  );
};

export default Flightbanner;
