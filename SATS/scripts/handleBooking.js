
const handleBooking = (event) => {
    const button = event.target;
    const classBox = button.parentElement;
    const bookedCountElement = classBox.querySelector(".booked-count");
    const waitingListCountElement = classBox.querySelector(".waiting-list-count");
    const capacity = parseInt(bookedCountElement.nextSibling.textContent.split(" / ")[1]);
    let bookedCount = parseInt(bookedCountElement.textContent);
    let waitingListCount = parseInt(waitingListCountElement.textContent);
    const isBooked = button.getAttribute("data-status") === "Booked";
    const isWaitingList = button.getAttribute("data-status") === "WaitingList";
    

    if (isBooked) {
        
        button.textContent = "Book";
        button.setAttribute("data-status", "NotBooked");
        bookedCount -= 1;
    } else if (isWaitingList) {
        
        button.textContent = "Book";
        button.setAttribute("data-status", "NotBooked");
        waitingListCount -= 1;
    } else {

       if (bookedCount < capacity) {
        button.textContent = "Avbestill";
        button.setAttribute("data-status", "Booked");
        bookedCount += 1;
    } else {
        button.textContent = "Avbestill";
        button.setAttribute("data-status", "WaitingList")
        waitingListCount += 1;
        alert("Gruppetimen er full, du er satt på ventelisten")
    }
}

    bookedCountElement.textContent = bookedCount;
    waitingListCountElement.textContent = waitingListCount;

};

