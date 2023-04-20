function createEmployeeRecord(array) {
    const record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return record;
}


function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}


function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    const [hour, minute] = time.split(':');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
}
  
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    const [hour, minute] = time.split(':');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, date) {
    // find the timeInEvents and timeOutEvents for the given date  
    const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date);

    // calculare the working hours 
    const hours = (timeOut.hour - timeIn.hour) /100 ;

    return hours;
}


function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}


function allWagesFor(employeeRecord) {
    // Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
    // return an array of wages for each date-matched timeInEvent and timeOutEvent
    const wages = [];

    employeeRecord.timeInEvents.forEach((event) => {
        wages.push(wagesEarnedOnDate(employeeRecord, event.date));
    })
    //allWagesFor aggregates all the dates' wages and adds them together
    return wages.reduce((total, wages) => total + wages, 0);
}


// function calculatePayroll take 1 Argument(s) which is an Array of employee records
function calculatePayroll(employeeRecords) {
    // calculatePayroll aggregates all the dates' wages and adds them together
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
}
