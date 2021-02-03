import React, { useState } from 'react';
import { ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { Settings, Inbox, Help } from '@material-ui/icons';
import { useStyles, StyledMenuItem, StyledMenu } from '../styles/SettingsMenu';

export default function SettingsMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="secondary"
        onClick={handleClick}
        className={classes.icon}
      >
        <Settings />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <Help fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Suporte" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <Inbox fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Contato" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
