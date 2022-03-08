//initializing button 
const submitBtn = document.getElementById("submitBtn")
//using the button if clicked 
submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    //checking if buton was pressed
    //console.log('hello');
    //get the value of the textfield 
    let text= document.getElementById('aboutmeText').value.trim();
    let postBody= {
        text: text
    }
    //submit it to the server 
    fetch ('api/About/submit', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(postBody)
        //reload the page
    }).then(function(){window.location.reload()})
})