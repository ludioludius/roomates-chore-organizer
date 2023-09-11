import { useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';



export default function TaskTable(props) {

    //include effect and state to pull task data from DB
    const purchases = props.purchases
    const setPurchases = props.setPurchases

    const roomcode = props.roomcode
    console.log(roomcode)

    

    const deletePurchase = (id) => {
        axios.delete(`http://localhost:3001/api/purchases/${id}`)
        .then(response => {
          setPurchases(purchases.filter((task) => task.id !== id))
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }

    const fetchPurchaseData = () => {
      console.log('effect hook being run state:', purchases)
      axios.get(`http://localhost:3001/api/purchases/${roomcode}`)
      .then((response) => {
        setPurchases(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
    }

    useEffect(() => fetchPurchaseData() , [])



    return (
      <>
        <Typography> Purchases </Typography>
        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell> Item </TableCell>
              <TableCell> Description </TableCell>
              <TableCell> Cost </TableCell>
              <TableCell> Buyer </TableCell>
              <TableCell> Purhcased on </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.item}</TableCell>
                <TableCell>{purchase.description}</TableCell>
                <TableCell>{purchase.cost}</TableCell>
                <TableCell>{purchase.buyer}</TableCell>
                <TableCell>
                            {(new Date(purchase.purchaseDate)).getMonth() + 1}/
                            {(new Date(purchase.purchaseDate)).getFullYear()}
                </TableCell>
                <TableCell> 
                    <Button onClick={() => deletePurchase(purchase.id)}>
                        Delete Purchase
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