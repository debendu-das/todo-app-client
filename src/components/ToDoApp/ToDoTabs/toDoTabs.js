import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Typography, Tab, Tabs, CircularProgress, Fab, Tooltip } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import ToDoList from './ToDoList/toDoList'
import ToDoFormAddTab from './../ToDoForm/toDoFormAddTab'
import AddIcon from '@material-ui/icons/Add'
import { getTasks, saveOnline } from './../../../API/index'
import SnackbarMessage from '../../Layout/SnackbarMessage/snackbarMessage'

// Tab Panel
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

// ToDoTabs Function 
const ToDoTabs = () => {
  const classes = useStyles()

  // states
  const [data, setData] = useState([]) // User Data 

  /*  DEMO USER DATA
  {
    "_id": "sameIdRandom",
    "userId": "userIdUnique",
    "data": [{
      "_id": "uniqueId",
      "title": "General",
      "list": [
        {
            "_id": "uniqueId",
            "title": "Task 1",
            "completed": false,
            "details": "Not completed"
        },
        {
            "_id": "uniqueId",
            "title": "Task 2",
            "completed": true,
            "details": "Completed"
        }
      ]
    }]
  }
  */
  const [user, setUser] = useState('')                 // Current User

  let [value, setValue] = useState(0)                 // Tab Panel Value/Index
  const [addNewList, setAddNewList] = useState(false) // New list item add form opener

  const [editId, setEditId] = useState(null)          // List Item edit id
  const [editTabId, setEditTabId] = useState(null)    // Edit Tab Index id

  const [alert, setAlert] = useState({                // For Alert
    isAlert: false,
    type: '',
    message: '',
  })
  const [loading, setLoading] = useState(true)        // Loading Animation

  // Save User Data in Local Storage
  useEffect(() => {
    localStorage.setItem('toDoData', JSON.stringify(data))
  }, [data])

  useEffect(() => {

    // Fecting User Tasks Data
    getTasks()
      .then((res) => {
        res.data.data.length > 0 && setData(res.data.data)
        // console.log(res.data)
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

  // Snackbar Message Close Method
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

  // Tab Changing Method
  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  // Editing List Index Changer
  const handleEditIndex = (index) => {
    setEditId(index)
  }

  // Cancel Editing List Item
  const handleCancelIndex = () => {
    setEditId(null)
  }

  // Complete Task Marker
  const handleComplete = (tabIndex, index) => {
    let newData = [...data]
    newData[tabIndex].list[index].completed =
      !newData[tabIndex].list[index].completed
    setData(newData)
  }

  // Edited List Item Save
  const handleEditSave = (tabIndex, listIndex, formData) => {
    if (!formData.error) {
      const newData = [...data]
      newData[tabIndex].list[listIndex].title = formData.title
      newData[tabIndex].list[listIndex].details = formData.details
      setData(newData)
      setEditId(null)
    }
  }

  // Add New Tab Method
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

  // Edited List Item Save
  const handleEditTabIndex = (tabIndex) => {
    setEditTabId(tabIndex)
  }

  // Edited List Item Save
  const handleCancelEditTabIndex = () => {
    setEditTabId(null)
  }

  // Edited List Item Save
  const handleEditTabSave = (tabIndex, formData) => {
    if (!formData.error) {
      const newData = [...data]
      newData[tabIndex].title = formData.title
      setData(newData)
      setEditTabId(null)
    }
  }

  // Delete List Item
  const handleDeleteIndex = (tabIndex, listIndex) => {
    const newData = [...data]
    newData[tabIndex].list.splice(listIndex, 1)
    setData(newData)
  }

  // Delete Tab
  const handleDeleteTab = (tabIndex) => {
    const newData = [...data]
    newData.splice(tabIndex, 1)
    setData(newData)
  }

  // Add List Item Form Toggler
  const handleAddListForm = () => {
    setAddNewList((state) => !state)
  }

  // Save Edited List Item
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

  // Delete all completed task
  const handleClearAllCompleted = (tabIndex) => {
    const newData = [...data]
    const newList = newData[tabIndex].list.filter((listItem) => {
      return !listItem.completed
    })
    newData[tabIndex].list = newList
    setData(newData)
  }

  // Save Data in Database
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
      {/* Snackbar Message */}
      <SnackbarMessage
        open={alert.isAlert}
        handleClose={handleClose}
        severity={alert.type}
        message={alert.message}
      />


      <Grid item sm={12} className={classes.title}>
        <Typography className={classes.wordBreak} variant="h4" align="center">
          {user?.split(' ')[0]}'s Tasks
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
            {/* Tabs */}
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

                {/* Add New Tab Button */}
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

              {/* Tab Panels contains list of data separeted by each tabs */}

              {/* DEMO USER DATA
                  {
                    "_id": "sameIdRandom",
                    "userId": "userIdUnique",
                    "data": [{
                      "_id": "uniqueId",
                      "title": "General",
                      "list": [
                        {
                            "_id": "uniqueId",
                            "title": "Task 1",
                            "completed": false,
                            "details": "Not completed"
                        },
                        {
                            "_id": "uniqueId",
                            "title": "Task 2",
                            "completed": true,
                            "details": "Completed"
                        }
                      ]
                    }]
                  } 
            */}


              {data.map((tab, index) => (
                <TabPanel value={value} index={index} key={index}>

                  <ToDoList
                    // <--------- Tab Details -------------------------------------------------------------->
                    list={tab.list}      // Tab List
                    tabTitle={tab.title} // Tab Title (General / Shopping)
                    tabIndex={index}     // Index of Tab (For General tabIndex == 0)

                    // <--------- Tab Editing Methods Details ---------------------------------------------->

                    editTabId={editTabId}                                 // Editing Tab Index
                    handleEditTabIndex={handleEditTabIndex}               // Editing Tab Index changer
                    handleCancelEditTabIndex={handleCancelEditTabIndex}   // Cancel Tab Edit
                    handleEditTabSave={handleEditTabSave}                 // Edited Tab Save
                    handleDeleteTab={handleDeleteTab}                     // Delete Tab

                    // <--------- List Item Methods ----------------------------------------------------->
                    handleComplete={handleComplete}         // Complete Task Marker

                    addNewList={addNewList}                 // Add List Item Form Toggler
                    handleAddListSave={handleAddListSave}   // Save Edited List Item

                    handleDeleteIndex={handleDeleteIndex}   // Delete List Item

                    editId={editId}                         // Edit List Item Index
                    handleEditIndex={handleEditIndex}       // Edit List Item Index Changer
                    handleCancelIndex={handleCancelIndex}   // Cancel Editing List Item
                    handleEditSave={handleEditSave}         // Edited List Item Save

                    // <--------- Other Methods ---------------------------------------------------------->
                    handleClearAllCompleted={handleClearAllCompleted}     // Delete all completed task
                    handleSaveOnline={handleSaveOnline}                   // Save Data in Database
                  />

                </TabPanel>
              ))}
              <TabPanel value={value} index={data.length}>
                <ToDoFormAddTab handleAddTab={handleAddTab} />
              </TabPanel>
            </Grid>
          </>
        )}

        {/* Add Button */}
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
