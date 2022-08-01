const fs = require("fs");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const express = require("express");
const multer = require("multer");
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(
  express.urlencoded({
    extended: false,
  })
);

//Statiniu failu padavimo direktorija
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

app.set("views", __dirname + "/templates");

app.set("view engine", "hbs");

app.engine(
  "hbs",
  expressHandlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/templates/layouts",
    defaultLayout: "layout",
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/apie-mus", (req, res) => {
  let random = Math.floor(Math.random() * 101);
  res.render("apie-mus", { random });
});

app.get("/kontaktai", (req, res) => {
  res.render("kontaktai");
});

app.get("/paslaugos", (req, res) => {
  let paslaugos = ["Lala", "Baba", "Tata"];
  res.render("paslaugos", { paslaugos });
});

app.get("/produktai", (req, res) => {
  res.render("produktai");
});

//***********LOGIN */

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let message = '';
  if (req.body.email == 'info@bit.lt' && req.body.password == '1234')
    message = 'wuhuuu :)))';
  else message = 'failed';
  res.render('login', {message});
});

//***********FORMA */

app.post("/forma", upload.single("pic"), (req, res) => {
  let data = JSON.stringify(req.body);
  console.log(data);
  res.redirect("/forma");
});

app.get("/forma", (req, res) => {
  res.render("forma");
});

app.post('/picture', upload.single('picture'), (req, res) => {
  let pic = "/uploads/" + req.file.filename;
  res.render('uploaded-picture', {pic, info: req.body})
})

app.get('/picture', (req, res) => {
  res.render('picture');
})

//****************Fotkiu patalpinimas vietoj****************************

// app.post("/forma", upload.single("pic"), (req, res) => {
//   let image = "/uploads/" + req.file.filename;
//   res.render("submited", { image, info: req.body });
// });
//****************Fotkiu patalpinimas vietoj****************************

// ///////////////Duomenu ivedimas - STRINGIFY METODAS-----------
app.post("/simple-forma-submit", (req, res) => {
  let data = JSON.stringify(req.body);
  console.log(data);
  res.redirect("/simple-forma");
});

app.get("/simple-forma", (req, res) => {
  res.render("simple-forma");
});

// ////////////////////Duomenu ivedimas - STRINGIFY METODAS-----------


///////////////////////API susikurimas ///////////////////

app.get('/info', (req, res) => {
  res.json({message: 'Sekmingai prisijungta prie NodeJs serverio'})
})



app.listen(3000);
