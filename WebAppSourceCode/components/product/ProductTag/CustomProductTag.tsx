import cn from 'classnames'
import { inherits } from 'util'
import Typography from '@mui/material/Typography';

interface CustomProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
}

const CustomProductTag: React.FC<CustomProductTagProps> = ({
  name,
  price,
  comparePrice,
  className = '',
  fontSize = 32,
}) => {
  return (
   <>
    <Typography component='h2' sx={{fontWeight:700}}>{name}</Typography>
    <Typography component='p'sx={{color:'	#1564a2',marginTop:2}} >₹{price} {comparePrice?(<strike>₹{comparePrice}</strike>):null}</Typography>
    </>
  )
}

export default CustomProductTag
