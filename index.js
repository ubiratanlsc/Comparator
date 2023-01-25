const url = "https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/"
const array = []
async function base() {
  const acertados = []
  const jogados = [];

  const instance = await axios.get(url)
    .then(response => {
      const data = response.data
      console.log(data);
      apiResult.textContent = data.dezenasSorteadasOrdemSorteio
      concurso.textContent = data.numero
      return data
    })
    .catch(error => console.error(error))

  for (let i = 1; i <= 15; i++) {
    if (i <= 6) {
      hello(false, i)
      array.push(i)
    } else {
      hello(true, i)
    }
  }
  function hello(bool, n) {
    const number = document.querySelector(".numeros")
    const input = document.createElement('input')
    number.appendChild(input)
    input.className = "inputs"
    input.id = `inp${n}`
    input.setAttribute("type", "number")
    input.min = "1"
    input.max = 60
    input.placeholder = "00"
    input.maxLength = "2"
    input.hidden = bool
    mascara(`inp${n}`)
  }
  function mascara(id) {
    $(`#${id}`).mask("00");
    $(`#${id}`).keyup(function () {
      if (this.value.length == this.maxLength) {
        $(this).next('.inputs').focus();
      }
    });
  }

  const nAposta = (value) => { document.getElementsByClassName("nApostas")[0].innerText = `${value}` }

  const down = document.getElementById('down')
  const up = document.getElementById('up')
  down.addEventListener("click", function (event) {
    event.preventDefault();
    if (array.length > 6) {
      const boll = document.getElementById(`inp${array.length}`)
      boll.hidden = true
      array.pop(array.length)
      nAposta(array.length)
    }
  })
  up.addEventListener("click", function (event) {
    event.preventDefault();
    const boll = document.getElementById(`inp${array.length + 1}`)
    boll.hidden = false
    array.push(array.length + 1)
    nAposta(array.length)
  })

  function compareArrays(array1, array2) {
    let count = 0;
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (parseInt(array1[i]) === array2[j]) {
          acertados.push(array2[j])
          count++;
        }
      }
    }
    return count;
  }

  const compare = document.getElementById('compare')
  compare.addEventListener("click", function (event) {
    event.preventDefault();
    for (let b = 1; b <= array.length; b++) {
      const get = document.getElementById(`inp${b}`).value
      jogados.push(parseInt(get))
    }
    compareArrays(instance.dezenasSorteadasOrdemSorteio, jogados)
  })

  const salvar = document.getElementById('salvar')
  salvar.addEventListener("click", function (event) {
    event.preventDefault();
    for (let b = 1; b <= array.length; b++) {
      const get = document.getElementById(`inp${b}`).value
      console.log(get);
      localStorage.setItem(`inp${b}`, get);    
    }
  })

  const carregar = document.getElementById('carregar')
  carregar.addEventListener("click", function (event) {
    event.preventDefault();
    for (let b = 1; b <= array.length; b++) {
      document.getElementById(`inp${b}`).value = localStorage.getItem(`inp${b}`);
      console.log(localStorage.getItem(`inp${b}`));    
    }
  })
} base()
