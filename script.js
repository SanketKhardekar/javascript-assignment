async function fetchDataApi() {
  setViewLoader(true);
  const response = await fetch(
    "https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5"
  );
  setViewLoader(false);
  return response.json();
}

fetchDataApi()
  .then((userData) => {
    displayUserTable(userData);
  })
  .catch((error) => {
    alert(error.message + "Failed To Fetch Data Please Try Again Later!!");
  });

function displayUserTable(userData) {
  const userTableContainer = document.getElementById("user-table-container");
  const displayColumn = [
    "first_name",
    "last_name",
    "username",
    "title",
    "country",
  ];
  const tableHeader = [
    "First Name",
    "Last Name",
    "Username",
    "Title",
    "Country",
  ];
  const tableComponent = document.createElement("table");
  let tr = tableComponent.insertRow(-1);
  tableHeader.forEach((element) => {
    let th = document.createElement("th");
    th.innerHTML = element;
    tr.appendChild(th);
  });
  userData.forEach((element,index) => {
    tr = tableComponent.insertRow(-1);
    tr.setAttribute("key", index);
    displayColumn.forEach((item) => {
      let tableData = tr.insertCell(-1);
      if (item === "title") {
        tableData.innerHTML = element.employment.title;
      } else if (item === "country") {
        tableData.innerHTML = element.address.country;
      } else {
        tableData.innerHTML = element[item];
      }
    });
  });
  userTableContainer.appendChild(tableComponent);
  setDetailsCard(userData[0]);
  const tableRow = document.getElementsByTagName("tr");
  userData.forEach((element,index) => {
        tableRow[index].addEventListener('click', function(event){
            const key = event.target.parentElement.attributes[0].nodeValue;
            setDetailsCard(userData[key]);
        })
  });
}

function setDetailsCard(obj) {
    const greetings=document.getElementById('greetings');
    greetings.innerHTML="Good "+getGreetingText()+" "+obj.first_name;
    const img=document.getElementById('profile_image');
    img.setAttribute("src",obj.avatar);
    document.getElementById('id').innerHTML=obj.id;
    document.getElementById('uid').innerHTML=obj.uid;
    document.getElementById('name').innerHTML=obj.first_name+" "+obj.last_name;
    document.getElementById('uname').innerHTML=obj.username;
    document.getElementById('pass').innerHTML=obj.password;
    document.getElementById('email').innerHTML=obj.email;
    document.getElementById('gender').innerHTML=obj.gender;
    document.getElementById('sin').innerHTML=obj.social_insurance_number;
    document.getElementById('dob').innerHTML=obj.date_of_birth;
    document.getElementById('desig').innerHTML=obj.employment.title; 
    document.getElementById('skill').innerHTML=obj.employment.key_skill;
    document.getElementById('address').innerHTML=obj.address.city+", "+obj.address.state+", "+obj.address.country; 
    document.getElementById('cc_no').innerHTML=obj.credit_card.cc_number;
    document.getElementById('status').innerHTML=obj.subscription.status;  
    if (document.documentElement.clientWidth <= 600) {
      var elem = document.getElementById("user-content-container");
      let elemPos = elem.getBoundingClientRect();
      window.scrollTo(0, elemPos.top)
  } 
}
function getGreetingText() {
  var today = new Date();
  var curHr = today.getHours();
  if (curHr < 12) {
    return "Morning";
  } else if (curHr < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}

function setViewLoader(val) {
  var loader = document.getElementById("loader-container");
  var mainData = document.getElementById("main");
  if (val == true) {
    loader.style.display = "flex";
    mainData.style.display = "none";
  } else {
    loader.style.display = "none";
    mainData.style.display = "flex";
  }
}
