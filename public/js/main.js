
var lengthItemNew = 0;
var lengtItemCurrent = 0;
var isInit = true;
var statusTab = false;

var BOOKNOW = "booknow";
var SCHEDULEBOOK = "schedulebook";
var tab = BOOKNOW; 

function loadBookNowTab() {
    $('#menubooknow').addClass('active');
    $('#menuschedulebook').removeClass('active');
    tab = BOOKNOW;
    statusTab = true;
    loadDataTable();
}

function loadScheduleBookTab() {
    $('#menuschedulebook').addClass('active');
    $('#menubooknow').removeClass('active');
    tab = SCHEDULEBOOK;
    statusTab = true;
    loadDataTable();
}

function setNumberNotify(numberBookNow, numberScheduleBook) {
    $("#notifybooknow").html(numberBookNow);
    $("#notifyschedulebook").html(numberScheduleBook);
}

function approve() {
    var id = $("#idRequester").val();
    var message = 'Đã gửi yêu cầu thành công ' + id;
    notify(message, 'success');
}

function setDataTable(data) {
    var str = ``;
    var length = data.length;
    data.map((valuse, index) => {
        // console.log(valuse.subject);
        let id = valuse.id;
        let subject = valuse.subject;
        let requester = valuse.requester;
        let isRead = valuse.isRead;
        let classStatus = "unread";
        if(isRead) {
            classStatus = "read";
        }
        str += `
            <tr class='${classStatus}' onclick="onClickTable('${id}', this)">
                <td><i> ${subject} </i></td>
                <td>${requester}</td>
            </tr>
        `;
    })

    $("#datatable").html(str);
    $("#total").html(length);
    lengtItemCurrent = length;
}

function loadDataTable() {
    var url = "/bookingHelper/request";
    var request = $.ajax({
        url : url,
        method : "GET",
        dataType : "JSON"
    })

    request.done((result) => {
        var data = result.book_now;
        if(tab != BOOKNOW) {
            data = result.schedule_book;
        }
        var length = data.length;
        console.log(lengtItemCurrent);
        if(isInit) {
            setDataTable(data);
            isInit = false;
        } else {
            if(length > lengtItemCurrent) {
                setDataTable(data);
            } else {
                if(statusTab) {
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

function updateStatus(data) {
    var url = "/bookingHelper/request/" + data.id;
    data.isRead = true;
    var request = $.ajax({
        url : url,
        method : "PUT",
        data: data,
        dataType : "JSON"
    })

    request.done((result) => {
        console.log("Update status success");
        // loadNewData();
        // loadData();
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

function setFormData(data) {
    // console.log(data);
    let id = data.id;
    let subject = data.subject;
    let requester = data.requester;
    let product_booking = data.product_booking;
    let address_booking = data.address_booking;
    let content = data.content;
    let isRead = data.isRead;

    $("#id").html(id);
    $("#subject").html(subject);
    $("#requester").html(requester);
    $("#product_booking").html(product_booking);
    $("#address_booking").html(address_booking);
    $("#content").html(content);

    if(!isRead) {
        updateStatus(data);
    }
}

function onClickTable(id, event) {
    // console.log(event);
    $(event).removeClass();
    var url = "/bookingHelper/request/" + id;
    var request = $.ajax({
        url : url,
        method : "GET",
        dataType : "JSON"
    })

    request.done((result) => {
        setFormData(result);
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

function loadNewData() {
    var url = "/bookingHelper/findNewRequest";
    var request = $.ajax({
        url : url,
        method : "GET",
        dataType : "JSON"
    })

    request.done((result) => {
        // console.log(result.book_now);
        var book_now = result.book_now;
        var schedule_book = result.schedule_book;

        // var str = ``;
        // book_now.map((valuse, index) => {
        //     let id = valuse.id;
        //     let subject = valuse.subject;
        //     let requester = valuse.requester;
        //     str += `
        //         <tr onclick="onClickTable('${id}')">
        //             <td><b> ${subject} </b></td>
        //             <td>${requester}</td>
        //         </tr>
        //     `;
        // })

        // $("#datatable").prepend(str);
        // $("#total").html(book_now.length);
        // $("#notifybooknow").html(book_now.length);
        // $("#notifyschedulebook").html(schedule_book.length);
        setNumberNotify(book_now.length, schedule_book.length);
    })

    request.fail((jqXHR, textStatus) => {
        console.log(textStatus);
    })
}

function autoLoad() {
    setTimeout(function(){ 
        loadNewData();
        loadDataTable();
        autoLoad();
    }, 500);
}



function init() {
    loadNewData();
    autoLoad();
}

init();
