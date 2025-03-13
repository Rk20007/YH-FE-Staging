import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ApModal from "./ApModal";

const Yhhotellist = ({ fromValue, cabinClass }) => {
  const [findData, setFindData] = useState([]);
  const [open, setOpen] = useState(false);

  const getFindData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }api/v1/get-yhhotels?location=${fromValue}&type=${cabinClass.toLowerCase()}`
      );
      setFindData(response.data.data.findData);
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  useEffect(() => {
    getFindData();
  }, [fromValue, cabinClass]);

  const handleClick = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}api/v1/post-yh-booking`,
        {
          type: data.type,
          hotelName: data.title,
          mobileNumber: localStorage.getItem("yh_user_mobile"),
          name: localStorage.getItem("yh_user_name"),
          price: data.price,
          location: data.city,
        }
      );
      if (response.data.success) {
        toast.success("Thank you for response, will contact you soon");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
      return error;
    }
  };

  console.log("findData", findData);
  
  return (
    <>
      <div className="deal-heading pt-3 mb-3">
        {findData.length > 0 && (
          <div>
            <h4>Showing Results as per your Search</h4>
            <p>Quality as judged by customers. Book at the ideal price!</p>
          </div>
        )}
        <button style={{ height: "50px" }} onClick={() => setOpen(true)}>
          List your Property
        </button>
      </div>

      <div className="row">
        {findData &&
          findData.map((ele, i) => (
            <div
              className="col-lg-4 hotel-look pb-4"
              key={i}
              style={{
                display: `${ele.active ? "block" : "none"}`,
              }}
            >
              <div className="deal-img">
                <img src={ele.image} alt={ele.hotelName} height={255} />
              </div>
              <div className="deal-content">
                <div className="review-box">
                  <h6>
                    <GradeIcon /> {ele.star} <span>({ele.reviews})</span>
                  </h6>
                </div>
                <h4 className="pt-3">{ele.hotelName}</h4>
                <small>
                  <LocationOnOutlinedIcon /> {ele.city}, {ele.country}
                </small>

                <div className="price-book-btn pt-2">
                  <h6>
                    ₹{ele.price} <span>/ person</span>
                  </h6>
                  <Link
                    className="book-link"
                    to={`/hoteldetail?from=yhhotels&price=${
                      ele.price
                    }&hotelCode=${
                      ele._id
                    }&checkInDate=${""}&checkOutDate=${""}&noOfRoom=${""}&noOfAdt=${""}&noOfChd=${""}&provider=${""}&fullName=${
                      ele.city
                    }&name=${ele.hotelName}&type=${ele.type}`}
                  >
                    <button>Book Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ApModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Yhhotellist;
