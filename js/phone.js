const searchResult = document.getElementById('search-result');

const phonedetails = document.getElementById('phone-details');
//  phone search area 
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const error = document.getElementById('error');

    // clear data 
    searchField.value = '';

    if (searchText == '') {
        error.innerText = "please write something to display";
        // clear data 
        searchResult.innerHTML = '';
        phonedetails.innerHTML = '';
    }
    else {
        // load data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
        error.innerHTML = '';
        phonedetails.innerHTML = '';
    }


}
//  display data 
const displaySearchResult = data => {


    // limit for display data 
    const first20Data = data.slice(0, 20);
    // console.log(first20Data);
    searchResult.textContent = '';
    if (first20Data.length == 0) {
        error.innerText = "No Phone Founded";
        // clear data 

        searchResult.innerHTML = '';
        phonedetails.innerHTML = '';
    }
    first20Data?.forEach(item => {
        // console.log(item);

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 ">
                <img src="${item.image}" class="card-img-top  w-50  " alt="...">
                <div class="card-body">
                    <h2 class="card-title ">${item.phone_name}</h2>
                    <h5>${item.brand}</h5>
                    <button class = "btn btn-info" onclick="loadPhoneDetail('${item.slug}')">Details Explore </button>
               </div>
            </div>
        `;
        searchResult.appendChild(div);

    })


}

// load single data 
const loadPhoneDetail = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))

}

// display single data details 
const displayPhoneDetail = phone => {
    console.log(phone.mainFeatures.sensors);
    phonedetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
     <img src="${phone.image}" class="card-img-top mx-auto  w-25" alt="...">
     <div class="card-body ">
         <h4 class="card-title"> <span class ="text-info"> Brand: </span> ${phone.name}</h4>
         <h5><span class = "text-info "> Release Date:  </span> ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</h5>
         <h3 class="text-primary fs-4">Main Features:- </h3>
         
         <p class="card-text"> <span class = "text-info fs-5"> Storage: </span> ${phone.mainFeatures.storage}</p>
         <p class="card-text"> <span class = "text-info fs-5"> Chipset: </span>${phone.mainFeatures.chipSet}</p>
         <p class="card-text">  <span class = "text-info fs-5"> Memory: </span>${phone.mainFeatures.memory}</p>
         <h3 class="text-primary fs-4">Sensors:- </h3>
         <p> ${phone.mainFeatures.sensors.map(i => '' + i)} </p>

         <h3 class="text-primary fs-4">Others:- </h3>
         <p class="card-text"> <span class = "text-info fs-5"> Bluetooth: </span> ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'This features does not exist'}</p>
         <p class="card-text"> <span class = "text-info fs-5"> GPS: </span> ${phone.others?.GPS ? phone.others.GPS : 'This features does not exist'}</p>
         <p class="card-text"> <span class = "text-info fs-5"> NFC: </span> ${phone.others?.NFC ? phone.others.NFC : 'This features does not exist'}</p>
         <p class="card-text"> <span class = "text-info fs-5"> Radio: </span> ${phone.others?.Radio ? phone.others.Radio : 'This features does not exist'}</p>
         <p class="card-text"> <span class = "text-info fs-5"> USB: </span> ${phone.others?.USB ? phone.others.USB : 'This features does not exist'}</p>
         <p class="card-text"> <span class = "text-info fs-5"> WLAN: </span> ${phone.others?.WLAN ? phone.others.WLAN : 'This features does not exist'}</p>
       
        
    </div>
     `;
    phonedetails.appendChild(div);

}