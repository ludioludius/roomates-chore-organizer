import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';



export default function TaskTable() {

    //include effect and state to pull task data from DB
    const [tasks, setTasks] = useState([])

    const deleteTask = () => {
        console.log('send request to change data then change state')
    }

    const fetchTaskData = () => {
      console.log('effect hook being run state:', tasks)
      axios.get('http://localhost:3001/api/tasks')
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
        <Typography>Recent Orders</Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              {/* <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Sale Amount</TableCell> */}
              <TableCell> ID </TableCell>
              <TableCell> task name </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell> 
                    <Button onClick={() => deleteTask()}>
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