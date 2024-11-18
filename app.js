const input = document.getElementById('input')
const btn = document.getElementById('btn')
const copy = document.getElementById('btn-copy')
const result = document.getElementById('result')
const quantity = document.getElementById('quantity')
const completed = document.getElementById('completed')

let dataString = ''

input.addEventListener('input', () => {dataString = input.value})

btn.addEventListener('click', () => {
    const array = dataString.split(', ').map(item => item.trim())
    quantity.textContent = `Количество обработанных ссылок: ${array.length}`

    const formattedArray = array.map(item => {
        return item
            .replace(/file\/d\//g, 'uc?export=download&id=')
            .replace(/\/view\?usp=drive_link|\/view\?usp=sharing/, '')
    })

    result.textContent = formattedArray.join(', ')
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(result.textContent).then(() => {
        console.log('Текст успешно скопирован в буфер обмена')
        completed.style.opacity = 1
        showBlock()
        input.value = ''
        input.focus()
        result.textContent = ''
        quantity.textContent = 'Вставьте ссылки в поле ниже:'
      }, err => { console.error('Произошла ошибка при копировании текста: ', err) }
    )
})

function showBlock() {
    setTimeout( () => completed.style.opacity = 0, 700)
}
