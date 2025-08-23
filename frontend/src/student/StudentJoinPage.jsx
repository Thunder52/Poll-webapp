import socket from "../socket";
import { TextField, Stack, Button, Typography, Box } from "@mui/material";
import Logo from "../component/Logo";
import CustomButton from "../component/CustomButton";

const StudentJoinPage = ({ name, setName, setJoined }) => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      width={"100%"}
      spacing={2}
    >
      <Logo />
      <Stack alignItems={"center"}>
        <Typography fontWeight={600} fontSize={40}>
          <span style={{ fontWeight: "400" }}>Let’s</span> Get Started
        </Typography>
        <Typography textAlign={"center"} fontSize={19} color="#5C5B5B">
          If you’re a student, you’ll be able to{" "}
          <span style={{ fontWeight: "600", color: "black" }}>
            submit your answers
          </span>
          , participate in live
          <br /> polls, and see how your responses compare with your classmates
        </Typography>
      </Stack>
      <Box p={5}>
        <Typography mb={1} fontWeight={400} fontSize={18}>
          Enter your Name
        </Typography>
        <TextField
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: 500,
            backgroundColor: "#F2F2F2",
            fontWeight: 400,
            fontSize: 18,
          }}
        />
      </Box>
      <CustomButton
        text={"Continue"}
        onClickHandler={() => {
          setJoined(true);
          socket.emit("join", name);
        }}
      />
    </Stack>
  );
};

export default StudentJoinPage;
