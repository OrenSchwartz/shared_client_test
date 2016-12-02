import 'whatwg-fetch'
import { AppConsts } from 'infra'
import { onSubmitEvent, onSubmitEndEvent, popupErrorOpenEvent } from './appActions'
import { Store }  from 'infra'

export default class ServerRequest{
  constructor(userEvents){
    // redux callbacks
    this.userEvents = {
      dispatchSuccessEvent: userEvents.dispatchSuccessEvent || function(rejectObject){},
      dispatchFailureEvent: userEvents.dispatchFailureEvent || function(resolveObject){},
      onSubmitEvent: userEvents.onSubmitEvent || function(){},
      onSubmitEndEvent: userEvents.onSubmitEndEvent || function(succeed){}
    }
  }

  generateStandardErrorResponse(response){
    if (!response)
      return;

    if (!response.errorCode){
    response.errorCode =
                    [AppConsts.HTTP_CODE_GENERAL_SERVER_OK, "ok"].indexOf(response.status) != -1 ||
                    [AppConsts.HTTP_CODE_GENERAL_SERVER_OK, "ok"].indexOf(response.statusText) != -1
                    ? AppConsts.HTTP_CODE_GENERAL_SERVER_OK
                    : AppConsts.HTTP_CODE_GENERAL_SERVER_ERROR
    }

    if (!response.redirectTo){
      response.redirectTo = response.redirectTo   || response.redirect_to ||
                            response.redirectUrl  || response.redirect_url ||
                            response.redirect     || response.url
    }

    if (!response.errorMessage && response.errorCode != AppConsts.HTTP_CODE_GENERAL_SERVER_OK){
      switch (response.errorCode) {
        case AppConsts.HTTP_CODE_GENERAL_SERVER_ERROR:
          response.errorMessage = AppConsts.HTTP_CODE_SERVER_ERROR_MESSAGE;
          break;
        default:
          response.errorMessage = response.message;
      }
    }
  }

  submit(url, content){
    let succeed = false;
    const request = fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      })

    // trigger event start for server polling
    Store.dispatch(onSubmitEvent())
    this.userEvents.onSubmitEvent();

    request
      .then(response => response.json())
      .catch(jsonResponse =>{
        this.generateStandardErrorResponse(jsonResponse);
        return jsonResponse;
      })
      .then(jsonResponse => {
        this.generateStandardErrorResponse(jsonResponse)

        // handle error
        if (jsonResponse.errorCode != AppConsts.HTTP_CODE_GENERAL_SERVER_OK)
        {
          if ([AppConsts.HTTP_CODE_GENERAL_SERVER_ERROR,
               AppConsts.HTTP_CODE_SERVER_NOT_FOUND_ERROR].indexOf(jsonResponse.errorCode) != -1)
          {
            Store.dispatch(popupErrorOpenEvent(jsonResponse))
          }

          this.userEvents.dispatchFailureEvent(jsonResponse);
          return;
        }

        // handle success
        succeed = true;
        if (jsonResponse.redirectTo && jsonResponse.redirectTo.length > 0){
            window.location.href = jsonResponse.redirectTo;
        }
        this.userEvents.dispatchSuccessEvent({request:content, response:jsonResponse});
      })
      .catch(error => {
        console.info("Severe Error:")
        console.info(error)
        Store.dispatch(popupErrorOpenEvent(error))
        this.userEvents.dispatchFailureEvent(error);
      })
      .then(() =>{
        Store.dispatch(onSubmitEndEvent(succeed))
        this.userEvents.onSubmitEndEvent(succeed);
      })
    }
}
