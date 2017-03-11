const nameInput = document.getElementById('name'),
      jobTitle = document.getElementById('other-title'),
      basicInfo = document.getElementsByTagName('fieldset')[0],
      tshirtInfo = document.getElementsByClassName('shirt')[0],
      activitiesInfo = document.getElementsByClassName('activities')[0],
      paymentInfo = document.getElementsByTagName('fieldset')[0];

window.onload = () => {    
    nameInput.focus();
    jobTitle.style.display = 'none';
}

tshirtInfo.addEventListener('change', (e) => {
    if ( e.target.id != 'design' ) {
        return;
    } else {
        const colors = document.getElementById('color').children;
        if ( e.target.value == 'js puns' ) {
            for ( let i = 0; i < colors.length; i++ ) {
                if ( i < 3 ) {
                    colors[i].style.display = '';
                } else {
                    colors[i].style.display = 'none';
                }
            }
            colors[0].selected = true;
        } else {
            for ( let i = 0; i < colors.length; i++ ) {
                if ( i < 3 ) {
                    colors[i].style.display = 'none';
                } else {
                    colors[i].style.display = '';
                }
            }
            colors[3].selected = true;
        }
    }
});