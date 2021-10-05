import React, {useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@material-ui/data-grid';
import { server_calls } from '../../api'; 
import { useGetData } from '../../custom-hooks';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core'; 
import { ChatForm } from '../../components/ChatForm';


const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Player Name', 
      width: 200, 
      editable: true, 
    },
    { 
      field: 'team', 
      headerName: 'Team', 
      width: 260, 
      editable: true, 
    },
    { 
      field: 'league', 
      headerName: 'League', 
      width: 250, 
      editable: true, 
    },
    {
      field: 'position',
      headerName: 'Position',
      type: 'number',
      width: 150,
      editable: true,   
    },
    {
      field: 'rating',
      headerName: 'Rating',
      sortable: true,
      width: 150,
      editable: true,
    },
  ];


  export const ChatTable =  () => {
  
    let { heroData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      server_calls.delete(`${gridData[0]}`)
      getData()
    }
  
  
      return (
          <div style={{ height: 400, width: '100%', color: "white" }}>
            <h2>Your Fantasy Roster</h2>
            <DataGrid rows={heroData} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={(newSelectionModel) => {
              setData(newSelectionModel);
            }}
            selectionModel={gridData}
            {...heroData}/>
            <br />
          <Button onClick={handleOpen} color='primary' variant='contained'>Update Player</Button>
          <br />
          <br />
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete Player</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Player Information</DialogTitle>
            <DialogContent>
              <DialogContentText>Player ID: {gridData[0]}</DialogContentText>
                <ChatForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
          </div>
        );
  }