const formulario = document.getElementById('form');

const inputs = [
    title = document.getElementById('title'),
    desc = document.getElementById('description')
]


const expresiones = {
    title: /^[a-zA-ZÀ-ÿ\s]{4,12}$/,
    description: /[a-zA-Z0-9\_\-\s]{5,40}$/
}
const validarTextos = (e) =>{
   switch(e.target.name){
       case "title":
           if(expresiones.title.test(e.target.value)){
                console.log('Conseguido');
           }else{
                console.log('KK de burra');
           }
        break;

        case "description":
            if(expresiones.description.test(e.target.value)){
                console.log('Conseguido');
           }else{
                console.log('KK de burra');
           }
        break;
   }
}

inputs.forEach( (input)=>{
    input.addEventListener('keydown', validarTextos);
    input.addEventListener('blur', validarTextos);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 
});