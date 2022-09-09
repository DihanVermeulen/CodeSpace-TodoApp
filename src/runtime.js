// CHECKS IF IT IS THE FIRST TIME THAT THE APPLICATION IS OPENED
let checkIfFirstTimeOpened = () => {
    check = localStorage.getItem("isFirstTimeOpened");
    if (check) {
        localStorage.setItem("isFirstTimeOpened", false);
        // console.log("Not the first time opened")
        return false;
    }
    else {
        localStorage.setItem("isFirstTimeOpened", true);
        // console.log("First time opened")
        return true;
    }
}

let firstTimeOpened = Boolean;

if (checkIfFirstTimeOpened()) {
    console.log("First time opened")
    firstTimeOpened = true;
}
else {
    console.log("Not first time opened")
    firstTimeOpened = false;
};


