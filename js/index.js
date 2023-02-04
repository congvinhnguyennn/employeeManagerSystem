function getEle(selector){
    return document.querySelector(selector);
}

const employeeList = getEmployeeList();
renderTable(employeeList);



function checkValid(){
    let isValid = true;
    let id = getEle("#tknv").value;
    let name = getEle("#name").value;
    let email = getEle("#email").value;
    let ngayLam = getEle("#datepicker").value;
    let password = getEle("#password").value;
    let position = getEle("#chucvu").value;
    let salary = getEle("#luongCB").value;
    let time = getEle("#gioLam").value;
    
    // ID
    if(id === ""){
        isValid = false;
        getEle("#tknv").style.borderColor = "red";
        getEle("#tbTKNV").innerHTML = "Không được để trống";
        getEle("#tbTKNV").style.display = "block";
    }else if(id.length > 6){
        isValid = false;
        getEle("#tbTKNV").innerHTML = "Tài khoản tối đa 4-6 số";
        getEle("#tbTKNV").style.display = "block";
    }else if(/^[a-zA-Z]+$/.test(id)){
        isValid = false;
        getEle("#tbTKNV").innerHTML = "Tài khoản phải là số";
        getEle("#tbTKNV").style.display = "block";
    }
    else {
        getEle("#tknv").style.borderColor = "#d9d9d9";
    }

    // Name
    if(name === ""){
        isValid = false;
        getEle("#name").style.borderColor = "red";
        getEle("#tbTen").innerHTML = "Không được để trống";
        getEle("#tbTen").style.display = "block";
    }else if(!/^[a-zA-Z\s]+$/.test(name)){
        isValid = false;
        getEle("#tbTen").innerHTML = "Họ tên phải là chữ";
        getEle("#tbTen").style.display = "block";
    }
    else{
        getEle("#name").style.borderColor = "#d9d9d9";
    }

    // Email
    if(email === ""){
        isValid = false;
        getEle("#email").style.borderColor = "red";
        getEle("#tbEmail").innerHTML = "Không được để trống";
        getEle("#tbEmail").style.display = "block";
    }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(email)){
        isValid = false;
        getEle("#tbEmail").innerHTML = "Email không đúng định dạng";
        getEle("#tbEmail").style.display = "block";
    }
    else{
        getEle("#email").style.borderColor = "#d9d9d9";
    }

    // Password
    if(password === ""){
        isValid = false;
        getEle("#password").style.borderColor = "red";
        getEle("#tbMatKhau").innerHTML = "Không được để trống";
        getEle("#tbMatKhau").style.display = "block";
    }else if(!/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{10,}$/.test(password)){
        isValid = false;
        getEle("#tbMatKhau").innerHTML = "Mật khẩu phải có ít nhất 10 ký tự, 1 chữ hoa, 1 số và 1 ký tự đặc biệt";
        getEle("#tbMatKhau").style.display = "block";
    }
    else{
        getEle("#password").style.borderColor = "#d9d9d9";
    }

    // Position
    if(position === "Chọn chức vụ"){
        isValid = false;
        getEle("#chucvu").style.borderColor = "red";
    }else{
        getEle("#chucvu").style.borderColor = "#d9d9d9";
    }

    // Salary 
    if(salary === ""){
        isValid = false;
        getEle("#luongCB").style.borderColor = "red";
        getEle("#tbLuongCB").innerHTML = "Không được để trống";
        getEle("#tbLuongCB").style.display = "block";
    }else if(salary < 1000000){
        isValid = false;
        getEle("#tbLuongCB").innerHTML = "Lương cơ bản phải lớn hơn hoặc bằng 1.000.000";
        getEle("#tbLuongCB").style.display = "block";
    }
    else{
        getEle("#luongCB").style.borderColor = "#d9d9d9";
    }

    if(salary === ""){
        isValid = false;
        getEle("#luongCB").style.borderColor = "red";
    }else{
        getEle("#luongCB").style.borderColor = "#d9d9d9";
    }

    // Time
    if(time === ""){
        isValid = false;
        getEle("#gioLam").style.borderColor = "red";
        getEle("#tbGiolam").innerHTML = "Không được để trống";
        getEle("#tbGiolam").style.display = "block";
    }else if(time < 80){
        isValid = false;
        getEle("#tbGiolam").innerHTML = "Giờ làm phải lớn hơn hoặc bằng 80 giờ";
        getEle("#tbGiolam").style.display = "block";
    }
    else{
        getEle("#gioLam").style.borderColor = "#d9d9d9";
    }


    return isValid;
}


