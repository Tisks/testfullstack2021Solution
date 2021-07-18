const divTableRow = 'divTableRow'
const divTableCell = 'divTableCell'
const topHeader = ['Horario','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
const scheduleTimes = [ ['08:00','08:30'],  ['08:30','09:00'],  ['09:00','09:30'],  ['09:30','10:00'], ['10:00','10:30'],['10:30','11:00'],
                        ['11:00','11:30'],['11:30','12:00'],['12:00','12:30'],['12:30','13:00'],['13:00','13:30'],
                        ['13:30','14:00'],['14:00','14:30'],['14:30','15:00'],['15:00','15:30'],['15:30','16:00'],
                        ['16:00','16:30'],['16:30','17:00'],['17:00','17:30'],['17:30','18:00'],['18:00','18:30'],
                        ['18:30','19:00'],['19:00','19:30']]

window.onload = function() {
    var scheduleToRender = prompt("Porfavor ingrese el horario dado el formato del horario indicado en el README.md", "");
    if (scheduleToRender!= null) {
        console.log(scheduleToRender);   
        var mainTable = document.querySelector("div.central div.divTable div.divTableBody");
        let firstRow = prepareHeader()
        mainTable.appendChild(firstRow)

        let processedSchedule = processSchedule(JSON.parse(scheduleToRender))
        console.log(Object.keys(processedSchedule))
        for(let outerIndex = 0; outerIndex < scheduleTimes.length; outerIndex++){
            let divRow = generateDivTableRow()
            
            for (let index = 0; index < topHeader.length; index++) { 
                let cell = generateCell()         
                var time = setScheduleTime(outerIndex)
                if(index === 0){                    
                    cell.appendChild(time)
                }  
                else{
                    if(index <= Object.keys(processedSchedule).length ){
                        let name = setAppointment(processedSchedule[Object.keys(processedSchedule)[index-1]],scheduleTimes[outerIndex])
                        cell.appendChild(name)
                    }
                }
                divRow.appendChild(cell)
            }
            mainTable.appendChild(divRow)
        }

    }
 }
function setAppointment(dateJson, time_range){
    // [{name:"Jorge", start_time: "08:00", end_time: "08:30"}, {..}, {..}..]
    var h4 = document.createElement("h4");
    for (const appointment of dateJson) {
        let start_time = appointment.start_time
        let end_time = appointment.end_time        
        if(start_time === time_range[0] && end_time === time_range[1]){           
            let header = document.createTextNode(appointment.name);
            h4.appendChild(header);
            break;
        }
    }
    return h4

}
function processSchedule(scheduleJson){
    var auxSchedule = scheduleJson
    var finalSchedule = {}
    for (const iterator in auxSchedule) {
        console.log(iterator)
        var scheduleIterator = auxSchedule[iterator]
        var min30blockSchedule = []
        for (const appointment of scheduleIterator) {
            var start_time = appointment.start_time
            var end_time = appointment.end_time
            var timeStart = new Date("01/01/2007 " + start_time)
            var timeEnd = new Date("01/01/2007 " + end_time)
            
            var timeDiff = timeEnd - timeStart;    
            var diffHours =  timeDiff/3600000
            var repeats = diffHours/0.5
            var initialIndex = 0
            for (let index = 0; index < scheduleTimes.length; index++) {
                const time_1 = scheduleTimes[index][0];
                const time_2 = scheduleTimes[index][1];
                if(time_1 === start_time){
                    initialIndex = index
                    break
                }
                else if(time_2 === start_time){
                    initialIndex = index + 1
                    break
                }
            }

            for (let index = 0; index < repeats; index++) {
                min30blockSchedule.push({"name":appointment.name, "start_time": scheduleTimes[initialIndex+index][0] ,
                                         "end_time": scheduleTimes[initialIndex+index][1]})    
            }
            
        }
        finalSchedule[iterator] = min30blockSchedule
        min30blockSchedule = []
    }
    return finalSchedule
    
}
function setScheduleTime(index){
    let h4 = document.createElement("h4");
    let header = document.createTextNode(scheduleTimes[index][0]+'-'+scheduleTimes[index][1]);
    console.log()
    h4.appendChild(header);
    return h4
}
function generateDivTableRow(){
    let divRow = document.createElement("div");
    divRow.setAttribute("class", divTableRow);
    return divRow
}
function generateCell(){
    let cell = document.createElement("div");
    cell.setAttribute("class", divTableCell);
    return cell
}
function fetchScheduleTime(index){
    let h4 = document.createElement("h4");
    let header = document.createTextNode(topHeader[index]);
    h4.appendChild(header);
    return h4
}
function prepareHeader(){
    let firstDivRow = document.createElement("div");
    firstDivRow.setAttribute("class", divTableRow);
    for (let index = 0; index < 8; index++) {            
        let cell = document.createElement("div");
        cell.setAttribute("class", divTableCell);
        let h4 = document.createElement("h4");
        let header = document.createTextNode(topHeader[index]);
        h4.appendChild(header);
        cell.appendChild(h4)
        firstDivRow.appendChild(cell);
    }
     return firstDivRow
 }