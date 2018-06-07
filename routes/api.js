var express = require("express");
var router = express.Router();

var alumnos = [];

var _alumno = {
  nombre: "",
  apellido: "",
  nombreCompleto: "",
  cuenta: "",
  correo: "",
  genero: ""
};

router.get("/getall", function(req, res, next) {
  res.json(alumnos);
}); //get getall

// localhost:3000/api/get?index=0
// REST uri
// localhost:3000/api/get/2
router.get("/get/:index", function(req, res, next) {
  var _index = parseInt(req.params.index);
  if (_index >= 0 && _index < alumnos.length) {
    res.json(alumnos[_index]);
  } else {
    res.json({ error: "No se encontró el registro solicitado" });
  }
}); // get/index

router.post("/new", function(req, res, next) {
  var _newAlumno = Object.assign({}, _alumno, req.body);
  alumnos.push(_newAlumno);
  var _newIndex = alumnos.length - 1;
  res.json({ status: "ok", index: _newIndex, alumno: _newAlumno });
}); // new

router.put("/modify/:index", function(req, res, next) {
  var _index = parseInt(req.params.index);
  var _newAlumnos = alumnos.map(
    // foreach alumnos  as currentAlumno
    function(currentAlumno, i) {
      if (i === _index) {
        return Object.assign({}, currentAlumno, req.body);
      }
      return currentAlumno;
    }
  ); // map
  alumnos = _newAlumnos;
  res.json(alumnos[_index]);
}); // modify index

router.delete("/delete/:index", function(req, res, next) {
  var _index = parseInt(req.params.index);
  var _newAlumnos = alumnos.filter(function(currentAlumno, i) {
    return _index !== i;
  }); //filter
  alumnos = _newAlumnos;
  res.json(alumnos);
}); // delete index
module.exports = router;
