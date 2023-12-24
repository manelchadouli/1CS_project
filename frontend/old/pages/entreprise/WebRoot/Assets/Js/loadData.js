
// After that the page loads
OnLoad(() => {

    // Get the table that we want to add data to
    var table = document.getElementById("tabValiderThemes");

    // Get the data from the server 
    // TODO: remove the sample data and get it from the server
    var data = [{
        id: "1",
        title: "gestion defa(fdapoidda(p iapdfadfdafjdalf df afjdfmlajdf mldj laj flmadjk fldsj flkjsd lkjdsaml fjamlfkj mdsalj flmksdj flkaj)) pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    },
    {
        id: "2",
        title: "gestion de pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    },
    {
        id: "3",
        title: "gestion de pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    },
    {
        id: "4",
        title: "gestion de pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    },
    {
        id: "5",
        title: "gestion de pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    },
    {
        id: "6",
        title: "gestion de pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    },
    {
        id: "7",
        title: "gestion de pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    },
    {
        id: "8",
        title: "gestion de pfe",
        description: "on veut cree une application full web qui va nous aider a faire la gestion des pfes",
        encadreur: "mohammed, ben snane et ahmed",
    }
    ]

    // Add the data to the table:
    // ==========================

    // For each item in the list of themes
    data.forEach(theme => {
        // Create a new row in the table
        var row = table.insertRow();

        // Give the row an id
        row.id = theme.id;

        // Create five cells in the row
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        // Add the title of the theme and the description
        cell1.innerHTML += "<h4>" + theme.title + "</h4><span>" + theme.description + "</span></td>";

        // Add the name of encadreur
        cell2.innerHTML += theme.encadreur;

        // Add the the accept button
        cell3.innerHTML += "<button>accepter<span>&check;</span></button>";

        // Add the reject button
        cell4.innerHTML += "<button>rejeter<span>x</span></button>"

        // Add the see more button
        cell5.innerHTML += "<button>&gt;</button>"
    });

    // Add style to the last child of the table, so it doesn't overlap the border radius with 
    // its bottom-radius property

    // Get all the tds in the last tr (table row)
    var lastRowChildren = table.firstChild.lastChild.children;

    // For each td cell
    for (let i = 0; i < lastRowChildren.length; i++) {
        // Remove the bottom border
        lastRowChildren[i].style.borderBottom = "none";

    }

    // Listen out for button clicks
    var rows = table.children[0].children;

    // For each row in the table (start from 1 cuz the first one is the header)
    for (let i = 1; i < rows.length; i++) {
        // Get the row
        var row = rows[i];

        // Get the id of the theme
        const id = row.id;

        // Get the accept, reject and seeMore buttons
        var acceptButton = row.children[2].children[0];
        var rejectButton = row.children[3].children[0];
        var seeMoreButton = row.children[4].children[0];

        // Add click events to each button
        acceptButton.addEventListener("click", function () { accept(id) });
        rejectButton.addEventListener("click", function () { reject(id) });
        seeMoreButton.addEventListener("click", function () { seeMore(id, data) });

    }


    // Some styles for the popup page, cuz i couldn't do it in css
    // Get the page
    var page = document.querySelector(".page-container");

    // Get the top bar
    var topBar = document.querySelector(".top-bar");

    // Get the popup page
    var popup = document.querySelector(".popup-container");

    // Get the height of the whole page
    const fullHeight = page.clientHeight + topBar.clientHeight;

    // Set the minimum height of the popup to be the same as the page
    popup.style.minHeight = fullHeight + "px";

});


// This function will get executed when the accept button gets clicked,
// it concerns the theme with the specified id
function accept(id) {
    // TODO: write code here that will send to the server a request to update the table of themes,
    //       set this theme to accepted

    console.log("accept button clicked with id " + id);
}


// This function will get executed when the reject button gets clicked,
// it concerns the theme with the specified id
function reject(id) {
    // TODO: write code here that will send to the server a request to update the table of themes,
    //       set this theme to rejected
    console.log("reject button clicked with id " + id);
}


// This function will get executed when the see more button gets clicked,
// it concerns the theme with the specified id
function seeMore(id, data) {

    // An index in the loop, it will contain the index of the element with the specific id
    // in the data array
    var index = 0;

    // While the element with the id hasn't been found
    while (index < data.length) {

        // Check if the element has the wanted id
        if (data[index].id == id) {
            // Break the loop if it does    
            break;
        }
        // Increment the index
        index++;
    }

    // TODO: Show the element to the user
    // Add a popup and show the data
    console.log(data[index]);
}