function createEmployee(){
    let id = getEle("#tknv").value;
    let name = getEle("#name").value;
    let email = getEle("#email").value;
    let ngayLam = getEle("#datepicker").value;
    let password = getEle("#password").value;
    let position = getEle("#chucvu").value;
    let salary = getEle("#luongCB").value;
    let time = getEle("#gioLam").value;
    let isValid = checkValid();
    if(!isValid){
        return;
    }

    const employee = new Employee(id,name,email,password,ngayLam,salary,position,time);
    employeeList.push(employee);
    renderTable(employeeList);
    storeEmployeeList(employeeList);
}


function searchEmployee(){
    let search = getEle("#searchName").value;
    let searchList = employeeList.filter((employee) => {
        return employee.rankEmployee().toLowerCase().indexOf(search.toLowerCase()) > -1;
    }
    );
    renderTable(searchList);

}

function deleteEmployee(){
    let id = getEle("#tknv").value;
    let index = employeeList.findIndex((employee) => {
        return employee.id === id;
    });
    employeeList.splice(index,1);
    renderTable(employeeList);
    storeEmployeeList(employeeList);
}

function selectEmployeeToUpdate(id){
    let index = employeeList.find((employee) => {
        return employee.id === id;
    });
    // let employee = employeeList[index];
    getEle("#tknv").value = index.id;
    getEle("#name").value = index.name;
    getEle("#email").value = index.email;
    getEle("#datepicker").value = index.ngayLam;
    getEle("#password").value = index.password;
    getEle("#chucvu").value = index.position;
    getEle("#luongCB").value = index.salary;
    getEle("#gioLam").value = index.time;
    getEle("#tknv").disabled = true;
    getEle("#btnThemNV").style.display = "none";
}

function updateEmployee(){
    let id = getEle("#tknv").value;
    let name = getEle("#name").value;
    let email = getEle("#email").value;
    let ngayLam = getEle("#datepicker").value;
    let password = getEle("#password").value;
    let position = getEle("#chucvu").value;
    let salary = getEle("#luongCB").value;
    let time = getEle("#gioLam").value;
    getEle("#btnThemNV").style.display = "block";
    getEle("#tknv").disabled = false;


    let isValid = checkValid();
    if(!isValid){
        return;
    }

    const employee = new Employee(id,name,email,password,ngayLam,salary,position,time);
    let index = employeeList.findIndex((employee) => {
        return employee.id === id;
    }
    );
    employeeList[index] = employee;
    renderTable(employeeList);
    storeEmployeeList(employeeList);

}


function renderTable(employeeList){
    let html = "";
    for(let i = 0; i < employeeList.length; i++){
        let employee = employeeList[i];
        html += `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.ngayLam}</td>
            <td>${employee.position}</td>
            <td>${employee.calcSalary()}</td>
            <td>${employee.rankEmployee()}</td>
            <td><button class="btn btn-primary" data-toggle="modal"
            data-target="#myModal" onclick="selectEmployeeToUpdate('${employee.id}')">Sửa</button></td>
            <td><button class="btn btn-danger" onclick="deleteEmployee()">Xóa</button></td>
        </tr>
        `
    }
    getEle("#tableDanhSach").innerHTML = html;
}

function storeEmployeeList(){
    let employeeListString = JSON.stringify(employeeList);
    localStorage.setItem("employeeList",employeeListString);
}

function getEmployeeList(){
    let employeeListString = localStorage.getItem("employeeList");
    if(!employeeListString){
        return [];
    }
    let employeeList = JSON.parse(employeeListString);
    for(let i = 0; i < employeeList.length; i++){
        let employee = employeeList[i];
        employeeList[i] = new Employee(employee.id, employee.name, employee.email, 
            employee.password, employee.ngayLam, employee.salary, employee.position, employee.time);
    }
    return employeeList;

}



