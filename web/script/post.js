/*
$(document).ready(function() {
    var name = $('#userName').val();
    $('#p').click(function () {
            $.ajax({
                type: "POST",
                date:{
                    p : $('#p').val()
                },
                url: "addLike"
            });
        });
    });*/
/*let t=document.querySelectorAll(".i");
console.log(t);*/
let c = $(".i").val();
$.get('countServlet', {
    count: c
}, function (responseText) {
    $(".getLike").text(responseText);
});

let usName = document.querySelector("#usName");
let usSurname = document.querySelector("#usSurname");
let usId = document.querySelector("#usId");
let usPicUrl = document.querySelector("#usPicUrl");



let btn = document.querySelectorAll(".i");
let likes = document.querySelectorAll(".getLike")
let chat = document.querySelectorAll(".chat")
let add = document.querySelectorAll(".btn1")
let text = document.querySelectorAll(".m");


for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", like);
    add[i].addEventListener("click", addComment)
    likes[i].id = $(btn[i]).val();
    chat[i].id = $(btn[i]).val();
    add[i].id = $(btn[i]).val();
    text[i].id = $(btn[i]).val();
}

for (var k = 0; k < btn.length; k++) {
    let id = $(btn[k]).val();
    $.get('countServlet', {
        count: id
    }, function (responseText) {
        for (var j = 0; j < likes.length; j++) {
            if (likes[j].id == id) {
                var t = likes[j].id;
                $("#" + t).text(responseText);
            }
        }
    });
}

function like() {
    let id = $(this).val();
    $.ajax({
        url: 'addLike',
        data: {
            p: id
        },
        success: function (responseText) {
            $.get('countServlet', {
                count: id
            }, function (responseText) {
                for (var j = 0; j < likes.length; j++) {
                    if (likes[j].id == id) {
                        var t = likes[j].id;
                        $("#" + t).text(responseText);
                    }
                }
            });
        }
    });
}

$(document).ready(
    function () {
        $('input:file').change(
            function () {
                if ($(this).val()) {
                    $('input:submit').attr('disabled', false);
                }
            }
        );
    });

function addComment() {
    var idd = $(this).val();
    var x = "";
    for (var h = 0; h < text.length; h++) {
        if (text[h].id == idd) {
            console.log(text[h].id)
            x = text[h].value;
            break
        }
    }
    if (x != "") {
        $.ajax({
            url: 'addComment',
            data: {
                id: idd,
                comment: x
            }, success: function () {
                text[h].value = null;
                $.get('getComment', {
                    y: idd,
                    msg: x
                }, function (msg) {
                    for (var j = 0; j < chat.length; j++) {
                        if (chat[j].id == idd) {
                            var message = document.createElement("p");
                            var n = document.createElement("a");
                            var img = document.createElement("img");
                            message.className = "usMsg";
                            img.src = "/getAllPictures?j=" + usId.value;
                            img.width = 20;
                            n.href = "/guestServlet?id=" + usId.value;
                            n.innerHTML = usName.value + " " + usSurname.value;
                            message.innerHTML = msg;
                            chat[j].append(img, n, message)
                        }
                    }
                });
            }
        });
    }
}
let searchBody=document.querySelector("#searchBody");
searchBody.classList.remove('in');
document.querySelector("#search").oninput=function () {
    searchBody.innerHTML="";
    let val=this.value.trim();
    if(val!=""){
        searchBody.classList.remove('hide');
        searchBody.classList.add('in');
        $.ajax({
            url:'searchUser',
            data:{
                str:val
            },success : function (user) {
                let str = user.split(",")
                for (var i = 0; i < str.length; i++) {

                    var s = str[i];
                    let arr = s.split("/");
                    if (arr[0] != undefined && arr[1] != undefined) {
                        let us = document.createElement("a");
                        let img = document.createElement("img");
                        var br = document.createElement("br");
                        us.style.padding = 5;
                        us.style.color = "white";
                        img.style.paddingBottom = 5;

                        img.src = "/getAllPictures?j=" + arr[1];
                        img.width = 35;
                        us.href = "/guestServlet?id=" + arr[1];
                        us.innerHTML = arr[0];
                        let p=us.innerText;
                        if(us.innerText.toLowerCase().includes(val.toLowerCase())) {
                            us.innerHTML = insertMark(p, p.toLowerCase().indexOf(val.toLowerCase()), val.length);
                            searchBody.append(img, us, br);
                        }
                    }
                }
            }
        })

    }else{
        searchBody.classList.remove('in');
        searchBody.classList.add('hide');
        searchBody.innerHTML="";
    }
}
function insertMark(str,pos,len) {
    return str.slice(0,pos)+'<mark>'+str.slice(pos,pos+len)+'</mark>'+str.slice(pos+len)
}
/*function getLike() {
    console.log("ooo")
    let k = $(this).val();
    $.ajax({
        url: 'addLike',
        date: {
            count: k
        }
    })
}*/
