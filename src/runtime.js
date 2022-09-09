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

// IF IT IS THE FIRST TIME THAT THE APPLICATION IS OPENED THE INFORMATION MODAL WILL BE OPENED
if (checkIfFirstTimeOpened()) {
    const informationModal = document.querySelector("#informationModal");
    informationModal.style.display = "block";
    console.log("First time opened");
}

