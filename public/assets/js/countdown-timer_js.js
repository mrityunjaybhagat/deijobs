$(document).ready(function () {

  // $(".limit-button").on("click", function () {
  //   $('.limit').css("display", "none");
  //   $(".repeat").css("display", "none");
  //   $("form").append(`<input class="datetime-local" type="datetime-local">`);
  //   $(".datetime-local").insertBefore(".begin");
  //   $(".begin").css("display", "flex");
  // });
  // $(".repeat-button").on("click", function () {
  //   $('.repeat').css("display", "none");
  //   $(".limit").css("display", "none");
  //   $("form").append(`<input class="text" type="text" placeholder="Please type the number of days to countdown.">`);
  //   $(".text").insertBefore(".begin");
  //   $(".begin").css("display", "flex");
  // });

  // $("form").on("submit", function (e) {
    // e.preventDefault();

    // const typeInput = $("input")[0].type;
    // const userInput = $("input").val();
    let seconds;

    // if (typeInput == "text") {
    //   if (userInput == "" || isNaN(userInput)) {
    //     alert("Please enter a valid date time");
    //   } else if (!isNaN(userInput)) {
    //     seconds = parseInt(userInput) * 86400;
    //     console.log(seconds);
    //   }
    // } else {
    //   if (userInput == "") {
    //     alert("Please enter a valid date time");
    //   } else {
        const date = new Date('Sat Oct 21 2023 00:00:00 GMT+0530 (India Standard Time)');
        const now = new Date();
        seconds = parseInt((date.getTime() - now.getTime()) / 1000);
    //     console.log(seconds);
    //   }
    // }

    if (seconds > 0) {
    //   alert("Please enter a valid date time");
    // } else {
    //   let days, hours, minutes;

      // if (typeInput == "text") {
      //   days = Math.floor(seconds / (3600 * 24)) - 1;
      //   hours = 23;
      //   minutes = 59;
      //   seconds = 59;
      // } else {
        days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
      // }


      const validationPrint = (timeUnit) => {
        return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
      };

      $("#seconds").text(validationPrint(seconds));
      $("#minutes").text(validationPrint(minutes));
      $("#hours").text(validationPrint(hours));
      $("#days").text(validationPrint(days));

      const changeTimeWithLimit = setInterval(() => {
        seconds -= 1;
        $("#seconds").text(validationPrint(seconds));
        if (seconds === 0 && minutes > 0) {
          seconds = 60;
          minutes -= 1;
          $("#minutes").text(validationPrint(minutes));
        }
        if (seconds === 0 && minutes === 0 && hours > 0) {
          seconds = 60;
          minutes = 60;
          hours -= 1;
          $("#hours").text(validationPrint(hours));
        }
        if (seconds === 0 && minutes === 0 && hours === 0 && days > 0) {
          seconds = 60;
          minutes = 60;
          hours = 24;
          days -= 1;
          $("#days").text(validationPrint(days));
        }
        if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
          clearInterval(changeTimeWithLimit);
        }
      }, 1000);

    }
  // });
});
