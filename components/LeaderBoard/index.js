import { Box, Typography } from "@mui/material";

const topFive = [
  { name: "Joe", score: 69, rank: 1 },
  { name: "Patrick", score: 50, rank: 2 },
  { name: "Suzie", score: 48, rank: 3 },
  { name: "Traivs", score: 45, rank: 4 },
  { name: "Amalin", score: 40, rank: 5 },
];

const Leaderboard = () => {
  return (
    <Box margin={"20px"}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>Rank</Typography>
        <Typography>Name</Typography>
        <Typography>Score</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"space-evenly"}
        >
          {topFive.map((item) => {
            return <Typography textAlign={"end"}>{item.rank}.</Typography>;
          })}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"space-evenly"}
        >
          {topFive.map((item) => {
            return <Typography textAlign={"center"}>{item.name}</Typography>;
          })}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"space-evenly"}
        >
          {topFive.map((item) => {
            return <Typography textAlign={"center"}>{item.score}</Typography>;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Leaderboard;
