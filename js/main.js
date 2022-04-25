let table = document.querySelector("table")
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const zip = document.querySelector('input').value
  if (zip.length == 5){
    const url = `https://api.openbrewerydb.org/breweries?by_postal=${zip}`

    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data[0].name)
        data.forEach( (obj,index) => {
          if (data[index].brewery_type != "closed"){
            console.log(data[index].name)
            let newRow = table.insertRow(1)
            newRow.classList.add('infoRow')
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
            cell5.innerText = formatPhoneNumber(data[index].phone)
            if (data[index].website_url == null) {
              cell6.innerHTML = data[index].website_url
            } else {
              let link = document.createElement('a')
              let linkText = document.createTextNode(`${data[index].website_url}`)
              link.appendChild(linkText)
              link.title = "More text"
              link.href = `${data[index].website_url}`
              cell6.append(link)
            }
          }
        })
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

  } else {
    alert("Enter in a zip code with 5 digits")
  }
}
  
function formatPhoneNumber(phoneNumberString) {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    let intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}
