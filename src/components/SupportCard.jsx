import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";

const ContactFormContainer = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <main style={{ padding: isMobile ? "15px" : "60px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src="/contact.svg"
              alt="Contact"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                margin: "auto",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactFormContainer>
              <Typography variant="h4" component="h1" gutterBottom>
                Contact Us
              </Typography>
              <Card
                sx={{
                  padding: "14px",
                  // width: isMobile ? "100%" : '100%',
                  // margin: isMobile ? "0" : "auto",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Message/Query"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                  />
                  <Box mt={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ backgroundColor: "#624fa8" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Card>
            </ContactFormContainer>
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default ContactForm;
