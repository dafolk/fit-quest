import { Avatar } from "@mui/material";

const Target = ({ x, y, alt, src }) => {
  return (
    <Avatar
      sx={{
        bgcolor: "black",
        position: "absolute",
        zIndex: 4,
        transform: `translate(${x}px, ${y}px)`,
        width: "100px",
        height: "100px",
      }}
      alt={alt}
      src={src}
    ></Avatar>
  );
};

export default Target;
