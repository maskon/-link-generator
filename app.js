const input = document.getElementById('input')
const btn = document.getElementById('btn')
const copy = document.getElementById('btn-copy')
const result = document.getElementById('result')
const quantity = document.getElementById('quantity')

let dataString = ''

input.addEventListener('input', () => {
    if(input.value.includes('https://drive.google.com')) {
        btn.disabled = false
        quantity.style.color = 'rgb(11, 11, 12)'
    } else {
        if(!input.value) {
            quantity.textContent = 'Вставьте ссылки в поле ниже:'
            quantity.style.color = 'rgb(11, 11, 12)'
        } else {
            btn.disabled = true
            quantity.textContent = `Ссылка должна содержать: "https://drive.google.com"`
            quantity.style.color = 'red'
        }
    }

    if(input.value.includes('&usp=drive_copy')) {
        dataString = input.value.split(/&usp=drive_copy/)
        dataString.pop()
        dataString = String(dataString)
    } else {
        dataString = input.value
    }  
})

btn.addEventListener('click', () => {
    btn.disabled = true
    copy.disabled = false
    const array = dataString.split(', ').map(item => item.trim())
    quantity.textContent = `Количество обработанных ссылок: ${array.length}`

    const formattedArray = array.map(item => {
        return item
            .replace(/file\/d\/|open\?id=/g, 'uc?export=download&id=')
            .replace(/\/view\?usp=drive_link|\/view\?usp=sharing|\/view\?usp=drivesdk/, '')
    })

    result.textContent = formattedArray.join(', ')
})

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(result.textContent).then(() => {
        console.log('Текст успешно скопирован в буфер обмена')
        copy.disabled = true
        input.value = ''
        input.focus()
        result.textContent = ''
        quantity.textContent = 'Вставьте ссылки в поле ниже:'
      }, err => { console.error('Произошла ошибка при копировании текста: ', err) }
    )
})
