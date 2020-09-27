import React, {useState}from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import {addReviews} from '../../actions'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function CreateReview({productId}) {
  const user = useSelector(state => state.userDetails)
  const userId=user.id
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [review,setReview] =useState('');
  const [star, setStar] = useState('');

  const handleChange = (event) => {
    setStar(event.target.value);
  };
  
  const classes=useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()
    dispatch(addReviews(productId, review, userId, star))
    handleClose()
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
          <StarIcon/>
      </IconButton>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deja tu review"}</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent>
        
          <TextField 
          multiline
          variant= 'outlined'
          label='agrega tu review'
          margin = 'normal'
          fullWidth
          name='review'
          autoFocus
          value={review}
          onChange={(e)=>setReview(e.target.value)}/>

        <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">Rating</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={star}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>★</MenuItem>
          <MenuItem value={2}>★★</MenuItem>
          <MenuItem value={3}>★★★</MenuItem>
          <MenuItem value={4}>★★★★</MenuItem>
          <MenuItem value={5}>★★★★★</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
        </DialogContent>
       
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Agregar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
