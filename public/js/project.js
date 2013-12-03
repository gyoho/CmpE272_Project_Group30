

$(document).ready(function(){

//$.doImportJSON('/src/app/editorCtrl.doImportJSON.js');

  $('#logoutMenu').hide();

  $('.error').hide();

    $("#registerButton").click(function() {  
    // validate and process form here

     $('.error').hide();  
      var name = $("input#userName").val();  
        if (name == "") {  
      $("#userName_error").show();  
      $("input#userName").focus();  
      return false;  
    }  
      var email = $("input#registerEmail").val();  
        if (email == "") {  
      $("#email_error").show();  
      $("input#email").focus();  
      return false;  
    }  
      var password = $("input#registerPassword").val();  
        if (password == "") {  
      $("#password_error").show();
      $("input#password").focus();  
      return false;  
    }

    var dataString = 'userName='+ name + '&email=' + email + '&password=' + password;  
    //alert (dataString);return false;  
    $.ajax({  
      type: "POST",  
      url: "/api/users",  
      data: dataString,  
      success: function() {  
      /*  $('#contact_form').html("<div id='message'></div>");  
        $('#message').html("<h2>Contact Form Submitted!</h2>")  
        .append("<p>We will be in touch soon.</p>")  
        .hide()  
        .fadeIn(1500, function() {  
          $('#message').append("<img id='checkmark' src='images/check.png'/>");
        });*/  
        $('#register').modal('hide');
        $('#loginMenu').hide();
        $('#logoutMenu').show();
      }  
    });  
    return false;   
  });

  $("#loginButton").click(function() {
  // validate and process form here

      $('.error').hide();  
        var email = $("input#email").val();  
          if (email == "") {  
        $("label#email_error").show();  
        $("input#email").focus();  
        return false;  
      }  
        var password = $("input#password").val();  
          if (password == "") {  
        $("label#password_error").show();  
        $("input#password").focus();  
        return false;  
      }

      var dataString = 'email=' + email + '&password=' + password;  
      //alert (dataString);return false;  
      $.ajax({  
        type: "POST",  
        url: "/login",  
        data: dataString,  
        success: function() {  
        /*  $('#contact_form').html("<div id='message'></div>");  
          $('#message').html("<h2>Contact Form Submitted!</h2>")  
          .append("<p>We will be in touch soon.</p>")  
          .hide()  
          .fadeIn(1500, function() {  
            $('#message').append("<img id='checkmark' src='images/check.png'/>");
          });*/  
          $('#login').modal('hide');
          $('#loginMenu').hide();
          $('#logoutMenu').show();
        }  
      });  
      return false;  
  }); 

$("#logoutButton").click(function() {
  // validate and process form here
      //alert (dataString);return false;  
      $.ajax({  
        type: "GET",  
        url: "/logout",   
        success: function() {
          $('#logoutMenu').hide();
          $('#loginMenu').show();
        }  
      });  

      $('#projectsList').empty();
      return false;  
  }); 

// $('#loadButton').click(function(){
//   debugger;
//       // load stage as a json string
//       $.ajax({
//         type: "GET",
//         url: "/api/projects",
//         success: function(projects){
//           //var list ="";
          
//           $('#projectsList').empty();
//           for(var i=0; i<projects.length; i++){
//          /**list += <li data-id= + "projects[i]._id"> + projects[i].projectName + "<a href="'#'">" + "</a>" + "</li>";**/
//          debugger;
//             //list += '<li> <a  ng-click="loadProject(123)" >' + projects[i].projectName + '</a> </li>';

//               var $li = $("<li>").attr("data-id", projects[i]._id).appendTo("#projectsList");
//               $("<a>").attr("ng-click", "loadProject('"+projects[i]._id+"')").text(projects[i].projectName).appendTo($li);

//           }

//          // $('#projectsList').empty();
//           // $('#projectsList').append(list);
//          //  $('#projectsList li').click(function(){
//          //    loadProject("123");

//          // });
//         },
//         dataType: "json"
//       });
//       //console.dir(json);     
//     });




});


