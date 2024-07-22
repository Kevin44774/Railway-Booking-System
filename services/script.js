const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://kevin22010038:pJgjIdxCI2PFlYCc@cluster.bg3kvbo.mongodb.net/railway?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.once("open", function () {
  console.log("Connected to the database");

  const routes = [
    {
      name: "main-line",
      route: [
        { name: "Delhi", fair: 0 },
        { name: "Mathura", fair: 100 },
        { name: "Agra", fair: 200 },
        { name: "Gwalior", fair: 300 },
        { name: "Jhansi", fair: 400 },
        { name: "Bhopal", fair: 500 },
        { name: "Itarsi", fair: 600 },
        { name: "Khandwa", fair: 700 },
        { name: "Bhusaval", fair: 800 },
        { name: "Jalgaon", fair: 900 },
        { name: "Manmad", fair: 1000 },
        { name: "Nasik", fair: 1100 },
        { name: "Igatpuri", fair: 1200 },
        { name: "Kasara", fair: 1300 },
        { name: "Kalyan", fair: 1400 },
        { name: "Thane", fair: 1500 },
        { name: "Mumbai CST", fair: 1600 },
      ],
    },
    {
      name: "central-line",
      route: [
        { name: "Mumbai CST", fair: 0 },
        { name: "Dadar", fair: 50 },
        { name: "Thane", fair: 100 },
        { name: "Kalyan", fair: 150 },
        { name: "Karjat", fair: 200 },
        { name: "Lonavala", fair: 250 },
        { name: "Pune", fair: 300 },
      ],
    },
    {
      name: "southern-line",
      route: [
        { name: "Chennai", fair: 0 },
        { name: "Arakkonam", fair: 50 },
        { name: "Katpadi", fair: 100 },
        { name: "Jolarpettai", fair: 150 },
        { name: "Bangarapet", fair: 200 },
        { name: "Bangalore", fair: 250 },
      ],
    },
  ];

  const trains = [
    { name: "Rajdhani Express", route: "main-line" },
    { name: "Shatabdi Express", route: "central-line" },
    { name: "Garib Rath Express", route: "southern-line" },
  ];

  const classes = [
    { name: "1st AC", fairRatio: 2.0 },
    { name: "2nd AC", fairRatio: 1.5 },
    { name: "3rd AC", fairRatio: 1.2 },
  ];

  const schedules = [
    { time: "05.00 am" },
    { time: "06.00 am" },
    { time: "09.30 am" },
    { time: "10.00 am" },
    { time: "10.30 am" },
    { time: "11.00 am" },
    { time: "12.00 pm" },
    { time: "1.30 pm" },
    { time: "02.00 pm" },
    { time: "03.30 pm" },
    { time: "04.00 pm" },
    { time: "05.30 pm" },
    { time: "07.00 pm" },
    { time: "11.00 pm" },
  ];

  const cards = [
    { card: "1234123412341234", cvc: "123", exp: "12/26" },
    { card: "1111111111111111", cvc: "111", exp: "11/25" },
  ];

  const phones = [
    { phone: "9876543210", pin: "1234" },
    { phone: "9123456780", pin: "1234" },
  ];

  const employees = [
    {
      firstName: "Rahul",
      lastName: "Sharma",
      nic: "A1234567",
      address: [
        { street: "MG Road", city: "Delhi", state: "Delhi" },
        { street: "Brigade Road", city: "Bangalore", state: "Karnataka" },
      ],
    },
    {
      firstName: "Amit",
      lastName: "Singh",
      nic: "B1234567",
      address: [
        { street: "Linking Road", city: "Mumbai", state: "Maharashtra" },
        { street: "FC Road", city: "Pune", state: "Maharashtra" },
      ],
    },
    {
      firstName: "Kavya",
      lastName: "Iyer",
      nic: "C1234567",
      address: [
        { street: "Anna Salai", city: "Chennai", state: "Tamil Nadu" },
        { street: "Indira Nagar", city: "Bangalore", state: "Karnataka" },
      ],
    },
  ];

  const Route = mongoose.model(
    "Route",
    new mongoose.Schema({ name: String, route: Array })
  );
  const Train = mongoose.model(
    "Train",
    new mongoose.Schema({ name: String, route: String })
  );
  const Class = mongoose.model(
    "Class",
    new mongoose.Schema({ name: String, fairRatio: Number })
  );
  const Schedule = mongoose.model(
    "Schedule",
    new mongoose.Schema({ time: String })
  );
  const Card = mongoose.model(
    "Card",
    new mongoose.Schema({ card: String, cvc: String, exp: String })
  );
  const Phone = mongoose.model(
    "Phone",
    new mongoose.Schema({ phone: String, pin: String })
  );
  const Employee = mongoose.model(
    "Employee",
    new mongoose.Schema({
      firstName: String,
      lastName: String,
      nic: String,
      address: Array,
    })
  );

  const insertData = async () => {
    await Route.insertMany(routes);
    await Train.insertMany(trains);
    await Class.insertMany(classes);
    await Schedule.insertMany(schedules);
    await Card.insertMany(cards);
    await Phone.insertMany(phones);
    await Employee.insertMany(employees);
    console.log("Data inserted");
    mongoose.connection.close();
  };

  insertData().catch((err) => console.log(err));
});
