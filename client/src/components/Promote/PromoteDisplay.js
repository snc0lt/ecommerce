import React from 'react'
import { promoteToAdmin } from "../../actions";
import Button from '@material-ui/core/Button';

export default function PromoteDisplay(props) {
           
    const handleAdmin = function (e) {
        e.preventDefault()
        !props.isAdmin
        ? promoteToAdmin(props.id,true)
        : promoteToAdmin(props.id,false)
           }
       
	return (
		<div>
            {!props.isAdmin
                ?  <Button onClick= {handleAdmin}> Promover a admin: {props.email} </Button>
                :  <Button onClick= {handleAdmin}> Quitar de admin: {props.email} </Button>                   
            }
        </div>
    )
    }