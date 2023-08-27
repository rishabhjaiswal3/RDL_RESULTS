const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user_data = require("../model/user_data");
const moment = require("moment-timezone");

const data = require("../model/data.js");

let Items = [
  {
    id: 0,
    title: "RDL Delhi",
    startTime: "00:00:00",
    Difference: "00:15:00",
    timesList: ["00:00:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 96,
    autoFill: true,
  },
  {
    id: 1,
    title: "RDL Mumbai",
    startTime: "00:00:00",
    Difference: "00:30:00",
    timesList: ["00:00:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 48,
    autoFill: false,
  },
  {
    id: 2,
    title: "RDL Kolkata",
    startTime: "00:00:00",
    Difference: "01:00:00",
    timesList: ["00:00:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 24,
    autoFill: true,
  },
  {
    id: 3,
    title: "RDL Haryana",
    startTime: "19:00:00",
    Difference: "24:00:00",
    timesList: ["19:00:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 1,
    autoFill: false,
  },
  {
    id: 4,
    title: "Faridabad",
    startTime: "18:15:00",
    Difference: "24:00:00",
    timesList: ["18:15:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 1,
    autoFill: false,
  },
  {
    id: 5,
    title: "Ghaziabad",
    startTime: "21:00:00",
    Difference: "24:00:00",
    timesList: ["21:00:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 1,
    autoFill: true,
  },
  {
    id: 6,
    title: "Gali",
    startTime: "00:15:00",
    Difference: "24:00:00",
    timesList: ["00:15:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 1,
    autoFill: true,
  },
  {
    id: 7,
    title: "Deshawar",
    startTime: "05:15:00",
    Difference: "24:00:00",
    timesList: ["05:15:00"],
    values: [Math.floor(Math.random() * 100 + 1)],
    Iter: 1,
    autoFill: true,
  },
];

const auth = async (req, res, next) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const token = req.body.token;
    const verifyUser = jwt.verify(
      token,
      "wedsvcbs1$sdr12@rtresadsaafaste(qr2r%1334res#dfz!f^sar&3wq*"
    );
    //console.log(verifyUser)
    next();
  } catch (e) {
    res.send({ error: "invalid token" });
  }
};

const tConvert = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];
  // console.log(time)
  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  // console.log(time)
  // console.log(time[0])
  if (String(time[0]).length < 2) {
    time[0] = "0" + String(time[0]);
  }
  // console.log(time[0])
  return time[0] + time[1] + time[2] + " " + time[5];
};

const fetchDatabeforeDateAndTime = (res, date) => {
  // let today = new Date();
  var today = moment().tz("asia/kolkata").format("YYYY/MM/DD");

  let [yyyy, mm, dd] = today.split("/");
  //console.log'("sended date is",String(oldDate));

  // console.log(today,"    ===>",date)
  const date1 = new Date(yyyy, mm - 1, dd); // today
  const date2 = new Date(
    Number(date.split("/")[0]),
    Number(date.split("/")[1]) - 1,
    Number(date.split("/")[2])
  );
  //console.log'(date1,date2)
  if (date1 < date2) {
    // console.log("not allowed to send data")
    //console.log'("client will not be able to see future date data")
    res.send(null);
  } else if (date1 > date2) {
    // console.log(date1, date2)
    // console.log("send whole data outdated previous date")
    //console.log'("sitution 2");
    fetchResultDataByDate(date)
      .then((result) => {
        if (result == null) {
          res.status(200).json(null);
        } else {
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        //console.log'("my error is",err)
      });
  } else {
    // console.log("today date data is should be send");
    //console.log'("situation 3")
    const data = [];
    fetchResultDataByDate(date)
      .then((result) => {
        if (result == null) {
          // console.log("data should be sending ",result);
          res.status(200).json(null);
        } else {
          result.logs.forEach((log) => {
            let newItem = JSON.parse(JSON.stringify(log));

            newItem.timesList = [];
            newItem.values = [];
            let hour = moment().tz("asia/kolkata").hours();
            let min = moment().tz("asia/kolkata").minutes();
            let sec = moment().tz("asia/kolkata").seconds();

            let [year1, month1, date1] = date.split("/");

            // console.log(hour," : ",min + " : "+sec)
            let p1 = new Date(year1, month1 - 1, date1, +hour, +min, +sec);

            // let currentTime = hour+":"+min+":"+sec;

            let condition = false;

            log.timesList.forEach((time, index) => {
              let [hour1, min2, sec2] = time.split(":");
              let p2 = new Date(year1, month1 - 1, date1, +hour1, +min2, +sec2);
              if (p1.getTime() >= p2.getTime()) {
                newItem.timesList.push(time);
                newItem.values.push(log.values[index]);
              } else {
                if (condition == false) {
                  newItem.timesList.push(time);
                  newItem.values.push("Coming soon...");
                  condition = true;
                }
                //console.log'("value is not allowed to send")
              }
            });

            if (condition == false) {
              // console.log("let's insert a value")
              newItem.timesList.push(
                "Tomorrow " + tConvert(newItem.timesList[0])
              );
              newItem.values.push("Coming soon...");
            }

            data.push(newItem);
          });
          // console.log("data should be sending ",data);
          res.status(200).json({ logs: data });
        }
      })
      .catch((err) => {
        //console.log'("my error is 2",err)
      });

    //console.log'('just filter the data aaccording to time because date is same')
  }
};

const fetchDatabeforeTime = async (res, previousDate, date) => {
  const date1 = moment().tz("asia/kolkata").format("YYYY/MM/DD");
  // new Date(yyyy,mm,dd); // today
  // const date2 = new Date( Number(date.split('/')[0]),Number(date.split('/')[1])-1,Number(date.split('/')[2]))
  const date2 = date;

  //console.log'(date1,date2)
  //console.log'("situation let's get data from here")
  const data = [];
  // console.log("I am going to send data for now");
  fetchResultDataByDate(previousDate)
    .then((result) => {
      //console.log'(result,previousDate)
      if (result == null) {
        // console.log("yesterday data is null sending null")
        //console.log'('result is null');
        res.send(null);
      } else {
        result.logs.forEach((log) => {
          let newItem = JSON.parse(JSON.stringify(log));
          newItem.timesList = [];
          newItem.values = [];
          newItem.timesList.push(log.timesList[log.timesList.length - 1]);
          newItem.values.push(log.values[log.values.length - 1]);
          data.push(newItem);
        });
        // console.log("yesterday data is saved to send,perfectly working before it")

        fetchResultDataByDate(date)
          .then((result) => {
            if (result == null) {
              // console.log("not found anything of date",date)
            } else {
              //console.log'("got the result of current date")
              result.logs.forEach((log, logIndex) => {
                let ISTTime = moment().tz("asia/kolkata").format("HH:mm:ss");
                let hour = moment().tz("asia/kolkata").hours();
                let min = moment().tz("asia/kolkata").minutes();
                let sec = moment().tz("asia/kolkata").seconds();

                let [year1, month1, date1] = date.split("/");

                let p1 = new Date(year1, month1 - 1, date1, +hour, +min, +sec);

                let condition = false;
                log.timesList.forEach((time, index) => {
                  let [hour1, min2, sec2] = time.split(":");
                  let p2 = new Date(
                    year1,
                    month1 - 1,
                    date1,
                    +hour1,
                    +min2,
                    +sec2
                  );
                  if (p1.getTime() >= p2.getTime()) {
                    data[logIndex].timesList.push(time);
                    data[logIndex].values.push(log.values[index]);
                  } else {
                    if (condition == false) {
                      data[logIndex].timesList.push(time);
                      data[logIndex].values.push("Coming soon...");
                      condition = true;
                    }
                  }
                });
                if (condition == false) {
                  data[logIndex].timesList.push(data[logIndex].startTime);
                  data[logIndex].values.push("Coming soon...");
                }
                //console.log'(data[logIndex].timesList)
                //console.log'(data[logIndex].values)
              });
              // console.log("sending logs from here of today")
              res.status(200).json({ logs: data });
            }
          })
          .catch((err) => {
            // console.log("my error is 2",err)
          });
      }
    })
    .catch((err) => {
      //console.log'("my error is 2",err)
      res.send(null);
      // return null;
    });
};
// const fetchDatabeforeDateAndTime = (res, date) => {
//   // let today = new Date();
//   var today = moment().tz("asia/kolkata").format("YYYY/MM/DD");

//   let [yyyy, mm, dd] = today.split("/");
//   //console.log'("sended date is",String(oldDate));

//   // console.log(today,"    ===>",date)
//   const date1 = new Date(yyyy, mm - 1, dd); // today
//   const date2 = new Date(
//     Number(date.split("/")[0]),
//     Number(date.split("/")[1]) - 1,
//     Number(date.split("/")[2])
//   );
//   //console.log'(date1,date2)
//   if (date1 < date2) {
//     // console.log("not allowed to send data")
//     //console.log'("client will not be able to see future date data")
//     res.send(null);
//   } else if (date1 > date2) {
//     // console.log(date1, date2)
//     // console.log("send whole data outdated previous date")
//     //console.log'("sitution 2");
//     fetchResultDataByDate(date)
//       .then((result) => {
//         if (result == null) {
//           res.status(200).json(null);
//         } else {
//           res.status(200).json(result);
//         }
//       })
//       .catch((err) => {
//         //console.log'("my error is",err)
//       });
//   } else {
//     // console.log("today date data is should be send");
//     //console.log'("situation 3")
//     const data = [];
//     fetchResultDataByDate(date)
//       .then((result) => {
//         if (result == null) {
//           // console.log("data should be sending ",result);
//           res.status(200).json(null);
//         } else {
//           result.logs.forEach((log) => {
//             let newItem = JSON.parse(JSON.stringify(log));

//             newItem.timesList = [];
//             newItem.values = [];
//             let hour = moment().tz("asia/kolkata").hours();
//             let min = moment().tz("asia/kolkata").minutes();
//             let sec = moment().tz("asia/kolkata").seconds();

//             let [year1, month1, date1] = date.split("/");

//             // console.log(hour," : ",min + " : "+sec)
//             let p1 = new Date(year1, month1 - 1, date1, +hour, +min, +sec);

//             // let currentTime = hour+":"+min+":"+sec;

//             let condition = false;

//             log.timesList.forEach((time, index) => {
//               let [hour1, min2, sec2] = time.split(":");
//               let p2 = new Date(year1, month1 - 1, date1, +hour1, +min2, +sec2);
//               if (p1.getTime() >= p2.getTime()) {
//                 newItem.timesList.push(time);
//                 newItem.values.push(log.values[index]);
//               } else {
//                 if (condition == false) {
//                   newItem.timesList.push(time);
//                   newItem.values.push("Coming soon...");
//                   condition = true;
//                 }
//               }
//             });

//             if (condition == false) {
//               newItem.timesList.push(
//                 "Tomorrow " + tConvert(newItem.timesList[0])
//               );
//               newItem.values.push("Coming soon...");
//             }

//             data.push(newItem);
//           });
//           res.status(200).json({ logs: data });
//         }
//       })
//       .catch((err) => {
//         //console.log'("my error is 2",err)
//       });

//     //console.log'('just filter the data aaccording to time because date is same')
//   }
// };

async function fetchResultDataByDate(date) {
  let p = date.split("/");
  if (p[1].length == 1) {
    p[1] = "0" + p[1];
  }
  if (p[2].length == 1) {
    p[2] = "0" + p[2];
  }
  date = p[0] + "/" + p[1] + "/" + p[2];
  let result = await data.findOne({ date: date });

  return result;
}

// to change the all cards timing just change oldtime and difference and iter
count = 0;

function setTimelist2(date) {
  let old = JSON.parse(JSON.stringify(Items));

  for (let i = 0; i < old.length; i++) {
    let addTime = old[i]["Difference"];
    let Oldtime = old[i]["timesList"][old[i]["timesList"].length - 1];

    for (let ii = 0; ii < old[i].Iter - 1; ii++) {
      Oldtime = old[i]["timesList"][old[i]["timesList"].length - 1];
      let hh = Oldtime[0] + Oldtime[1];
      let mm = Oldtime[3] + Oldtime[4];
      let ss = Oldtime[6] + Oldtime[7];

      let future = moment()
        .utcOffset("+05:30")
        .hour(hh)
        .minute(mm)
        .second(ss)
        .add("hour", addTime[0] + addTime[1])
        .add("minute", addTime[3] + addTime[4])
        .add("second", addTime[6] + addTime[7])
        .format("HH:mm:ss");
      old[i]["timesList"].push(future);
      old[i]["values"].push(
        Math.floor(old[i].autoFill ? Math.random() * 100 + 1 : null)
      );
      // $set(old[i]['values'],old[i]['values'].length-1,-1);
    }
  }

  data.findOne({ date: date }, function (err, result) {
    if (err) {
      return null;
    }
    if (result == null) {
      const dbData = new data({ date: date, logs: old });
      dbData
        .save()
        .then((res) => {
          console.log("data saved in db");
        })
        .catch((err) => {
          console.log("facing error in fetching information from db");
        });
    }
  });

  const TotalData = new data({ date: date }, function (err, result) {
    // console.log(result)
    // console.log("not")
  });
}

function middleOfTheNight() {
  setTimeout(() => {
    let date = moment();
    const oneYearLater = currentDate.add(1, "years");
    console.log("==========>", oneYearLater);
    setTimelist2(oneYearLater);
  }, 3600000 * 24);
  // var now = new Date();
  // var night = new Date(
  //   now.getFullYear(),
  //   now.getMonth(),
  //   now.getDate() + 1, // the next day, ...
  //   0,
  //   0,
  //   0 // ...at 00:00:00 hours
  // );
  // var msToMidnight = night.getTime() - now.getTime();
  // setTimeout(function () {
  // let today = new Date();
  //   for (let i = 0; i < 1000; i++) {
  //     // date = '2022/01/01'
  //     setTimeout(() => {
  //       let date = new Date(2022, 0, 1);
  //       date.setDate(date.getDate() + i);
  //       date = date.toLocaleDateString("en-US");
  //       let year = date.split("/")[2];
  //       let month = date.split("/")[0];
  //       let day = date.split("/")[1];
  //       if (month < 10) {
  //         month = String("0" + String(month));
  //       }
  //       if (day < 10) {
  //         day = String("0" + String(day));
  //       }
  //       date = String(year + "/" + month + "/" + day);
  //     }, 100 * i);
  //   }
  // }, 100);
}

middleOfTheNight();

const datafind = (res, name, date) => {
  name.findOne({ date: date }, function (err1, result) {
    return result;
  });
};

const datasave = (res, name, date, logs) => {
  //console.log'("in data find folder")
  name.findOne({ date: date }, function (err1, result) {
    if (err1) {
      //console.log'(err1)
      res
        .status(505)
        .json({ error: `facing error from database Error 1 ,${err1}` });
    }
    // //console.log'(result)
    if (result !== null) {
      const update = { logs: logs };
      const filter = { date: date };
      name
        .findOneAndUpdate(date, update)
        .then(() => {
          res.status(200).json({ result: "data updated sucessfully" });
        })
        .catch((err2) => {
          res
            .status(500)
            .json({ error: `facing error from database Error 1 ,${err2}` });
        });
    } else {
      const data = new name({ date, logs });
      data
        .save()
        .then(() => {
          res.status(200).json("data is saved sucessfully");
        })
        .catch((err3) => {
          res
            .status(500)
            .json({ error: `facing error from database Error 1 ,${err3}` });
        });
    }
  });
};

// const fetchDatabeforeTime = async (res, previousDate, date) => {
//   const date1 = moment().tz("asia/kolkata").format("YYYY/MM/DD");
//   // new Date(yyyy,mm,dd); // today
//   // const date2 = new Date( Number(date.split('/')[0]),Number(date.split('/')[1])-1,Number(date.split('/')[2]))
//   const date2 = date;

//   //console.log'(date1,date2)
//   //console.log'("situation let's get data from here")
//   const data = [];
//   // console.log("I am going to send data for now");
//   fetchResultDataByDate(previousDate)
//     .then((result) => {
//       //console.log'(result,previousDate)
//       if (result == null) {
//         // console.log("yesterday data is null sending null")
//         //console.log'('result is null');
//         res.send(null);
//       } else {
//         result.logs.forEach((log) => {
//           let newItem = JSON.parse(JSON.stringify(log));
//           newItem.timesList = [];
//           newItem.values = [];
//           newItem.timesList.push(log.timesList[log.timesList.length - 1]);
//           newItem.values.push(log.values[log.values.length - 1]);
//           data.push(newItem);
//         });
//         // console.log("yesterday data is saved to send,perfectly working before it")

//         fetchResultDataByDate(date)
//           .then((result) => {
//             if (result == null) {
//               // console.log("not found anything of date",date)
//             } else {
//               //console.log'("got the result of current date")
//               result.logs.forEach((log, logIndex) => {
//                 let ISTTime = moment().tz("asia/kolkata").format("HH:mm:ss");
//                 let hour = moment().tz("asia/kolkata").hours();
//                 let min = moment().tz("asia/kolkata").minutes();
//                 let sec = moment().tz("asia/kolkata").seconds();

//                 let [year1, month1, date1] = date.split("/");

//                 let p1 = new Date(year1, month1 - 1, date1, +hour, +min, +sec);

//                 let condition = false;
//                 log.timesList.forEach((time, index) => {
//                   let [hour1, min2, sec2] = time.split(":");
//                   let p2 = new Date(
//                     year1,
//                     month1 - 1,
//                     date1,
//                     +hour1,
//                     +min2,
//                     +sec2
//                   );
//                   if (p1.getTime() >= p2.getTime()) {
//                     data[logIndex].timesList.push(time);
//                     data[logIndex].values.push(log.values[index]);
//                   } else {
//                     if (condition == false) {
//                       data[logIndex].timesList.push(time);
//                       data[logIndex].values.push("Coming soon...");
//                       condition = true;
//                     }
//                   }
//                 });
//                 if (condition == false) {
//                   data[logIndex].timesList.push(data[logIndex].startTime);
//                   data[logIndex].values.push("Coming soon...");
//                 }
//                 //console.log'(data[logIndex].timesList)
//                 //console.log'(data[logIndex].values)
//               });
//               // console.log("sending logs from here of today")
//               res.status(200).json({ logs: data });
//             }
//           })
//           .catch((err) => {
//             // console.log("my error is 2",err)
//           });
//       }
//     })
//     .catch((err) => {
//       //console.log'("my error is 2",err)
//       res.send(null);
//       // return null;
//     });
// };

router.post("/auth", auth, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  //console.log("it is not authenticated yet please check it from backend");

  res.json({ data: "getting response from the server" });
});

// working
router.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send("Hello World for API for now");
});

// working
router.get("/getSharingData", (req, res) => {
  let whatsapp = {
    url: "https://play.google.com/store/apps/details?id=org.rdl.results.app",
    message: "install RDL Results app from google playstore ",
  };
  res.status(200).json(whatsapp);
});

router.post("/login", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("my req body is", req?.body);
  // console.log(req.body.email._value);
  // console.log(req.body.password._value);
  const user = await user_data.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        email: req.body.email,
        password: req.body.password,
      },
      "wedsvcbs1$sdr12@rtresadsaafaste(qr2r%1334res#dfz!f^sar&3wq*"
    );
    return res.json({ status: "ok", user: true, jwt: token });
  } else {
    return res.json({ status: "error", user: "data not found" });
  }
  res.status(200).json({ data: "received data perfectly" });
});

