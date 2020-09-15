import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getUsers, promoteToAdmin } from "../../actions";
import PromoteDisplay from './PromoteDisplay';

export default function Promote() {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
	// useEffect(() => {
	// dispatch(getUsers())		
	// }, [users])
      
	return (
		<div>
        {users && users.map((elem,i) => <PromoteDisplay key={i} id={elem.id} email={elem.email} isAdmin={elem.isAdmin}/>)}
        </div>
    )
    }
    
