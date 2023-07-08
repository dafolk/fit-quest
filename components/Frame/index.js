import { Box } from "@mui/material";

const Frame = ({ borderColor, w, h, x, y }) => {
  return (
    <Box
      sx={{
        border: `dashed ${borderColor}`,
        width: `${w}px`,
        height: `${h}px`,
        position: "absolute",
        zIndex: 3,
        transform: `translate(${x}px, ${y}px)`,
      }}
    ></Box>
  );
};

export default Frame;
