document.addEventListener("DOMContentLoaded", () => {
  // Seleção de todos os elementos HTML
  const recipeTittleEl = document.getElementById("recipe-title")
  const recipeDescription = document.getElementById("recipe-description")
  const ingredientsListEl = document.getElementById("ingredients-list")
  const stepNumberEl = document.getElementById("step-number")
  const stepImageEl = document.getElementById("step-image")
  const stepTextEl = document.getElementById("step-text")
  const timerDisplayEl = document.getElementById("timer-display")
  const stepCompletedCheckbox = document.getElementById("step-completed-checkbox")
  const prevStepBtn = document.getElementById("prev-step-btn")
  const nextStepBtn = document.getElementById("next-step-btn")
  const restartRecipeBtn = document.getElementById("restart-recipe-btn")
  const messageBox = document.getElementById("message-box")
  const messageText = document.getElementById("message-text")
  const closeMessageBtn = document.getElementById("close-message-btn")

  const recipe = {
    name: "Lasanha à Bolonhesa Tradicional",
    description:
      "Uma lasanha clássica italiana com molho bolonhesa rico, molho bechamel cremoso e queijos derretidos. Camadas perfeitas de sabor que fazem desta receita um verdadeiro comfort food para toda a família.",
    ingredients: [
      "500g de massa para lasanha pré-cozida",
      "500g de carne moída (patinho ou acém)",
      "300g de linguiça calabresa picada",
      "2 cebolas médias picadas",
      "4 dentes de alho picados",
      "800g de molho de tomate pronto",
      "2 colheres de sopa de extrato de tomate",
      "1 xícara de vinho tinto seco",
      "500ml de leite integral",
      "3 colheres de sopa de farinha de trigo",
      "3 colheres de sopa de manteiga",
      "400g de queijo mussarela ralado",
      "200g de queijo parmesão ralado",
      "Sal, pimenta-do-reino e orégano a gosto",
      "Azeite extra virgem para refogar",
      "Folhas de manjericão fresco",
    ],
    steps: [
      {
        text: "Pré-aqueça o forno a 180°C. Em uma panela grande, aqueça o azeite e refogue a cebola até ficar transparente. Adicione o alho e refogue por mais 1 minuto. Junte a carne moída e a linguiça, cozinhando até dourar bem e soltar todo o líquido.",
        image: "./public/carne-moida-dourada-sendo-refogada-com-cebola-e-alho.png",
        timer: 600, // 10 minutos
      },
      {
        text: "Adicione o extrato de tomate e refogue por 2 minutos. Despeje o vinho tinto e deixe evaporar o álcool. Acrescente o molho de tomate, tempere com sal, pimenta e orégano. Deixe cozinhar em fogo baixo por 20 minutos, mexendo ocasionalmente.",
        image: "./public/molho-bolonhesa-cozinhando-em-fogo-baixo-na-panela.png",
        timer: 1320, // 22 minutos
      },
      {
        text: "Para o molho bechamel: em uma panela, derreta a manteiga em fogo médio. Adicione a farinha e mexa constantemente por 2 minutos para fazer um roux. Gradualmente, adicione o leite morno, mexendo sem parar para evitar grumos. Cozinhe até engrossar.",
        image: "./public/molho-bechamel-cremoso-sendo-preparado-na-panela.png",
        timer: 480, // 8 minutos
      },
      {
        text: "Em um refratário untado, faça a primeira camada com molho bolonhesa. Cubra com folhas de lasanha, depois mais molho bolonhesa, bechamel e queijos. Repita as camadas até terminar os ingredientes, finalizando com bechamel e queijos por cima.",
        image: "./public/lasanha-sendo-montada-em-camadas-no-refrat-rio.png",
        timer: 900, // 15 minutos
      },
      {
        text: "Cubra com papel alumínio e leve ao forno por 30 minutos. Retire o papel alumínio e asse por mais 15 minutos até dourar a superfície. O queijo deve estar borbulhando e dourado. Deixe descansar por 10 minutos antes de cortar.",
        image: "./public/lasanha-dourada-saindo-do-forno-com-queijo-derretido.png",
        timer: 2700, // 45 minutos
      },
      {
        text: "Corte em quadrados generosos e sirva bem quente. Decore com folhas frescas de manjericão e uma pitada de parmesão ralado na hora. Acompanhe com uma salada verde e pão italiano. Buon appetito!",
        image: "./public/fatia-de-lasanha-servida-no-prato-com-manjeric-o.png",
        timer: 180, // 3 minutos
      },
    ],
  }

  // Variáveis de estado
  let currentStepIndex = 0
  let timerInterval = null
  let timerRemaining = 0

  // Funções do aplicativo
  function showMessage(message) {
    messageText.textContent = message
    messageBox.style.display = "flex"
  }

  function hideMessage() {
    messageBox.style.display = "none"
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  function startStepTimer(durationinSeconds) {
    stopTimer()
    timerRemaining = durationinSeconds
    timerDisplayEl.textContent = formatTime(timerRemaining)

    timerInterval = setInterval(() => {
      timerRemaining--
      if (timerRemaining >= 0) {
        timerDisplayEl.textContent = formatTime(timerRemaining)
      } else {
        stopTimer()
        showMessage("Tempo do passo esgotado!")
      }
    }, 1000)
  }

  function showStep(stepIndex) {
    // Valida o índice do passo
    if (stepIndex < 0 || stepIndex >= recipe.steps.length) {
      return
    }

    currentStepIndex = stepIndex
    const currentStep = recipe.steps[currentStepIndex]

    // Atualiza o conteúdo da página com base no passo atual
    stepTextEl.textContent = currentStep.text
    console.log("[v0] Loading image:", currentStep.image)
    stepImageEl.src = currentStep.image
    stepImageEl.style.display = "block"
    stepCompletedCheckbox.checked = false

    // Inicia ou para o cronômetro
    if (currentStep.timer > 0) {
      startStepTimer(currentStep.timer)
    } else {
      stopTimer()
      timerDisplayEl.textContent = "00:00"
    }

    // Habilita/desabilita os botões de navegação
    prevStepBtn.disabled = currentStepIndex === 0
    nextStepBtn.disabled = currentStepIndex === recipe.steps.length - 1
  }

  function nextStep() {
    if (currentStepIndex < recipe.steps.length - 1) {
      showStep(currentStepIndex + 1)
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      showStep(currentStepIndex - 1)
    }
  }

  function restartRecipe() {
    stopTimer()
    showStep(0)
    showMessage("Receita reiniciada! Vamos cozinhar do zero.")
  }

  // Event Listeners
  nextStepBtn.addEventListener("click", nextStep)
  prevStepBtn.addEventListener("click", prevStep)
  restartRecipeBtn.addEventListener("click", restartRecipe)
  closeMessageBtn.addEventListener("click", hideMessage)

  // Inicialização do aplicativo
  function initialize() {
    // Preenche o título, a descrição e os ingredientes
    recipeTittleEl.textContent = recipe.name
    recipeDescription.textContent = recipe.description
    ingredientsListEl.innerHTML = ""
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li")
      li.textContent = ingredient
      ingredientsListEl.appendChild(li)
    })

    // Exibe o primeiro passo
    showStep(currentStepIndex)
  }

  initialize()
})