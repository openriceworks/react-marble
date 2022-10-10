import { useState } from 'react'
import './App.css'
import {Data, validateData} from 'common';
import { useMutation, useQuery } from '@tanstack/react-query';

function App() {

  const [data, setData] = useState<Data>({label: "", value:""})

  const apiUrl = "http://localhost:1337/data"

  const dataQuery = useQuery(['data'], async() => {
    const res = await fetch(apiUrl).catch((e) => {
      console.error(e)
    })
    if(res) {
      return await res.json() as Data
    }
    return null
  }, {
    onSuccess: (resData) => {
      if(resData) {
        setData(state =>  ({...resData}))
      }
    }
  })

  const dataMutation = useMutation(async () => {
    const res = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data)
    })},
    {
      onSuccess: () => {
        alert("data post success")
        dataQuery.refetch()
      },
      onError(error, variables, context) {
        alert("data post failed")
      },
    }
  )

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
      {
        dataMutation.isLoading
          ? (
            <div>posting ... </div>
          )
          : (
            <button
            className='submit-button'
            onClick={() => dataMutation.mutate()}
            >register
          </button>
          )
      }

    </div>
  )
}

export default App
