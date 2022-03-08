//initializing button 
const trackerForm = document.getElementById("trackerForm")
//adding a event listener to the tracker form
 if (trackerForm) {
    trackerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //taking the restaurant name and whether theyve been to that restuarant and saving that information
        let ResName= document.getElementById('ResName').value.trim();
        let checked = ((document.querySelector('input[name=id1]:checked').value)==='true')
        //console.log(checked);
        let postBody={
            restaurantName:ResName,
            boolVal: checked
        }
        //submitting the info to the server
        fetch('api/Res/submit',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(postBody)
            //reloading the page 
        }).then(function(){window.location.reload()})
    })
}