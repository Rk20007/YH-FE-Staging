import React from "react";
import StarIcon from "@mui/icons-material/Star";
import getHotelCount from "../utils/getData";
import {
  Pool,
  Wifi,
  FitnessCenter,
  LocalDining,
  Spa,
  Pets,
  Accessibility,
} from "@mui/icons-material";

const Hotelcontent = ({ getData }) => {
  const renderAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "pool":
        return <Pool />;
      case "wifi":
        return <Wifi />;
      case "fitness center":
        return <FitnessCenter />;
      case "dining":
        return <LocalDining />;
      case "spa":
        return <Spa />;
      case "pets allowed":
        return <Pets />;
      case "accessible":
        return <Accessibility />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="hotel-content">
        <div className="detail-name">
          <h4>
            Room in{" "}
            {getData && getData.city
              ? getData?.city
              : getData?.hotelAddress?.city}
            ,{" "}
            {getData && getData.country
              ? getData?.country
              : getData?.hotelAddress?.country}
          </h4>
          <p>
            Total Room available -{" "}
            {getData && getData?.hotelRoomDetails
              ? getData?.hotelRoomDetails[0]?.roomSize
              : getHotelCount()}
          </p>
          {getData?.chkInTime && (
            <p>
              CheckIn - {getData && getData?.chkInTime}, Checkout -{" "}
              {getData && getData?.chkOutTime}
            </p>
          )}
        </div>
        <div className="short-review-box mt-5">
          <div>
            <h5>
              Guest <br /> Favourite
            </h5>
          </div>
          <div>
            <p>
              One of the most loved hotel on <b>Yours Hospitality</b> <br /> in{" "}
              {getData && getData.country
                ? getData?.country
                : getData?.hotelAddress?.country}{" "}
              by our Guests
            </p>
          </div>
          <div className="num-box">
            <h6>
              {getData && getData?.star_category
                ? getData?.star_category
                : getData?.startRating}
            </h6>
            <span>
              {(() => {
                // Get the star count, fallback to 0 if not valid
                const starCount =
                  Number(getData?.star_category) || Number(getData?.startRating) || 0;
                if (starCount > 0) {
                  return Array(starCount)
                    .fill()
                    .map((_, index) => <StarIcon key={index} />);
                }
                return null; // No stars if starCount is 0 or invalid
              })()}
            </span>
          </div>
          <div className="num-box">
            <h6>
              {getData && getData?.star_category
                ? getData?.star_category
                : getData?.startRating * 50}
            </h6>
            <span>Reviews</span>
          </div>
        </div>

        <div className="about-hotel pt-5">
          <h5>About this place</h5>
          <p className="mt-3">{`${getData?.hotelName}, where luxury meets comfort in the heart of ${getData?.hotelAddress?.city}. Nestled in a prime location, our hotel offers breathtaking views of ${getData?.hotelAddress?.locality}, making it an ideal retreat for both business and leisure travelers.

Our elegantly designed rooms and suites are equipped with modern amenities, ensuring a relaxing stay. Whether you’re here to unwind by the pool, indulge in gourmet dining at our on-site restaurant, or stay active in our state-of-the-art fitness center, ${getData?.hotelName} provides a tranquil oasis amidst the bustling city.

For those seeking to explore, we are just minutes away from ${getData?.hotelAddress?.city} and ${getData?.hotelAddress?.locality}, offering convenient access to the city’s top attractions. Our dedicated concierge team is always on hand to assist with personalized recommendations and bookings, ensuring your stay is tailored to your preferences.`}</p>
        </div>

        <div className="amenities pt-4">
          <h4>Amenities We offer</h4>
          <div className="facility-box">
            {getData && getData?.description_amentities
              ? getData?.description_amentities?.map((ele) => {
                  return (
                    <div className="facility-list" key={ele}>
                      <div className="facility-icon">
                        {renderAmenityIcon(ele)}
                      </div>
                      <h5>{ele}</h5>
                    </div>
                  );
                })
              : getData?.hotelAmenities?.map((ele) => {
                  return (
                    <div className="facility-list" key={ele}>
                      <div className="facility-icon">
                        {renderAmenityIcon(ele)}
                      </div>
                      <h5>{ele}</h5>
                    </div>
                  );
                })}
          </div>
        </div>

        <hr />
        <div className="hotel-location">
          <h4>Where You will be</h4>
          <iframe
            title="Hotel Location"
            src={
              getData.description_google_map
                ? getData?.description_google_map
                : `https://www.google.com/maps?q=${getData?.lati},${getData?.longi}&output=embed`
            }
            frameBorder="0"
            allowFullScreen
            loading="lazy"
          ></iframe>

          {getData?.hotelPolicy && <h4>{"Hotel Policy"}</h4>}
          {getData?.hotelPolicy && (
            <p>
              {getData?.hotelPolicy?.map((ele, i) => {
                return <li key={i}>{ele.heading}</li>;
              })}
            </p>
          )}
        </div>

        <hr />
      </div>
    </>
  );
};

export default Hotelcontent;
