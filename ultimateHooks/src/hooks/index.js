import { useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    const getAll = async () => {    
        const request = axios.get(baseUrl)
        const response = await request
      setResources(response.data)
      
    }
  
    const create = async (resource) => {
      console.log('resouce: ', resource)
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat(response.data))
  
    }
  
    const service = {
      create, getAll
    }
  
    return [
      resources, service
    ]
  }

  export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }