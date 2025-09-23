import React, { useEffect, useState } from "react";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import ProfileAvator from "./ProfileAvator";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Phone, Mail, CheckCircle, Close } from "@mui/icons-material";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpenBooking(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="navbar sticky-top relative">
      {/* Logo */}
      <Link to={"/"}>
        <img src="/mainLogo.png" className="nav-logo" />
      </Link>

      {/* Login Button / Profile */}
      {!Cookies.get("yh_auth_token") ? (
        <button className="login-btn" onClick={() => setOpen(true)}>
          Login / Sign up
        </button>
      ) : (
        <ProfileAvator />
      )}

      {/* Login & Register Dialogs */}
      <LoginDialog open={open} setOpen={setOpen} setOpenRegister={setOpenRegister} />
      <RegisterDialog
        open={openRegister}
        setOpen={setOpenRegister}
        setOpenLogin={setOpen}
        openLogin={open}
      />

      {/* Booking Modal with MUI */}
      <Dialog
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        fullWidth
        maxWidth="sm"
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setOpenBooking(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <Close />
        </IconButton>

        {/* Title */}
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8rem" }}>
          Book Your Stay Today!
        </DialogTitle>

        <DialogContent dividers sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" mb={2}>
            Enjoy premium hospitality & exclusive benefits.
          </Typography>

          {/* Contact Info */}
          <Box
            sx={{
              bgcolor: "grey.100",
              p: 2,
              borderRadius: 2,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              <Mail color="primary" />
              <Typography variant="body1" fontWeight="medium">
                info@yourshospitality.com
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              <Phone color="success" />
              <Typography variant="body1" fontWeight="bold">
                8510005460 / 61 / 62 / 63 / 64 / 65 / 67
              </Typography>
            </Box>
          </Box>

          {/* Benefits List */}
          <List dense>
            {[
              "Best Price Guaranteed",
              "Free Breakfast Included",
              "Early Check-in & Late Check-out (Subject to Availability)",
              "Exclusive Member Discounts",
              "24/7 Support for All Bookings",
            ].map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </DialogContent>

        {/* CTA Button */}
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="tel:8510005460"
            sx={{ borderRadius: 50, px: 4, py: 1.5, fontSize: "1rem" }}
          >
            📞 Call Now to Book
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Navbar;
