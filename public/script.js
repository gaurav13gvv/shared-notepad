const note=document.getElementById("note");

async function load(){

const res=await fetch("/api/note");

const data=await res.json();

if(note!==document.activeElement)
note.value=data.note;

}

load();

setInterval(load,2000);

note.addEventListener("input",async()=>{

await fetch("/api/note",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
note:note.value
})

});

});

document.getElementById("copy").onclick=()=>{

navigator.clipboard.writeText(note.value);

};

document.getElementById("clear").onclick=()=>{

note.value="";

note.dispatchEvent(new Event("input"));

};