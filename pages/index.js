import { Box, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";

export default function SignUpPage() {
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
        <Input />
        <CustomButton text="Done" />
      </Box>
    </Box>
  );
}
