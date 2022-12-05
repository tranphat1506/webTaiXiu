var taiBet = 0;
var xiuBet = 0;
var chooseTai = false;
var chooseXiu = false;
var money = 0;
var userMoney = 0;
var isSubmit = false;
var tax = 0.5;
var historyRoll = [];
let plusMoneyCount = 0;

function plusMoney(){
    let currentMoney = Number(localStorage.getItem('money'))
    plusMoneyCount++;
    localStorage.setItem("money", currentMoney+500000)
    setMoneyFromLCS()
    document.querySelector('.plus-money').textContent = `Thêm tiền - ${plusMoneyCount}`
    document.querySelector(".info--money-display").textContent = `${configMoney(userMoney)}đ`
}
const localStore = ()=>{
    let storeName = localStorage.getItem('username');
    let storeMoney = localStorage.getItem('money');[];
    let storeHistory = localStorage.getItem('history')
    if (storeName && storeMoney!=null){
        document.querySelector(".info--name").textContent = `Tên : ${storeName}`;
        userMoney = Number(storeMoney);
    }else{
        let name = prompt("Tên: ","Simple Long Long Username")
        localStorage.setItem('username',name)
        localStorage.setItem('money','500000')
        window.location.reload()
    }
        
    historyRoll = storeHistory ? storeHistory.split(',') : [];
}

function moneyLocalStore(money){
    return localStorage.setItem('money',money)
}
function setMoneyFromLCS(){
    userMoney = localStorage.getItem('money');
    return -1;
}
function randomXX(seed){
    let randomInt, max = 6, min = 1;
    randomInt = Math.floor(((Math.random()*seed*10)%max + min))
    return randomInt;
}
function randomMoneyAdd(){
    let randomMoney, max = 99999999, min= 10000;
    randomMoney = Math.floor((Math.random()*1000000000000 %max +min))
    return randomMoney;
}
function configMoney(money){
    let moneyString = String(Math.floor(money));
    let returnValue = "";
    let end = moneyString.length;
    let start = end - 3;
    while (end > 3) {
        returnValue = `.${moneyString.slice(start,end)}${returnValue}`;
        end -=3;
        start -=3;
    }
    return `${moneyString.slice(0,end)}${returnValue}`;
}
function loadHistory(){
    let tai = `<div class="history history--tai"></div>`
    let xiu = `<div class="history history--xiu"></div>`
    historyRoll.forEach(function (h) {
        if (h==1){
            document.querySelector(".history-container").innerHTML += tai;
            return -1;
        }else if (h==0){
            document.querySelector(".history-container").innerHTML += xiu;
        }
    })
}
function addToHistory(xx1,xx2,xx3){
    let tai = `<div class="history history--tai"></div>`
    let xiu = `<div class="history history--xiu"></div>`
    let add = xx1+xx2+xx3 > 11 ? 1 : 0;
    document.querySelector('.history-container').childElementCount == 24 ? document.querySelector('.history-container').removeChild(document.querySelector(".history:first-child")) : -1;
    if (add){
        historyRoll.length < 24 ? historyRoll.push(1)
         : (historyRoll.slice(1,historyRoll.length+1)).push(1)
        localStorage.setItem('history',historyRoll)
        document.querySelector(".history-container").innerHTML += tai;
        return -1;
    }
    historyRoll.length < 24 ? historyRoll.push(0)
     : (historyRoll.slice(1,historyRoll.length+1)).push(0)
    localStorage.setItem('history',historyRoll)
    document.querySelector(".history-container").innerHTML += xiu;
    return -1;


}
function BettingEvent(xx1,xx2,xx3){
    const result = xx1+xx2+xx3;
    if (isSubmit){
        if (chooseTai && result>11){
            userMoney+=money*(2-(tax/100))
        } else if (chooseXiu && !(result>11)){
            userMoney+=money*(2-(tax/100));
        }
    }
    money = 0;
    isSubmit = false;
    chooseTai = false;
    chooseXiu = false;
    return -1;
}
function displayXX(xx1,xx2,xx3){
    let name = "";
    if (xx1+xx2+xx3>11) {
        taiBet *=2;
        xiuBet =0;
        name = "Tài"
    } else{
        xiuBet *= 2;
        taiBet =0;
        name = "Xỉu"
    }
    document.querySelector(".result-display").textContent = `${xx1}-${xx2}-${xx3} ${name}`
}
function XXEvent(seed){
    const xx1 = randomXX(1);
    const xx2 = randomXX(xx1);
    const xx3 = randomXX(xx2);
    return {xx1,xx2,xx3};
}
function btnBet(){
    const btns = document.querySelectorAll(".box-bet");
    btns.forEach((btn)=>{
        btn.addEventListener("click", async (e)=>{
            e.preventDefault()
            if (!isSubmit){
                const plusMoney = btn.value;
                if (chooseTai){
                    money+=Number(((userMoney-money)>=plusMoney)? plusMoney : (userMoney-money));
                    document.querySelector(".tai__display .my-bet").textContent = `${configMoney(money)}đ`;
                }else if (chooseXiu){
                    money+=Number(((userMoney-money)>=plusMoney)? plusMoney : (userMoney-money));
                    document.querySelector(".xiu__display .my-bet").textContent = `${configMoney(money)}đ`;
                }else{
                    console.log("Khong du tien");
                    return 1;
                }
            }
        })
    })
}
const btnSubmit = {
    all : function (e){
        e.preventDefault()
        if (!isSubmit){
            money=Number(userMoney);
            if (chooseTai){
                document.querySelector(".tai__display .my-bet").textContent = `${configMoney(money)}đ`;
                return 1;
            }
            document.querySelector(".xiu__display .my-bet").textContent = `${configMoney(money)}đ`;
            return -1;
        }
    },
    cancel : function (e){
        e.preventDefault()
        if (!isSubmit){
            money=0;
            if (chooseTai){
                chooseTai = false;
                document.querySelector(".tai__display .bet-btn").style.visibility = "visible"
                document.querySelector(".tai__display .my-bet").style = ""
                return 1;
            }
            chooseXiu = false;
            document.querySelector(".xiu__display .bet-btn").style.visibility = "visible"
            document.querySelector(".xiu__display .my-bet").style = ""
            return -1;
        }
        console.log("Cuoc roi !");
    },
    submit : function (e){
        e.preventDefault()
        if (!isSubmit){
            isSubmit = true;
            if (chooseTai && money){
                userMoney-=money;
                taiBet += money;
                document.querySelector(".xiu__display .bet-btn").style.visibility = "hidden"
            }else if (chooseXiu && money){
                userMoney-=money;
                xiuBet += money;
                document.querySelector(".tai__display .bet-btn").style.visibility = "hidden"
            }
            return -1;
        }
        
    }
}
function btnSubmitFunc(){
    document.querySelector(".submit-bet .all").addEventListener("click", btnSubmit.all)
    document.querySelector(".submit-bet .cancel").addEventListener("click", btnSubmit.cancel)
    document.querySelector(".submit-bet .submit").addEventListener("click", btnSubmit.submit)
}
function btnTai(){
    money=0;
    document.querySelector(".tai__display .my-bet").textContent = `${configMoney(money)}đ`;
    if (chooseXiu){
        chooseXiu = false;
        document.querySelector(".xiu__display .bet-btn").style.visibility = "visible"
        document.querySelector(".xiu__display .my-bet").style = ""
    }
    chooseTai = true;
    document.querySelector(".tai__display .my-bet").style.visibility = "visible"
    document.querySelector(".tai__display .bet-btn").style.visibility = "hidden"
}
function btnXiu(){
    money=0;
    document.querySelector(".xiu__display .my-bet").textContent = `${configMoney(money)}đ`;
    if (chooseTai){
        chooseTai = false;
        document.querySelector(".tai__display .bet-btn").style.visibility = "visible"
        document.querySelector(".tai__display .my-bet").style = ""

    }
    chooseXiu = true;
    document.querySelector(".xiu__display .my-bet").style.visibility = "visible"
    document.querySelector(".xiu__display .bet-btn").style.visibility = "hidden"
}

