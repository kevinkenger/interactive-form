const totalEl = document.createElement('div'),
      cc = document.getElementById('credit-card'),
      nameInput = document.getElementById('name'),
      emailInput = document.getElementById('mail'),
      form = document.getElementsByTagName('form')[0],
      jobTitle = document.getElementById('other-title'),
      basicInfo = document.getElementsByTagName('fieldset')[0],
      tshirtInfo = document.getElementsByClassName('shirt')[0],
      paymentInfo = document.getElementsByTagName('fieldset')[3],
      activitiesInfo = document.getElementsByClassName('activities')[0];


let total = 0, // set starting total sum at zero
    activityChosen; // boolean value to check if an activity has been chosen

totalEl.textContent = `Total: $${total}`; // add indicator text to total element

// On page load...
window.onload = () => {    
    nameInput.focus(); // set cursor in name input
    jobTitle.style.display = 'none'; // hide the #other-title element until needed
    totalEl.id = 'total'; // give the total indicator element the id of "#total"
    activitiesInfo.appendChild(totalEl); // add "#total" to the activites section
    tshirtInfo.children[4].style.display = 'none'; // hide the colors select field
    cc.nextElementSibling.style.display = 'none';
    cc.nextElementSibling.nextElementSibling.style.display = 'none';
}


// SELECTING JOB TITLE
basicInfo.addEventListener('change', (e) => {
    if ( e.target.value == 'other' ) {
        jobTitle.style.display = '';
        jobTitle.focus();
    } else {
        jobTitle.style.display = 'none';
    }
});


// SELECTING T-SHIRT
tshirtInfo.addEventListener('change', (e) => {
    // if the element that triggered the change isn't "design"...
    if ( e.target.id != 'design' ) {
        return; // exit the function
    }
    tshirtInfo.children[4].style.display = 'inline-block'; // show the color options select
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
    } else if ( e.target.value == 'heart js' ) {
        for ( let i = 0; i < colors.length; i++ ) {
            if ( i < 3 ) {
                colors[i].style.display = 'none';
            } else {
                colors[i].style.display = '';
            }
        }
        colors[3].selected = true;
    } else {
        tshirtInfo.children[4].style.display = 'none';
    }
});


// CHOOSING AN ACTIVITY
activitiesInfo.addEventListener('change', (e) => {
    const checkbox = e.target,
    // create arrays of activities depending on their time
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

    // if checkbox is checked...
    if ( checkbox.checked ) {
        // indicate an activity has been chosen
        activityChosen = true;
    // if checkbox isn't checked...
    } else {
        // reset activityChosen to false in case no other activites are selected
        activityChosen = false;
        // iterate through each of the elements in the activites section
        for ( let i = 0, a = activitiesInfo.children; i < a.length; i++ ) {
            // if the current element is a label (parent of checkbox)...
            if ( a[i].tagName == 'LABEL' ) {
                // if the checkbox is checked...
                if ( a[i].firstElementChild.checked ) {
                    // indicate an activity has been chosen
                    activityChosen = true;
                }
            }
        }
    }

    // if the checkbox that was cliked is in the first array...
    if ( time1.indexOf(checkbox) > -1 ) {
        // send the checked checkbox and the array it's in to the activitiesChecker function
        activitiesChecker(checkbox, time1);  
    // else if the checkbox that was clicked is in the second array...
    } else if ( time2.indexOf(checkbox) > -1 ) {
        // send the checked checkbox and the array it's in to the activitiesChecker function
        activitiesChecker(checkbox, time2);
    // else, it's the "main conference" checkbox...
    } else {
        // so just send the to the activitiesChecker function
        activitiesChecker(checkbox);
    }
});


// SELECTING PAYMENT METHOD
paymentInfo.addEventListener('change', (e) => {
    // if the element that triggered the change isn't "payment"...
    if ( e.target.id != 'payment' ) {
        return; // exit the function
    }

    const payment = e.target;
    // check to see which payment type the user chooses and display the corresponding element
    switch ( payment.value ) {
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
        case 'credit card':
        default:
            cc.style.display = '';
            cc.nextElementSibling.style.display = 'none';
            cc.nextElementSibling.nextElementSibling.style.display = 'none';
            break;
    }
});


// MINOR CREDIT CARD VALIDATION
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


