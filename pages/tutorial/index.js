import CustomTitle from "@/components/CustomTitle";
import Target from "@/components/Target";
import { Box } from "@mui/material";
import Frame from "@/components/Frame";
import WebCam from "@/components/WebCam";

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
      <Box position={"relative"} width={"500px"} height={"700px"}>
        <WebCam />
        <Frame borderColor={"green"} />
        <Target x="50px" y="50px" alt={"red"} src={"/assets/images/red.png"} />
        <Target
          x="400px"
          y="50px"
          alt={"green"}
          src={"assets/images/green.png"}
        />
        <Target
          x="50px"
          y="500px"
          alt={"blue"}
          src={"assets/images/blue.png"}
        />
        <Target
          x="400px"
          y="500px"
          alt={"black"}
          src={"assets/images/black.png"}
        />
      </Box>
    </Box>
  );
}
