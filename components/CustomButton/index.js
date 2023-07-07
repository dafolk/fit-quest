import { Button, Typography } from "@mui/material";

const CustomButton = ({ text }) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontSize: "36px",
        bgcolor: "#FABA15",
        color: "black",
        "&:hover": {
          bgcolor: "#F9D26E",
          boxShadow: "none",
        },
        borderRadius: "22px",
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
