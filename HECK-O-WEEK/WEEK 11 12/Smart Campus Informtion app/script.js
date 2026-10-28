"use strict";

/* ======================================
   CAMPUS360 - JAVASCRIPT APPLICATION
====================================== */

/*
    This project demonstrates:
    1. Callbacks
    2. Promises
    3. Async/Await
    4. Fetch API
    5. DOM Manipulation
    6. Browser Events
    7. Local Storage
    8. Array Methods
*/

// --------------------------------------
// 1. DOM ELEMENTS
// --------------------------------------

const informationContainer =
    document.getElementById("informationContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const refreshButton =
    document.getElementById("refreshButton");

const showMoreButton =
    document.getElementById("showMoreButton");

const emptyMessage =
    document.getElementById("emptyMessage");

const announcementCount =
    document.getElementById("announcementCount");

const eventCount =
    document.getElementById("eventCount");

const resourceCount =
    document.getElementById("resourceCount");

const savedCount =
    document.getElementById("savedCount");

const toast = document.getElementById("toast");


// --------------------------------------
// 2. CAMPUS INFORMATION DATA
// --------------------------------------

const demoInformation = [

    {
        id: 1,
        title: "Sports Spectra",
        category: "Events",
        description:
            "Explore sporting competitions, team events, athletic activities, and opportunities for students to demonstrate their sporting skills.",
        date: "Campus Event"
    },

    {
        id: 2,
        title: "Enthusia Cultural Festival",
        category: "Events",
        description:
            "Discover cultural performances, music, dance, creative activities, and opportunities for students to showcase their talent.",
        date: "Campus Event"
    },

    {
        id: 3,
        title: "ICSIT Technical Activities",
        category: "Academic",
        description:
            "Explore technology-related activities, technical knowledge-sharing, and research opportunities associated with ICSIT.",
        date: "Technical Event"
    },

    {
        id: 4,
        title: "Student Hackathons",
        category: "Events",
        description:
            "Collaborate with teammates, solve problems, develop prototypes, and transform creative ideas into working projects.",
        date: "Student Activity"
    },

    {
        id: 5,
        title: "Startup and Entrepreneurship Activities",
        category: "Academic",
        description:
            "Explore business ideas, develop startup concepts, and learn about innovation and entrepreneurship.",
        date: "Student Activity"
    },

    {
        id: 6,
        title: "Student Clubs and Workshops",
        category: "Campus",
        description:
            "Discover student communities, workshops, creative activities, competitions, and opportunities for collaboration.",
        date: "Campus Activity"
    },

    {
        id: 7,
        title: "Academic Learning Resources",
        category: "Academic",
        description:
            "Explore online documentation, programming resources, and learning materials to support your academic development.",
        date: "Academic Resource"
    },

    {
        id: 8,
        title: "Campus Community",
        category: "Campus",
        description:
            "Stay connected with campus activities, student initiatives, and opportunities to participate in college life.",
        date: "Campus Information"
    },

    {
        id: 9,
        title: "Technology and Innovation",
        category: "Academic",
        description:
            "Learn about programming, emerging technologies, project development, and opportunities to build technical skills.",
        date: "Learning Resource"
    },

    {
        id: 10,
        title: "Sports and Team Participation",
        category: "Events",
        description:
            "Explore team sports, fitness-related campus activities, and opportunities to participate in student competitions.",
        date: "Sports Activity"
    }

];


// --------------------------------------
// 3. APPLICATION STATE
// --------------------------------------

let allInformation = [...demoInformation];

let visibleItems = 6;

let toastTimer;

const SAVED_KEY = "campus360_saved_information";


// --------------------------------------
// 4. LOCAL STORAGE FUNCTIONS
// --------------------------------------

function getSavedItems() {

    try {

        const storedItems = localStorage.getItem(SAVED_KEY);

        const parsedItems = storedItems
            ? JSON.parse(storedItems)
            : [];

        return Array.isArray(parsedItems)
            ? parsedItems
            : [];

    } catch (error) {

        console.error("Could not read saved information:", error);

        return [];

    }

}


function saveItemsToStorage(items) {

    try {

        localStorage.setItem(
            SAVED_KEY,
            JSON.stringify(items)
        );

        return true;

    } catch (error) {

        console.error("Could not save information:", error);

        showMessage("Could not save information in this browser.");

        return false;

    }

}


function isItemSaved(id) {

    return getSavedItems().some(
        savedItem => savedItem.id === id
    );

}


// --------------------------------------
// 5. CALLBACK FUNCTION
// --------------------------------------

function showMessage(message, callback) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

        // Execute callback after the notification disappears.
        if (typeof callback === "function") {
            callback();
        }

    }, 2200);

}


