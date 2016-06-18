var $ = require("jquery")

export const SAMPLEACTION = 'SAMPLEACTION'
export const SAMPLEASYNCACTION = 'SAMPLEASYNCACTION'

export function sampleAction(){
  return {
    type:SAMPLEACTION
  }
}

export function sampleAsyncActionBegin(){
  return {
    type:SAMPLEASYNCACTION
  }
}

export function sampleAsyncActionSuccess(json){
  return {
    type:SAMPLEASYNCACTION,
    status:'success',
    json:json,
    receivedAt : Date.now()
  }
}

export function sampleAsyncActionFail(json){
  return {
      type:SAMPLEASYNCACTION,
      status:'success',
      code:json.code,
      msg:json.msg,
      receivedAt : Date.now()
  }
}

export function sampleAsyncAction() {
	return function (dispatch) {

    	dispatch(sampleAsyncActionBegin())

    	return $.ajax({
    	  url : 'http://url.com',
    	  dataType : 'jsonp'
    	})
    	.done(json => {
    		if(json.ret == 200){
    			dispatch(sampleAsyncActionSuccess(json))
    		}
    		else{
    			dispatch(sampleAsyncActionFail(json))
    		}
    	})
    	.fail(error => {
    		dispatch(sampleAsyncActionFail({ret : 500, msg : '系统繁忙'}))
    	})
  	}
}
