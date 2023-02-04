function  Employee(id,name,email,password,ngayLam,salary,position,time){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.salary = salary;
    this.position = position;
    this.time = time;
}

function getEle(selector){
    return document.querySelector(selector);
}

Employee.prototype.calcSalary = function(){
    // if(this.salary < 1000000 || this.salary > 20000000){
    //     alert("Lương cơ bản không hợp lệ");
    //     return;
    // }

    // if(this.position === "Chọn chức vụ"){
    //     alert("Chọn chức vụ không hợp lệ");
    //     return;
    // }

    let salary = 0;
    switch(this.position){
        case "Sếp":
            salary = this.salary * 3;
            break;
        case "Trưởng phòng":
            salary = this.salary * 2;
            break;
        case "Nhân viên":
            salary = this.salary;
            break;
    }
    return salary;
}

Employee.prototype.rankEmployee = function(){
    // if(this.time < 80 || this.time > 200){
    //     alert("Thời gian làm việc không hợp lệ");
    //     return;
    // }

    let rank = "";
    if(this.time >= 192){
        rank = "Xuất sắc";
    }else if(this.time >= 176){
        rank = "Giỏi";
    }else if(this.time >= 160){
        rank = "Khá";
    }else{
        rank = "Trung bình";
    }
    return rank;
}
