import React from 'react';
import { useHistory } from "react-router-dom";
import NotFound from '../../testImages/not_found.jpg'
import './NotFound.css';
import { Button } from '@material-ui/core'


const NotFoundRoute = () => {

  const history = useHistory()
  return (
    <div className='not_found'>
      <div className='not_found_img'>
        <img src={NotFound} alt="not_found" />
      </div>
      <h3>Page not found, please head back to the catalog..!</h3>
      <Button color='primary' variant='contained' onClick={() => history.push('/')}>atras</Button>
    </div>
  )
}

export default NotFoundRoute
