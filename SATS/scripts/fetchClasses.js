const classContainer = document.querySelector("#class-container");

const getClasses = async () => {
    try {
    const response = await fetch('/data/response.json');
    const data = await response.json();

    let htmlTxt = "";

    data.results.forEach(classItem => {
            // Konverterer dato og tid til norsk lesbar format
            const date = new Date(classItem.zonedStartTime.dateTime);
            const timeString = date.toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
            const dateString = date.toLocaleDateString('no-NO', {weekday: 'short', day: 'numeric', month: 'short'});


        htmlTxt += `
        <div class="class-box col-xs-12 col-sm-6 col-md-4">
                <h3 class="class-card__title">${classItem.name}</h3>
                <img class="img" src="images/${classItem.image}" alt="${classItem.name}">
                <p><strong>Instruktør:</strong> ${classItem.instructor}</p>
                <p><strong>Senter:</strong>${classItem.clubName}</p>
                <p><strong>Varighet:</strong>${classItem.durationInMinutes} minutter</p>
                <p><strong>Antall plasser:</strong>
                    <span class="booked-count">${classItem.bookingInfo.bookedCount}</span> / ${classItem.bookingInfo.capacity}
                </p>
                <p><strong>Tidspunkt:</strong> ${dateString} kl. ${timeString}</p>
                    <button class="book-btn"
                        data-id="${classItem.id}"
                        data-status="${classItem.bookingInfo.memberBookingInfo.bookingState}">
                        ${classItem.bookingInfo.memberBookingInfo.bookingState === "Booked" ? "Avbestill" : "Book"}
                    </button>
            <p><strong>Venteliste:</strong><span class="waiting-list-count">${classItem.bookingInfo.waitingListCount}</span></p>
        </div>
        `;
       
    });



    classContainer.innerHTML = htmlTxt;

    document.querySelectorAll(".book-btn").forEach(button => {
        button.addEventListener("click", handleBooking);
    });
} catch (error) {
    console.error("Error fetching data", error);
}

};

    getClasses(); 

 

