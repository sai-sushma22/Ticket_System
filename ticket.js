function clearLocalStorage() {
    localStorage.removeItem("formValues");
}

function addToLocalStorage(nameVal, ageVal) {
    var storedValues = JSON.parse(localStorage.getItem("formValues")) || [];
    storedValues.push({ name: nameVal, age: ageVal });
    localStorage.setItem("formValues", JSON.stringify(storedValues));
}

function displayValuesFromLocalStorage() {
    var valuesList = document.getElementById("values-list");
    valuesList.innerHTML = "";
    var storedValues = JSON.parse(localStorage.getItem("formValues")) || [];
    storedValues.forEach(function(item) {
        var listItem = document.createElement("p");
        var entrancePrice;
        if (item.age <= 2) {
            entrancePrice = "Entrance Price: INR 0";
        } else if (item.age > 2 && item.age < 18) {
            entrancePrice = "Entrance Price: INR 100";
        } else if (item.age >= 18 && item.age < 60) {
            entrancePrice = "Entrance Price: INR 500";
        } else {
            entrancePrice = "Entrance Price: Not applicable";
        }
        listItem.textContent = "Name: " + item.name + ", Age: " + item.age + ", " + entrancePrice;
        valuesList.appendChild(listItem);
    });
}


function addField() {
    var nameField = document.getElementById("name");
    var ageField = document.getElementById("age");
    var nameVal = nameField.value.trim();
    var ageVal = ageField.value.trim();
    if (nameVal !== "" && ageVal !== "") {
        addToLocalStorage(nameVal, ageVal);
        nameField.value = "";
        ageField.value = "";
        displayValuesFromLocalStorage();
    }
}

function showValues() {
    var valuesContainer = document.getElementById("values-container");
    valuesContainer.style.display = "block";
    displayValuesFromLocalStorage();
}

document.getElementById("multi-value-form").addEventListener("submit", function(event) {
    event.preventDefault();
    showValues();
    var submitButton = document.querySelector('input[type="submit"]');
    submitButton.disabled = true;
});

document.querySelector(".validate-button input[type='button']").addEventListener("click", function(event) {
    event.preventDefault();
    var heading = document.createElement("p"); 
    heading.textContent = "Validate the Below Values:"; 
    document.getElementById("values-container").prepend(heading);
    showValues();
    clearLocalStorage();
    var submitButton = document.querySelector('input[type="submit"]');
    submitButton.disabled = false;
});

displayValuesFromLocalStorage();