// --------------------------------------
// 6. PROMISE-BASED DEMO DATA
// --------------------------------------

function loadDemoInformation() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve([...demoInformation]);

        }, 400);

    });

}


// --------------------------------------
// 7. FETCH API WITH ASYNC/AWAIT
// --------------------------------------

async function fetchExternalInformation() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    if (!response.ok) {

        throw new Error(
            `External API returned status ${response.status}`
        );

    }

    const posts = await response.json();

    /*
        JSONPlaceholder is a sample API, not a source
        of official SIT Nagpur announcements.

        These posts are used only to demonstrate fetch().
    */

    const externalInformation = posts.map((post, index) => {

        const categories = [
            "Campus",
            "Academic",
            "Events"
        ];

        return {

            id: 1000 + post.id,

            title:
                "Sample API Information " +
                (index + 1),

            category:
                categories[index % categories.length],

            description:
                "This example demonstrates information received " +
                "from an external API. The original sample text is: " +
                post.title,

            date: "Sample API Data"

        };

    });

    return externalInformation;

}


// --------------------------------------
// 8. PROMISE CHAIN
// --------------------------------------

function getInformation() {

    return fetchExternalInformation()

        .then((externalInformation) => {

            console.log(
                "External API data received:",
                externalInformation
            );

            /*
                Use only local demo data in the displayed
                campus feed, because the external service
                does not provide official college notices.
            */

            return loadDemoInformation();

        })

        .catch((error) => {

            console.warn(
                "External API unavailable. Using demo data.",
                error
            );

            return loadDemoInformation();

        });

}


// --------------------------------------
// 9. CREATE INFORMATION CARD
// --------------------------------------

function createInformationCard(item) {

    const article = document.createElement("article");

    article.className = "info-card";

    const top = document.createElement("div");

    top.className = "info-card-top";

    const category = document.createElement("span");

    category.className = "badge";

    category.textContent = item.category;

    const date = document.createElement("span");

    date.className = "info-date";

    date.textContent = item.date;

    top.append(category, date);


    const title = document.createElement("h3");

    title.textContent = item.title;


    const description = document.createElement("p");

    description.textContent = item.description;


    const actions = document.createElement("div");

    actions.className = "card-actions";


    const saveButton = document.createElement("button");

    saveButton.className = "save-button";

    saveButton.type = "button";

    const saved = isItemSaved(item.id);

    saveButton.textContent = saved
        ? "★ Saved"
        : "☆ Save";

    saveButton.setAttribute(
        "aria-label",
        saved
            ? `Remove ${item.title} from saved information`
            : `Save ${item.title}`
    );


    saveButton.addEventListener("click", () => {

        toggleSavedItem(item);

    });


    const savedLabel = document.createElement("span");

    savedLabel.className = "saved-label";

    savedLabel.textContent = saved
        ? "Saved to your browser"
        : "";


    actions.append(saveButton, savedLabel);

    article.append(top, title, description, actions);

    return article;

}


// --------------------------------------
// 10. UPDATE DASHBOARD STATISTICS
// --------------------------------------

function updateStatistics() {

    const announcements = allInformation.filter(
        item => item.category === "Campus"
    );

    const events = allInformation.filter(
        item => item.category === "Events"
    );

    const academic = allInformation.filter(
        item => item.category === "Academic"
    );

    announcementCount.textContent = announcements.length;

    eventCount.textContent = events.length;

    resourceCount.textContent = academic.length;

    savedCount.textContent = getSavedItems().length;

}


// --------------------------------------
// 11. RENDER INFORMATION
// --------------------------------------

