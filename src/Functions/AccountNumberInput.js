function FindAccountNumberClear(){
    var $session = $jsapi.context().session;
    $session.Account = {};
    $session.Account.Number = 0;
    $session.Account._number = 0;
    
}
function FindAccountNumberStart(){
    var $session = $jsapi.context().session;
    $session.Account = {};
    $session.Account.Number = 0;
    $session.Account._number = 0;
    $session.oldState = $jsapi.context().session._lastState;
    $session.Account.RetryAccount = 0; // количество раз, сколько спрашивали номер ЛС
    $session.Account.Succeed = false;
    $session.Account.Result = "";
}
function FindAccountNumberSetResult(result_comment)
{
    var $session = $jsapi.context().session;
    $session.Account.Result = result_comment;
    $session.Account._number = 0;
    $session.Account.Number = -1;
    $session.Account.Succeed = false;
}
function FindAccountNumberSetSuccees(result_comment)
{
    var $session = $jsapi.context().session;
    $session.Account.Result = result_comment;
    $session.Account.Number = $session.Account._number;
    $session.Account._number = 0;
    $session.Account.Succeed = true;

}

function TrySetNumber(acc_num)
{
    var $session = $jsapi.context().session;
    var $injector = $jsapi.context().injector;
    $session.Account._number = acc_num;
    // ищем адрес
    $session.Account.Address = "";
    
/*
        var url = $injector.MacrosUrl + "sheetURL=" + $injector.AccountTableURL + "&sheetName="+$injector.AccountSheetName
        url = url + "&filterHead=account_number&filterValue="+acc_num;
        
        var response = $http.query(url, {method: "GET"});
        if (response.isOk) {
            if(response.data.count)
                $session.Account.Address = response.data.data[0].address_full_name
            else
                $session.Account.Address = "";
        }
    
  */  
    //return  !($session.Account.Address === "");
    return $session.Account._number > 0;
    
}
function FindAccountAddress(){
    var $injector = $jsapi.context().injector;
    var $session = $jsapi.context().session;
    var addr = $env.get("InaraSeviceAddress", "Адрес сервиса не найден");
    
    // log("addr value = "+ addr);
    // var url = $injector.InaraServiceUrl + $session.Account._number + '/address';
    var url = addr + $session.Account._number + '/address';
    var token = $secrets.get("InaraSeviceToken", "Токен не найден")

    
    return $http.query(url, {method: "GET",
        timeout: 20000        // таймаут выполнения запроса в мс
        ,headers: {"Content-Type": "application/json", "Authorization": "Basic " + token//dXNlcl9zZXJ2aWNlOk5TV0tvZ0RZX1BIcVZvNWM="
            
        }
    });
    
// функция для поиска адреса - асинхронный вариант (пробуем)
        // var url = $injector.MacrosUrl + "sheetURL=" + $injector.AccountTableURL + "&sheetName="+$injector.AccountSheetName
        // url = url + "&filterHead=account_number&filterValue="+$session.Account._number;
        // return $http.query(url, {method: "GET",
        //     timeout: 20000        // таймаут выполнения запроса в мс
        // });
// ищем номер ЛС - пока интеграция с гугл - таблицей
// URL таблицы https://docs.google.com/spreadsheets/d/1_tdWUTlZZtPJTX64JVqg-kmbIaBOdpCdbOpghyZI22g/edit?usp=sharing
// название листа - ЛС
// https://script.google.com/macros/s/AKfycbywN2f6PJs_2OhVSgDaN1oUEK9N-OmBuancUMJA-wuIfPXovZ0PJnY9iAsZ12sYd_LP/exec?sheetURL={url}&sheetName={sheet}&filterHead=account_number&filterValue={accountNumber}

}
function GetTempAccountNumber(){
    var $session = $jsapi.context().session;
    return $session.Account._number;
}
// Как говорить номер ЛС (разбиение по разрядам)
function AccountTalkNumber(acc_num){
    return acc_num.toString().replace(/\B(?=(\d{2})+(?!\d))/g, "- ")    
}

