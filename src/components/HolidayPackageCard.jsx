import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Button,
  Box,
  Modal,
  TextField,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import BookmarkAddOutlined from "@mui/icons-material/BookmarkAddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { holidayPackageAPI } from "../store/api/holidayPackage";

export default function HolidayPackageCard() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [HolidayPackagePlace, setHolidayPackagePlace] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const getDataHoliday = async () => {
    const getData = await holidayPackageAPI();
    setHolidayPackagePlace(getData.data.findData);
  };

  useEffect(() => {
    Promise.allSettled([getDataHoliday()]);
  }, []);

  const handleOpen = (item) => {
    setSelectedPackage(item);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    setOpen(false);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {HolidayPackagePlace.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                maxWidth: isMobile ? 360 : 350,
                width: isMobile ? "100%" : "auto",
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <IconButton
                  aria-label={`bookmark ${item.title}`}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <BookmarkAddOutlined />
                </IconButton>
              </CardContent>
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total price:
                  </Typography>
                  <Typography variant="h6" component="div">
                    ₹ {item.price}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginLeft: "auto",
                    background: "#624fa8",
                    "&:hover": {
                      background: "#624fa8",
                    },
                  }}
                  onClick={() => handleOpen(item)}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : "50%",
            height: isMobile ? "80%" : "auto",
            maxHeight: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            outline: "none",
          }}
        >
          {selectedPackage && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h2">
                  {selectedPackage.title}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" gutterBottom>
                {selectedPackage.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: ₹ {selectedPackage.price}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Name" margin="normal" required />
                <TextField
                  fullWidth
                  label="Contact Number"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Tour Start Date"
                  type="date"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <TextField
                  fullWidth
                  label="Tour End Date"
                  type="date"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    background: "#624fa8",
                    "&:hover": {
                      background: "#624fa8",
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
        >
          Successfully connected with us, wait for our response.
        </Alert>
      </Snackbar>
    </>
  );
}
