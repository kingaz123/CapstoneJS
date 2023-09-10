function clearForm() {
  const inputElements = document.querySelectorAll('input');
  inputElements.forEach((input) => {
    input.value = '';
  });
}