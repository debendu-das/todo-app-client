import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, TextField, Tooltip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Done } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '100%',
  },
  IconButton: {},
}));

const ToDoFromAddTab = (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: '',
    error: true,
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
      error: !value.length,
    }));
  };

  return (
    <>
      <ListItem button className={classes.root}>
        <ListItemText className={classes.text} disableTypography>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(event) => event.preventDefault()}
          >
            <TextField
              name="title"
              id="Title"
              label="New Tab Title"
              variant="outlined"
              fullWidth
              multiline
              size="small"
              className={classes.TextField}
              value={formData.title}
              onChange={onChangeHandler}
              autoFocus
              error={formData.error}
              required
              helperText="Tab Name Can't be Blank"
            />
          </form>
        </ListItemText>
        <ListItemIcon className={classes.IconButton}>
          <IconButton edge="end" aria-label="edit">
            <Tooltip title="Add" placement="top">
              <Done
                fontSize="medium"
                onClick={() => props.handleAddTab(formData)}
                style={{ color: '#651fff' }}
              />
            </Tooltip>
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </>
  );
};

export default ToDoFromAddTab;
