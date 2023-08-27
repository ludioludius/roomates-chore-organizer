import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    //sets state
    user: null
  }) 

  useEffect(() => {
    console.log(localStorage.getItem('user'))
    const user = localStorage.getItem('user')

    if (user) {
      dispatch( {type: 'LOGIN', payload: user})
    }
  } , [])

  console.log('AuthContect state: ', state)

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}