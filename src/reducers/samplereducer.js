import * as types from '../actions/sampleaction'

const initialState = {isSyncing:false};

export default function code(state = initialState, action) {
  switch (action.type) {
      case types.SAMPLEASYNCACTION:
        if(!action.status){
          return Object.assign({}, state, {
            isSyncing:true,
          })
        }
        else if(action.status === 'success'){
          return Object.assign({}, state, {
            isSyncing:false,
            json:action.json
          })
        }
        else if(action.status === 'fail'){
          //登录失败
          return Object.assign({}, state, {
            isSyncing:false,
            json:null,
            code:action.ret,
            msg:action.msg
          })
        }
      default:
        return state
  }

}
