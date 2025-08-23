import React from 'react'
import { Button } from '@mui/material'

const CustomButton = ({text,onClickHandler}) => {
  return (
    <Button
      variant="contained"
      onClick={onClickHandler}
      sx={{
        backgroundColor: "transparent",
        background: "linear-gradient(90deg,#8F64E1,#1D68BD)",
        borderRadius: "48px",
        fontWeight: 600,
        width: "233.93408203125px",
        height: "57.58056640625px",
        fontSize:'18px'
      }}
    >
      {text}
    </Button>
  )
}

export default CustomButton