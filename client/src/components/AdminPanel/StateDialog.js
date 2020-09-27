import React,{useState, useEffect} from 'react';
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
  stateButton:{
    color:'black',
    '&:disabled':{
      color:'black',
    },
  },
}));


export default function DialogSelect({state, orderId, to, name}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [orderState, setOrderState] = useState(state);
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3001/orders/${orderId}`)
      const orderX = await data.json()
      setData(orderX)
    }
    fetchData()
  }, [orderId])


  useEffect(()=>{
  
  },[open])

  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const sendMail = () => {
    if(orderState === 'cancelada'){
      // envia mail cuando se cancela la orden
      cancelMail(to, 'Su orden ha sido cancelada', name, orderId)
    } else if( orderState === 'despacho') {
      // envia mail cuando se despacha la orden
      console.log('ENTRO AL IF DE DESPACHO')
      dispatchMail(to, 'Su orden ha sido despachada', name, orderId)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    console.log(data.products)
  };

  // const fetchData = async () => {
  //   const data = await fetch(`http://localhost:3001/orders/${orderId}`)
  //   const orderX = await data.json()
  //   setOrder(orderX)
  //   // console.log(orderX)
  // }
  
  const handleClose = () => {
    if (orderState === 'cancelada') {
      data.products.map(prod => {
        let newStock = prod.stock + prod.order_product.quantity
        const product = {
          stock: newStock
        }
        try {
          fetch(`http://localhost:3001/products/stock/${prod.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        } catch (err) {console.log(err)}
      })
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
        setOpen(false);
    } catch(error){
        console.log(error)
    }
    }
    else {
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
          setOpen(false);
      } catch(error){
          console.log(error)
      }
    };
    sendMail()
    }

  return (
    <div>
      <Button onClick={handleClickOpen}
        disabled={orderState==='procesando' || orderState==='completa' || orderState===''?false:true}
        classes={{
          root:classes.stateButton,
          disabled:classes.disabled,
        }}
      >{orderState}</Button>
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
                <option value={"completa"}>Completa</option>
                <option value={"despacho"}>Despacho</option>
                <option value={"cancelada"}>Cancelada</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}