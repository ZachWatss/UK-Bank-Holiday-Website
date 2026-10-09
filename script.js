
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


        
        function showHoildays(){
            
            // Clear the calendar before displaying the new country's holidays
            calendar.innerHTML = "";


            // Get all the bank holidays for the country the user selected
            data[countrySelect.value].events.forEach(function(holiday) {

                
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

                

            });//country select funtion
        };//show hoildays funtion
            
            // Wait for the user to choose past or future
                dates.addEventListener("change", function() {
                
                    //console.log("dates changed");
                    showHoildays()
                

                }); //dates listener
                
                countrySelect.addEventListener("change", function() {

                    showHoildays()
                });//country listener
        

});//main 










