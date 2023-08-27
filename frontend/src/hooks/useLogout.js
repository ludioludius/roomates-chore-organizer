import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    
    //can either change global state and/or delete token from storage
    const logout = () => {
      console.log('logout hook')
      localStorage.removeItem('user')

      dispatch( {type: 'LOGOUT'} )
    }

  return { logout }
}

