// const request = require("request");
const getCalorieApi = () => {
  $.ajax({
    method: "GET",
    url: "https://api.calorieninjas.com/v1/nutrition?query=" + "pizza",
    headers: { "X-Api-Key": "XFiTzPSX3hS7OAwuJdJ7og==djDIMemMGZ3ZY9Ce" },
    // contentType: "application/json",
    // success: function (result) {
    //   console.log(result);
    // },
    // error: function ajaxError(jqXHR) {
    //   console.error("Error: ", jqXHR.responseText);
    // },
  }).then((response) => {
    console.log(response);
  });
};
getCalorieApi();
//   e.preventDefault();
//   $.ajax({
//     method: "GET",
//     url: "https://api.calorieninjas.com/v1/nutrition?query=" + "pizza",
//     headers: { "X-Api-Key": "XFiTzPSX3hS7OAwuJdJ7og==djDIMemMGZ3ZY9Ce" },
//     // contentType: "application/json",
//     // success: function (result) {
//     //   console.log(result);
//     // },
//     // error: function ajaxError(jqXHR) {
//     //   console.error("Error: ", jqXHR.responseText);
//     // },
//   }).then((response) => {
//     console.log(response);
//   });
// };
// getCalorieApi();
// $("#trackButton").on("click", function () {
//   getCalorieApi();
// });