let startCounter = (timer)=>{
    let betTimeOver = true;
    let waitResultTimeOver = false;
    let betTime = timer - 10;
    let waitResultTime = 5;
    timer = betTime;
    let x = setInterval(async function (){
        if (betTimeOver && !timer){ 
            const {xx1,xx2,xx3} = await XXEvent(1);
            displayXX(xx1,xx2,xx3);
            BettingEvent(xx1,xx2,xx3);
            addToHistory(xx1,xx2,xx3);
            moneyLocalStore(userMoney)
            timer = waitResultTime;
            betTimeOver = false;
            waitResultTimeOver = true;
            document.querySelector(".xiu__display .bet-btn").style.visibility = "visible"
            document.querySelector(".xiu__display .my-bet").style = ""
            document.querySelector(".tai__display .bet-btn").style.visibility = "visible"
            document.querySelector(".tai__display .my-bet").style = ""
        }else if (waitResultTimeOver && !timer){
            xiuBet =0;
            taiBet =0;
            timer = betTime;
            waitResultTimeOver = false;
            betTimeOver = true;
        }
        if (!waitResultTimeOver){
            xiuBet += randomMoneyAdd()
            taiBet += randomMoneyAdd()
            document.querySelector(".result-display").textContent = timer;
            document.querySelector(".bet__display .time").textContent = `Đặt cược`;
        }
        else{
            document.querySelector(".bet__display .time").textContent = `Chờ ${timer}s`;
        }
        document.querySelector(".tai-bet").textContent = `${configMoney(taiBet)}đ`;
        document.querySelector(".xiu-bet").textContent = `${configMoney(xiuBet)}đ`;
        document.querySelector(".info--money-display").textContent = `${configMoney(userMoney)}đ`
        timer--;
    }, 1000);
}
function exitBtn(){
    let userNav = document.querySelector("#user")
    const classHidden = "user--hidden"
    const classDisplay = "user--display"
    const isHidden = userNav.classList.contains(classHidden);
    isHidden ? userNav.classList.replace(classHidden, classDisplay) : 
        userNav.classList.replace(classDisplay, classHidden)
}
document.querySelector("#user").addEventListener('click', function (e){
    e.preventDefault()
    let btnExit = document.querySelector('.exit-btn')
    let userNav = document.querySelector("#user")
    const classHidden = "user--hidden"
    const classDisplay = "user--display"
    const isHidden = userNav.classList.contains(classHidden);
    if (!(e.target==btnExit)){
        isHidden ? userNav.classList.replace(classHidden, classDisplay) : 
            false;
    }
})

localStore()
loadHistory()
startCounter(30)
btnBet()
btnSubmitFunc()