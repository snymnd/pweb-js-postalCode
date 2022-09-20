const clear = () => {
    // trigger window reload
    window.location.reload();
}

let scopes = {
    provinces: '',
    cities: '',
    districts: '',
}

const clearChild = (scope, n = 0) => {
    
    var list = document.querySelector(`.list-${scope}`);
    while (list.children.item(n)) {
        list.removeChild(list.lastChild);
    }
}

const makeList = (data, scope, childScope, lvl = 0) => {
    // get element 
    var list = document.querySelector(`.list-${scope}`);
    var link = document.querySelector(`.${scope}`)
    link.addEventListener(`click`, function(e){
        e.preventDefault();
        list.classList.toggle(`active`);
    })
    
    var li = document.createElement(`li`);
    li = document.createElement(`li`);
    li.innerHTML = "reset";
    li.addEventListener(`click`, function(){
        var text = this.innerHTML;
        var icon = `<i class="fa fa-chevron-down"></i>`;
        link.innerHTML = `Select ${scope} ${icon}`;
        list.classList.toggle(`active`);
        clearChild(childScope);
    })
    list.appendChild(li);
    
    data.map (item => {
        li = document.createElement(`li`);
        li.innerHTML = item;
        li.addEventListener(`click`, function(){
            var text = this.innerHTML;
            var icon = `<i class="fa fa-chevron-down"></i>`;
            link.innerHTML = text+icon;
            list.classList.toggle(`active`);
            clearChild(childScope);
            if (lvl == 0) {
                callCity(text);
            } else if (lvl == 1) {
                callDistrict(text);
            } else if (lvl == 2) {
                callSubDistrict(text);
            } else {
                callPostalCode(text);
            }
        })
        list.appendChild(li);
    })
}

//get provinces
getProvince().then((data) => {
    makeList(data, 'province', 'city');
});

// get City
const callCity = (provinces) => {
    console.log(provinces);
    getCity(provinces).then((data) => {
        makeList(data, 'city', 'district', 1);
    });
}

// get District
const callDistrict = (city) => {
    console.log(city);
    getDistrict(city).then((data) => {
        makeList(data, 'district', 'subDistrict', 2);
    });
}

// get SubDistrict
const callSubDistrict = (district) => {
    console.log(district);
    getSubDistrict(district).then((data) => {
        makeList(data, 'subDistrict', 'postalCode', 3);
    });
}

// get PostalCode
const callPostalCode = (subDistrict) => {
    console.log(subDistrict);
    getPostalCode(subDistrict).then((data) => {
        h1 = document.createElement(`h1`);
        h1.innerHTML = data;
        document.querySelector(`.postalCode`).appendChild(h1);
    });
}