const button = document.getElementById("button");
const price = document.getElementById("price");
const item = document.getElementById("item");
const select = document.getElementById("select");
const food = document.getElementById("FoodItem");
const sports = document.getElementById("SportsItem");
const home = document.getElementById("HomeItems");
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", (e) => {
  axios
    .get("https://crudcrud.com/api/200523a827ae41d4afdcb6c64fd9ab86/addItem")
    .then((res) => {
      console.log(res);
      for (const data of res.data) {
        const li = document.createElement("li");
        li.classList = "d-flex flex-row justify-content-between";
        const p1 = document.createElement("p");
        p1.innerText = `${data.cost}`;
        li.appendChild(p1);

        const p2 = document.createElement("p");
        p2.innerText = `${data.item}`;
        li.appendChild(p2);

        const p3 = document.createElement("p");
        p3.innerText = `${data.type}`;
        li.appendChild(p3);

        const del = document.createElement("button");
        del.innerText = "Delete Item";
        del.id = "del";
        li.appendChild(del);

        console.log(li);

        const element = document.getElementById(`${data.type}`);
        console.log(element);
        element.appendChild(li);

        const uid = `${data.time}`;
        const span = document.createElement("span");
        span.innerText = uid;
        li.appendChild(span);
        span.classList = "hide";
        span.style = "display : none";
      }
    });
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (form[0].value > 0 && form[1].value.trim() != "") {
    const li = document.createElement("li");
    li.classList = "d-flex flex-row justify-content-between";
    const p1 = document.createElement("p");
    p1.innerText = `Rs.${form[0].value}`;
    console.log(form[0].value);
    li.appendChild(p1);

    const p2 = document.createElement("p");
    p2.innerText = `${form[1].value.trim()}`;
    li.appendChild(p2);

    const p3 = document.createElement("p");
    p3.innerText = `${form[2].value}`;
    li.appendChild(p3);

    const del = document.createElement("button");
    del.innerText = "Delete Item";
    del.id = "del";
    li.appendChild(del);

    const element = document.getElementById(`${form[2].value}`);
    console.log(element);
    element.appendChild(li);

    const id = Date.now();
    console.log(id);
    li.id = id;

    const span = document.createElement("span");
    span.innerText = id;
    li.appendChild(span);
    span.style = "display : none";

    axios.post(
      "https://crudcrud.com/api/200523a827ae41d4afdcb6c64fd9ab86/addItem",
      {
        cost: p1.innerText,
        item: p2.innerText,
        type: p3.innerText,
        time: li.id,
      }
    );
  }
});

const items = document.getElementById("main");
console.log(items);
items.addEventListener("click", (e) => {
  if (e.target.id == "del") {
    const parent = e.target.parentElement;
    const ul = parent.parentElement;
    console.log("DELETE");

    axios
      .get("https://crudcrud.com/api/200523a827ae41d4afdcb6c64fd9ab86/addItem")
      .then((res) => {
        //console.log(res);
        for (const data of res.data) {
          if (data.time == parent.children[4].innerText) {
            const delId = data._id;
            console.log(delId);
            axios
              .delete(
                `https://crudcrud.com/api/200523a827ae41d4afdcb6c64fd9ab86/addItem/${delId}`
              )
              .then((res) => console.log(res + "Deleted"))
              .catch((err) => console.error(err));
          }
        }
      })
      .catch((err) => console.error(err));

    ul.removeChild(parent);
  }
});
