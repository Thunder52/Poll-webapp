import { Box, Stack, Typography } from "@mui/material";

const ProgressBar = ({ numbering, percentage, text }) => {
  const filled = Math.round(percentage);

  return (
    <Box
      position="relative"
      p={1.5}
      borderRadius={1}
      sx={{
        border: "1px solid #D9D9D9",
        backgroundColor: "rgba(141, 141, 141, 0.19)",
        overflow: "hidden",
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width={`${filled}%`}
        sx={{
          backgroundColor: "#7A5AF8",
          transition: "width 0.5s ease",
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        position="relative"
        zIndex={1}
      >
        <Box
          width={24}
          height={24}
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            border: "1px solid gray",
            backgroundColor: filled > 0 ? "white" : "black",
            color: filled > 0 ? "black" : "white",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {numbering}
        </Box>
        <Typography
          fontSize={16}
          sx={{
            color: filled > 0 ? "white" : "black",
            fontWeight: 500,
          }}
        >
          {text}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={600}
          sx={{
            marginLeft: "auto",
            color: filled > 0 ? "white" : "black",
            flexShrink: 0
          }}
        >
          {filled}%
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProgressBar;
