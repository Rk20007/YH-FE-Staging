import React, { useState, useEffect } from "react";
import { whyYHChoose } from "../store/api/flightPage";
import { Why_Choose_Us } from "./Shimmer";
// import { Grid, Typography } from "@mui/material";

const WhyChooseUs = () => {
  const [description, setDescription] = useState("");
  const getDescription = async () => {
    const getData = await whyYHChoose();
    setDescription(getData.data.topDestination[0]);
  };

  useEffect(() => {
    Promise.allSettled([getDescription()]);
  }, []);

  return (
    <>
      {description?.data ? (
        <div
          className="why-us-section pt-5"
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: description.data }}
        />
      ) : (
        <div className="why-us-section pt-5">
          <Why_Choose_Us />
        </div>
      )}
    </>
  );
};

export default WhyChooseUs;
