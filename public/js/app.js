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
const buttonget = document.getElementById('2')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From javascript'
buttonget.addEventListener('click',(e) => {
    console.log('HIIIIIII')
})
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
            messageTwo.textContent = data
        }
    })
})    
})