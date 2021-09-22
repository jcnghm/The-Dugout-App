import React, {useState, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'





export const PlayerInfo = () => {
  const columns = [
    {field: 'id', headerName: 'ID'},
    {field: 'title', headerName: 'Title', width: 300},
    {field: 'body', headerName: 'Body', width: 600}
  ]

  const [tableData, setTableData] = useState([])

//  useEffect(() => {
//    fetch("")
//     .then((data) => data.json())
//     .then((data) => setTableData(data))
//  })

  return (
    <div style={{height: 700, width: '50%', color: 'white'}}>
      <DataGrid 
        rows={tableData}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  )
}

