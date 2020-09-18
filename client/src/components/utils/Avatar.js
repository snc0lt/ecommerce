import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function LetterAvatars() {
  const classes = useStyles();
  const user = useSelector(state => state.userDetails)

  return (
    <div className={classes.root}>
      {user &&
        <Avatar className={classes.orange}>{user.firstName.substring(0, 1)}{user.lastName.substring(0,1)}</Avatar>
      }
    </div>
  );
}