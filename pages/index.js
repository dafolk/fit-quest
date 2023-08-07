import { Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isUserAlreadyExists = async () => {
    const endpoint = `/api/users/${username}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    return (await result) ? true : false;
  };

  const goToTutorial = async () => {
    if (!(await isUserAlreadyExists())) {
      router.push({
        pathname: "/tutorial/[username]",
        query: { username: username },
      });
    } else {
      handleClickOpen();
      setUsername("");
    }
  };

  return (
    <Box
      margin={"auto"}
      paddingY={"50px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography fontSize={"36px"} mb={"30px"}>
        Enter your name
      </Typography>
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "516px",
          width: "516px",
          bgcolor: "#D9D9D978",
          borderRadius: "44px",
          boxShadow: "0px 4px 4px 0px #00000040",
        }}
      >
        <Input
          onChangeHandler={(e) => setUsername(e.target.value)}
          value={username}
        />
        <CustomButton text="Done" onClickHandler={goToTutorial} />
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Oops! We are sorry!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You have used your chance to play!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay, but I'm so sad.</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
