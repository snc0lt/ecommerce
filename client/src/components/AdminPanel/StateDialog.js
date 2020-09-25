import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { cancelMail, dispatchMail } from "../../actions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect({state,orderId, to, order}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [orderState, setOrderState] = useState(state);

  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const sendMail = () => {
    if(orderState === 'cancelada'){
      // envia mail cuando se cancela la orden
      cancelMail(to, 'orden cancelada', order)
    } else if( orderState === 'despacho') {
      // envia mail cuando se despacha la orden
      dispatchMail(to, 'orden despachada', order)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    try{
        fetch(`http://localhost:3001/orders/detail/${orderId}`,{
            method:'PUT',
            body:JSON.stringify({state:orderState}),
            headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
            credentials:'include',
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(e =>console.log(e))
        sendMail()
        setOpen(false);
    } catch(error){
        console.log(error)
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{orderState}</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Cambiar Estado</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Estado</InputLabel>
              <Select
                native
                value={orderState}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={"procesando"}>Procesando</option>
                <option value={"completa"}>Completa</option>
                <option value={"despacho"}>Despacho</option>
                <option value={"cancelada"}>Cancelada</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}