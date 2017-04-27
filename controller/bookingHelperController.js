var allData = {
    schedule_book: [
        {
            isRead: true,
            content: {
                "id": "1",
                "requester": "Nguyen Van A",
                "subject": "schedule book 1",
                "book_type": "calling",
                "product_booking": "xe 4 cho",
                "address_booking": "can Tho",
                "content": "content 1"
            }
        },
         {
            isRead: false,
            content: {
                "id": "2",
                "requester": "Nguyen Van B",
                "subject": "schedule book 2",
                "book_type": "calling",
                "product_booking": "xe 6 cho",
                "address_booking": "Quan 1, TP.HCM",
                "content": "content 1"
            }
         }
    ],
    book_now: [
         {
            isRead: true,
            content: {
                "id": "3",
                "requester": "Nguyen Van C",
                "subject": "book now 1",
                "book_type": "calling",
                "product_booking": "xe 4 cho",
                "address_booking": "can Tho",
                "content": "content 1"
            }
        },
         {
            isRead: false,
            content: {
                "id": "4",
                "requester": "Nguyen Van D",
                "subject": "book now 2",
                "book_type": "calling",
                "product_booking": "xe 6 cho",
                "address_booking": "Quan 1, TP.HCM",
                "content": "content 1"
            }
        }
    ]
}

var unreadData = {
    schedule_book: [
         {
             "id": "1",
            "requester": "Nguyen Van B",
            "subject": "schedule book 2",
            "book_type": "calling",
            "product_booking": "xe 6 cho",
            "address_booking": "Quan 1, TP.HCM",
            "content": "content 1"
        }
    ],
    book_now: [
        {
            "id": "3",
            "requester": "Nguyen Van D",
            "subject": "book now 2",
            "book_type": "calling",
            "product_booking": "xe 6 cho",
            "address_booking": "Quan 1, TP.HCM",
            "content": "content 1"
        }
    ]
}

var request = {
    "id": "2",
    "requester": "Nguyen Van B",
    "subject": "schedule book 2",
    "book_type": "calling",
    "product_booking": "xe 6 cho",
    "address_booking": "Quan 1, TP.HCM",
    "content": "content 1"
}
exports.getRequests = function (req, res) {
    res.status(200).json(allData);
}

exports.findNewRequest = function (req, res) {
    res.status(200).json(unreadData);
}

exports.loadRequest = function (req, res) {
    res.status(200).json(request);
}