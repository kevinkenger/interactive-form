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



basicInfo.addEventListener('change', (e) => {
    if ( e.target.value == 'other' ) {
        jobTitle.style.display = '';
        jobTitle.focus();
    } else {
        jobTitle.style.display = 'none';
    }
});




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




activitiesInfo.addEventListener('change', (e) => {
    const checkbox = e.target,
          time1 = [
            document.getElementsByName('js-frameworks')[0],
            document.getElementsByName('express')[0],
            document.getElementsByName('build-tools')[0]
          ],
          time2 = [
              document.getElementsByName('js-libs')[0],
              document.getElementsByName('node')[0],
              document.getElementsByName('npm')[0]
          ];
    if ( time1.indexOf(checkbox) > -1 ) {
        activitiesChecker(checkbox, time1);
    } else {
        activitiesChecker(checkbox, time2);
    }
});

const activitiesChecker = (checkbox, time) => {
    for ( let i = 0; i < 3; i++ ) {
        if ( time[i] != checkbox ) {
            time[i].disabled = checkbox.checked;
        }
    }
}