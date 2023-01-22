import React, { useState } from 'react'



let obj1 ={
    numOfRooms: 1,
    price: 100,
    cp: "c"
};

let obj2 ={
    numOfRooms: 3,
    price: 500,
    cp: "d"
};
let obj3 ={
    numOfRooms: 1,
    price: 600,
    cp: "c"
};
let obj4 ={
    numOfRooms: 2,
    price: 900,
    cp: "c"
}






export const TestField = () => {

let listaPrueba =[obj1, obj2, obj3, obj4];



const [numSelect, setNumSelect] = useState(0);

const [box1, setBox1] = useState("");
const [box2, setBox2] = useState("");

const [range, setRange] = useState(0)

//filtros precio // numero hab // codigo postal
let control = listaPrueba.filter(elem => elem.price >= range)

//CON IF
// if(numSelect > 0){
//     control = control.filter(elem=> elem.numOfRooms >= numSelect)
// }
// if(box2 !== ""){
//     control = control.filter(elem => elem.cp === box2)
// }

//CON TERNARIAS
numSelect > 0? control = control.filter(elem=> elem.numOfRooms >= numSelect) : control = control;

box2 !== ""? control = control.filter(elem => elem.cp === box2): control = control;




//input tipo selec
const handleNumSelect =(e)=>{
        setNumSelect(e.target.value)}
 //problema, se setean string, si queremos usarlos para numeros, tenemos que pasarlos antes de incorporarlos al filter 
 // si el value es un string porque me lo coge como numero, (es un error o lo convierte solo??)  

//input tipo checkbox
// const handleBoXA =(e)=>{setBox1(e.target.value)}
// const handleBoXB =(e)=>{ setBox1(e.target.value)}
const handleBoXC =(e)=>{
    setBox2("")
    if(box2 !== "c")
    {setBox2(e.target.value) }}
const handleBoXD =(e)=>{
    setBox2("")
    if(box2 !== "d")
    {setBox2(e.target.value) }}
// problemas:
// - cuando se desmarca tambien cuenta como click (para solucionarlo, hay que hacer como el tipo C que tiene una limpieza con un condicional);
//-- seria solo para campos que existen o no y no son excluyentes (piscina por ejemplo);
//-- si queremos hacer campos excluyentes tenemos que usar inputs de tipo radio.
// y de esos tendriamos que poner uno por defecto que fuera ninguno, ya siempre se quedan marcados cuando se marcan.

//input tipo range
const handleRanger =(e)=>{
    setRange(e.target.value)
}





console.log(numSelect, "input del select");
console.log(box1, "input de box1");
console.log(box2, "input de box2");

  return (
    <div>
        <div>
        <br/>
        <input
         type='text' 
         placeholder='texto'>
            
        </input>
        <br/>

        <input 
        type='number' 
        placeholder='number'>
            
        </input>
        <br/>

        <input 
        type='phone' 
        placeholder='phone'>
            
        </input>
        <br/>

        <input min={0} max={1000} type='range' defaultValue={0} onClick={handleRanger}>
        </input>
        <h3>valor: {range}</h3>
        <br/>
    
    
        {/* <input  value="a" type='checkbox' onClick={handleBoXA}></input>
        <input onClick={handleBoXB} value="b" type='checkbox'></input> */}
        <input onClick={handleBoXC} value="c" type='checkbox'></input>
        <input onClick={handleBoXD} value="d" type='checkbox'></input>
        
        <br/>

        <select onClick={handleNumSelect}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select><br/>
        </div>
        <hr/>
        <hr/>
        <div>
        {control?.map((elem, index) => {
            return(
                <div key={index}>
                <p>numero de habitaciones: {elem.numOfRooms}</p>
                <p>precio: {elem.price}</p>
                <p>codigo postal: {elem.cp}</p>
                </div>
            )
        })}
        </div>


    </div>
  )
}
