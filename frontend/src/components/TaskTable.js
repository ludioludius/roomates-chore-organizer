import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, TextField, Typography, Box } from '@mui/material';



export default function TaskTable(props) {

    //include effect and state to pull task data from DB
    const tasks = props.tasks
    const setTasks = props.setTasks

    const roomName = props.roomName
    console.log(roomName)

    const deleteTask = (id, roomName) => {
        console.log('send request to change data then change state')
        axios.delete(`http://localhost:3001/api/tasks/${id}/${roomName}`)
        .then(response => {
          setTasks(tasks.filter((task) => task.id !== id))
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }

    const fetchTaskData = () => {
      console.log('effect hook being run state:', tasks)
      axios.get(`http://localhost:3001/api/tasks/${roomName}`)
      .then((response) => {
        setTasks(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
    }

    useEffect(() => fetchTaskData() , [])



    return (
      <>
        <Typography> Tasks </Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell> task name </TableCell>
              <TableCell> frequency</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>once every {task.frequency} days</TableCell>
                <TableCell> 
                    <Button onClick={() => deleteTask(task.id, roomName)}>
                        Delete task
                    </Button>
                </TableCell>
                {/* <TableCell align="right">{`$${task.amount}`}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
           

        </Table>
      </>
    );
  }