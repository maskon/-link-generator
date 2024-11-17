const input = document.getElementById('input')
const btn = document.getElementById('btn')
const copy = document.getElementById('btn-copy')
const result = document.getElementById('result')

let dataString

input.addEventListener('input', () => {dataString = input.value})

btn.addEventListener('click', () => {
    const array = dataString.split(', ').map(item => item.trim())

    const formattedArray = array.map(item => {
        return item
            .replace(/file\/d\//g, 'uc?export=download&id=')
            .replace(/\/view\?usp=drive_link/, '')
    })

    result.textContent = formattedArray.join(', ')
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(result.textContent).then(() => {
        console.log('Текст успешно скопирован в буфер обмена')
        input.value = ''
        input.focus()
        result.textContent = ''
      }, err => { console.error('Произошла ошибка при копировании текста: ', err) }
    )
})
