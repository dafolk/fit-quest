import { Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const storeUsername = async (event) => {
    event.preventDefault();

    if (!isUserAlreadyExists) {
      const data = {
        username: username,
      };

      const JSONdata = JSON.stringify(data);

      const endpoint = "/api/users";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      const result = await fetch(endpoint, options);
    }
  };

  // useEffect(() => {
  //   const isUserAlreadyExists = () => {
  //     return getUserWithUsername() ? true : false;
  //   };
  // });

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
