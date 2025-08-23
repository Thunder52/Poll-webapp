import { useOutletContext } from "react-router-dom";
import {
  Stack,
  Typography,
  Box,
  Select,
  RadioGroup,
  MenuItem,
  TextField,
  FormControlLabel,
  Radio,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import Logo from "../Logo";
import CustomButton from "../CustomButton";

const CreateQuestion = () => {
  const { questionText, setQuestionText, options, setOptions, createQuestion } =
    useOutletContext();
  const [timer, setTimer] = useState(60);

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, { text: "", isCorrect: null }]);
  };

  return (
    <Stack
      px={10}
      py={5}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      spacing={4}
    >
      <Logo />
      <Stack>
        <Typography fontSize={40} fontWeight={600}>
          <span style={{ fontWeight: "400" }}>Let’s</span> Get Started
        </Typography>
        <Typography color="rgba(0, 0, 0, 0.5)" fontWeight={400} fontSize={19}>
          you’ll have the ability to create and manage polls, ask questions, and
          monitor <br /> your students' responses in real-time.
        </Typography>
      </Stack>
      <Stack spacing={4}>
        <Stack
          width={"800px"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={400} fontSize={18}>
            Enter your question
          </Typography>
          <Select
            sx={{
              backgroundColor: "#F1F1F1",
              "& .MuiSelect-icon": {
                color: "#480FB3",
                fontSize: "30px",
                marginLeft: "5px",
              },
            }}
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            size="small"
          >
            {[30, 60, 90].map((sec) => (
              <MenuItem key={sec} value={sec}>
                {sec} seconds
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <TextField
          fullWidth
          label="Enter your question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          inputProps={{ maxLength: 100 }}
          sx={{ backgroundColor: "#F2F2F2" }}
        />
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"780px"}
          >
            <Typography fontWeight={600} fontSize={18}>
              Edit options
            </Typography>
            <Typography fontWeight={600} fontSize={18}>
              Is it Correct?
            </Typography>
          </Stack>
          {options.map((option, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center">
              <TextField
                sx={{ backgroundColor: "#F2F2F2", flex: 1 }}
                label={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
              />
              <RadioGroup
                row
                value={option.isCorrect ?? ""}
                onChange={(e) =>
                  handleOptionChange(index, "isCorrect", e.target.value)
                }
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                  sx={{ mr: 2 }}
                />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          ))}
        </Stack>
        <Box>
          <Button
            sx={{
              borderColor: "#7451B6",
              color: "#7C57C2",
              borderRadius: 2,
              padding: "10px 20px",
              fontWeight: 600,
              fontSize: 14,
            }}
            size="medium"
            variant="outlined"
            onClick={addOption}
          >
            + Add More options
          </Button>
        </Box>
      </Stack>
      <Divider width="100%" sx={{ width: "1440px", borderColor: "#B6B6B6" }} />
  <Box width="100%" display="flex" justifyContent="flex-end">
    <CustomButton text='Ask Question' onClickHandler={createQuestion} />
  </Box>
    </Stack>
  );
};

export default CreateQuestion;
