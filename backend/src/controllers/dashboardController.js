const db = require("../database/db");

exports.getAppointments = async (req, res) => {

  const { date } = req.query;

  await db.read();

  let results = db.data.appointments;

  if (date) {
    results = results.filter(a => a.datetime.startsWith(date));
  }

  res.json({ appointments: results });

};



exports.getStats = async (req, res) => {

  await db.read();

  const appointments = db.data.appointments;

  const today = new Date();

  const todayStr = today.toISOString().slice(0, 10);

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  let dailyIncome = 0;
  let monthlyIncome = 0;
  let yearlyIncome = 0;
  let count = 0;

  appointments.forEach(a => {

    const date = new Date(a.datetime);

    if (a.datetime.startsWith(todayStr)) {
      dailyIncome += a.price;
      count++;
    }

    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      monthlyIncome += a.price;
    }

    if (date.getFullYear() === currentYear) {
      yearlyIncome += a.price;
    }

  });

  res.json({
    count,
    dailyIncome,
    monthlyIncome,
    yearlyIncome
  });

};