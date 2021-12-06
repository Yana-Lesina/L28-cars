const select = document.querySelector('select');
const carTypes = document.querySelectorAll('.carType');

const fetchCars = () =>{
  return fetch('./cars.json')
    .then(response => {
      response = response.json() 
                                  //теперь response - это объект с ключом cars, 
                                  //который одновременно с этим - вложенный объект с двумя ключами: 0(1-я машина) и 1 (2-я машина)
                                  //response = response.text()
                                  //достучаться до элемента можно так: data.cars[0]
      return response
    })
    .then(obj => {
      
      for(let key in obj.cars) {
        carTypes[key].textContent = obj.cars[key].brand;
        carTypes[key].value = obj.cars[key].price;
        carTypes[key].id = obj.cars[key].model;
      }

      return obj.cars;
    })
    .catch(err => console.error(err))
    
};


const textBlock = document.createElement('div');   
textBlock.innerHTML = select.querySelector('.default-option').textContent;
document.body.append(textBlock);

fetchCars()
  .then( cars => {
    select.addEventListener('input', () => {
      chosenCar = select.options[select.selectedIndex];

      if(select.selectedIndex !== 0) {
        textBlock.innerHTML = `Тачка ${chosenCar.textContent} ${chosenCar.id}<br>Цена: ${chosenCar.value}$`
      } else if(select.selectedIndex === 0) {
        textBlock.innerHTML = select.querySelector('.default-option').textContent;
      }

    })
  })
  .catch(err => console.error(err))




  
