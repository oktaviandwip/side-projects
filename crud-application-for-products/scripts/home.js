//Array for list of product
let productList = JSON.parse(localStorage.getItem('product')) || [] 

//Add product
const addElement = document.querySelector('.add-button') 
addElement.addEventListener('click', () => {location.href = 'add.html'})

//Find product
const inputElement = document.querySelector('.input-name') 
const findElement = document.querySelector('.find-product') 

function findProduct() {
  const inputValue = inputElement.value.toLowerCase() 

  if (inputValue) {
    const foundItems = productList.filter(item => item.name.toLowerCase().includes(inputValue)) 
    renderList(foundItems) 
  } else {renderList(productList)} 
}

findElement.addEventListener('click', () => {findProduct()}) 

//Enter for running findProduct function
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {findProduct()}})

//Running renderList function
renderList(productList) 

//Create renderList function 
function renderList(array) {
  let html = '' 
  let totalAmount = 0 
  let totalPrice = 0 

  //Generate HTML
  array.forEach((value, index) => {
    const { name, desc, price, amount } = value 

    html += `
      <div class="grid-product">${index + 1}</div>
      <div class="grid-product">
        <button class="change-button">Change</button> &nbsp<strong>|</strong>&nbsp 
        <button class="delete-button">Delete</button>
      </div>
      <div class="grid-product">${name}</div>
      <div class="grid-product">${desc}</div>
      <div class="grid-product">${price.toLocaleString()}</div>
      <div class="grid-product">${amount.toLocaleString()}</div>
      <div class="grid-product">${(price * amount).toLocaleString()}</div>                                                         
    `
    totalAmount += amount
    totalPrice += price * amount
  })

  //Display product list
  document.querySelector('.product-list').innerHTML = html
  
  //Display total
  if (html) {
    document.querySelector('.total').innerHTML = `
      <div class="grid-total grid-reset ">
        <button class="reset-button">Reset All</button>
      </div>
      <div class="grid-total text-total ">Total</div>
      <div class="grid-total">${totalAmount.toLocaleString()}</div>
      <div class="grid-total">${totalPrice.toLocaleString()}</div>
    `
  } else {document.querySelector('.total').innerHTML = ''}

  //Delete product
  document.querySelectorAll('.delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      productList.splice(index, 1) 
      try {
        renderList(productList)
      } catch (error) {
        console.error("An error occurred:", error.message) 
      } finally {
        localStorage.setItem('product', JSON.stringify(productList))
      }
    })
  })

  //Change product
  document.querySelectorAll('.change-button').forEach((changeButton, index) => {
    changeButton.addEventListener('click', () => {
      localStorage.setItem('change', JSON.stringify(productList[index]))
      location.href = 'change.html' 
    })
  })

  //Reset all button
  document.querySelector('.reset-button').addEventListener('click', () => {
    document.querySelector('.product-list').innerHTML = ''
    document.querySelector('.total').innerHTML = ''
    productList = []
    localStorage.setItem('product', JSON.stringify(productList))
  })
}
