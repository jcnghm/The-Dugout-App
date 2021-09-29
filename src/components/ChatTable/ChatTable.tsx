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
      field: 'id', 
      headerName: 'ID', 
      width: 110 
    },
    { 
      field: 'name', 
      headerName: 'Player Name', 
      width: 300, 
      editable: true, 
    },
    { 
      field: 'team', 
      headerName: 'Team', 
      width: 300, 
      editable: true, 
    },
    { 
      field: 'league', 
      headerName: 'League', 
      width: 300, 
      editable: true, 
    },
    {
      field: 'position',
      headerName: 'Position',
      type: 'number',
      width: 200,
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
          <div style={{ height: 400, width: '100%' }}>
            <h2>Your Fantasy Roster</h2>
            <DataGrid rows={heroData} columns={columns} pageSize={10} checkboxSelection onSelectionModelChange={(newSelectionModel) => {
              setData(newSelectionModel);
            }}
            selectionModel={gridData}
            {...heroData}/>
            <br />
          <Button onClick={handleOpen} color='primary' variant='contained'>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Player Information</DialogTitle>
            <DialogContent>
              <DialogContentText>Player: {gridData[0]}</DialogContentText>
                <ChatForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
          </div>
        );
  }