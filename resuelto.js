
export class item {
    constructor(name, price, units) {
        this.name = name;
        this.price = parseInt(price);
        this.units = parseInt(units);
    }
}

// Exercise 1. (2p)
export function queryDOM() {
    const precioTotal = document.getElementById('totalPrice');
    const elementosH2 = document.querySelectorAll('h2');
    const elementosProducto = document.querySelectorAll('.product');
    const elementosPrecio = document.querySelectorAll('p.price');
    const elementosMelocoton = document.querySelector('.products [data-name="Peach"] button');

    return [
        precioTotal,
        elementosH2,
        elementosProducto,
        elementosPrecio,
        elementosMelocoton
    ];
}

// Exercise 2. (2p)
export function createCartElement(item) {
    const div = document.createElement('div');
    div.className = 'panel';

    const h3 = document.createElement('h3');
    h3.textContent = item.name;

    const span = document.createElement('span');
    span.className = 'label';
    span.textContent = `${item.units} piece${item.units > 1 ? 's' : ''} for ${item.price} €`;

    div.appendChild(h3);
    div.appendChild(span);

    // Devolver el div
    return div;
}

// Exercise 3 (1p)
export function emptyCart() {
    const cartItems = document.getElementById('cartItems');
    
    const panelItems = cartItems.getElementsByClassName('panel');
    
    const panelItemsArray = Array.from(panelItems);
    
    panelItemsArray.forEach(panel => {
        cartItems.removeChild(panel);
    });
}

// Exercise 4 (1p)
export function updateCartTotal() {
    const cartItems = document.getElementById('cartItems');
    
    const panelItems = cartItems.getElementsByClassName('panel');
    
    let totalPrice = 0;
    
    Array.from(panelItems).forEach(panel => {
        const label = panel.querySelector('.label');
        
        const priceText = label.textContent;
        const priceMatch = priceText.match(/for (\d+) €/);
        
        if (priceMatch && priceMatch[1]) {
            totalPrice += parseInt(priceMatch[1], 10);
        }
    });
    
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `${totalPrice} €`;
}


// Exercise 5. (2p)
export function addToCart(item) {
    const cartItems = document.getElementById('cartItems');
    
    const panelItems = cartItems.getElementsByClassName('panel');
    let itemExists = false;
    
    Array.from(panelItems).forEach(panel => {
        const h3 = panel.querySelector('h3');
        if (h3 && h3.textContent === item.name) {
            const label = panel.querySelector('.label');
            const currentUnitsMatch = label.textContent.match(/(\d+) piece/);
            if (currentUnitsMatch && currentUnitsMatch[1]) {
                const currentUnits = parseInt(currentUnitsMatch[1], 10);
                const newUnits = currentUnits + item.units;
                const newPrice = newUnits * item.price;
                label.textContent = `${newUnits} piece${newUnits > 1 ? 's' : ''} for ${newPrice} €`;
                itemExists = true;
            }
        }
    });

    if (!itemExists) {
        const newItemElement = createCartElement(item);
        cartItems.appendChild(newItemElement);
    }
}


// Exercise 6. (2p)
export function addListeners() {
    document.getElementById('clear').addEventListener('click', function() {
      emptyCart();
    });
  
    document.getElementById('update').addEventListener('click', function() {
      updateCartTotal();
    });
  
    document.querySelectorAll('.product button').forEach(function(button) {
      button.addEventListener('click', function() {
        let productElement = this.parentElement;
        
        let name = productElement.querySelector('h3').textContent;
        let price = parseFloat(productElement.getAttribute('data-price'));
        let units = parseInt(productElement.querySelector('.count').value);
        
        let item = {
          name: name,
          price: price,
          units: units
        };
  
        addToCart(item);
      });
    });
  }
  