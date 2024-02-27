//Array for list of product
const productList = JSON.parse(localStorage.getItem('product')) || [] 

//Data that would be changed
const changeData = JSON.parse(localStorage.getItem('change')) || {}

const nameInput = document.querySelector('.name') 
const descInput = document.querySelector('.description') 
const priceInput = document.querySelector('.price') 
const amountInput = document.querySelector('.amount') 

nameInput.value = changeData.name 
descInput.value = changeData.desc 
priceInput.value = changeData.price 
amountInput.value = changeData.amount

//Running submitInput
document.querySelector('.input-section').addEventListener('submit', () => {
    submitInput() 
  })

//Enter for running submitInput function
document.body.addEventListener('keydown', () => {
  if (Event.key === 'Enter') {submitInput()}
})

//Create submitInput function
function submitInput() {
  if (Number(priceInput.value) > 0 && Number(amountInput.value) > 0) {
    changeInput() 
    location.href = 'home.html' 
    alert('Changed data successfully!')
  } else {
    alert('Price and Amount must be a positive number!')
  }
}

//Create changeInput function
function changeInput() {

  const inputObject = {
    name: nameInput.value,
    desc: descInput.value,
    price: Number(priceInput.value),
    amount: Number(amountInput.value),
  } 

  //Find the item
  const foundItem = productList.find(item => item.name === changeData.name) 
  const indexItem = productList.indexOf(foundItem) 

  //Update productList
  if (foundItem) {
    productList[indexItem] = inputObject 
    localStorage.setItem('product', JSON.stringify(productList)) 
  } else {
    alert('Item not found in the product list.') 
  }
}

//Back to home button
document.querySelector('.back-to-home').addEventListener('click', () => {location.href = 'home.html'})





