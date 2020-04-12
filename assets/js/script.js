/*
 Theme Name: Mr.Lancer cv/resume personal template  - script.js
 Author: Phoenixcoded
 Site URL   :   http://www.phoenixcoded.com
 Follow us  :   https://themeforest.net/user/phoenixcoded

 Version: 1.0
 */

$(document).ready(function(){

    /*=======Side-bar Menu Starts ======= */
    var $window = $(window);
    $window.resize(function resize() {
        if ($window.width() <= 1340) {
            $('body nav').css('left','-94px');
        }
        else{
            $('body nav').css('left','0');
        }
        $('#toggle_icon').on('click',function(){
            $(this).toggleClass('open');
        });
    }).trigger('resize');
    /*======= Side-bar Menu Ends ======= */

    /*Preloader Starts*/
    $(window).on('load',function(){
        $('#main_loader').fadeOut('slow');
    });
    /*Preloader Ends*/

});

/*======= Toggle Button Event js Starts ======= */
var sides = ["left", "top", "right", "bottom"];

// Initialize sidebars
for (var i = 0; i < sides.length; ++i) {
    var cSide = sides[i];
    $(".sidebar." + cSide).sidebar({side: cSide});
}

// Click handlers
$("#sidebar-btn").on("click", function () {
    var $this = $(this);
    var action = $this.attr("data-action");
    var side = $this.attr("data-side");
    $(".sidebar." + side).trigger("sidebar:" + action);
    return false;
});

/* ----------------------------------------
 Contact Form
 -------------------------------------------
 */

$("#submit-form").on("click", function(){
    send_form();
    return false;
});

function send_form(){

    //Firstname
    var input_first_name=$("input#first_name");
    var first_name =input_first_name.val();
    if (first_name == "") {
        input_first_name.focus();
        input_first_name.attr("placeholder", "Name must required");
        return false;
    }
    //Email
    var input_contact_email=$("input#contact_email");
    var email =input_contact_email.val();
    if (email == "") {
        input_contact_email.focus();
        input_contact_email.attr("placeholder", "Email address must required");
        return false;
    }
    else
    {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
            alert("Not a valid e-mail address");
            input_contact_email.focus();
            input_contact_email.attr("placeholder", "Please enter valid email address");
            return false;
        }
    }
    //Subject
    var input_subject=$("input#subject");
    var subject =input_subject.val();
    if (subject == "") {
        input_subject.focus();
        input_subject.attr("placeholder", "Subject must required..");
        return false;
    }

    //Message
    var contact_message=$("#contact_message");
    var message = contact_message.val();
    if (message == "") {
        contact_message.focus();
        contact_message.attr("placeholder", "Message field must required");
        return false;
    }
    //Datastring pass to mail.php
    var dataString = '&Name=' + first_name + '&subject=' + subject + '&email=' + email + '&message=' + message;
    var form = $(this);
    form.serialize();
    $.ajax({
        type: "POST", url: "mail/mail.php",	data: dataString, success: function() {
            alert('Thanks for your contact. Our team contact you soon as possible');
            $("#submit-form").attr('disabled','true');
        }
    });
}