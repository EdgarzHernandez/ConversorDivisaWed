
// Variables que almacenan los elementos del DOM

const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');


// Variables que almacenan los elementos del DOM
function calculate()
{
    // Obtener las monedas seleccionadas
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;

    // Realizar una solicitud a la API de tasa de cambio
   fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
   .then(res => res.json() )
   .then(data => 
    {
        // Extraer la tasa de cambio de la respuesta JSON
       const taza = data.rates[moneda_two];


       // Actualizar el DOM con la tasa de cambio
       cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;


       // Calcular y mostrar la cantidad convertida en el campo cantidadEl_two
       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);

    } );
    
}


// Event listeners para escuchar los cambios en los elementos del DOM y actualizar la conversión

monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);


// Event listener para el botón de tazaEl que intercambia las monedas y recalcula la conversión
taza.addEventListener('click', () =>
{
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    calculate();
} );


// Llamar a la función calculate al cargar la página para obtener la conversión inicial
calculate();