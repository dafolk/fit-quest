import { Box } from "@mui/material";

const Frame = ({ borderColor }) => {
  return (
    <Box
      sx={{
        border: `dashed ${borderColor}`,
        width: "300px",
        height: "500px",
        position: "absolute",
        zIndex: 2,
        transform: "translate(100px, 100px)",
      }}
    ></Box>
  );
};

export default Frame;
