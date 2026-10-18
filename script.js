
// Get the bank holiday information from the GOV.UK API
fetch("https://www.gov.uk/bank-holidays.json")

    // Wait for the API to respond, then turn the response into JSON
    .then(response => response.json())

    // Once the JSON data is ready, store it in the variable called "data"
    .then(data => {

        console.log(data);

        // Get dropdown from HTML
        const countrySelect = document.getElementById("countries");

        // Get the div where we will display the bank holidays
        const calendar = document.getElementById("calendar");

        // Get the dropdown where the user chooses past or future dates
        const dates = document.getElementById("dates");

        const upcomingResult = document.getElementById("upcomingResult")
        const pastResult = document.getElementById("pastResult")



        function showHolidays() {

            // Clear the calendar before displaying the new country's holidays
            calendar.innerHTML = "";
            upcomingResult.textContent = "";
            pastResult.textContent = "";
            let nextHoliday = null;
            let lastHoliday = null



            // Get all the bank holidays for the country the user selected
            data[countrySelect.value].events.forEach(function (holiday) {


                // Create a new div for this individual bank holiday
                const holidayElement = document.createElement("div");

                // Put the holiday name and date inside the new div
                holidayElement.textContent = holiday.title + " - " + holiday.date;


                // Turn the holiday's date into a JavaScript Date
                const holidayDate = new Date(holiday.date);

                // Get today's date
                const today = new Date();

                // Remove the current time from today's date to just compare the dates
                today.setHours(0, 0, 0, 0);

                //store previous and future bank hols
                if (holidayDate >= today) { //get all upincoming

                    if (nextHoliday === null || holidayDate < new Date(nextHoliday.date)) {

                        nextHoliday = holiday;
                        
                    }

                }
                else {
                    if (holidayDate < today) { //get all past

                        if (lastHoliday === null || holidayDate > new Date(lastHoliday.date)) {

                            lastHoliday = holiday;
                            
                        }
                    }
                };
                    

                if (dates.value === "past") {

                    // Check if the holiday happened before today
                    if (holidayDate < today) {

                        // Add the holiday to the calendar
                        calendar.appendChild(holidayElement);

                    }

                }

                // Otherwise, show future/today's holidays
                else {

                    // Check if the holiday is today or in the future
                    if (holidayDate >= today) {



                        // Add the holiday to the calendar
                        calendar.appendChild(holidayElement);
                    }

                }



            
            });//for each
            
            upcomingResult.textContent = nextHoliday.title + " - " + nextHoliday.date;
            pastResult.textContent = lastHoliday.title + " - " + lastHoliday.date;
        };//show hoildays funtion

        // Wait for the user to choose past or future
        dates.addEventListener("change", function () {

            //console.log("dates changed");
            showHolidays()


        }); //dates listener

        countrySelect.addEventListener("change", function () {

            showHolidays()
        });//country listener


    });//main 
