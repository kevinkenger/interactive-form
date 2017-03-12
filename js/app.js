const totalEl = document.createElement('div'),
      nameInput = document.getElementById('name'),
      emailInput = document.getElementById('mail'),
      form = document.getElementsByTagName('form')[0],
      jobTitle = document.getElementById('other-title'),
      basicInfo = document.getElementsByTagName('fieldset')[0],
      tshirtInfo = document.getElementsByClassName('shirt')[0],
      paymentInfo = document.getElementsByTagName('fieldset')[3],
      activitiesInfo = document.getElementsByClassName('activities')[0];
      
let total = 0,
    errors = 0;

totalEl.textContent = `Total: $${total}`;

window.onload = () => {    
    nameInput.focus();
    jobTitle.style.display = 'none';
    totalEl.id = 'total';
    activitiesInfo.appendChild(totalEl);
    tshirtInfo.children[4].style.display = 'none';
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
    }
    tshirtInfo.children[4].style.display = '';
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
    } else if ( time2.indexOf(checkbox) > -1 ) {
        activitiesChecker(checkbox, time2);
    } else {
        activitiesChecker(checkbox);
    }
});

const activitiesChecker = (checkbox, time) => {
    if ( time ) {
        for ( let i = 0; i < 3; i++ ) {
            if ( time[i] != checkbox ) {
                time[i].disabled = checkbox.checked;
            }
        }
    }
    if ( checkbox.checked ) {
        if ( checkbox.name == 'all' ) {
            total += 200;
        } else {
            total += 100;
        }
    } else {
        if ( checkbox.name == 'all' ) {
            total -= 200;
        } else {
            total -= 100;
        }
    }
    totalEl.textContent = `Total: $${total}`;
}


paymentInfo.addEventListener('change', (e) => {
    if ( e.target.id != 'payment' ) {
        return;
    }
    const payment = e.target,
          cc = document.getElementById('credit-card');
    switch ( payment.value ) {
        case 'credit card':
            cc.style.display = '';
            cc.nextElementSibling.style.display = 'none';
            cc.nextElementSibling.nextElementSibling.style.display = 'none';
            break;
        case 'paypal':
            cc.style.display = 'none';
            cc.nextElementSibling.style.display = '';
            cc.nextElementSibling.nextElementSibling.style.display = 'none';
            break;
        case 'bitcoin':
            cc.style.display = 'none';
            cc.nextElementSibling.style.display = 'none';
            cc.nextElementSibling.nextElementSibling.style.display = '';
            break;
        default:
            cc.style.display = '';
            cc.nextElementSibling.style.display = '';
            cc.nextElementSibling.nextElementSibling.style.display = '';
            break;
    }
});


paymentInfo.addEventListener('keyup', (e) => {
    if ( e.target.id == 'cvv' || e.target.id == 'zip' || e.target.id == 'cc-num') {
        if ( e.code.match(/Key/) ) {
            e.target.value = e.target.value.replace(/\D/g, '');
        }
        if ( e.target.id == 'cvv' ) {
            if ( e.target.value.length > 3 ) {
                e.target.value = e.target.value.substring(0, e.target.value.length - 1);
            } 
        }
    }
});



const errorOnField = (input, bool) => {
    const label = input.previousElementSibling;
    if ( bool ) {
        label.style.color = 'darkred';
        label.style.fontWeight = 'bold';
        label.firstElementChild.style.display = 'inline';
    } else {
        label.style.color = 'black';
        label.style.fontWeight = 'normal';
        label.firstElementChild.style.display = 'none';
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateCreditCard(cc) {
    var re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][‌​0-9])[0-9]{12}|3[47]‌​[0-9]{13}|3(?:0[0-5]‌​|[68][0-9])[0-9]{11}‌​|(?:2131|1800|35\\d{‌​3})\\d{11})$/
    return re.test(cc);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let activityChosen,
        paymentMethodChosen;

    if ( nameInput.value.trim() == '' ) {
        errorOnField(nameInput, true);
    } else {
        errorOnField(nameInput, false);
    }
    if ( emailInput.value.trim() == '' || !validateEmail(emailInput.value) ) {
        errorOnField(emailInput, true);
    } else {
        errorOnField(emailInput, false);
    }

    if ( document.getElementById('design').value != 'js puns' && document.getElementById('design') != 'heart js' ) {
        tshirtInfo.children[1].style.display = 'block';
    } else {
        tshirtInfo.children[1].style.display = 'none';
    }

    for ( let i = 0; i < activitiesInfo.children.length; i++ ) {
        if ( activitiesInfo.children[i].tagName == 'LABEL' ) {
            if ( activitiesInfo.children[i].firstElementChild.checked ) {
                activityChosen = true;
            }
        }
    }

    if ( activityChosen ) {
        activitiesInfo.children[1].style.display = 'none';
    } else {
        activitiesInfo.children[1].style.display = 'block';
    }

    if ( document.getElementById('payment').value == 'select_method' ) {
        paymentInfo.children[1].style.display = 'block';
    } else {
        paymentInfo.children[1].style.display = 'none';
        if ( document.getElementById('payment').value == 'credit card' ) {
            if ( document.getElementById('cc-num').value == '' || document.getElementById('zip').value == '' || document.getElementById('cvv').value == '' ) {
                document.getElementById('credit-card').firstElementChild.style.display = 'block';
            } else {
                document.getElementById('credit-card').firstElementChild.style.display = 'none';
            }
            if ( !validateCreditCard(document.getElementById('cc-num').value) ) {
                document.getElementById('credit-card').children[1].style.display = 'block';
            } else {
                document.getElementById('credit-card').children[1].style.display = 'none';
            }
        }
    }


});