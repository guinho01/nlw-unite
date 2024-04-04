let participantes = [
    {
        nome: "Rodrigo Silva",
        email: "rodriguinhoosss@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 23, 19, 50)
    },
    {
        nome: "Luana Silva",
        email: "luanasilva@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataCheckIn: null
    },
    {
        nome: "João Pereira",
        email: "joaopereira@gmail.com",
        dataInscricao: new Date(2024, 0, 15, 18, 45),
        dataCheckIn: new Date(2024, 0, 16, 19, 30)
    },
    {
        nome: "Ana Maria",
        email: "anamaria@gmail.com",
        dataInscricao: new Date(2024, 2, 10, 20, 10),
        dataCheckIn: new Date(2024, 2, 11, 19, 55)
    },
    {
        nome: "Pedro Santos",
        email: "pedrosantos@gmail.com",
        dataInscricao: new Date(2024, 1, 28, 21, 0),
        dataCheckIn: new Date(2024, 2, 1, 20, 15)
    },
    {
        nome: "Mariana Oliveira",
        email: "marianaoliveira@gmail.com",
        dataInscricao: new Date(2024, 0, 5, 22, 30),
        dataCheckIn: null
    },
    {
        nome: "Rafaela Lima",
        email: "rafaelalima@gmail.com",
        dataInscricao: new Date(2024, 1, 18, 19, 15),
        dataCheckIn: new Date(2024, 1, 19, 18, 40)
    },
    {
        nome: "Gustavo Santos",
        email: "gustavosantos@gmail.com",
        dataInscricao: new Date(2024, 2, 5, 20, 50),
        dataCheckIn: new Date(2024, 2, 6, 19, 20)
    },
    {
        nome: "Camila Costa",
        email: "camilacosta@gmail.com",
        dataInscricao: new Date(2024, 1, 8, 21, 35),
        dataCheckIn: null
    },
    {
        nome: "Daniel Oliveira",
        email: "danieloliveira@gmail.com",
        dataInscricao: new Date(2024, 0, 20, 18, 20),
        dataCheckIn: new Date(2024, 0, 21, 19, 10)
    }
];



const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
     data-email="${participante.email}"
     onclick="fazerCheckIn(event)"
    >
     Confirmar check-in
    </button>
    `
  }
  
  return ` 
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData (event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email)

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
   if(confirm(mensagemConfirmacao) == false) {
    return
   }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email)

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)

 
}