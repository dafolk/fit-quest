import { Typography } from "@mui/material";

const CustomTitle = ({ text }) => {
  return (
    <Typography
      sx={{ mt: "50px", mb: "20px", fontSize: "36px", textAlign: "center" }}
    >
      {text}
    </Typography>
  );
};

export default CustomTitle;
