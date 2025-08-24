import { Button } from "@mui/material";

const CustomButton = ({ text, onClickHandler, disabled }) => {
  return (
    <Button
      variant="contained"
      onClick={onClickHandler}
      disabled={disabled}
      sx={{
        background: disabled
          ? "linear-gradient(90deg,#bbb,#999)"
          : "linear-gradient(90deg,#8F64E1,#1D68BD)",
        borderRadius: "48px",
        fontWeight: 600,
        fontSize: "18px",
        color: "#fff",
        width: "234px",
        height: "58px",
        textTransform: "none",
        boxShadow: disabled ? "none" : "0 4px 10px rgba(0,0,0,0.2)",
        "&:hover": {
          background: disabled
            ? "linear-gradient(90deg,#bbb,#999)"
            : "linear-gradient(90deg,#7A4ED6,#1553A3)",
          boxShadow: disabled ? "none" : "0 6px 12px rgba(0,0,0,0.25)",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;