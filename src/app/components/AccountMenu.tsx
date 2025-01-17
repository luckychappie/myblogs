import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { theme } from '../../../theme/Theme';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {logout, setShowSnackbar, setSnackbarMessage} = useAuth()
    const router = useRouter()
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const logoutAccout = async() => {
        try {
            await logout();
            
            setShowSnackbar(true)
            setSnackbarMessage('Logged out successfully')

            router.push('/auth/login');
          } catch (error) {
            setShowSnackbar(true)
            setSnackbarMessage('Logged out failed. Please try again later')
          }
    }

    return (
        <div>
            <Tooltip title="My Account">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2, p: 0, color: theme.palette.primary.main }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem onClick={logoutAccout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default AccountMenu