import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListItem, ListItemIcon, TextField, Tooltip } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import { Close, Done } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '100%',
  },
}))

const ToDoFromEditTab = (props) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    title: props.tabTitle,
    error: false,
  })
  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((state) => ({
      ...state,
      [name]: value,
      error: !value.length,
    }))
  }

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
              label="Edit Tab Title"
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
        <ListItemIcon>
          <IconButton edge="end" aria-label="edit">
            <Tooltip title="Add" placement="top">
              <Done
                style={{ color: '#651fff' }}
                onClick={() =>
                  props.handleEditTabSave(props.tabIndex, formData)
                }
              />
            </Tooltip>
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <Tooltip title="Cancel" placement="top">
              <Close
                color="secondary"
                onClick={props.handleCancelEditTabIndex}
              />
            </Tooltip>
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </>
  )
}

export default ToDoFromEditTab
