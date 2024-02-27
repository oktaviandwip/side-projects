//Array for list of product
const productList = JSON.parse(localStorage.getItem('product')) || [] 

//Select the input
const nameInput = document.querySelector('.name') 
const descInput = document.querySelector('.description') 
const priceInput = document.querySelector('.price') 
const amountInput = document.querySelector('.amount') 

//Value for name and desc when reload
const nameDesc = JSON.parse(localStorage.getItem('nameDesc')) || {} 
nameInput.value = nameDesc.name || '' 
descInput.value = nameDesc.desc || '' 

//Running addData function
document.querySelector('.input-section').addEventListener('submit', () => {
  addData()
})

//Enter for running addData function
document.body.addEventListener('keydown', () => {
  if (Event.key === 'Enter') {addData()}
})

//Create addData function
function addData() {
  
  //Value for name and desc input
  const nameDesc = {
    name: nameInput.value,
    desc: descInput.value
  } 

  localStorage.setItem('nameDesc', JSON.stringify(nameDesc)) 

  //Check price and amount
  if (Number(priceInput.value) > 0 && Number(amountInput.value) > 0) {submitInput()
      location.href = 'home.html' 
      alert('Added data successfully!')
    } else {
      alert('Price and Amount must be a positive number!')
  }
}

//Create submitInput function
function submitInput() {

  const inputObject = {
    name: nameInput.value,
    desc: descInput.value,
    price: Number(priceInput.value),
    amount: Number(amountInput.value),
  } 

  //Update array productList
  productList.push(inputObject) 
  localStorage.setItem('product', JSON.stringify(productList))
  localStorage.removeItem('nameDesc') 
}

//Back to home button
document.querySelector('.back-to-home').addEventListener('click', () => {location.href = 'home.html'})