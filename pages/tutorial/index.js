import CustomTitle from "@/components/CustomTitle";
import Webcam from "@/components/Webcam";
import { Box, Typography } from "@mui/material";

export default function TutorialPage() {
  return (
    <Box
      margin={"auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"450px"}
    >
      <CustomTitle text={"Move into the frame to start"} />
      <Webcam />
    </Box>
  );
}
