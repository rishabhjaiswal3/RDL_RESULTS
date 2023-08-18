const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user_data = require("../model/user_data");
const moment = require("moment");
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
    console.log(req.body.token);
    const token = req.body.token;
    console.log(token);
    const verifyUser = jwt.verify(
      token,
      "wedsvcbs1$sdr12@rtresadsaafaste(qr2r%1334res#dfz!f^sar&3wq*"
    );
    console.log(verifyUser);
    next();
  } catch (e) {
    res.send({ error: "invalid token" });
  }
};

async function fetchResultDataByDate(date) {
  let result = await data.findOne({ date: date });
  return result;
}

// to change the all cards timing just change oldtime and difference and iter
count = 0;
function setTimelist2(date) {
  let old = JSON.parse(JSON.stringify(Items));
  // console.log(old)
  console.log("from time setting3");
  for (let i = 0; i < old.length; i++) {
    console.log("from time setting2");
    let addTime = old[i]["Difference"];
    let Oldtime = old[i]["timesList"][old[i]["timesList"].length - 1];

    if (old[i].autoFill == true) {
      old[i]["values"][0] = Math.floor(Math.random() * 100 + 1);
    }

    for (let ii = 0; ii < old[i].Iter - 1; ii++) {
      // console.log("=>",count)
      // count++;
      // console.log("getting old");
      // console.log(old[i]['timesList'][0])
      // console.log(old[i]['timesList'].length)
      Oldtime = old[i]["timesList"][old[i]["timesList"].length - 1];
      let hh = Oldtime[0] + Oldtime[1];
      let mm = Oldtime[3] + Oldtime[4];
      let ss = Oldtime[6] + Oldtime[7];

      let future = moment()
        .hour(hh)
        .minute(mm)
        .second(ss)
        .add("hour", addTime[0] + addTime[1])
        .add("minute", addTime[3] + addTime[4])
        .add("second", addTime[6] + addTime[7])
        .format("HH:mm:ss");
      // console.log(Oldtime)
      // console.log(addTime)
      // console.log("future time is ",future)
      old[i]["timesList"].push(future);
      old[i]["values"].push(
        Math.floor(old[i].autoFill ? Math.random() * 100 + 1 : null)
      );
      // $set(old[i]['values'],old[i]['values'].length-1,-1);
    }
  }

  // date =  + date.split('/') + date.split('/')
  // 2022/09/15

  // 9/15/2022

  // console.log("old here",old)
  // console.log(date)
  // const date = new Date().
  data.findOne({ date: date }, function (err, result) {
    if (err) {
      // console.log(err)
      return null;
    }
    // console.log("date ",date," value ==>",result===null)
    if (result == null) {
      const dbData = new data({ date: date, logs: old });
      dbData
        .save()
        .then((res) => {
          console.log("data saved in db >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          // console.log(res)
        })
        .catch((err) => {
          // console.log('facing error in fetching information from db')
        });
      // console.log("my result is",);
      // return {'date':date,'logs':old};
    }
  });
  const TotalData = new data({ date: date }, function (err, result) {
    // console.log(result)
    // console.log("not")
  });
}

function middleOfTheNight() {
  var now = new Date();
  var night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0,
    0,
    0 // ...at 00:00:00 hours
  );

  var msToMidnight = night.getTime() - now.getTime();
  setTimeout(function () {
    let today = new Date();

    for (let i = 0; i < 7300; i++) {
      // date = '2022/01/01'
      setTimeout(() => {
        let date = new Date(2022, 0, 1);
        date.setDate(date.getDate() + i);
        date = date.toLocaleDateString("en-US");

        let year = date.split("/")[2];
        let month = date.split("/")[0];
        let day = date.split("/")[1];

        if (month < 10) {
          month = String("0" + String(month));
        }
        if (day < 10) {
          day = String("0" + String(day));
        }
        date = String(year + "/" + month + "/" + day);
        setTimelist2(date);
      }, 100 * i);
    }
  }, 100);
}

middleOfTheNight();

const datafind = (res, name, date) => {
  name.findOne({ date: date }, function (err1, result) {
    return result;
  });
};

router.post("/auth", auth, async (req, res) => {
  console.log("it is not authenticated yet please check it from backend");

  res.json({ data: "getting response from the server" });
});

