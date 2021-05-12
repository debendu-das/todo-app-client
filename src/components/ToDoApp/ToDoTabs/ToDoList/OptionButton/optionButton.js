import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip, ListItem } from '@material-ui/core';
import { AllInclusive } from '@material-ui/icons';

// import { ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  OptionButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },
}));

const OptionButton = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem className={classes.OptionButton}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ border: '1px solid black' }}
        size="medium"
      >
        <Tooltip title="Options" placement="top">
          <AllInclusive style={{ color: '#651fff' }} />
        </Tooltip>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Save Online</MenuItem>

        <MenuItem
          onClick={() => {
            props.handleEditTabIndex(props.tabIndex);
            handleClose();
          }}
        >
          Edit Tab Title
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            props.handleDeleteTab(props.tabIndex);
          }}
        >
          Delete Tab
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.handleClearAllCompleted(props.tabIndex);
            handleClose();
          }}
        >
          Clear All Completes
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default OptionButton;
