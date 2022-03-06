const trackerForm = document.getElementById("trackerForm")


















 if (trackerForm) {
    trackerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let ResName= document.getElementById('ResName').value.trim();
        let checked = ((document.querySelector('input[name=id1]:checked').value)==='true')
        //console.log(checked);
        let postBody={
            restaurantName:ResName,
            boolVal: checked
        }
        fetch('api/Res/submit',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(postBody)
        }).then(fetch('/RestaurantTracker',{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            },
        }));
    })
}