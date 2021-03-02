// Your code here




function createEmployeeRecord(recordArray) {
  const newRecord = {}
  newRecord.firstName = recordArray[0]
  newRecord.familyName = recordArray[1]
  newRecord.title = recordArray[2]
  newRecord.payPerHour = recordArray[3]
  newRecord.timeInEvents = []
  newRecord.timeOutEvents = []
  return newRecord
}

function createEmployeeRecords(recordsArray) {
  return recordsArray.map(e => createEmployeeRecord(e))
}


function createTimeInEvent(record, date) {
  const event = {}
  event.type = "TimeIn"
  event.hour = parseInt(date.slice(-4))
  event.date = date.slice(0, -5)
  record.timeInEvents.push(event)
  return record
}

function createTimeOutEvent(record, date) {
  const event = {}
  event.type = "TimeOut"
  event.hour = parseInt(date.slice(-4))
  event.date = date.slice(0, -5)
  record.timeOutEvents.push(event)
  return record
}

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find(e => e.date === date)
  const timeOut = record.timeOutEvents.find(e => e.date === date)
  return (timeOut.hour - timeIn.hour)/100
}


function wagesEarnedOnDate(record, date) {
  const hoursWorked = hoursWorkedOnDate(record, date)
  return hoursWorked * record.payPerHour
}

function allWagesFor(record) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const wagesEachDay = record.timeInEvents.map(e => wagesEarnedOnDate(record, e.date))
  return wagesEachDay.reduce(reducer)
}

function findEmployeeByFirstName(recordArray, name) {
  let match = recordArray.filter(e => e.firstName === name)
  if (match.length === 0) {
    return undefined
  } else {
    return match[0]
  }
}


function calculatePayroll(recordsArray) {
  const reducer = (accumulator, current) => accumulator + current
  const employeeWages = recordsArray.map(e => allWagesFor(e))
  return employeeWages.reduce(reducer)
}