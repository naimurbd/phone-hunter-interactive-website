const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data 
    searchField.value = '';
    if (searchText == '') {
        //  please write something to display 
    }
    else {
        // load data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }


}
//  display data 
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {

    }
    data.forEach(item => {
        console.log(item);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${item.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${item.phone_name}</h3>
                    <h5>${item.brand}</h5>
                    <button class = "btn btn-info" onclick="loadPhoneDetail('${item.slug}')">Details Explore </button>
               </div>
            </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phonedetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50" alt="...">
    <div class="card-body ">
        <h5 class="card-title">${phone.name}</h5>
        <h6> ${phone.releaseDate}</h6>
        <p class="card-text">${phone.mainFeatures.storage}</p>
        <p class="card-text">${phone.mainFeatures.chipSet}</p>
        <p class="card-text">${phone.mainFeatures.memory}</p>
        
    </div>
    `;
    phonedetails.appendChild(div);
}