function renderInformation() {

    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categoryFilter.value;


    // Filter information using filter().
    const filteredInformation = allInformation.filter((item) => {

        const matchesSearch = [

            item.title,

            item.description,

            item.category

        ].some((value) => {

            return value.toLowerCase().includes(searchTerm);

        });


        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;


        return matchesSearch && matchesCategory;

    });


    informationContainer.replaceChildren();


    // Show empty state when nothing matches.
    if (filteredInformation.length === 0) {

        emptyMessage.classList.remove("hidden");

        showMoreButton.classList.add("hidden");

        return;

    }


    emptyMessage.classList.add("hidden");


    const itemsToDisplay = filteredInformation.slice(
        0,
        visibleItems
    );


    // DocumentFragment improves grouped DOM insertion.
    const fragment = document.createDocumentFragment();


    itemsToDisplay.forEach((item) => {

        const card = createInformationCard(item);

        fragment.append(card);

    });


    informationContainer.append(fragment);


    if (filteredInformation.length > visibleItems) {

        showMoreButton.classList.remove("hidden");

    } else {

        showMoreButton.classList.add("hidden");

    }

}


// --------------------------------------
// 12. SAVE / UNSAVE INFORMATION
// --------------------------------------

function toggleSavedItem(item) {

    const savedItems = getSavedItems();

    const alreadySaved = savedItems.some(
        savedItem => savedItem.id === item.id
    );


    let updatedItems;


    if (alreadySaved) {

        updatedItems = savedItems.filter(
            savedItem => savedItem.id !== item.id
        );

    } else {

        updatedItems = [
            ...savedItems,
            item
        ];

    }


    const success = saveItemsToStorage(updatedItems);

    if (!success) {
        return;
    }


    updateStatistics();

    renderInformation();


    if (alreadySaved) {

        showMessage(
            `${item.title} removed from saved information.`
        );

    } else {

        showMessage(
            `${item.title} saved successfully!`
        );

    }

}


// --------------------------------------
// 13. REFRESH INFORMATION
// --------------------------------------

async function refreshInformation() {

    refreshButton.disabled = true;

    refreshButton.textContent = "Loading...";

    informationContainer.replaceChildren();

    const loadingMessage = document.createElement("p");

    loadingMessage.className = "loading-message";

    loadingMessage.textContent =
        "Loading campus information...";

    informationContainer.append(loadingMessage);


    try {

        // Async/await waits for the Promise to finish.
        const information = await getInformation();

        allInformation = information;

        visibleItems = 6;

        updateStatistics();

        renderInformation();


        // Callback runs after the toast disappears.
        showMessage(
            "Campus information updated.",
            () => {
                console.log("Refresh notification completed.");
            }
        );


    } catch (error) {

        console.error(
            "Could not load campus information:",
            error
        );

        allInformation = [...demoInformation];

        updateStatistics();

        renderInformation();

        showMessage(
            "Showing available demo information."
        );


    } finally {

        refreshButton.disabled = false;

        refreshButton.textContent =
            "↻ Refresh Information";

    }

}


// --------------------------------------
// 14. BROWSER EVENTS
// --------------------------------------


// Search as the user types.
searchInput.addEventListener("input", () => {

    visibleItems = 6;

    renderInformation();

});


// Category filtering.
categoryFilter.addEventListener("change", () => {

    visibleItems = 6;

    renderInformation();

});


// Refresh button.
refreshButton.addEventListener("click", () => {

    refreshInformation();

});


// Show more cards.
showMoreButton.addEventListener("click", () => {

    visibleItems += 4;

    renderInformation();

});


// --------------------------------------
// 15. NAVIGATION ACTIVE STATE
// --------------------------------------

const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigationLinks.forEach((navLink) => {

            navLink.classList.remove("active");

        });

        link.classList.add("active");

    });

});


// --------------------------------------
// 16. DISPLAY CURRENT YEAR
// --------------------------------------

const footer = document.querySelector(".footer");

if (footer) {

    const currentYear = new Date().getFullYear();

    const yearText = footer.querySelector("p");

    if (yearText) {

        yearText.textContent =
            `© ${currentYear} Campus360 | Student Information Portal`;

    }

}


// --------------------------------------
// 17. INITIALIZE APPLICATION
// --------------------------------------

async function initializePortal() {

    console.log("Campus360 is starting...");

    try {

        await refreshInformation();

        console.log("Campus360 initialized successfully.");

    } catch (error) {

        console.error(
            "Initialization failed:",
            error
        );

    }

}


// Start the application.
initializePortal();