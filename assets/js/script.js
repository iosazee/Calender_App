let timeBlockCtn = $('.container')
let eventInput;


//set current date
let currentDayEl = $('#currentDay')
currentDayEl.text(moment().format('dddd MMMM, Do'))




//Create timeblocks using a loop
const displayTimeBlocks = () => {

//Get the present time
    let presentTime = moment().format('HH')
    let startHour = 9;
//Get events added and saved to localstorage
    let events = getEvents()

    timeBlockCtn.prepend("")

    if (!events.length) {
        timeBlockCtn.prepend("<p>No events on your calender")
    }

    for (let i = 0; i <=8; i++) {

        let timeSegment = moment().hour(startHour).format('h a')
        let eventCtnClass = ''


        if (presentTime === startHour) {
            eventCtnClass = 'present'
        }
        else if (presentTime > startHour) {
            eventCtnClass = 'past'
        }
        else {
            eventCtnClass = 'future'
        }

        let event = events[i] || ''

        timeBlockCtn.prepend(`
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
        console.log("add event")

        let events = getEvents()
        eventInput = $('.textarea')
        let eventText = eventInput.value
        console.log(eventText)

        if (!eventText) {
            return
        }
        events.push(eventText)

        eventInput.value = ""
        displayTimeBlocks()
    }
}

const getEvents = () => {
    console.log("Get Events")

    return JSON.parse(localStorage.getItem("events")) || []
}


const initialize = () => {
    displayTimeBlocks()
}

initialize();