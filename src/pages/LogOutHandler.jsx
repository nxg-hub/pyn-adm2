import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { logOutAndPurge } from '../redux/LogOutSlice'

const LogOutHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logOutAndPurge()).then(() => {
            navigate('/')
        });
    }, [dispatch, navigate])
  return (
null)
}

export default LogOutHandler