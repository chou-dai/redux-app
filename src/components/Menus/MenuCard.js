import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.jpg';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import { deleteMenu } from '../../reducks/menus/operations';


const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '16px 8px',
      width: 'calc(100% - 16px)'
    },
    [theme.breakpoints.up('md')]: {
      margin: 16,
      width: 'calc(19% - 32px)'
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

const MenuCard = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const images = (props.images.length > 0) ? props.images : [{path: NoImage}]
  const price = props.price.toLocaleString();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        title=''
        onClick={() => dispatch(push('/restaurant/'+ props.restId + '/menu/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('/restaurant/'+ props.restId + '/menu/' + props.id))}>
          <Typography className={classes.menuName} color='textSecondary' component='p'>
            {props.name}
          </Typography>
          <Typography className={classes.price} component='p'>
            ¥{price}
          </Typography>
          <Typography className={classes.price} component='p'>
            {props.star}
          </Typography>
        </div>
        <IconButton className={classes.icon} onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push('/restaurant/'+ props.restId + '/menu/edit/' + props.id))
              handleClose()
            }}
          >編集する</MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteMenu(props.restId, props.id))
              handleClose()
            }}
          >削除する</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default MenuCard
