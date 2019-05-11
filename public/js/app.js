// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.summary+ ' ' +data.temperature)
//         }
//     })
// })

const weatherform =  document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From javascript'
weatherform.addEventListener('submit',(event) => {
    event.preventDefault()
    const location = search.value
    const url = '/weather?address='+location
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = '' 
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = 'location : '+data.address
            messageTwo.textContent = data.summary+'Temperature is '+data.temperature+'°C and there are '+data.precipProbability+'% chances of raining'
        }
    })
})    
})