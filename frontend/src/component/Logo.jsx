import {Stack,Box,Typography} from '@mui/material'
import sparckles from "../assets/Sparckles.png";

const Logo = () => {
  return (
          <Stack
        direction={"row"}
        spacing={0.5}
        alignItems={"center"}
        sx={{
          background:
            "linear-gradient(90deg,rgba(117, 101, 217, 1),rgba(77, 10, 205, 1))",
          padding: "10px 20px",
          borderRadius: "24px",
        }}
      >
        <Box component={"img"} src={sparckles} height={14} width={14} />
        <Typography fontWeight={600} fontSize={14} color="#FFFFFF">
          Intervue Poll
        </Typography>
      </Stack>
  )
}

export default Logo