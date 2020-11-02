const express = require("express");
let router = express.Router();
const fetch = require("node-fetch");

router.get("/:id", (req, res) => {
  const SL = req.params.id;
  (async () => {
    try {
      const response = await fetch(
        `https://jsonmock.hackerrank.com/api/medical_records?userId=${SL}`
      );

      let data = await response.json();
      let arr = data.data;
      let newArr = [];
      arr.forEach(item => {
        let todate = new Date(item.timestamp).getDate();
        let tomonth = new Date(item.timestamp).getMonth() + 1;
        let toyear = new Date(item.timestamp).getFullYear();
        let original_date = tomonth + "/" + todate + "/" + toyear;
        newArr.push({
          id: item.id,
          diagnosis: item.diagnosis.name,
          date: original_date,
          weight: item.meta.weight,
          doctor: item.doctor.name
        });
      });
      // res.json(data.data[0].doctor.name);
      //   console.log(data);
      let jsonData = JSON.stringify(newArr);
      res.send(jsonData);
    } catch (err) {
      console.error(err);
    }
  })();
});

module.exports = router;
