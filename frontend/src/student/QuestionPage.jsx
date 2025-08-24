import { Stack, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomButton from "../component/CustomButton";

const QuestionPage = ({ question, setSelected, submitanswer, selected, submitted, QuestionNumber }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!question?.endTime) return;
    const update = () => {
      const diff = Math.max(0, Math.floor((question.endTime - Date.now()) / 1000));
      setTimeLeft(diff);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [question]);

  const disabled = submitted || timeLeft === 0;

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh" spacing={2}>
      <Stack direction="row" spacing={5}>
        <Typography fontWeight={600} fontSize={22}>
          Question {QuestionNumber + 1}
        </Typography>
        <Stack justifyContent="flex-start" width="640px" alignItems="center" direction="row" spacing={0.5}>
          <AccessTimeIcon sx={{ color: "gray", fontSize: 20 }} />
          <Typography fontWeight={600} fontSize={18} color={timeLeft <= 15 ? "red" : "black"}>
            {timeLeft}s
          </Typography>
        </Stack>
      </Stack>

      <Box width="800px" border="1px solid #AF8FF1" borderRadius={3}>
        <Box
          p={2}
          sx={{
            background: "linear-gradient(to right,#343434,#6E6E6E)",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <Typography color="white" fontWeight={600} fontSize={17}>
            {question.text}
          </Typography>
        </Box>

        <Stack spacing={1} p={2}>
          {question.options.map((opt, index) => (
            <Box
              key={index}
              onClick={() => !disabled && setSelected(opt.text)}
              p={1.5}
              borderRadius={1}
              sx={{
                border: selected === opt.text ? "1.5px solid #7A5AF8" : "1px solid #D9D9D9",
                cursor: disabled ? "not-allowed" : "pointer",
                backgroundColor: selected === opt.text ? "white" : "#F6F6F6",
                opacity: disabled ? 0.6 : 1,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  width={24}
                  height={24}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    border: "1px solid gray",
                    backgroundColor: selected === opt.text ? "#7A5AF8" : "#8D8D8D",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Box>
                <Typography fontSize={16}>{opt.text}</Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box width="600px" alignSelf="flex-end">
        <CustomButton text={submitted ? "Submitted" : "Submit"} onClickHandler={submitanswer} disabled={disabled} />
      </Box>
    </Stack>
  );
};

export default QuestionPage;
