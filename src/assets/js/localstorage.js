//! Objects
var eventsByDate = {};
var eventsById = [];
var remindersByDate =
    localStorage.getItem('remindersByDate') ? JSON.parse(localStorage.getItem('remindersByDate')) : {};
if (!localStorage.getItem("eventIndex")) {
    var eventIndex = 0;
} else {
    eventIndex = JSON.parse(localStorage.getItem("eventIndex"));
}
if (!!localStorage.getItem("eventsById")) {
    eventsById = JSON.parse(localStorage.getItem("eventsById"));
}
if (!!localStorage.getItem("eventsByDate")) {
    eventsByDate = JSON.parse(localStorage.getItem("eventsByDate"));
}
let calendarEvent = class {
    constructor (title,startDate,endDate, reminder, description, eventType, id) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reminder = reminder;
        this.description = description;
        this.eventType = eventType;
        this.id = id;
    }
}

let createBtn = document.getElementById("m-createBtn");
createBtn.addEventListener('click', createEvent);

function createEvent() {
    titleF = document.getElementById("title").value;
    iniDateF = document.getElementById("initialDate").value;
    const endDateCheckbox = document.getElementById("check-box-end-date").checked;
    let enDateF;
    if (endDateCheckbox) {
        enDateF = document.getElementById("endDate").value;
    } else {
        enDateF = iniDateF;
    }
    const descriptionF = document.getElementById("description").value;
    const eventTF = document.getElementById("event-type").value;
    const checkBoxReminder = document.getElementById("check-box-reminder").checked;
    const reminderF = (checkBoxReminder) ? document.getElementById("time").value : '';
    //*converting date to Date object
    let formattedIniDate = new Date(iniDateF);
    let formattedEndDate = new Date(enDateF);
    let startDate = formattedIniDate.getDate();
    let startYear = formattedIniDate.getFullYear();
    let startMonth = formattedIniDate.getMonth() + 1;
    //* Saving in eventsById
    let newEvent = new calendarEvent(titleF, iniDateF, enDateF, reminderF, descriptionF, eventTF,eventIndex);
    eventsById.push(newEvent);
    //* Calculate length of event in days
    let miliSecsToEndDay = (60*60*24*1000)-(formattedIniDate.getHours()*60*60*1000 + formattedIniDate.getMinutes()*60*1000 + formattedIniDate.getSeconds()*1000 + formattedIniDate.getMilliseconds());
    let daysDuration = 1;
    while (miliSecsToEndDay < (formattedEndDate.getTime() - formattedIniDate.getTime())) {
        daysDuration += 1;
        miliSecsToEndDay += (60*60*24*1000);
    }

    //* Save (or not) to reminders lists
    if (checkBoxReminder === true) {
        if (!remindersByDate[`${startYear}-${startMonth}-${startDate}`]) {
            remindersByDate[`${startYear}-${startMonth}-${startDate}`] = [];
        }
        remindersByDate[`${startYear}-${startMonth}-${startDate}`].push(eventIndex);
    }
    //* Saving in eventsByDate
    for (i = 0; i < daysDuration; i++) {
        if (!eventsByDate[`${startYear}-${startMonth}-${startDate}`]) {
            eventsByDate[`${startYear}-${startMonth}-${startDate}`] = [];
        }
        eventsByDate[`${startYear}-${startMonth}-${startDate}`].push(eventIndex);
        let lastDayOfMonth = new Date(startYear,startMonth,0).getDate();
        if (lastDayOfMonth === startDate) {
            if (startMonth === 12){
                startYear += 1;
                startMonth = 1;
                startDate = 1;
            } else {
                startMonth += 1;
                startDate = 1;
            }
        } else {
            startDate += 1;
        }
    }

    localStorage.setItem("eventsById", JSON.stringify(eventsById));
    localStorage.setItem("eventsByDate", JSON.stringify(eventsByDate));
    localStorage.setItem("remindersByDate", JSON.stringify(remindersByDate));
    eventIndex += 1;
    localStorage.setItem("eventIndex", JSON.stringify(eventIndex));
    renderCalendar();
    enableArrowKeys();
    document.getElementById("m-createBtn").disabled = true;
    createButton.style.opacity = 0.5;
    checkTodayReminders();
}
