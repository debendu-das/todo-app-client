import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, TextField, Tooltip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Done } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '98%',
  },
  TextField: {},
}));

const ToDoFromAddList = (props) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    title: '',
    details: '',
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
            label="Title"
            variant="filled"
            fullWidth
            multiline
            size="small"
            className={classes.TextField}
            value={formData.title}
            onChange={onChangeHandler}
            error={!formData.title.length}
            required
            helperText="Title Can't be Blank"
            autoFocus
          />
          <TextField
            name="details"
            id="Details"
            label="Details"
            fullWidth
            multiline
            size="small"
            className={classes.TextField}
            value={formData.details}
            onChange={onChangeHandler}
          />
        </form>
      </ListItemText>
      <ListItemIcon>
        <IconButton edge="end" aria-label="edit">
          <Tooltip title="Save" placement="top">
            <Done
              style={{ color: '#651fff' }}
              onClick={() => props.handleAddListSave(props.tabIndex, formData)}
            />
          </Tooltip>
        </IconButton>
      </ListItemIcon>
    </>
  );
};

export default ToDoFromAddList;
