let title = document.getElementById("title")
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit")
let total = document.getElementById("total");
let mood = "Create";
let tmp;
let data = document.getElementById("data");
data.value = DATA();






// get total

function getTotal() {

  if (price.value != "") {
    total.innerText = price.value;
    total.style.background = "green";
  } else {
    total.innerText = "";
    total.style.background = "red";
  }
}

// create prudect


let dataPro;
let PRICEall;

if (localStorage.getItem("prudect") != null) {
  dataPro = JSON.parse(localStorage.getItem("prudect"));
  PRICEall =  JSON.parse(localStorage.getItem("PRICE"));

} else {
  PRICEall = [];
  dataPro = [];
}

submit.onclick = () => {
  let newPro = {
    title: title.value,
    price:price.value,
    total: total.innerText,
    data:data.value,
    count: count.value,
    category: category.value
  }
   if(mood === "Create"){
  if (newPro.count > 1) {
    for (let i = 0; i < newPro.count; i++) {
      dataPro.push(newPro);
      PRICEall.push(newPro.total);
    }
  } else {
    dataPro.push(newPro);
    PRICEall.push(newPro.total);
  }
}else{
   dataPro[tmp] = newPro;
   mood = "Create";
   submit.innerHTML = "Create";
   count.style.display = "block";
  }


  // save localestorge
localStorage.setItem("PRICE", JSON.stringify(PRICEall));
localStorage.setItem("prudect", JSON.stringify(dataPro));
claerInput();
console.log(dataPro[0]);
ShowData()

}


// claer input

function claerInput() {
  title.value = ""
  price.value = ""
  total.innerText = ""
  data.value = DATA();
  count.value = ""
  category.value = ""
}

// read

function ShowData() {
  
  getTotal();
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr> 
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td>${dataPro[i].data}</td>    
    <td><button onclick="Update(${i})" id="update">تعديل</button></td>
    <td><button onclick="Delete(${i})" id="delete">حذف</button></td>
  </tr>
    `
    let num = 0;
    document.querySelector(".PRICEALL").innerHTML = `
    <button>Price ALL(${PRICEALL()})</button>
    `

    tmp = i;
  }



  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `
    <button onclick="deleteAll()">Delete ALL(${dataPro.length})</button>
    `
  } else {
    deleteAll.innerHTML = ""
  }
}

ShowData();

// delete

function Delete(i) {
  dataPro.splice(i, 1);
  PRICEall.splice(i , 1);
  localStorage.PRICE = JSON.stringify(PRICEall);
  localStorage.prudect = JSON.stringify(dataPro);
  ShowData();
}


function deleteAll() {
  localStorage.clear();
  dataPro.splice(0)
  PRICEall.splice(0);
  ShowData();
}



// count
// update

function Update(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  data.value = dataPro[i].data;
  count.style.display = "none";
  submit.innerHTML = "Update";
  category.value = dataPro[i].category;
  getTotal();
  
  mood = "Update";

  scroll({
    top:0
  })
}


// Price ALL 
function PRICEALL(){
  ALL = PRICEall.reduce((x,y) => +x + +y );
 return ALL;
}

// data 

function DATA(){
  let data = new Date
  let years = data.getFullYear();
  let Month = data.getMonth();
  let day = data.getDate();
  let menuit = data.getMinutes();
   return  `${years} / ${Month} / ${day}`;
   
   
}

DATA();



// search
//claer data
