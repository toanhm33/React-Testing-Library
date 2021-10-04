import React from 'react'
import axios from 'axios'

const TestAxios = ({ url }) => {
  const [data, setData] = React.useState()

  const fetchData = async () => {
    const response = await axios.get(url)
    setData(response.data.greeting)    
 }     
 
 return (
  <>
    <div>
      <h1>Test Axios</h1>
      <button onClick={fetchData} data-testid="fetch-data">Load Data</button>
      { 
      data ?
      <div data-testid="show-data">{data}</div>:
      <h1 data-testid="loading">Loading...</h1>
      }
    </div>
  </>
     )

}

export default TestAxios