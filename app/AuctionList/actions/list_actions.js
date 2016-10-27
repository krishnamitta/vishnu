import axios from 'axios'
import {LOT} from '../../../config/constants'

export const lotCheck =(info)=> {

  return((dispatch)=>{
    axios.get('http://localhost:1234/verifyLotCount',  {
    params: {
      lotsAssigned: info.lotsAssigned,
      yardNumber: info.yardNumber
    }
  })
    .then((response)=> {
      console.log(response.data)
      if(response.status==200){
        console.log(response.data)
        dispatch ({type:LOT.CHECK_SUCCESS, data:response.data})
      }
      else{
        dispatch ({type:LOT.CHECK_FAILURE, data:response})
      }
    }).catch((error)=> {
      console.log('error ...', error)
      dispatch({type:LOT.CHECK_FAILURE, data:error})
    })
  })
}
