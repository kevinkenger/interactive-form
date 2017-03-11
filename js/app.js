const nameInput = document.getElementById('name'),
      jobTitle = document.getElementById('other-title');

window.onload = () => {    
    nameInput.focus();
    jobTitle.style.display = 'none';
}