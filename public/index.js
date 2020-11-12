const checkBox = document.querySelectorAll('.task-place')

checkBox.forEach(entry =>  {

    entry.addEventListener("change", event => {
      if(event.target.checked){
        entry.classList.add("checked")
      }
    })
  })