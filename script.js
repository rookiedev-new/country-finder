const user = document.querySelector(".input");
const Btn = document.querySelector(".btn");
const card = document.querySelector("#container");
let errordata = "";

Btn.addEventListener("click", async () => {
  const data = user.value.trim();
  card.innerHTML="";
  user.value='';
 

  try { 
    card.classList.add("box2");

    if (data === "") {
      throw new Error("Please Enter Country");
    }
    const response = await fetch(`https://restcountries.com/v3.1/name/${data.toLowerCase()}`);
    if(!response.ok){
      throw new Error("Country not Found");
    }
    const refine = await response.json();
    process(refine[0]);
  }
   catch (error) {
     errordata = error.message;
      const Errormsg = document.createElement("h2");
      Errormsg.textContent=errordata;
      Errormsg.style.color="red";
      card.append(Errormsg);
   
  }
});

function process(call) {

  const name = document.createElement("h3");
  const cap = document.createElement("p");
  const pic = document.createElement("img");
  const size = document.createElement("p");
  const code = document.createElement("p");
  const reg = document.createElement("p");

  name.classList.add("name");

  name.textContent = call.name.common;
  size.textContent = `Population : ${call.population}`;
  code.textContent = call.name.common;
  cap.textContent = `Capital: ${call.capital?.[0] || "N/A"}`;
  pic.src = call.flags.png;
  const currencyKey = Object.keys(call.currencies)[0];
const currency = call.currencies[currencyKey];
code.textContent = `Currency: ${currency.name} (${currency.symbol})`;
 reg.textContent = `Region: ${call.region}`;


  card.append(name,cap,pic,size,code,reg);
 
}
