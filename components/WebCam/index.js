import Webcam from "react-webcam";

const WebCam = ({ WebCamRef, CanvasRef }) => {
  return (
    <Webcam
      ref={WebCamRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 1,
        width: 500,
        height: 700,
        borderRadius: "10px",
        transform: "scaleX(-1)",
      }}
      videoConstraints={{
        width: 500,
        height: 700,
      }}
    />
  );
};

export default WebCam;
