import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ToDoRow from './ToDoRow/toDoRow';

import ToDoFormEditList from './../../ToDoForm/toDoFormEditList';
import ToDoFormEditTab from './../../ToDoForm/toDoFormEditTab';
import ToDoFromAddList from '../../ToDoForm/toDoFromAddList';
import OptionButton from './OptionButton/optionButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  ListItem: {
    width: '100%',
  },
}));

const ToDoList = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.addNewList && (
        <ListItem className={classes.ListItem}>
          <ToDoFromAddList
            tabIndex={props.tabIndex}
            handleAddListSave={props.handleAddListSave}
          />
        </ListItem>
      )}

      {props.editTabId === props.tabIndex && (
        <ToDoFormEditTab
          tabIndex={props.tabIndex}
          tabTitle={props.tabTitle}
          handleCancleEditTabIndex={props.handleCancleEditTabIndex}
          handleEditTabSave={props.handleEditTabSave}
        />
      )}
      {props.list.map((item, index) => {
        const currentlyEditing = props.editId === index;

        return (
          <ListItem key={index} button className={classes.ListItem} divider>
            {/* Form || Row */}
            {currentlyEditing ? (
              <ToDoFormEditList
                item={item}
                tabIndex={props.tabIndex}
                listIndex={index}
                handleCancleIndex={props.handleCancleIndex}
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
        );
      })}
      <OptionButton
        tabIndex={props.tabIndex}
        handleEditTabIndex={props.handleEditTabIndex}
        handleClearAllCompleted={props.handleClearAllCompleted}
        handleDeleteTab={props.handleDeleteTab}
      />
    </List>
  );
};

export default ToDoList;