router.get("/record", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { name, date } = req.body;
  if (!date || !name) {
    res.status(422).json({ error: "insufficient data" });
  }

  try {
    //console.log(name)
    if (name == "gurgaon_ncr") {
      return datafind(res, gurgaon_ncr, date);
    } else if (name == "delhi_ncr") {
      return datafind(res, delhi_ncr, date);
    } else if (name == "ghaziabad_ncr") {
      return datafind(res, ghaziabad_ncr, date);
    } else if (name == "noida_ncr") {
      return datafind(res, noida_ncr, date);
    } else if (name == "faridabad") {
      return datafind(res, faridabad, date);
    } else if (name == "ghaziabad") {
      return datafind(res, ghaziabad, date);
    } else if (name == "gali") {
      return datafind(res, gali, date);
    } else {
      // if(name == 'deshawar'){
      return datafind(res, deshawar, date);
    }
  } catch (e) {
    //console.log'("==> ",e);
  }
});

router.post("/getClientSideData", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  fetchDatabeforeDateAndTime(res, req.body.date);
});

router.post("/getClientCurrentData", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  var last = moment()
    .tz("asia/kolkata")
    .subtract(1, "days")
    .format("YYYY/MM/DD");
  //console.log'("my last date is",last)
  //console.log'("req body time is",req.body.date)

  fetchDatabeforeTime(res, last, req.body.date);
});