// SUBMITTING THE FORM
form.addEventListener('submit', (e) => {
    // prevent the form from actually being submitted
    e.preventDefault();


    // if the name input is empty...
    if ( nameInput.value.trim() == '' ) {
        // display the error
        errorOnField(nameInput, true);
    // if the name input is not empty...
    } else {
        // remove the error
        errorOnField(nameInput, false);
    }
    // if email input is emtpy or not valid...
    if ( emailInput.value.trim() == '' || !validateEmail(emailInput.value) ) {
        // display the error
        errorOnField(emailInput, true);
    // if email input is not empty and is valid...
    } else {
        // remove the error
        errorOnField(emailInput, false);
    }

    // if the user hasn't chosen a shirt design...
    if ( document.getElementById('design').value == 'Select Theme' ) {
        // show the error
        tshirtInfo.children[1].style.display = 'block';
    // if the user has chosen a design...
    } else {
        // remove the error
        tshirtInfo.children[1].style.display = 'none';
    }

    // if an activity has been chosen
    if ( activityChosen ) {
        activitiesInfo.children[1].style.display = 'none';
    } else {
        activitiesInfo.children[1].style.display = 'block';
    }

    // if a payment method hasn't been chosen...
    if ( document.getElementById('payment').value == 'select_method' ) {
        // display the error
        paymentInfo.children[1].style.display = 'block';
    // if a payment method has been choosen...
    } else {
        // remove the error
        paymentInfo.children[1].style.display = 'none';

        // if the user selects credit card...
        if ( document.getElementById('payment').value == 'credit card' ) {
            // if any of the credit card input fields are empty...
            if ( document.getElementById('cc-num').value.trim() == '' || document.getElementById('zip').value.trim() == '' || document.getElementById('cvv').value.trim() == '' ) {
                // display the error
                document.getElementById('credit-card').firstElementChild.style.display = 'block';
            // if all of the credit card input fields are filled out...    
            } else {
                // remove the error
                document.getElementById('credit-card').firstElementChild.style.display = 'none';
            }
            // if the credit card number isn't valid...
            if ( !validateCreditCard(document.getElementById('cc-num').value) ) {
                // display the error
                document.getElementById('credit-card').children[1].style.display = 'block';
            // if the credit number is valid
            } else {
                // remove the error
                document.getElementById('credit-card').children[1].style.display = 'none';
            }
        }
    }
});


// Error handling for text inputs
const errorOnField = (input, bool) => { // takes input element and true/false to determine whether to display the error
    const label = input.previousElementSibling;
    // if bool is true...
    if ( bool ) {
        // style the label and display the error
        label.style.color = 'darkred';
        label.style.fontWeight = 'bold';
        label.firstElementChild.style.display = 'inline';
    // if bool is false...
    } else {
        // style the label normally and remove the error
        label.style.color = 'black';
        label.style.fontWeight = 'normal';
        label.firstElementChild.style.display = 'none';
    }
}

// Validating the email address
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // call .test() (RegExp prototype method) to check whether the entered email is formatted correctly
    return re.test(email);
}

const validateCreditCard = (cc) => {
    const re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][‌​0-9])[0-9]{12}|3[47]‌​[0-9]{13}|3(?:0[0-5]‌​|[68][0-9])[0-9]{11}‌​|(?:2131|1800|35\\d{‌​3})\\d{11})$/
    // call .test() (RegExp prototype method) to check whether the entered cc number is formatted correctly
    return re.test(cc);
}


// accepts two args: the checkbox that was clicked and the array it's in
const activitiesChecker = (checkbox, time) => {
    // if the checkbox isn't the "main conference"
    if ( time ) {
        // iterate through the passed-in array
        for ( let i = 0; i < 3; i++ ) {
            // if the current element isn't the checked checkbox...
            if ( time[i] != checkbox ) {
                // disabled it, or re-enable it depending on whether the checkbox is being checked on unchecked
                time[i].disabled = checkbox.checked;
            }
        }
    }

    // TOTAL CALCULATOR
    // if the checkbox.checked == true...
    if ( checkbox.checked ) {
        // if the checkbox is the "main conference"...
        if ( checkbox.name == 'all' ) {
            // add $200 to the total
            total += 200;
        // if the checkbox is any of the other activities...
        } else {
            // add $100 to the total
            total += 100;
        }
    // if the checkbox is being unchecked...
    } else {
        // if the checkbox is the "main conference"...
        if ( checkbox.name == 'all' ) {
            // subtract $200 from the total
            total -= 200;
        // if the checkbox is any of the other activites...
        } else {
            // subtract $100 from the total
            total -= 100;
        }
    }
    // update content of the #total element to represent current total
    totalEl.textContent = `Total: $${total}`;
}