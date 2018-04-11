function autocomplete(input, latInput, lngInput) {
    if(!input) return; //prevent fn to run if there is no input on the page!
    const dropdown = new google.maps.places.Autocomplete(input);
    //addListener is a Google Map method...
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    });
    //if someone hits ENTER on address field, do not submit the form
    input.on('keydown', (e) => {
        if(e.keyCode === 13) e.preventDefault();
    });
}

export default autocomplete;