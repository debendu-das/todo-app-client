import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ToDoList from './ToDoList/toDoList';
import { Add, Close } from '@material-ui/icons';
import ToDoFormAddTab from './../ToDoForm/toDoFormAddTab';
import { Fab, Tooltip } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  scrollbar: {
    width: '100%',
  },
  tabs: {
    width: '100%',
  },
  tabpanel: {
    marginBottom: theme.spacing(8),
  },
  addIcon: {
    marginTop: 'auto',
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'fixed',
    bottom: '10vh',
    marginRight: theme.spacing(2),
  },
}));

const ToDoTabs = () => {
  const classes = useStyles();

  const [data, setData] = useState([
    {
      title: 'General',
      list: [
        {
          title: 'TODO1',
          completed: false,
          details: '',
        },
        {
          title: 'TODO2',
          completed: true,
          details: 'Ok',
        },
      ],
    },
  ]);
  let [value, setValue] = useState(0);

  const [editId, setEditId] = useState(null);
  const [addNewList, setAddNewList] = useState(false);

  const [editTabId, setEditTabId] = useState(null);

  useEffect(() => {
    let localStorageData = localStorage.getItem('toDoData');

    let storageData =
      localStorageData !== null
        ? JSON.parse(localStorageData)
        : [
            {
              title: 'General',
              list: [
                {
                  title: 'Task 1',
                  completed: false,
                  details: 'Not Completed',
                },
                {
                  title: 'Task 2',
                  completed: true,
                  details: 'Completed',
                },
              ],
            },
          ];
    setData(storageData);
  }, []);

  useEffect(() => {
    localStorage.setItem('toDoData', JSON.stringify(data));
  }, [data]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditIndex = (index) => {
    setEditId(index);
  };
  const handleCancleIndex = () => {
    setEditId(null);
  };

  const handleComplete = (tabIndex, index) => {
    let newData = [...data];
    newData[tabIndex].list[index].completed = !newData[tabIndex].list[index]
      .completed;
    setData(newData);
  };

  const handleEditSave = (tabIndex, listIndex, formData) => {
    if (!formData.error) {
      const newData = [...data];
      newData[tabIndex].list[listIndex].title = formData.title;
      newData[tabIndex].list[listIndex].details = formData.details;
      setData(newData);
      setEditId(null);
    }
  };

  const handleAddTab = (formData) => {
    if (!formData.error) {
      const newData = [...data];
      const newTab = {
        title: formData.title,
        list: [],
      };
      newData.push(newTab);
      setData(newData);
    }
  };

  const handleEditTabIndex = (tabIndex) => {
    setEditTabId(tabIndex);
  };
  const handleCancleEditTabIndex = () => {
    setEditTabId(null);
  };
  const handleEditTabSave = (tabIndex, formData) => {
    if (!formData.error) {
      const newData = [...data];
      newData[tabIndex].title = formData.title;
      setData(newData);
      setEditTabId(null);
    }
  };

  const handleDeleteIndex = (tabIndex, listIndex) => {
    const newData = [...data];
    newData[tabIndex].list.splice(listIndex, 1);
    setData(newData);
  };

  const handleDeleteTab = (tabIndex) => {
    const newData = [...data];
    newData.splice(tabIndex, 1);
    setData(newData);
  };

  const handleAddListForm = () => {
    setAddNewList((state) => !state);
  };

  const handleAddListSave = (tabIndex, formData) => {
    if (!formData.error) {
      const newData = [...data];
      const newList = {
        title: formData.title,
        completed: false,
        details: formData.details,
      };
      newData[tabIndex].list.splice(0, 0, newList);
      setData(newData);
      setAddNewList(false);
    }
  };

  const handleClearAllCompleted = (tabIndex) => {
    const newData = [...data];
    const newList = newData[tabIndex].list.filter((listItem) => {
      return !listItem.completed;
    });
    newData[tabIndex].list = newList;
    setData(newData);
  };

  return (
    <Grid item className={classes.root}>
      <Grid item sm={12} className={classes.scrollbar}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant={'scrollable'}
          scrollButtons={'on'}
        >
          {/* <Tab label="General" /> */}
          {data.map((tab, index) => (
            <Tab key={index} label={tab.title} />
          ))}

          <Tab
            key={data.length}
            label={
              <Tooltip title="Add New Tab" placement="right-end">
                <Add color="primary" />
              </Tooltip>
            }
          />
        </Tabs>
      </Grid>

      <Grid items sm={12} className={classes.tabpanel}>
        {data.map((tab, index) => (
          <TabPanel value={value} index={index} key={index}>
            <ToDoList
              list={tab.list}
              tabTitle={tab.title}
              tabIndex={index}
              editId={editId}
              editTabId={editTabId}
              handleComplete={handleComplete}
              handleEditSave={handleEditSave}
              handleCancleIndex={handleCancleIndex}
              handleEditIndex={handleEditIndex}
              addNewList={addNewList}
              handleAddListSave={handleAddListSave}
              handleDeleteIndex={handleDeleteIndex}
              handleClearAllCompleted={handleClearAllCompleted}
              handleEditTabIndex={handleEditTabIndex}
              handleCancleEditTabIndex={handleCancleEditTabIndex}
              handleEditTabSave={handleEditTabSave}
              handleDeleteTab={handleDeleteTab}
            />
          </TabPanel>
        ))}
        <TabPanel value={value} index={data.length}>
          <ToDoFormAddTab handleAddTab={handleAddTab} />
        </TabPanel>
      </Grid>
      {value !== data.length && (
        <Grid item container sm={12} className={classes.addIcon}>
          <Fab
            aria-label="Add"
            className={classes.fab}
            color={!addNewList ? 'primary' : 'secondary'}
            onClick={handleAddListForm}
          >
            {!addNewList ? <AddIcon /> : <Close />}
          </Fab>
        </Grid>
      )}
    </Grid>
  );
};

export default ToDoTabs;
