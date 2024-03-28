let bagItemObjects;
onLoad()
function onLoad(){
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
  console.log(bagItemObjects);
}

function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemObjects.length;
  let MRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;
  let convenienceFee = bagItems.length ? 99 : 0;
  
bagItemObjects.forEach(bagItem => {
  MRP += bagItem.original_price;
  totalDiscount += bagItem.original_price - bagItem.current_price;
  finalPayment += bagItem.current_price;
})

  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem}) </div>
      <div class="price-item">
        <span class="price-item-tag">MRP</span>
        <span class="price-item-value">Rs${MRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">Rs ${convenienceFee} </span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">Rs ${finalPayment + convenienceFee} </span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>`;
}

function loadBagItemObjects(){
  bagItemObjects = bagItems.map(itemId =>{
    for(let i=0;i<items.length;i++){
      if(itemId == items[i].id){
        return items[i];
      }
    }
  })
}
function displayBagItems(){
  let containerElement = document.querySelector('.bag-items-container');
  for(let i = 0;i<bagItemObjects.length; i++){
    containerElement.innerHTML += displayCartProducts(bagItemObjects[i])
  };
}

function removeFromBag(removeSelectedId){
  console.log(bagItems);
  const indexToRemove = bagItems.findIndex(item => item === removeSelectedId);
  if(indexToRemove !== -1){
    bagItems.splice(indexToRemove,1);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadBagItemObjects();
    let conatainerElement = document.querySelector('.bag-items-container');
    conatainerElement.innerHTML = '';
    displayBagItems();
    displayBagIcon();
    displayBagSummary();
  }
}

function displayCartProducts(eachBagItem){
  return  `
  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${eachBagItem.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${eachBagItem.company}</div>
      <div class="item-name">${eachBagItem.item_name}</div>
      <div class="price-container">
        <span class="current-price">${eachBagItem.current_price}</span>
        <span class="original-price">${eachBagItem.original_price}</span>
        <span class="discount-percentage">(${eachBagItem.discount_percentage}%OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${eachBagItem.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${eachBagItem.delivery_date}</span>
      </div>
    </div>
    <div class="remove-from-cart" onClick = "removeFromBag(${eachBagItem.id})"><span class="material-symbols-outlined cancelSelectedItem">
    cancel
    </span></div>
  </div>`;
}