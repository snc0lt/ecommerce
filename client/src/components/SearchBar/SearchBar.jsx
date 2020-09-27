import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Tooltip, Container } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from "react-redux";
import { getUserProductsCart, userLogout } from "../../actions";
import CallMadeIcon from '@material-ui/icons/CallMade';
import Typography from '@material-ui/core/Typography';
import LetterAvatars from '../utils/Avatar';
import { GoogleLogout } from 'react-google-login';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState('')
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const userId = useSelector(state => state.userDetails)
  const logged = useSelector(state => state.userLogged)
  const guestCart = useSelector(state => state.guestCart)



  useEffect(() => {
    if (logged && userId) {
      dispatch(getUserProductsCart(userId.id))
    }
  }, [userId])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    dispatch(userLogout())
    history.push('/')
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (logged &&
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      // keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <Tooltip title='Perfil'>
          <IconButton>
            <LetterAvatars />
          </IconButton>
        </Tooltip>
      </MenuItem>
    </Menu>)

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {cart && cart.length > 0
          ?
          <Badge badgeContent={cart.length} color="secondary">
            <Tooltip title='Carrito'>
              <IconButton>
                <ShoppingCartIcon color='primary' />
              </IconButton>
            </Tooltip>
          </Badge>
          : guestCart && guestCart.length > 0
            ? <Badge badgeContent={guestCart.length} color="secondary">
              <Tooltip title='Carrito'>
                <IconButton>
                  <ShoppingCartIcon color='primary' />
                </IconButton>
              </Tooltip>
            </Badge>
            : <Badge badgeContent={0} color="secondary">
              <Tooltip title='Carrito'>
                <IconButton>
                  <ShoppingCartIcon color='primary' />
                </IconButton>
              </Tooltip>
            </Badge>
        }
      </MenuItem>
      {logged ?
      
        <MenuItem onClick={handleMenuClose}>
          <Tooltip title='Cerrar sesion'>
            <IconButton onClick={logOut}>
              <CallMadeIcon color='primary' />
            </IconButton>
          </Tooltip>
        </MenuItem>
      
        : <MenuItem onClick={handleMenuClose}>
          <Link to='/user/login'>
            <Tooltip title='Loguearse'>
              <IconButton>
                <ExitToAppIcon color='primary' />
              </IconButton>
            </Tooltip>
          </Link>
        </MenuItem>
      }
      {logged &&
        <Tooltip title='Panel'>
          <Link to={userId.isAdmin ? `/admin/panel` : '/user/panel'}>
            <IconButton color="inherit">
              <DashboardIcon />
            </IconButton>
          </Link>
        </Tooltip>
      }
      <MenuItem onClick={handleProfileMenuOpen}>
        <Tooltip title='Perfil'>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color='primary'
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>
      </MenuItem>
    </Menu>
  );

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    history.push(`/products/?search=${searchInput}`)
  }


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth='lg'>
          <Toolbar>
            <Link to='/'>
              <h3 className='text-white logo'>ivAe</h3>
              <small className='small_logo'>store</small>
            </Link>
            <div className={classes.search}>
              <form onSubmit={handleSubmit}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Buscar producto…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </form>
            </div>
            {logged &&
              <Typography className={classes.title} variant="h6" noWrap>
                Bienvenido, {capitalize(userId.firstName)} {capitalize(userId.lastName)}
              </Typography>}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

              <div className={classes.root}>
                <Link to='/user/cart'>
                  <IconButton
                    aria-label="cart"
                  >
                    {cart && cart.length > 0
                      ?
                      <Badge badgeContent={cart.length} color="secondary">
                        <ShoppingCartIcon style={{ color: 'white' }} />
                      </Badge>
                      : guestCart && guestCart.length > 0
                        ? <Badge badgeContent={guestCart.length} color="secondary">
                          <ShoppingCartIcon style={{ color: 'white' }} />
                        </Badge>
                        : <Badge badgeContent={0} color="secondary">
                          <ShoppingCartIcon style={{ color: 'white' }} />
                        </Badge>
                    }
                  </IconButton>
                </Link>
                {logged
                  ? null
                  : <Link to='/user/login'>
                    <Tooltip title='Loguearse'>
                      <IconButton>
                        <ExitToAppIcon style={{ color: 'white' }} />
                      </IconButton>
                    </Tooltip>
                  </Link>}
              </div>
              {logged && userId && 
                <>
                  <Tooltip title='Panel'>
                    <Link to={userId.isAdmin ? `/admin/panel` : `/user/panel/${userId.id}`}>
                      <IconButton color="inherit">
                        <DashboardIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  {!userId.isGoogle
                  ?
                  <Tooltip title='Cerrar sesion'>
                    <IconButton onClick={logOut}>
                      <CallMadeIcon style={{ color: 'white' }} />
                    </IconButton>
                  </Tooltip>
                  :
                  <GoogleLogout
                    clientId={"870686065038-pbngahqtonie7p6oefqt2vulmtnh4hfn.apps.googleusercontent.com"}
                    buttonText="Logout"
                    onLogoutSuccess={logOut}
                   >
                   </GoogleLogout>}
                  {/* <Button color='inherit' >Cerrar sesion</Button> */}
                  <IconButton
                    // onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <LetterAvatars />
                  </IconButton>
                </>
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}