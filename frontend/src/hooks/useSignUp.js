import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const signup = async (uid, isSuccessful, errorMessage) => {

    // if previous error in user creation
    if (!isSuccessful) {
      setIsLoading(false)
      setError(errorMessage)
    }
    // } else {
    //
    //   setIsLoading(true)
    //   setError(null)
    //
    //   axios.post('http://localhost:3001/api/users/signup', {
    //     name: name,
    //     username: username,
    //     password: password,
    //     roomcode: roomcode
    //   })
    //       .then((response) => {
    //         const json = JSON.stringify(response.data)
    //         console.log('response from hoook', response.data)
    //         // store response data in the browser (includes token)
    //         localStorage.setItem('user', json)
    //
    //         //update AuthContext
    //         dispatch({type: 'LOGIN', payload: json})
    //         setIsLoading(false)
    //
    //       })
    //       .catch((e) => {
    //         console.log(e)
    //         setIsLoading(false)
    //         setError(e.response.data.error)
    //       })
    // }
  }

      return { signup, isLoading, error}
  }
