import {Stack,Typography} from '@mui/material'

const SelectionCard = ({ setRole,role,selectedRole,message,content}) => {
  const isSelected = selectedRole === role;
    const handleClick=()=>{
       setRole(role);
    }
  return (
    <Stack onClick={handleClick} px={2} width={344} height={100} py={4} spacing={2}   sx={{
    borderRadius: "12px",
    border: isSelected ? '3px solid #1D68BD' : '1px solid #D9D9D9',
    cursor:'pointer'
  }}>
    <Typography  fontWeight={600} fontSize={23}>{message}</Typography>
    <Typography color='#454545' fontSize={16} fontWeight={400} >{content}</Typography>
  </Stack>
  )
}

export default SelectionCard