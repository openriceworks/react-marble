import { useState } from 'react'
import './App.css'
import {Data, validateData} from 'common';

function App() {
  const [data, setData] = useState<Data>({label: "name", value:"react-marble"})

  return (
    <div className="App">
      <div>
        <span>label: </span>
        <input
          defaultValue={data.label}
          onChange={
              (e) => setData(state => ({label: e.target.value, value: state.value}))
            }
          />
      </div>
      <div>
        <span>value: </span>
        <input
          defaultValue={data.value}
          onChange={
              (e) => setData(state => ({label: state.label, value: e.target.value}))
            }
          />
      </div>
      <div className='error-message'>
        {validateData(data)}
      </div>
      <button className='submit-button'>register</button>
    </div>
  )
}

export default App
