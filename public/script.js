document.addEventListener('DOMContentLoaded', function (event) {
  const copyButtons = document.querySelectorAll('.copy-button')
  const shortLinks = document.querySelectorAll('.short-link')
  copyButtons.forEach((copyBtn) => {
    copyBtn.addEventListener('click', (e) => {
      for (const link of shortLinks) {
        if (link.dataset.id === copyBtn.dataset.id) {
          navigator.clipboard.writeText(link.href)
          copyBtn.innerHTML = 'Copied!'
        }
      }
    })
  })
})
