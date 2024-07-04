"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { pink } from '@mui/material/colors';
import Link from 'next/link'
import { Avatar, Button, colors, Slide, Typography, useScrollTrigger } from '@mui/material';
import { HomeMaxOutlined, Search } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import Sidebar from './Sidebar';
import GrassIcon from '@mui/icons-material/Grass';
import { theme } from '../../../theme/Theme';
import { navItems } from '../constants/menu';

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

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    setIsInstalled(isAppInstalled());
    console.log('isInstalled : ' + isInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const isAppInstalled = (): boolean => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone = (window.navigator as any).standalone;
    return isStandalone || isIosStandalone || document.referrer.startsWith('android-app://');
  };

  return (
    <>
      <HideOnScroll>
        <Box>
          <AppBar position="fixed" sx={{ height: 38 }} elevation={1} className='appBar'>
            <Container maxWidth="xl">
              <Toolbar disableGutters sx={{ height: 38, alignItems: 'center' }} className='appToolbar'>
                <Link href="/">
                  <GrassIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                </Link>
                <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'flex' } }}>
                  {
                    navItems.map((item) => (
                      <Typography sx={{ fontSize: 15, fontWeight: 600, width: 150, textAlign: 'center' }}>
                        <Link href={item.link} className='header-menu'> {item.title} </Link>
                      </Typography>
                    ))
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
    </>
  );
}
export default Header;