let Name_subject = document.getElementById("Name_subject");
let Name_Doctor = document.getElementById("Name_Doctor");
let Name_task = document.getElementById("Name_task");
let timeData = document.getElementById("timeData");
let todayName = document.getElementById("todayName");
let btnproduct = document.getElementById("btnproduct");
let UpDate = document.getElementById("UpDate");
let title = document.getElementById("title");
Arrey = [];
if (localStorage.getItem("product") !== null) {
    Arrey = JSON.parse(localStorage.getItem("product"))
    ShowData()
}
btnproduct.onclick = function () {
    if (Name_subject.value !== "" && Name_Doctor.value !== ""
        && Name_task.value !== "" && timeData.value !== ""
        && todayName.value !== "") {
        let product = {
            Name_subject: Name_subject.value,
            Name_Doctor: Name_Doctor.value,
            Name_task: Name_task.value,
            timeData: timeData.value,
            todayName: todayName.value,
        }
        Arrey.push(product)
        localStorage.setItem("product", JSON.stringify(Arrey))
        ShowData()
        clearDate()
    }
}
function ShowData() {
    let table = ""
    for (let i = 0; i < Arrey.length; i++) {
        table +=
        `
            <tr>
                <td>${i + 1}</td>
                <td>${Arrey[i].Name_subject}</td>
                <td>${Arrey[i].Name_Doctor}</td>
                <td>${Arrey[i].Name_task}</td>
                <td>${Arrey[i].timeData}</td>
                <td>${Arrey[i].todayName}</td>
                <td><button id="Update" onclick = setData(${i})>تعديل</button></td>
                <td><button id="Delete" onclick = Delete(${i})>حذف</button></td>
            </tr>
        `
    }
    document.getElementById("show").innerHTML = table;
    let btndeleteall = document.getElementById("deleteAll");
    if (Arrey.length > 0) {
        btndeleteall.innerHTML =
            `<button onclick="deleteBtnAll()">Delete All ${Arrey.length}</button>`
    } else {
        btndeleteall.innerHTML = ``
    }
}
ShowData();
function clearDate() {
    Name_subject.value = ""
    Name_Doctor.value = ""
    Name_task.value = ""
    timeData.value = ""
    todayName.value = ""
}
function Delete(index) {
    Arrey.splice(index, 1)
    localStorage.setItem("product", JSON.stringify(Arrey))
    ShowData();
}
function Search() {
    let search = document.getElementById("Search").value.toUpperCase().trim();
    table = "";
    for (let i = 0; i < Arrey.length; i++) {
        if (Arrey[i].Name_Doctor.toUpperCase().includes(search)) {
            table +=
                `<tr>
                <td>${i + 1}</td>
                <td>${Arrey[i].Name_subject}</td>
                <td>${Arrey[i].Name_Doctor}</td>
                <td>${Arrey[i].Name_task}</td>
                <td>${Arrey[i].timeData}</td>
                <td>${Arrey[i].todayName}</td>
               <td><button id="Update" onclick = "setData(${i})">تعديل</button></td>
               <td><button id="Delete" onclick = "Delete(${i})">حذف</button></td>
            </tr>
        `
        }
    }
    document.getElementById("show").innerHTML = table
}
let x = 0
function setData(i) {
    x = i
    Name_subject.value = Arrey[i].Name_subject
    Name_Doctor.value = Arrey[i].Name_Doctor
    Name_task.value = Arrey[i].Name_task
    timeData.value = Arrey[i].timeData
    todayName.value = Arrey[i].todayName
    btnproduct.style.display = "none"
    UpDate.style.display = "block"
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
UpDate.onclick = function () {
    Arrey[x].Name_subject = Name_subject.value;
    Arrey[x].Name_Doctor = Name_Doctor.value;
    Arrey[x].Name_task = Name_task.value;
    Arrey[x].timeData = timeData.value;
    Arrey[x].todayName = todayName.value;
    localStorage.setItem("product", JSON.stringify(Arrey))
    clearDate()
    ShowData()
    btnproduct.style.display = "block"
    UpDate.style.display = "none"
}
function deleteBtnAll() {
    localStorage.clear()
    Arrey.splice(0)
    ShowData()
}
