let bagItems;

onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}

function displayItemsBySearch(query) {
  const itemsContainerElement = document.querySelector('.items-container');
  if (!itemsContainerElement) {
    return;
  }

  const filteredItems = items.filter(item =>
    item.item_name.toLowerCase().startsWith(query.toLowerCase()) || item.company.toLowerCase().startsWith(query.toLowerCase())
  );

  let innerHTML = '';
  filteredItems.forEach(item => {
    innerHTML += `
    <div class="item-container">
      <img class="item-image" src="${item.image}" alt="item image">
      <div class="rating">
        ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
        <span class="current-price">${item.current_price}</span>
        <span class="original-price">${item.original_price}5</span>
        <span class="discount">(${item.discount_percentage} OFF)</span>
      </div>
      <button class="btn-add-bag" onClick="addToBag(${item.id})">Add to Bag</button>
    </div>
    `;
  });

  itemsContainerElement.innerHTML = innerHTML;
}

const searchInput = document.querySelector('.search_input');
searchInput.addEventListener('input', function(event) {
  const searchText = event.target.value.trim();
  displayItemsBySearch(searchText);
});

displayItemsBySearch('');

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerHTML = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector('.items-container');
  if (!itemsContainerElement) {
    return;
  }
  let innerHTML = '';
  items.forEach(item => {
    innerHTML += `
    <div class="item-container">
      <img class="item-image" src="${item.image}" alt="item image">
      <div class="rating">
        ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
        <span class="current-price">${item.current_price}</span>
        <span class="original-price">${item.original_price}5</span>
        <span class="discount">(${item.discount_percentage} OFF)</span>
      </div>
      <button class="btn-add-bag" onClick="addToBag(${item.id})">Add to Bag</button>
    </div>
    `;
  });
  itemsContainerElement.innerHTML = innerHTML;
}
