import { Typography } from "@mui/material";

const CustomTitle = ({ text, fontSize, mr }) => {
  return (
    <Typography
      sx={{
        mt: "50px",
        mb: "20px",
        fontSize: fontSize ? fontSize : "36px",
        mr: mr ? mr : "0px",
        textAlign: "center",
      }}
    >
      {text}
    </Typography>
  );
};

export default CustomTitle;
