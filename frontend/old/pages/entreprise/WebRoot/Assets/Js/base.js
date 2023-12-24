// The callbacks to call when the document is loaded
var onLoadCallbacks = [];

// Listen for page loading
document.addEventListener("DOMContentLoaded", function () {
    // Process what's supposed to run when the page is loaded
    ProcessOnLoad();
});

// Process the load
function ProcessOnLoad() {
    // For each callback in the callbacks list
    onLoadCallbacks.forEach(callback => {
        // Invoke it
        callback();
    })
}

// Called to add a function to be run after that the document is loaded
function OnLoad(callback) {
    // Add the callback to the list of callback to be run when the document loads
    onLoadCallbacks.push(callback);
}

