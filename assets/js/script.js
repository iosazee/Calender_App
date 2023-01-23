let timeBlockCtn = $('.container')
let events;
let eventInput;
let eventText
let timeSegment;
let bodyEl = $('body')


//set current date
let currentDayEl = $('#currentDay')
currentDayEl.text(moment().format('dddd MMMM, Do'))




//Create timeblocks using a loop
const displayTimeBlocks = () => {

//Get the present time
    let presentTime = moment().format('HH')
    let startHour = 9;
//Get events added and saved to localstorage
    events = getEvents()

    timeBlockCtn.prepend("")

    if (!events.length) {
        timeBlockCtn.prepend("<p>No events on your calender</p>")
    }
    else {
        timeBlockCtn.prepend("<p>You have events on your calender</p>")
    }

    for (let i = 0; i <=8; i++) {

        timeSegment = moment().hour(startHour).format('HH')

        let eventCtnClass = ''


        if (presentTime === startHour) {
            eventCtnClass = 'present'
        }
        else if (presentTime > startHour) {
            eventCtnClass = 'past'
        }
        else if (presentTime < startHour) {
            eventCtnClass = 'future'
        }

        timeSegment = moment().hour(startHour).format('ha')

        let event = events[i] || ''

        timeBlockCtn.append(`
            <div class='row time-block'>
                <div class='col-1 timesegment'>
                    ${timeSegment}
                </div>
                <div class='col-10 textarea ${eventCtnClass}'>
                    <textarea class='description' data-index=${i}> ${event} </textarea>
                </div>
                <div class='col-1 btnCtn'>
                    <button data-index='${i}' class='btn saveBtn'><i class='fas fa-save'></i></button>
                </div>
            </div>
        `)
        startHour++

        let textareas = document.querySelectorAll('.description')

        textareas.forEach(function (textArea, index) {

            textArea.addEventListener('blur', function (e) {
                events = getEvents()
                events[index] = e.target.value
                localStorage.setItem("events", JSON.stringify(events))
            })
        })
    }

}



const addEvent = (e) => {
    let enterKey = e.keyCode === 13

    if (enterKey) {
        console.log("event added")

        events = getEvents()
        eventInput = $('.textarea')
        eventText = eventInput.value
        console.log(eventText)

        if (!eventText) {
            return
        }
        events.push(eventText)

        eventInput.value = ""
        displayTimeBlocks()
    }
}

const saveEvents = () => {
//if save btn clicked
    events = getEvents()
    events.push(eventText)
    localStorage.setItem("events", JSON.stringify(events))
}

const getEvents = () => {
    console.log("Get all events")

    return JSON.parse(localStorage.getItem("events")) || []
}

const clearEvents = () => {
    bodyEl.append(`
        <div class='text-center'>
            <button class='clearbtn btn-danger'>Clear all events</button>
        </div>
    `)

    localStorage.clear()
}


const initialize = () => {
    displayTimeBlocks()
    clearEvents()
}

initialize();