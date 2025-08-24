import { Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useEffect, useState } from "react";

const TeacherLoadingPage = ({ question, liveCounts }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!question?.endTime) return;
    const tick = () => {
      const diff = Math.max(0, Math.floor((question.endTime - Date.now()) / 1000));
      setTimeLeft(diff);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [question]);

  return (
    <Stack alignItems="center" spacing={2} mt={10}>
      <Typography fontSize={22} fontWeight={600}>Waiting for answers…</Typography>
      <Typography>
        <AccessTimeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Time left: {timeLeft}s
      </Typography>
      <Typography color="gray">
        {liveCounts.totalAnswered}/{liveCounts.totalStudents} answered
      </Typography>
    </Stack>
  );
};

export default TeacherLoadingPage;
