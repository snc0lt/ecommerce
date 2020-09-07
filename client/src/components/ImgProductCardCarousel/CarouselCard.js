import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const tutorialSteps = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images-na.ssl-images-amazon.com/images/I/618ZI2Xyw%2BL._AC_SL1500_.jpg',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
//   },
//   {
//     label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 355,
    objectFit: 'contain',
    display: 'block',
    maxWidth: 500,
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper({ image }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = image && image.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };



  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {image && image.map((img, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={`http://localhost:3001/images/${img}`} alt={img} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <div style={{ marginTop: '24%' }}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button variant='outlined' color='primary' size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button variant='outlined' color='primary' size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
          }
        />
      </div>
    </div>
  );
}

export default SwipeableTextMobileStepper;