const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log('hello');
    let text= document.getElementById('aboutmeText').value.trim();
    let postBody= {
        text: text
    }
    fetch ('api/About/submit', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(postBody)
    }).then(function(){window.location.reload()})
})