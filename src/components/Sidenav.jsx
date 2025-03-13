import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import CollectionsIcon from '@mui/icons-material/Collections';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from "js-cookie";

const Sidenav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('yhhotel')) {
      setActiveTab('yhhotel');
    } else if (path === '/') {
      setActiveTab('flights');
    } else if (path.includes('offer')) {
      setActiveTab('offers');
    } else if (path.includes('hotel')) {
      setActiveTab('hotel');
    } else if (path.includes('transport')) {
      setActiveTab('transport');
    } else if (path.includes('trips')) {
      setActiveTab('trips');
    } else if (path.includes('holidayPackage')) {
      setActiveTab('holidayPackage');
    } else if (path.includes('yhGallery')) {
      setActiveTab('yhGallery');
    } else if (path.includes('myService')) {
      setActiveTab('myService');
    // } else if (path.i lyVisa");
    } else if (path.includes('support')) {
      setActiveTab('support');
    }
  }, [location]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarVisible(prevState => !prevState);
  }, []);

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        {isSidebarVisible ? <CloseIcon /> : <MenuIcon />}
      </button>
      <nav
        className={`sidenav flex-column mt-3 ${
          isSidebarVisible ? "visible" : ""
        }`}
      >
        <Link
          to="/"
          className={`nav-link ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          <FlightIcon className="nav-icon" /> Flights
        </Link>
        <Link
          to="/yhhotel"
          className={`nav-link ${activeTab === "yhhotel" ? "active" : ""}`}
          onClick={() => setActiveTab("yhhotel")}
        >
          <HotelIcon className="nav-icon" /> YH Hotels
        </Link>
        {/* <Link
          to="/hotel"
          className={`nav-link ${activeTab === "hotel" ? "active" : ""}`}
          onClick={() => setActiveTab("hotel")}
        >
          <HotelIcon className="nav-icon" /> Hotel
        </Link> */}
        <Link
          to="/transport"
          className={`nav-link ${activeTab === "transport" ? "active" : ""}`}
          onClick={() => setActiveTab("transport")}
        >
          <DirectionsBusIcon className="nav-icon" /> Transport
        </Link>
        <Link
          to="/offer"
          className={`nav-link ${activeTab === "offers" ? "active" : ""}`}
          onClick={() => setActiveTab("offers")}
        >
          <LocalOfferIcon className="nav-icon" /> Offers
        </Link>
       
        {Cookies.get("yh_auth_token") && (
          <Link
            to="/trips"
            className={`nav-link ${activeTab === "trips" ? "active" : ""}`}
            onClick={() => setActiveTab("trips")}
          >
            <TripOriginIcon className="nav-icon" /> My Trips
          </Link>
        )}
        <Link
          to="/holidayPackage"
          className={`nav-link ${
            activeTab === "holidayPackage" ? "active" : ""
          }`}
          onClick={() => setActiveTab("holidayPackage")}
        >
          <HolidayVillageIcon className="nav-icon" /> Holiday Package
        </Link>
        <Link
          to="/yhGallery"
          className={`nav-link ${activeTab === "yhGallery" ? "active" : ""}`}
          onClick={() => setActiveTab("yhGallery")}
        >
          <CollectionsIcon className="nav-icon" /> Gallery
        </Link>
        <Link
          to="/myService"
          className={`nav-link ${activeTab === "myService" ? "active" : ""}`}
          onClick={() => setActiveTab("myService")}
        >
          <ManageAccountsIcon className="nav-icon" /> My Service
        </Link>
        {/* <Link
          to="/applyVisa"
          className={`nav-link ${activeTab === "applyVisa" ? "active" : ""}`}
          onClick={() => setActiveTab("applyVisa")}
        >
          <ManageAccountsIcon className="nav-icon" />
          Apply For VISA
        </Link> */}
        <Link
          to="/support"
          className={`nav-link ${activeTab === "support" ? "active" : ""}`}
          onClick={() => setActiveTab("support")}
        >
          <ContactSupportIcon className="nav-icon" /> Support
        </Link>
      </nav>
    </>
  );
};

export default Sidenav;
