import { Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const storeUsername = async (event) => {
    event.preventDefault();

    // Get data from the form.
    const data = {
      username: username,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/users";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const result = await fetch(endpoint, options);
  };

  const goToTutorial = () => {
    router.push({
      pathname: "/tutorial/[username]",
      query: { username: username },
    });
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
    </Box>
  );
}
