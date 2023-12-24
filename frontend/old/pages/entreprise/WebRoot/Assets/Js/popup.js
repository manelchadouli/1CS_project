
OnLoad(() => {
    // Get the popup page
    var popup = document.querySelector(".popup-container");

    // Get the button that will open up the popup
    var openButton = document.querySelector(".butto");

    // Remove this after finishing making the page
    popup.classList.add("appear");

    // Listen for it's click events
    openButton.addEventListener("click", () => {
        // Make the popup appear when clicked
        popup.classList.add("appear");
    });

    // Get the button that will close the popup
    var closeButton = document.querySelector(".close");

    // Listen out for click events
    closeButton.addEventListener("click", () => {
        // Make the popup disappear when clicked
        popup.classList.remove("appear");
    });

});