// eslint-disable-next-line no-undef
const serializer = new XMLSerializer()
document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.querySelector('.download-qr')
  const svg = document.querySelector('svg')
  if (downloadButton) {
    downloadButton.addEventListener('click', (_e) => {
      navigator.clipboard.writeText(serializer.serializeToString(svg))
      downloadButton.innerHTML = 'Copied!'
    })
  }
})
