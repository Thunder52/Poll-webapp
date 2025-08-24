import {
  Stack, Typography, Box, Select, MenuItem, TextField, RadioGroup,
  FormControlLabel, Radio, Button, Divider
} from "@mui/material";
import Logo from "../component/Logo";
import CustomButton from "../component/CustomButton";

const CreateQuestion = ({
  questionText, setQuestionText, options, setOptions,
  timer, setTimer, createQuestion, canAsk, liveCounts
}) => {
  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const addOption = () => setOptions([...options, { text: "", isCorrect: null }]);

  return (
    <Stack px={10} py={5} alignItems="flex-start" spacing={4}>
      <Logo />
      <Stack>
        <Typography fontSize={40} fontWeight={600}>
          <span style={{ fontWeight: 400 }}>Let’s</span> Get Started
        </Typography>
        <Typography color="rgba(0,0,0,0.5)" fontSize={19}>
          Create and manage polls, ask questions, and monitor responses in real-time.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Stack width="800px" direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={400} fontSize={18}>Enter your question</Typography>
          <Select
            sx={{ backgroundColor: "#F1F1F1",
              "& .MuiSelect-icon": { color: "#480FB3", fontSize: 30, marginLeft: "5px" } }}
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            size="small"
          >
            {[30, 60, 90].map((sec) => (
              <MenuItem key={sec} value={sec}>{sec} seconds</MenuItem>
            ))}
          </Select>
        </Stack>

        <TextField
          fullWidth
          placeholder="Enter your question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          inputProps={{ maxLength: 100 }}
          multiline
          minRows={3}
          sx={{ backgroundColor: "#F2F2F2" }}
        />

        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="780px">
            <Typography fontWeight={600} fontSize={18}>Edit options</Typography>
            <Typography fontWeight={600} fontSize={18}>Is it Correct?</Typography>
          </Stack>

          {options.map((option, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              <TextField
                sx={{ backgroundColor: "#F2F2F2", flex: 1 }}
                label={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, "text", e.target.value)}
              />
              <RadioGroup
                row
                value={option.isCorrect ?? ""}
                onChange={(e) => handleOptionChange(index, "isCorrect", e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" sx={{ mr: 2 }} />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          ))}
        </Stack>

        <Box>
          <Button
            sx={{
              borderColor: "#7451B6", color: "#7C57C2", borderRadius: 2,
              p: "10px 20px", fontWeight: 600, fontSize: 14,
            }}
            size="medium" variant="outlined" onClick={addOption}
          >
            + Add More options
          </Button>
        </Box>
      </Stack>

      <Divider sx={{ width: "100%", borderColor: "#B6B6B6" }} />

      <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={14} color="gray">
          Audience: {liveCounts.totalAnswered}/{liveCounts.totalStudents} answered
        </Typography>
        <CustomButton text="Ask Question" onClickHandler={createQuestion} disabled={!canAsk} />
      </Stack>
    </Stack>
  );
};

export default CreateQuestion;
