import { Avatar } from "@mui/material";

const Target = ({ x, y, alt, src }) => {
  return (
    <Avatar
      sx={{
        bgcolor: "black",
        position: "absolute",
        zIndex: 3,
        transform: `translate(${x}, ${y})`,
        width: "50px",
        height: "50px",
      }}
      alt={alt}
      src={src}
    ></Avatar>
  );
};

export default Target;
