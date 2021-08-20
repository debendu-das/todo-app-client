import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ToDoRow from './ToDoRow/toDoRow'
import ToDoFormEditList from './../../ToDoForm/toDoFormEditList'
import ToDoFormEditTab from './../../ToDoForm/toDoFormEditTab'
import ToDoFromAddList from '../../ToDoForm/toDoFromAddList'
import OptionButton from './OptionButton/optionButton'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  ListItem: {
    width: '100%',
  },
}))

const ToDoList = (props) => {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {/* Add New Task / Add New List Item Form */}
      {props.addNewList && (
        <ListItem className={classes.ListItem}>
          <ToDoFromAddList
            tabIndex={props.tabIndex}
            handleAddListSave={props.handleAddListSave}
          />
        </ListItem>
      )}

      {/* Tab Editing Form */}
      {props.editTabId === props.tabIndex && (
        <ToDoFormEditTab
          tabIndex={props.tabIndex}
          tabTitle={props.tabTitle}
          handleCancelEditTabIndex={props.handleCancelEditTabIndex}
          handleEditTabSave={props.handleEditTabSave}
        />
      )}

      {/* List Items */}
      {props.list.map((item, index) => {
        const currentlyEditing = props.editId === index

        return (
          <ListItem key={index} button className={classes.ListItem} divider>
            {/* Editing Form || List Item Row */}
            {currentlyEditing ? (
              <ToDoFormEditList
                item={item}
                tabIndex={props.tabIndex}
                listIndex={index}
                handleCancelIndex={props.handleCancelIndex}
                handleEditSave={props.handleEditSave}
              />
            ) : (
              <ToDoRow
                item={item}
                handleComplete={props.handleComplete}
                handleEditIndex={props.handleEditIndex}
                handleDeleteIndex={props.handleDeleteIndex}
                tabIndex={props.tabIndex}
                listIndex={index}
              />
            )}
          </ListItem>
        )
      })}

      {/* Option Button */}
      <OptionButton
        tabIndex={props.tabIndex}
        handleEditTabIndex={props.handleEditTabIndex}
        handleClearAllCompleted={props.handleClearAllCompleted}
        handleDeleteTab={props.handleDeleteTab}
        handleSaveOnline={props.handleSaveOnline}
      />
    </List>
  )
}

export default ToDoList
