
const mailer = (function mailerFront() {
    "use strict";
    
    var inputobject, inputemail, inputmessage;
    
    const doAjax = function doAjax(url, method, callback, data) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            data = data ? JSON.stringify(data) : null;
            if (method.toLowerCase() === "post") {
                if (!data) throw new Error('bad call');
            }
            xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);
            xhr.send(data);
        } catch (err) {
            console.log(err);
        }
    };

    const send = function sendMail(e) { 
        e.preventDefault();
//        return console.log("ici tout va bien")
        const url = "http://localhost:8081/contact";
        doAjax(url, "POST", res => {
            console.log(JSON.parse(res));
        }, {
            mail: inputemail.value,
            object: inputobject.value,
            message: inputmessage.value
        });
    };

    const start = function start() {
        document.getElementById("btn_sub").onclick = send;
        inputobject = document.getElementById("subject");
        inputemail = document.getElementById("sender");
        inputmessage = document.getElementById("message");
    };


    return {
        start
    }
    
}());
