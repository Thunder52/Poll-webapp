import {Stack,Box,Typography} from '@mui/material'
import ProgressBar from '../component/ProgressBar';
import CustomButton from '../component/CustomButton';

const ResultPage = ({ questionData,role,handler  }) => {

    const {question,results,totalVotes}=questionData;
    const precentages=question.options.map((opt)=>{
        const count=results[opt.text] || 0;
        let precent=(count/totalVotes)*100;
        return {precent,option:opt.text};
    })

  return (
    <Stack spacing={2} alignItems={'center'} justifyContent={'center'} height={'100vh'} width={'100%'}>
        <Typography fontWeight={600} fontSize={22}>Question</Typography>
        <Box border={'1px solid #AF8FF1'} borderRadius={3} width={'800px'} >
            <Box
          p={2}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{
            background: "linear-gradient(to right,#343434,#6E6E6E)",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          width={"96%"}
          height={30}
        >
          <Typography color="white" fontStyle={600} fontSize={17}>
            {question.text}
          </Typography>
          </Box>
          <Stack spacing={2} p={2}>
            {precentages.map((item,index)=>(
                <ProgressBar key={index} numbering={index+1} percentage={item.precent} text={item.option} />
            ))}
          </Stack>
        </Box>
        {role==='student' && (
            <Typography fontSize={24} fontWeight={600}>Wait for the teacher to ask a new question..</Typography>
        )}

        {role==='teacher' && (
            <Box width={'600px'}  alignSelf={'flex-end'}>
            <CustomButton text={'+ Ask new question'} onClickHandler={handler} />
            </Box>
        )}
    </Stack>
  )
}

export default ResultPage