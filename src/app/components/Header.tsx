"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Link from 'next/link'
import { Slide, Snackbar, Typography, useScrollTrigger } from '@mui/material';
import Sidebar from './Sidebar';
import GrassIcon from '@mui/icons-material/Grass';
import { theme } from '../../../theme/Theme';
import { navItems } from '../constants/menu';
import AccountMenu from './AccountMenu';
import { useAuth } from '@/context/AuthContext';
import { Close } from '@mui/icons-material';
import { red } from '@mui/material/colors';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, showSnackbar, snackbarMessage, setShowSnackbar } = useAuth()

  const handleSnackbarClose = () => {
    setShowSnackbar(false)
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <HideOnScroll>
        <Box>
          <AppBar position="fixed" sx={{ height: 38 }} elevation={1} className='appBar'>
            <Container maxWidth="xl">
              <Toolbar disableGutters sx={{ display: 'flex', height: 38, alignItems: 'center' }} className='appToolbar'>
                <Link href="/">
                  <GrassIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                </Link>
                <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'flex' } }}>
                  {
                    navItems.map((item) => (
                      <Typography key={item.title} sx={{ fontSize: 15, fontWeight: 600, width: 150, textAlign: 'center' }}>
                        <Link href={item.link} className='header-menu'> {item.title} </Link>
                      </Typography>
                    ))
                  }

                  {
                     !user?.id ? (
                      <Typography sx={{ fontSize: 15, fontWeight: 600, width: 150, textAlign: 'center' }}>
                        <Link href='/auth/login' className='header-menu'> Login </Link>
                      </Typography>
                     ) : (
                      <Box>
                        <AccountMenu />
                      </Box>
                     )
                  }
                  

                  

                </Box>

                <Box sx={{ flexGrow: 0, display: { md: 'none' } }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 1, ml: 1 }}
                  >
                    <MenuIcon sx={{ color: theme.palette.primary.main }} />
                  </IconButton>

                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          <Sidebar mobileOpen={mobileOpen} sendSidebarStatus={handleDrawerToggle} />
        </Box>

      </HideOnScroll>
      <Toolbar />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        key={'center'}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}
export default Header;