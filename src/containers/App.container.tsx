import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import TaskManagerApi from '../api/TaskManagerApi';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      width: '50%',
      margin: 'auto',
      marginTop: 34
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

const App = () => {
  const [tasks, setTasks] = useState();
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();
  const [secondary, setSecondary] = React.useState(false);
  const [dense, setDense] = React.useState(false);

  const fetchData = async () => {
    const fetchTasks = await TaskManagerApi.getAllTasks();
    setTasks(fetchTasks);
  };

  const deleteTask = async (id: string) => {
    const deleteResponse = await TaskManagerApi.removeTask(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = e => {
    e.preventDefault();
    const type = e.target.id;
    const value = e.target.value;
    if (type === 'title') {
      setTitle(value);
    } else if (type === 'author') {
      setAuthor(value);
    } else if (type === 'description') {
      setDescription(value);
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log({ title, author, description });
              TaskManagerApi.addTask({ title, author, description });
              fetchData();
            }}
          >
            <TextField
              onChange={onChange}
              label="Title"
              id="title"
              className={classes.textField}
              helperText="The title of task"
            />
            <TextField
              onChange={onChange}
              label="Author"
              id="author"
              className={classes.textField}
              helperText="The author of task"
            />
            <TextField
              onChange={onChange}
              id="description"
              label="Description"
              style={{ margin: 8 }}
              helperText="A description of tasks"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Add task
            </Button>
          </form>
        </div>
      </Paper>
      <Paper className={classes.root}>
        <List dense={dense}>
          {tasks &&
            tasks.map((item: any) => {
              return (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.title}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        deleteTask(item.id);
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </Paper>
    </>
  );
};

export default App;
