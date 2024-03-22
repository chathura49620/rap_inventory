import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { HorizontalRule, Add } from '@mui/icons-material';

const NumberInput = (props) => {
  const { item, value, onUpdate, min = 0, max } = props
  const changeValue = (event) => {
    const number = Number(event.target.value)
    if (!(number >= min || number <= max)) return
    onUpdate(item, event.target.value)
  }
  const increment = () => {
    if (value <= max) return
    onUpdate(item, value + 1)
  }
  const decrement = () => {
    if (value <= min) return
    onUpdate(item, value - 1)
  }
  return (
    <div style={{display: 'flex'}}>
      <IconButton aria-label="minus" size="small" onClick={decrement}>
        <HorizontalRule />
      </IconButton>
      <TextField type="number" size="small" variant="outlined" value={value} onChange={changeValue} />
      <IconButton aria-label="plus" size="small" onClick={increment}>
        <Add />
      </IconButton>
    </div>
  )
}

export default NumberInput