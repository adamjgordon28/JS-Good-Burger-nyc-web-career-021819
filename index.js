const FETCHURL = "http://localhost:3000/burgers";
let burgersArray;
document.addEventListener("DOMContentLoaded", () => {
  const menuDiv = document.getElementById("burger-menu")
  const orderList = document.getElementById("order-list")
  const burgerForm = document.getElementById("custom-burger")
  const customBurgerName = document.getElementById("burger-name")
  const customBurgerDescription = document.getElementById("burger-description")
  const customBurgerImage = document.getElementById("burger-image")
  const customBurgerSubmit = burgerForm.querySelectorAll("input")[3]

    fetch("http://localhost:3000/burgers")
    .then(res => res.json())
    .then(data => {
      burgersArray = data;
      renderMenu()
    })

  menuDiv.addEventListener('click', ev => {
    if (ev.target.dataset.action === "add-to-order") {
      let li = document.createElement("li")
      li.innerText = ev.target.parentElement.querySelector("h3").innerText
      orderList.appendChild(li)
    }
  })

  burgerForm.addEventListener('submit', ev => {
    ev.preventDefault()
  })

  customBurgerSubmit.addEventListener('click', ev => {
    if(customBurgerName.value && customBurgerDescription.value && customBurgerImage.value) {
      fetch("http://localhost:3000/burgers", {
        method: 'POST',
        headers :{ 'Content-Type':'application/json' },
        body: JSON.stringify({name: `${customBurgerName.value}`, description: `${customBurgerDescription.value}`, image: `${customBurgerImage.value}`}),
      })
      .then(res => res.json())
      .then(data => {
        burgersArray.push(data)
        customBurgerName.value = ''
        customBurgerDescription.value = ''
        customBurgerImage.value = ''
        menuDiv.innerHTML = ''
        renderMenu()
      })

    let li = document.createElement("li")
    li.innerText = customBurgerName.value
    orderList.appendChild(li)



    }
    else {
      alert("Welcome to Good Burger, home of the Good burger! You have to fill out all 3 fields to submit a custom burger!")
    }
  })


    function renderMenu() {
      burgersArray.forEach(function(burger){
        menuDiv.innerHTML += `
        <div class="burger">
          <h3 class="burger_title">${burger.name}</h3>
            <img src=${burger.image}>
            <p class="burger_description">
              ${burger.description}
            </p>
            <button data-action="add-to-order" class="button">Add to Order</button>
        </div>
        `
      })
    }


})
