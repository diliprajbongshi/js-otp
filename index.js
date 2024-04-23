let genNum;
let slice;
let intervalId;
let stop;

let expireDate = document.getElementById("expireDate");
function expiresOTP(){
      let totalTime = 15000;
      let intervalTime = 1000;
      slice = totalTime / intervalTime;
      intervalId =  setInterval(() => {
        expireDate.innerText = `Your otp will be expires in ${slice} seconds`;
        slice = slice - 1;
      }, intervalTime);
      stop =  setTimeout(() => {
        clearInterval(intervalId);
        genOTP();
      }, totalTime);
}

function tackleOTP(){
    const otpBoxList = document.getElementById("otpBoxList");
    otpBoxList.addEventListener("input",function(e){
          let target = e.target;
          let value = target.value;
          if(isNaN(value)){
             target.value = "";
             return
          }
          let nextElement = target.nextElementSibling;
          if(nextElement){
             nextElement.focus();
          }
          valideOTP();
    })
}


function genOTP(){
    const generatedOtpId = document.getElementById("generatedOtpId");
     genNum = Math.floor(1000 + Math.random() * 9000);
    generatedOtpId.innerText = `Your otp is : ${genNum}`;
    const otpBoxList = document.getElementById("otpBoxList");
    let child = otpBoxList.children;
    [...child].forEach((elem)=>{
        elem.value = "";
    })
    expiresOTP();
    console.log(genNum);

}

function valideOTP(){
     let typeNumber = "";
     const otpBoxList = document.getElementById("otpBoxList");
    
     let child = otpBoxList.children;
     [...child].forEach((elem)=>{
        typeNumber = typeNumber + elem.value ;
     });

    let result = genNum === parseInt(typeNumber,10);
    const resultId = document.getElementById("resultId");
    if(result){
        resultId.innerText = `Your otp has been validated`;
        resultId.classList.remove("fail");
        resultId.classList.add("success");
        clearInterval(intervalId);
        clearInterval(stop);
        expireDate.innerText = "";
        slice = "";
    }else{
        resultId.innerText = `Your otp is inavalid`;
        resultId.classList.remove("success");
        resultId.classList.add("fail");
    }
     console.log(typeNumber);
}











function init(){
    console.log("initialization");
    tackleOTP();
    genOTP();
}
init();