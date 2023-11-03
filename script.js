const COHORT_NAME = "2308-ACC-ET-WEB-PT-B";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT_NAME}/events`;

const section = document.getElementById("event-list");

const state = {
    partyEvents: [],
};

function render() {
    const ul = state.partyEvents.map(
        (partyEvent) =>
            "<ul>" +
            `<li><b>Event ID</b>: ${partyEvent.id}</li>` +
            `<li><b>Event Name</b>: ${partyEvent.name}</li>` +
            `<li><b>Event Description</b>: ${partyEvent.description}</li>` +
            `<li><b>Event Date</b>: ${partyEvent.date}</li>` +
            `<li><b>Event Location</b>: ${partyEvent.location}</li>` +
            "</ul>" +
            `<button onclick='deletePartyEvent(${partyEvent.id})'>Delete</button>` +
            "<hr />"
    );

    section.innerHTML = ul.join("");
}

const fetchEvents = async () => {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.partyEvents = json.data;
    } catch (error) {
        console.log(error);
    }

    render();
};

const deletePartyEvent = async (id) => {
    try {
        const response = await fetch(API_URL + `/${id}`, {
            method: "DELETE",
        });
        state.partyEvents = state.partyEvents.filter((e) => e.id !== id);
    } catch (error) {
        console.log(error);
    }

    fetchEvents();
};

const addPartyEvent = async (e) => {
    e.preventDefault();

    obj = {
        date: `${e.target.form.date.value}T00:00:00.000Z`,
        description: `${e.target.form.description.value}`,
        location: `${e.target.form.location.value}`,
        name: `${e.target.form.name.value}`,
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj),
        });
    } catch (error) {
        console.log(error);
    }

    e.target.form.name.value = "";
    e.target.form.description.value = "";
    e.target.form.date.value = "";
    e.target.form.location.value = "";

    fetchEvents();
};

const addButton = document.getElementById("add-event");
addButton.addEventListener("click", addPartyEvent);

fetchEvents();
