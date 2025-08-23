import { CircularProgress,Stack,Typography } from "@mui/material"
import Logo from "../component/Logo"

const StudentLoadingPage = () => {
  return (
    <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'} spacing={4}>
        <Logo />
        <CircularProgress sx={{color:'#500ECE'}} thickness={4} size={50} />
        <Typography fontWeight={600} fontSize={33} >Wait for the teacher to ask questions..</Typography>
    </Stack>
  )
}

export default StudentLoadingPage