import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export default function LoginDialog({ open, setOpen, setOpenRegister }) {
  const isSmallScreen = useMediaQuery("(max-width: 625px)");

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    "& .MuiPaper-root": {
      width: "800px",
      height: isSmallScreen ? "800px" : "400px",
      maxWidth: "none",
    },
  }));
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpenRegister(true);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="login-dialog">
          <Box
            sx={{
              width: isSmallScreen ? "95%" : "50%",
            }}
          >
            <img
              src="/wall.png"
              style={{
                width: "100%",
              }}
            />
          </Box>
          <Box className="login-left">
            <TextField
              id="standard-basic"
              label="Enter Mobile Number"
              variant="standard"
              type="number"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <TextField
              id="standard-basic"
              label="Enter Password"
              variant="standard"
              type="password"
              fullWidth
            />
            <button className="login-btn-primary">Get Login</button>
            <div className="login-text">
              We no more support email based login. You can now login via mobile
              number & link email to access your account.
            </div>
            <div className="login-text-register" onClick={handleAgree}>
              Don't Have Account? Click Here
            </div>
            <div className="login-text-agree">
              you agree to Your's Hospitality privacy policy & terms of use.
            </div>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
