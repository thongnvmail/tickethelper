var lengthItemNew = 0;
var lengtItemCurrent = 0;
var isInit = true;
var statusTab = false;

/* status from number to string */
var SEND = 1;
var UNSEND = 0;
var CANCEL = -1;
var STATUS_STRING = {
    SEND: "Đã điều xe",
    UNSEND: "Chưa điều xe",
    CANCEL: "Đã hủy yêu cầu"
}

var BOOKNOW = "booknow";
var SCHEDULEBOOK = "schedulebook";
var tab = BOOKNOW;

function loadBookNowTab() {
    $('#menubooknow').addClass('active');
    $('#menuschedulebook').removeClass('active');
    tab = BOOKNOW;
    statusTab = true;
    loadDataTable();
    resetDetail();
}

function loadScheduleBookTab() {
    notify("Chức năng đang được cập nhật", "success");
    // $('#menuschedulebook').addClass('active');
    // $('#menubooknow').removeClass('active');
    // tab = SCHEDULEBOOK;
    // statusTab = true;
    // loadDataTable();
    // resetDetail();
    // enableButtonSend(false);
}

function resetDetail() {
    setFormDetail("");
}

function setNumberNotify(numberBookNow, numberScheduleBook) {
    $("#notifybooknow").html(numberBookNow);
    $("#notifyschedulebook").html(numberScheduleBook);
}

