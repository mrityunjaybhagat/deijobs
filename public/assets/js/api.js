
function getPageName(url) {
     var index = url.lastIndexOf("/") + 1;
     var filenameWithExtension = url.substr(index);
     var filename = filenameWithExtension.split(".")[0]; 

     filename = filename.split("?")[0]; // <-- added this line

     return filename;                                  


}
var login_page = 'index.html';

$("#side_bar").load("side_bar.html",function(){
    $("#menu_"+getPageName(window.location.href)).addClass('active');
});
$("#head_nav").load("head_nav.html",function(){

    if(is_login_required == true && !localStorage.getItem('employeeId')){
        location.assign(login_page+'?sc=login');
    }


    if(getPageName(window.location.href) == "search"){
        $("#header_search").hide();
    }else{
        $("#header_search").on("click",function(){
            location.assign('search.html');
        });
    }
    var initial_name = "C N";
    if(localStorage.getItem('name')){
        initial_name = localStorage.getItem('name');
    }
    initial_name = initial_name.split(" ");
    $("#user_initial").html(initial_name[0][0]+initial_name[1][0]);

});
$("#footer_div").load("footer.html");

$(document).on("click","#logout_btn",function(e){
    e.preventDefault();
    localStorage.clear();
    location.assign(login_page);
}); 



// var api_url = "https://jobportaladmin.lokytripathi.in";
var api_url = "https://deijobs.in/deijobs-api";


function api_call(url, post_data, callback, obj=null){
    if(obj){
        obj.Button('loading');
    }
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(post_data),
        success: function(data) {
            response_data = JSON.parse(data);
            console.log(response_data);
            callback(response_data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        },
        complete: function(){
            if(obj){
                obj.Button('reset');
            }
        }
    });
}

function set_img(){
    e.target.src = "images/logo.png";
}



$( document ).ajaxComplete(function(event, xhr, options) {
  // console.log("xhr:");
  // console.log(options.dataType);
  if(options.dataType != "html"){
    var resdata = $.parseJSON(xhr.responseText);
    if(resdata.code == 700){
        // alert(700);
        location.assign(login_page+'?sc=login');
    }
  }
});
   
$(document).on("change","select",function(e){
    if($(this).val() == ""){
        $(this).addClass('pcholder');
    }else{
        $(this).removeClass('pcholder');
    }
});

$.fn.Button = function(action) {
    
    if (action === 'loading' && this.data('loading-text')) {
        this.data('original-text', this.html()).html(this.data('loading-text')).prop('disabled', true);
    }
    if (action === 'reset' && this.data('original-text')) {
        this.html(this.data('original-text')).prop('disabled', false);
    }
};

// async function api_call(url, post_data) {

//     const requestData = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(post_data),
//       };

//     try {
//         const response = await fetch(url, requestData);

//       // Check if the response is successful (HTTP status code 200-299)
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json(); // Parse the response as JSON

//       console.log('API response:', data);
//       return data;
//       // You can now work with the data from the API response
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
