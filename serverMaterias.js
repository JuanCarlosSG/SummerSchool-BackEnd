const express = require('express');
const app=express()
const ip = require("ip");
const jsonParser=express.json()
let gruposDisponibles=[
    { curso:"12234",nombre:"Algebra",lugares:3,alumnos:[]},
    { curso:"23451",nombre:"Macrame",lugares:5,alumnos:[]},
    { curso:"33546",nombre:"Filosofia",lugares:6,alumnos:[]},
]
app.get("/disponiblidad",(req,resp)=>{
    resp.json(gruposDisponibles)
})
app.post("/alumnos",jsonParser,(req,resp)=>{
    console.log("cursoSolicitado:",req.query.curso)
    
    let posicion=gruposDisponibles.findIndex((cursoDisponible)=>cursoDisponible.curso==req.query.curso&&cursoDisponible.lugares>0)
    console.log(posicion)
    if(posicion<0)
    {
        resp.status(409).json({mensaje:"No hay cupo o ese curso no existe"})

        return
    }
    let alumno=req.body
    console.log("Alumno:",alumno)
    let indexAlumno=gruposDisponibles[posicion].alumnos.findIndex((alumnoEnCurso)=>alumnoEnCurso.matricula==alumno.matricula)
    console.log("indexAlumno:",indexAlumno)
    if(indexAlumno>=0)
    {
        resp.status(409).json({mensaje:"Ya esta registrado el alumno"})

        return
    }
    
    gruposDisponibles[posicion].alumnos.push(alumno)
    gruposDisponibles[posicion].lugares--
    resp.status(201).json(alumno)

})
console.dir ( ip.address() );
app.listen(8080,()=>{
    console.log("Corriendo...")
})