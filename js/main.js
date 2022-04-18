let table = document.querySelector("table")
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const zip = document.querySelector('input').value
  // console.log(isbn)
  const url = `https://api.openbrewerydb.org/breweries?by_postal=92626`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data[0].name)
        data.forEach( (obj,index) => {
          if (data[index].brewery_type != "closed"){
            console.log(data[index].name)
            let newRow = table.insertRow(1)
            let cell1 = newRow.insertCell(0) 
            let cell2 = newRow.insertCell(1)
            let cell3 = newRow.insertCell(2)
            let cell4 = newRow.insertCell(3)
            let cell5 = newRow.insertCell(4)
            let cell6 = newRow.insertCell(5)
            cell1.innerText = data[index].name
            cell2.innerText = data[index].street
            cell3.innerText = data[index].city
            cell4.innerText = data[index].state
            cell5.innerText = data[index].phone
            cell6.innerText = data[index].website_url
          }
        })
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