router.post("/save", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { name, date, logs } = req.body;
  if (!date || !logs || !name) {
    res.status(422).json({ error: "insufficient data" });
  }
  try {
    //console.log'(name)
    if (name == "gurgaon_ncr") {
      return datasave(res, gurgaon_ncr, date, logs);
    } else if (name == "delhi_ncr") {
      return datasave(res, delhi_ncr, date, logs);
    } else if (name == "ghaziabad_ncr") {
      return datasave(res, ghaziabad_ncr, date, logs);
    } else if (name == "noida_ncr") {
      return datasave(res, noida_ncr, date, logs);
    } else if (name == "faridabad") {
      return datasave(res, faridabad, date, logs);
    } else if (name == "ghaziabad") {
      return datasave(res, ghaziabad, date, logs);
    } else if (name == "gali") {
      return datasave(res, gali, date, logs);
    } else {
      // if(name == 'deshawar'){
      return datasave(res, deshawar, date, logs);
    }
  } catch (err) {
    res.status(401).json({ error: `Now facing error in name Error 0 ${err}` });
  }
});

router.post("/updateUpcomingResults", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  data.findOne({ date: req.body.date }).then(async (result) => {
    // //console.log'(result)
    result.logs = req.body.logs;
    await data
      .findOneAndReplace(
        { date: req.body.date },
        { date: result.date, logs: result.logs }
      )
      .then((resul) => {
        res.send(resul);
        //console.log'('data is updated successfully')
      })
      .catch((err) => {
        //console.log'("facing error in updating data of timing")})
      })
      .catch((err) => {
        res.send({ error: "facing error in updaing data" });
        //console.log'("facing error in result",err)
      });

    // res.send("data updated successfully");
  });
});

router.post("/changeTimeOfCity", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // //console.log'(req.body)
  let newDate = req.body.date;
  let city = req.body.city;
  let newTime = req.body.time;

  data
    .find({})
    .then(async (results) => {
      results.forEach((result) => {
        result.logs.forEach((log) => {
          if (log.title == city) {
            log.timesList = [newTime];
            log.startTime = newTime;
          }
        });

        console.log(result);
        data
          .findOneAndUpdate({ _id: result._id }, { logs: result.logs })
          .then((myresult) => {
            console.log("my results is here", myresult);
          })
          .catch((err) => {
            console.log("sorry we are unable to change it for all");
          });
      });
      Items.forEach((item) => {
        if (item.title == city) {
          item.timesList = [newTime];
          item.startTime = newTime;
        }
      });
    })
    .catch(() => {});
});

router.post("/getUpcomingResultDetails", auth, async (req, res) => {
  //console.log'("will give you data");
  res.set("Access-Control-Allow-Origin", "*");
  fetchResultDataByDate(req.body.date)
    .then((result) => {
      if (result == null) {
        res.status(200).json(null);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      //console.log'("my error is",err)
    });
});

module.exports = router;
