import { Typography } from "@mui/material";

const CustomTitle = ({ text, fontSize }) => {
  return (
    <Typography
      sx={{
        mt: "50px",
        mb: "20px",
        fontSize: fontSize ? fontSize : "36px",
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
};

export default CustomTitle;