router.post("/login", async (req, res) => {
  // console.log(req.body.email._value);
  // console.log(req.body.password._value);
  const user = await user_data.findOne({
    email: req.body.email._value,
    password: req.body.password._value,
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
  const { name, date } = req.body;
  if (!date || !name) {
    res.status(422).json({ error: "insufficient data" });
  }

  try {
    console.log(name);
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
    console.log("==> ", e);
  }
});

const fetchDatabeforeDateAndTime = (res, date) => {
  let oldDate =
    date.split("/")[2] + "/" + date.split("/")[1] + "/" + date.split("/")[0];
  let today = new Date();

  let dd = Number(today.getDate());

  let mm = Number(today.getMonth()); //January is 0!
  let yyyy = Number(today.getFullYear());

  console.log("sended date is", String(oldDate));

  const date1 = new Date(yyyy, mm, dd); // today
  const date2 = new Date(
    Number(date.split("/")[0]),
    Number(date.split("/")[1]) - 1,
    Number(date.split("/")[2])
  );
  console.log(date1, date2);
  if (date1 < date2) {
    console.log("client will not be able to see future date data");
    res.send(null);
  } else if (date1 > date2) {
    console.log("sitution 2");
    fetchResultDataByDate(date)
      .then((result) => {
        console.log("data should be sended");
        if (result == null) {
          res.status(200).json(null);
        } else {
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        console.log("my error is", err);
      });
  } else {
    console.log("situation 3");
    const data = [];
    fetchResultDataByDate(date)
      .then((result) => {
        if (result == null) {
          res.status(200).json(null);
        } else {
          result.logs.forEach((log) => {
            let newItem = JSON.parse(JSON.stringify(log));
            console.log(" ====>  ", log);
            newItem.timesList = [];
            newItem.values = [];
            // console.log(newItem,log)
            const d = new Date();
            let hour = d.getHours();
            let min = d.getMinutes();
            let sec = d.getSeconds();

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
                console.log("value is not allowed to send");
              }
              // if(time<=currentTime){
              //   // console.log(currentTime +" "+time+ "send the data of that time")
              //   console.log("new values to compare "+p1+" "+p2);
              //   // console.log(time , currentTime)

              //   newItem.timesList.push(time);
              //   newItem.values.push(log.values[index])
              // }
              // else{
              //   console.log(currentTime +" "+time+ "don't send the data of that time")
              // }
            });

            if (condition == false) {
              // console.log("let's insert a value")
              newItem.timesList.push("Tomorrow " + newItem.timesList[0]);
              newItem.values.push("Coming soon...");
            }

            data.push(newItem);
          });
          res.status(200).json({ logs: data });
        }
      })
      .catch((err) => {
        console.log("my error is 2", err);
      });

    console.log("just filter the data aaccording to time because date is same");
  }
};

router.post("/getClientSideData", (req, res) => {
  console.log("will give you data");
  console.log(req.body.date);
  fetchDatabeforeDateAndTime(res, req.body.date);
});

// router.get('/',(req,res)=>{
//   res.send("HELLO")
// })

const datasave = (res, name, date, logs) => {
  console.log("in data find folder");
  name.findOne({ date: date }, function (err1, result) {
    if (err1) {
      console.log(err1);
      res
        .status(505)
        .json({ error: `facing error from database Error 1 ,${err1}` });
    }
    // console.log(result)
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

router.post("/save", (req, res) => {
  const { name, date, logs } = req.body;
  if (!date || !logs || !name) {
    res.status(422).json({ error: "insufficient data" });
  }
  try {
    console.log(name);
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
  data
    .findOne({ date: req.body.date })
    .then(async (result) => {
      // console.log(result)
      result.logs = req.body.logs;
      await data
        .findOneAndReplace(
          { date: req.body.date },
          { date: result.date, logs: result.logs }
        )
        .then((resul) => {
          res.send(resul);
          console.log("data is updated successfully");
        })
        .catch((err) => {
          console.log("facing error in updating data of timing");
        });
    })
    .catch((err) => {
      res.send({ error: "facing error in updaing data" });
      console.log("facing error in result", err);
    });

  // res.send("data updated successfully");
});

router.post("/changeTimeOfCity", async (req, res) => {
  // console.log(req.body)
  let newDate = req.body.date;
  let city = req.body.city;
  let newTime = req.body.time;
  console.log(newDate.toString());
  data
    .findOne({ date: newDate })
    .then(async (result) => {
      // console.log("no error",result)
      result.logs.forEach((log) => {
        if (log.title == city) {
          console.log(log);
          log.startTime = newTime;
          log.timesList = [newTime];
        }
      });
      await data
        .findOneAndReplace(
          { date: newDate },
          { date: result.date, logs: result.logs }
        )
        .then((resul) => {
          res.send(resul);
          console.log("data is updated successfully");
        })
        .catch((err) => {
          console.log("facing error in updating data of timing");
        });
    })
    .catch((err) => {
      res.send("error", "facing error in changing time");
      console.log("facing error in changing time", err);
    });
});

router.post("/getUpcomingResultDetails", auth, async (req, res) => {
  console.log("will give you data");

  fetchResultDataByDate(req.body.date)
    .then((result) => {
      if (result == null) {
        res.status(200).json(null);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      console.log("my error is", err);
    });
});

module.exports = router;