function approve(idTicket, StridRequester) {
    var idRequester = $("#" + StridRequester).val();
    // var idTicket = $("#id").html();

    var data = {
        carId: idRequester,
        bookId: idTicket
    };
    console.log(data);

    if (!idRequester) {
        notify("Mã tài xế không được rỗng!", "danger");
        $("#idRequester").focus();
        return;
    }

    var url = "/bookingHelper/car";

    var request = $.ajax({
        url: url,
        method: "POST",
        data: data,
        dataType: "JSON",
        statusCode: {
            404: () => {
                notify("Không tìm thấy mã tài xế!", 'danger');
            },
            500: () => {
                notify("Gửi request thất bại!", 'danger');
            }
        }
    })

    request.done((result) => {
        console.log(result);
        var message = `Đã gửi yêu cầu cho ticket có mã ${idTicket} thành công!`;
        notify(message, 'success');
        enableButtonSend("idRequester" + idTicket, "btnSend" + idTicket, 1);
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

function setDataTable(data) {
    console.log(data);
    var str = ``;
    var length = data.length;
    data.map((valuse, index) => {
        // console.log(valuse.subject);
        let id = valuse.id;
        let status = changeStatusToString(valuse.status).string;
        let classColorStatus = changeStatusToString(valuse.status).classColor;
        let Phone = valuse.Phone;
        let requester = valuse.CustName;
        let VehType = valuse.VehType;
        let Addr = valuse.Addr;
        let Time = formatTime(valuse.Time);
        let GhiChu = valuse.GhiChu;

        let isRead = valuse.isRead;
        let classStatus = "unread";
        if (isRead) {
            classStatus = "read";
        }

        let isEnable = "disabled";
        if (valuse.status == 0) {
            isEnable = "";
        }
        str += `
            <tr class='${classStatus}' onclick="onClickTable('${id}', this)">
                
                <td>${id}</td>
                <td><input  type="text" class="form-control" id="idRequester${id}" ${isEnable}></td>
                <td>
                    <button type="button" class="btn btn-success" id="btnSend${id}" onclick="approve(${id}, 'idRequester${id}')" ${isEnable}>Gửi</button>
                </td>
                <td><i> ${Time} </i></td>
                <td class="${classColorStatus}">${status}</td>
                <td>${Phone}</td>
                <td><i> ${requester} </i></td>
                <td><i> ${VehType} </i></td>
                <td><i> ${Addr} </i></td>
                <td><i> ${GhiChu} </i></td>

            </tr>
        `;
    })

    $("#datatable").html(str);
    $("#total").html(length);
    lengtItemCurrent = length;
}

function formatTime(Time) {
    Time = new Date(Time);
    return Time.getDay() + '/' + Time.getMonth() + '/' + Time.getFullYear() + '<br>' +
        Time.getHours() + ':' + Time.getMinutes() + ':' + Time.getSeconds();
}

function loadDataTable() {
    var url = "/bookingHelper/request";
    var request = $.ajax({
        url: url,
        method: "GET",
        dataType: "JSON"
    })

    request.done((result) => {
        var data = result.book_now;
        if (tab != BOOKNOW) {
            data = result.schedule_book;
        }
        var length = data.length;
        console.log(lengtItemCurrent);
        if (isInit) {
            setDataTable(data);
            isInit = false;
        } else {
            if (length > lengtItemCurrent) {
                setDataTable(data);
            } else {
                if (statusTab) {
                    setDataTable(data);
                    lengtItemCurrent = length;
                    statusTab = false;
                }
            }
        }
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

// function updateStatus(data) {
//     var url = "/bookingHelper/request/" + data.id;
//     data.isRead = true;
//     var request = $.ajax({
//         url: url,
//         method: "PUT",
//         data: data,
//         dataType: "JSON"
//     })

//     request.done((result) => {
//         console.log("Update status success");
//         // loadNewData();
//         // loadData();
//     })

//     request.fail((jqXHR, textStatus) => {
//         console.log(textStatus);
//     })
// }

function changeStatusToString(status) {
    // let classColor = "";
    let result = {};

    if (status === "") {
        result.classColor = "";
        result.string = "";
    }
    if (status == SEND) {
        result.classColor = "send";
        result.string = STATUS_STRING.SEND;
    }
    if (status == UNSEND) {
        result.classColor = "unsend";
        result.string = STATUS_STRING.UNSEND;
    }
    if (status == CANCEL) {
        result.classColor = "cancel";
        result.string = STATUS_STRING.CANCEL;
    }

    // $("#status").attr('class', classColor);
    return result;
}

function setFormDetail(data) {

    if (!data) {
        data = {
            address_booking: "",
            book_type: "",
            content: "",
            id: "",
            product_booking: "",
            requester: "",
            status: 0,
            // subject: "Tiêu đề",
            status: ""
        }
    }

    $("#id").html(data.id);
    $("#Phone").html(data.Phone);
    $("#requester").html(data.CustName);
    $("#product_booking").html(data.VehType);
    $("#address_booking").html(data.Addr);
    $("#content").html(data.GhiChu);
    $("#status").html(changeStatusToString(data.status));

    $("#idRequester").val("");
}

// function setFormData(data) {

//     setFormDetail(data);

//     if (data.status === 0) {
//         enableButtonSend(true);
//     } else {
//         enableButtonSend(false);
//     }
// }

function enableButtonSend(idRequester, btnSend, isEnable) {
    let disabled = "disabled";
    if (isEnable === 0) {
        disabled = "";
    }
    $("#" + idRequester).attr('disabled', disabled);
    $("#" + btnSend).attr('disabled', disabled);
}

function onClickTable(id, event) {
    // console.log(event);
    var url = "/bookingHelper/request/" + id;
    var request = $.ajax({
        url: url,
        method: "GET",
        dataType: "JSON"
    })

    request.done((result) => {
        $(event).removeClass();
        // console.log(result);
        // setFormData(result);
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

function loadNewData() {
    var url = "/bookingHelper/findNewRequest";
    var request = $.ajax({
        url: url,
        method: "GET",
        dataType: "JSON"
    })

    request.done((result) => {
        // console.log(result.book_now);
        var book_now = result.book_now;
        var schedule_book = result.schedule_book;

        setNumberNotify(book_now.length, schedule_book.length);
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

function getCarById() {
    // var 
    var url = "/bookingHelper/car/";

    var request = $.ajax({
        url: url,
        method: "POST",
        dataType: "JSON"
    })

    request.done((result) => {
        // console.log(result.book_now);
        var book_now = result.book_now;
        var schedule_book = result.schedule_book;
        setNumberNotify(book_now.length, schedule_book.length);
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

function autoLoad() {
    setTimeout(function() {
        loadNewData();
        loadDataTable();
        autoLoad();
    }, 1000);
}

function init() {
    // enableButtonSend(false);
    autoLoad();
}

init();