import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

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

export default function LetterAvatars({ alguien }) {
  const classes = useStyles();
  
  
  return (
        <div className={classes.root}>
        {alguien?
          <Avatar className={classes.orange}>{alguien.firstName.substring(0, 1)}{alguien.lastName.substring(0, 1)}</Avatar>
        :null}
        </div>
  );
}