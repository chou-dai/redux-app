import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '16px 8px',
      width: 'calc(100% - 16px)'
    },
    [theme.breakpoints.up('md')]: {
      margin: 16,
      width: 'calc(100% - 32px)'
    }
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16
    }
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  price: {
    color: theme.palette.secondary.dark,
    fontSize: 16
  },
  menuName: {
    boxOrient: 'vertical',
    display: '-webkit-box',
    fontSize: 14,
    lineHeight: '18px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: 36,
      lineClamp: 2,
    },
    [theme.breakpoints.up('md')]: {
      height: 18,
      lineClamp: 1,
    }
  }
}));

const ReviewCard = (props) => {
  const classes = useStyle();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div>
          <Typography className={classes.menuName} color='textSecondary' component='p'>
            {props.star}
          </Typography>
          <Typography className={classes.price} component='p'>
            {props.text}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
