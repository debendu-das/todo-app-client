import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import { Tooltip, Typography } from '@material-ui/core'
import { DeleteTwoTone, EditTwoTone } from '@material-ui/icons'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import {
  CheckCircleOutlineTwoTone,
  CheckCircleTwoTone,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  checkbox: {
    margin: '0px',
  },
  text: {
    wordBreak: 'break-word',
  },
}))

const ToDoRow = (props) => {
  const classes = useStyles()

  return (
    <>
    {/* Complete Toggler */}
      <ListItemIcon className={classes.checkbox}>
        <Tooltip title="Complete?" placement="top">
          <Checkbox
            checked={props.item.completed}
            icon={<CheckCircleOutlineTwoTone />}
            checkedIcon={<CheckCircleTwoTone />}
            color="primary"
            edge="start"
            tabIndex={-1}
            disableRipple
            onClick={() =>
              props.handleComplete(props.tabIndex, props.listIndex)
            }
            className={classes.checkbox}
          />
        </Tooltip>
      </ListItemIcon>

      {/* List Item Text === Actual Task */}
      <ListItemText
        disableTypography
        className={classes.text}
        primary={
          <Typography
            type="body2"
            style={{
              textDecoration: props.item.completed ? 'line-through' : 'none',
            }}
          >
            <b>{props.item.title}</b>
            <Typography
              className={classes.text}
              type="caption"
              color="textSecondary"
            >
              {props.item.details}
            </Typography>
          </Typography>
        }
      ></ListItemText>

      {/* Edit and Delete Icon */}
      <ListItemIcon>
        <IconButton edge="end" aria-label="edit">
          <Tooltip title="Edit" placement="top">
            <EditTwoTone
              style={{ color: '#651fff' }}
              onClick={() => props.handleEditIndex(props.listIndex)}
            />
          </Tooltip>
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <Tooltip title="Delete" placement="top">
            <DeleteTwoTone
              color="secondary"
              onClick={() =>
                props.handleDeleteIndex(props.tabIndex, props.listIndex)
              }
            />
          </Tooltip>
        </IconButton>
      </ListItemIcon>
    </>
  )
}

export default ToDoRow
