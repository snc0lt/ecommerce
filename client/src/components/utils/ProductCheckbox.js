import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function ProductChechBox({ cat, handleCategory, setCategory }) {
  const [check, setCheck] = React.useState({
    checkedA: true,
  });

  
  const handleChange = (event) => {
    setState({ ...check, [event.target.name]: event.target.checked });
    
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label={cat.name}
      />
    </FormGroup>
  );
}