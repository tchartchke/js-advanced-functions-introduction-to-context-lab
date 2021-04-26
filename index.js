function createEmployeeRecord(employArgs){
  return {
    firstName: employArgs[0], 
    familyName: employArgs[1],
    title: employArgs[2],
    payPerHour: employArgs[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees){
  return employees.map(emp => createEmployeeRecord(emp))
}

function createTimeInEvent(emp, time){
  const hr = parseInt(time.slice(11, 13))*100
  const day = time.slice(0,10)
  emp.timeInEvents.push({type: "TimeIn", hour: hr, date: day})
  return emp
}

function createTimeOutEvent(emp, time){
  const hr = parseInt(time.slice(11, 13))*100
  const day = time.slice(0,10)
  emp.timeOutEvents.push({type: "TimeOut", hour: hr, date: day})
  return emp
}

function hoursWorkedOnDate(emp, date){ 
  const timeIn = emp.timeInEvents.find(time => time["date"] === date)
  const timeOut = emp.timeOutEvents.find(time => time["date"] === date)
  return (timeOut["hour"] - timeIn["hour"])/100
}

function wagesEarnedOnDate(emp, date){
  return emp["payPerHour"] * hoursWorkedOnDate(emp, date)
}

function allWagesFor(emp){
  const workedDates = emp.timeInEvents.map(date => date.date )
  return workedDates.reduce(function(memo, date){
    return memo + wagesEarnedOnDate(emp, date)
  }, 0)
}

function calculatePayroll(emps){
  return emps.reduce(function(memo, record){
    return memo + allWagesFor(record)
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(record => record.firstName === firstName)
}