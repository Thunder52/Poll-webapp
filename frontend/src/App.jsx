import {Stack,Typography,Box,Button} from '@mui/material'
import SelectionCard from './component/SelectionCard';
import Logo from './component/Logo';
import CustomButton from './component/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [selectedRole,setSelectedRole]=useState('');
  const navigate=useNavigate();

  const handleClick=()=>{
    selectedRole === 'student' ? navigate('/student') : navigate('/teacher');
  }
  return (
    <>
    <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'} spacing={4}>
      <Logo />
      <Stack textAlign={'center'}>
        <Typography fontWeight={400} fontSize={40}>Welcome to the <span style={{fontWeight:600}}>Live Polling System</span></Typography>
        <Typography color='rgba(0, 0, 0, 0.5)' fontWeight={400} fontSize={19}>Please select the role that best describes you to begin using the live polling <br /> system</Typography>

      </Stack>
      <Stack direction={'row'} spacing={2}>
        <SelectionCard setRole={setSelectedRole} selectedRole={selectedRole} role={'student'} message={"I’m a Student"} content={'Lorem Ipsum is simply dummy text of the printing and typesetting industry'} />
        <SelectionCard setRole={setSelectedRole} selectedRole={selectedRole} role={'teacher'} message={"I’m a Teacher"} content={'Submit answers and view live poll results in real-time.'} />
      </Stack>
      <CustomButton text={'Continue'} onClickHandler={handleClick} />
    </Stack>
    </>
  );
}

export default App;
