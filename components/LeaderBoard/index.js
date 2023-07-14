import { Box, Typography } from "@mui/material";

const rankNumber = [
  { id: 1, rank: 1 },
  { id: 2, rank: 2 },
  { id: 3, rank: 3 },
  { id: 4, rank: 4 },
  { id: 5, rank: 5 },
];

const Leaderboard = ({ displayUser }) => {
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
          {rankNumber.map((item) => {
            return (
              <Typography textAlign={"end"} key={item.id}>
                {item.rank}.
              </Typography>
            );
          })}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"space-evenly"}
        >
          {displayUser.map((item) => {
            return (
              <Typography textAlign={"center"} key={item.id}>
                {item.username}
              </Typography>
            );
          })}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"space-evenly"}
        >
          {displayUser.map((item) => {
            return (
              <Typography key={item.id} textAlign={"center"}>
                {item.score}
              </Typography>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Leaderboard;
