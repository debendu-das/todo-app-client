import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import ToDoList from './ToDoList/toDoList'
import { Add, Close } from '@material-ui/icons'
import ToDoFormAddTab from './../ToDoForm/toDoFormAddTab'
import { CircularProgress, Fab, Tooltip } from '@material-ui/core'
// import axios from 'axios'

import AddIcon from '@material-ui/icons/Add'
import { getTasks } from '../../../API'
import { saveOnline } from './../../../API/index'
import SnackbarMessage from '../../Layout/SnackbarMessage/snackbarMessage'

function TabPanel(props) {
  const { children, value, index, ...other } = props

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
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

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

  title: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  wordBreak: {
    wordBreak: 'break-word',
  },
}))

const ToDoTabs = () => {
  const classes = useStyles()

  const [data, setData] = useState([])
  let [value, setValue] = useState(0)

  const [editId, setEditId] = useState(null)
  const [addNewList, setAddNewList] = useState(false)

  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({
    isAlert: false,
    type: '',
    message: '',
  })
  const [editTabId, setEditTabId] = useState(null)

  useEffect(() => {
    localStorage.setItem('toDoData', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    getTasks()
      .then((res) => {
        res.data.data.length > 0 && setData(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setAlert({
          isAlert: true,
          type: 'error',
          message: err.message,
        })
      })
    setUser(
      localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).result
        : ''
    )
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert({
      isAlert: false,
      type: '',
      message: '',
    })
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleEditIndex = (index) => {
    setEditId(index)
  }
  const handleCancleIndex = () => {
    setEditId(null)
  }

  const handleComplete = (tabIndex, index) => {
    let newData = [...data]
    newData[tabIndex].list[index].completed =
      !newData[tabIndex].list[index].completed
    setData(newData)
  }

  const handleEditSave = (tabIndex, listIndex, formData) => {
    if (!formData.error) {
      const newData = [...data]
      newData[tabIndex].list[listIndex].title = formData.title
      newData[tabIndex].list[listIndex].details = formData.details
      setData(newData)
      setEditId(null)
    }
  }

  const handleAddTab = (formData) => {
    if (!formData.error) {
      const newData = [...data]
      const newTab = {
        title: formData.title,
        list: [],
      }
      newData.push(newTab)
      setData(newData)
    }
  }

  const handleEditTabIndex = (tabIndex) => {
    setEditTabId(tabIndex)
  }
  const handleCancleEditTabIndex = () => {
    setEditTabId(null)
  }
  const handleEditTabSave = (tabIndex, formData) => {
    if (!formData.error) {
      const newData = [...data]
      newData[tabIndex].title = formData.title
      setData(newData)
      setEditTabId(null)
    }
  }

  const handleDeleteIndex = (tabIndex, listIndex) => {
    const newData = [...data]
    newData[tabIndex].list.splice(listIndex, 1)
    setData(newData)
  }

  const handleDeleteTab = (tabIndex) => {
    const newData = [...data]
    newData.splice(tabIndex, 1)
    setData(newData)
  }

  const handleAddListForm = () => {
    setAddNewList((state) => !state)
  }

  const handleAddListSave = (tabIndex, formData) => {
    if (!formData.error) {
      const newData = [...data]
      const newList = {
        title: formData.title,
        completed: false,
        details: formData.details,
      }
      newData[tabIndex].list.splice(0, 0, newList)
      setData(newData)
      setAddNewList(false)
    }
  }

  const handleClearAllCompleted = (tabIndex) => {
    const newData = [...data]
    const newList = newData[tabIndex].list.filter((listItem) => {
      return !listItem.completed
    })
    newData[tabIndex].list = newList
    setData(newData)
  }

  const handleSaveOnline = () => {
    const savedData = JSON.parse(localStorage.getItem('toDoData'))
    saveOnline(savedData)
      .then((res) => {
        console.log(res)
        setAlert({
          isAlert: true,
          type: 'success',
          message: 'Your Tasks Succesfully Saved Online',
        })
      })
      .catch((err) => {
        console.log(err)
        setAlert({
          isAlert: true,
          type: 'error',
          message: err.message,
        })
      })
  }

  return (
    <>
      <SnackbarMessage
        open={alert.isAlert}
        handleClose={handleClose}
        severity={alert.type}
        message={alert.message}
      />

      <Grid item sm={12} className={classes.title}>
        <Typography className={classes.wordBreak} variant="h4" align="center">
          {user.split(' ')[0]}'s Tasks
        </Typography>
      </Grid>
      <Grid item className={classes.root}>
        {loading ? (
          <CircularProgress
            style={{
              fontSize: 100,
              color: '#651fff',
              marginTop: '10%',
            }}
          />
        ) : (
          <>
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
                {data &&
                  data.map((tab, index) => (
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
                    handleSaveOnline={handleSaveOnline}
                  />
                </TabPanel>
              ))}
              <TabPanel value={value} index={data.length}>
                <ToDoFormAddTab handleAddTab={handleAddTab} />
              </TabPanel>
            </Grid>
          </>
        )}

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
    </>
  )
}

export default ToDoTabs
