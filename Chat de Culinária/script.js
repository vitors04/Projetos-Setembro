document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const conversationDisplay = document.getElementById("conversation-display")
  const choicesArea = document.getElementById("choices-area")
  const restartButton = document.getElementById("restart-button")
  const messageBox = document.getElementById("message-box")
  const messageText = document.getElementById("message-text")
  const closeMessageBtn = document.getElementById("close-message-btn")

  // --- Conversation Flow Data ---
  const conversationNodes = {
    start: {
      message:
        "Olá! Bem-vindo(a) ao nosso chat de receitas culinárias! 🍳 Que tipo de culinária você gostaria de explorar hoje?",
      choices: [
        { text: "Culinária Italiana", nextNodeId: "italian_cuisine" },
        { text: "Culinária Japonesa", nextNodeId: "japanese_cuisine" },
        { text: "Culinária Mexicana", nextNodeId: "mexican_cuisine" },
        { text: "Culinária Brasileira", nextNodeId: "brazilian_cuisine" },
      ],
    },
    italian_cuisine: {
      message:
        "Que maravilha! A culinária italiana é rica em sabores e tradições. Que tipo de prato italiano você gostaria de aprender?",
      choices: [
        { text: "🍝 Massas", nextNodeId: "italian_pasta" },
        { text: "🍕 Pizzas", nextNodeId: "italian_pizza" },
        { text: "🥗 Risottos", nextNodeId: "italian_risotto" },
        { text: "🍰 Sobremesas", nextNodeId: "italian_desserts" },
        { text: "⬅️ Voltar ao início", nextNodeId: "start" },
      ],
    },
    italian_pasta: {
      message: "As massas são o coração da culinária italiana! Qual receita de massa você gostaria de aprender?",
      choices: [
        { text: "Spaghetti Carbonara", nextNodeId: "carbonara_recipe" },
        { text: "Fettuccine Alfredo", nextNodeId: "alfredo_recipe" },
        { text: "Penne Arrabbiata", nextNodeId: "arrabbiata_recipe" },
        { text: "⬅️ Voltar à culinária italiana", nextNodeId: "italian_cuisine" },
      ],
    },
    carbonara_recipe: {
      message:
        "Spaghetti Carbonara! 🍝 Ingredientes: 400g spaghetti, 200g pancetta, 4 ovos, 100g queijo pecorino, pimenta preta. Cozinhe a massa, frite a pancetta, misture ovos e queijo, combine tudo fora do fogo. Buon appetito!",
      choices: [
        { text: "📝 Mais detalhes da receita", nextNodeId: "carbonara_details" },
        { text: "🍝 Outras massas", nextNodeId: "italian_pasta" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    carbonara_details: {
      message:
        "Dica especial: O segredo da carbonara é misturar os ovos com a massa quente, mas fora do fogo, para não embaralhar! Use sempre queijo pecorino romano e pancetta de qualidade.",
      choices: [
        { text: "🍝 Outras receitas de massa", nextNodeId: "italian_pasta" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    alfredo_recipe: {
      message:
        "Fettuccine Alfredo! 🧄 Ingredientes: 400g fettuccine, 200g manteiga, 200g parmesão ralado, creme de leite, alho, sal e pimenta. Uma receita cremosa e deliciosa!",
      choices: [
        { text: "📝 Dicas de preparo", nextNodeId: "alfredo_tips" },
        { text: "🍝 Outras massas", nextNodeId: "italian_pasta" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    alfredo_tips: {
      message:
        "Dica do chef: Derreta a manteiga em fogo baixo, adicione o creme e o parmesão gradualmente. Misture a massa ainda quente para um molho sedoso!",
      choices: [
        { text: "🍝 Outras receitas de massa", nextNodeId: "italian_pasta" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    arrabbiata_recipe: {
      message:
        "Penne Arrabbiata! 🌶️ Ingredientes: 400g penne, tomates pelados, alho, pimenta vermelha, azeite, manjericão. Um prato picante e saboroso da região de Roma!",
      choices: [
        { text: "🌶️ Como ajustar a pimenta", nextNodeId: "arrabbiata_spice" },
        { text: "🍝 Outras massas", nextNodeId: "italian_pasta" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    arrabbiata_spice: {
      message:
        "Para controlar a pimenta: comece com pouca pimenta vermelha seca e vá adicionando. Retire as sementes para menos ardor. Prove sempre antes de servir!",
      choices: [
        { text: "🍝 Outras receitas de massa", nextNodeId: "italian_pasta" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    italian_pizza: {
      message: "Pizza italiana autêntica! 🍕 Que tipo de pizza você quer aprender a fazer?",
      choices: [
        { text: "Pizza Margherita", nextNodeId: "margherita_recipe" },
        { text: "Pizza Napoletana", nextNodeId: "napoletana_recipe" },
        { text: "Massa de pizza caseira", nextNodeId: "pizza_dough" },
        { text: "⬅️ Voltar à culinária italiana", nextNodeId: "italian_cuisine" },
      ],
    },
    margherita_recipe: {
      message:
        "Pizza Margherita clássica! 🍅 Massa de pizza, molho de tomate, mozzarella di bufala, manjericão fresco, azeite extra virgem. As cores da bandeira italiana!",
      choices: [
        { text: "🔥 Dicas de forno", nextNodeId: "pizza_oven_tips" },
        { text: "🍕 Outras pizzas", nextNodeId: "italian_pizza" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    pizza_oven_tips: {
      message:
        "Dica de ouro: Pré-aqueça o forno na temperatura máxima (250°C+) com uma pedra de pizza ou assadeira. Asse por 8-12 minutos até as bordas ficarem douradas!",
      choices: [
        { text: "🍕 Outras receitas de pizza", nextNodeId: "italian_pizza" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    california_roll: {
      message:
        "California Roll! 🍣 Ingredientes: arroz de sushi, nori, pepino, abacate, kani (caranguejo), maionese japonesa, gergelim. Role com o nori por dentro!",
      choices: [
        { text: "🥒 Técnica de corte", nextNodeId: "california_roll_technique" },
        { text: "🍣 Outros tipos de sushi", nextNodeId: "japanese_sushi" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    california_roll_technique: {
      message:
        "Técnica: Coloque o nori sobre o makisu, espalhe arroz, vire, adicione recheio, role apertando bem. Corte com faca molhada em movimentos de serra!",
      choices: [
        { text: "🍣 Outros tipos de sushi", nextNodeId: "japanese_sushi" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    nigiri_recipe: {
      message:
        "Nigiri básico! 🍣 Molde o arroz temperado em formato oval, coloque uma fatia fina de peixe fresco por cima. Pressione levemente. Simples e elegante!",
      choices: [
        { text: "🐟 Tipos de peixe para nigiri", nextNodeId: "nigiri_fish" },
        { text: "🍣 Outros tipos de sushi", nextNodeId: "japanese_sushi" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    nigiri_fish: {
      message:
        "Peixes para nigiri: salmão, atum, peixe branco (linguado), camarão cozido. Sempre use peixe sashimi grade, bem fresco e de qualidade!",
      choices: [
        { text: "🍣 Outros tipos de sushi", nextNodeId: "japanese_sushi" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    napoletana_recipe: {
      message:
        "Pizza Napoletana! 🍕 Massa fina, molho de tomate San Marzano, mozzarella di bufala, anchovas, orégano, azeite. A pizza original de Nápoles!",
      choices: [
        { text: "🐟 Sobre as anchovas", nextNodeId: "napoletana_anchovies" },
        { text: "🍕 Outras pizzas", nextNodeId: "italian_pizza" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    napoletana_anchovies: {
      message:
        "Anchovas: use anchovas em conserva de boa qualidade, escorra bem. Elas adicionam umami e salinidade únicos. Se não gostar, pode omitir!",
      choices: [
        { text: "🍕 Outras receitas de pizza", nextNodeId: "italian_pizza" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    pizza_dough: {
      message:
        "Massa de pizza caseira! 🍞 500g farinha, 325ml água morna, 10g sal, 3g fermento, azeite. Misture, sove por 10 min, deixe crescer 2h. Massa perfeita!",
      choices: [
        { text: "⏰ Dicas de fermentação", nextNodeId: "dough_fermentation" },
        { text: "🍕 Fazer pizzas agora", nextNodeId: "italian_pizza" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    dough_fermentation: {
      message:
        "Fermentação: para sabor mais complexo, deixe na geladeira por 24-72h. Retire 1h antes de usar. Massa fria é mais fácil de abrir!",
      choices: [
        { text: "🍕 Fazer pizzas", nextNodeId: "italian_pizza" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    italian_risotto: {
      message: "Risottos cremosos! 🥗 Que tipo de risotto você quer aprender?",
      choices: [
        { text: "Risotto alla Milanese", nextNodeId: "risotto_milanese" },
        { text: "Risotto de Cogumelos", nextNodeId: "risotto_mushroom" },
        { text: "Risotto de Camarão", nextNodeId: "risotto_shrimp" },
        { text: "⬅️ Voltar à culinária italiana", nextNodeId: "italian_cuisine" },
      ],
    },
    risotto_milanese: {
      message:
        "Risotto alla Milanese! 💛 Arroz arbóreo, caldo de carne quente, açafrão, vinho branco, cebola, parmesão, manteiga. O açafrão dá a cor dourada!",
      choices: [
        { text: "🥄 Técnica do risotto", nextNodeId: "risotto_technique" },
        { text: "🥗 Outros risottos", nextNodeId: "italian_risotto" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    risotto_technique: {
      message:
        "Técnica: refogue a cebola, adicione arroz, vinho, depois caldo quente aos poucos mexendo sempre. Cremoso por fora, al dente por dentro!",
      choices: [
        { text: "🥗 Outros risottos", nextNodeId: "italian_risotto" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    italian_desserts: {
      message: "Dolci italiani! 🍰 Que sobremesa italiana você quer aprender?",
      choices: [
        { text: "Tiramisu", nextNodeId: "tiramisu_recipe" },
        { text: "Panna Cotta", nextNodeId: "panna_cotta_recipe" },
        { text: "Gelato", nextNodeId: "gelato_recipe" },
        { text: "⬅️ Voltar à culinária italiana", nextNodeId: "italian_cuisine" },
      ],
    },
    tiramisu_recipe: {
      message:
        "Tiramisu clássico! ☕ Biscoitos savoiardi, café forte, mascarpone, ovos, açúcar, cacau em pó, marsala. Camadas de puro prazer italiano!",
      choices: [
        { text: "🥚 Dicas com ovos crus", nextNodeId: "tiramisu_eggs" },
        { text: "🍰 Outras sobremesas", nextNodeId: "italian_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    tiramisu_eggs: {
      message:
        "Ovos no tiramisu: use ovos frescos e de qualidade. Separe bem as claras, bata até pico firme. Misture delicadamente para manter a leveza!",
      choices: [
        { text: "🍰 Outras sobremesas italianas", nextNodeId: "italian_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    japanese_cuisine: {
      message:
        "Konnichiwa! A culinária japonesa é uma arte de simplicidade e sabor. O que você gostaria de aprender?",
      choices: [
        { text: "🍣 Sushi e Sashimi", nextNodeId: "japanese_sushi" },
        { text: "🍜 Ramen", nextNodeId: "japanese_ramen" },
        { text: "🍱 Pratos tradicionais", nextNodeId: "japanese_traditional" },
        { text: "🍡 Sobremesas japonesas", nextNodeId: "japanese_desserts" },
        { text: "⬅️ Voltar ao início", nextNodeId: "start" },
      ],
    },
    japanese_sushi: {
      message: "Sushi é uma arte! 🍣 Que tipo de sushi você quer aprender?",
      choices: [
        { text: "Arroz para sushi", nextNodeId: "sushi_rice" },
        { text: "Nigiri básico", nextNodeId: "nigiri_recipe" },
        { text: "California Roll", nextNodeId: "california_roll" },
        { text: "⬅️ Voltar à culinária japonesa", nextNodeId: "japanese_cuisine" },
      ],
    },
    sushi_rice: {
      message:
        "Arroz de sushi perfeito! 🍚 Use arroz japonês, lave até a água ficar clara, cozinhe com kombu, tempere com vinagre de arroz, açúcar e sal. A base de todo bom sushi!",
      choices: [
        { text: "📏 Proporções exatas", nextNodeId: "rice_proportions" },
        { text: "🍣 Outros tipos de sushi", nextNodeId: "japanese_sushi" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    rice_proportions: {
      message:
        "Proporções: 2 xícaras de arroz, 2,5 xícaras de água, 1/3 xícara de vinagre de arroz, 3 colheres de açúcar, 1 colher de sal. Misture o tempero morno no arroz!",
      choices: [
        { text: "🍣 Fazer nigiri agora", nextNodeId: "nigiri_recipe" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    japanese_ramen: {
      message: "Ramen caseiro! 🍜 Que tipo de ramen você quer aprender?",
      choices: [
        { text: "Ramen Shoyu", nextNodeId: "ramen_shoyu" },
        { text: "Ramen Miso", nextNodeId: "ramen_miso" },
        { text: "Caldo de ramen", nextNodeId: "ramen_broth" },
        { text: "⬅️ Voltar à culinária japonesa", nextNodeId: "japanese_cuisine" },
      ],
    },
    ramen_shoyu: {
      message:
        "Ramen Shoyu! 🍜 Caldo claro de frango e peixe, molho shoyu, macarrão ramen, chashu, ovo marinado, cebolinha, nori. Sabor limpo e reconfortante!",
      choices: [
        { text: "🥚 Como fazer ovo marinado", nextNodeId: "ramen_egg" },
        { text: "🍜 Outros tipos de ramen", nextNodeId: "japanese_ramen" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    ramen_egg: {
      message:
        "Ovo marinado (ajitsuke tamago): cozinhe 6-7 min, água gelada, descasque, marine em shoyu + mirin + sake por 4h. Gema cremosa, sabor incrível!",
      choices: [
        { text: "🍜 Outros tipos de ramen", nextNodeId: "japanese_ramen" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    ramen_miso: {
      message:
        "Ramen Miso! 🍜 Caldo rico de miso, macarrão ramen, chashu, ovo marinado, milho, cebolinha, nori, gergelim. Sabor umami intenso e reconfortante!",
      choices: [
        { text: "🥄 Tipos de miso", nextNodeId: "miso_types" },
        { text: "🍜 Outros tipos de ramen", nextNodeId: "japanese_ramen" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    miso_types: {
      message:
        "Tipos de miso: Shiro miso (suave e doce), Aka miso (forte e salgado), Awase miso (mistura equilibrada). Cada um dá sabor único ao ramen!",
      choices: [
        { text: "🍜 Outros tipos de ramen", nextNodeId: "japanese_ramen" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    ramen_broth: {
      message:
        "Caldo de ramen! 🍖 Ossos de porco, frango, kombu, katsuobushi, cebola, alho, gengibre. Cozinhe por 12-24h para caldo cremoso e saboroso!",
      choices: [
        { text: "⏰ Dicas de tempo", nextNodeId: "broth_timing" },
        { text: "🍜 Fazer ramen agora", nextNodeId: "japanese_ramen" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    broth_timing: {
      message:
        "Tempo do caldo: 6h mínimo para sabor básico, 12h para bom sabor, 24h para caldo premium. Mantenha fervura suave e adicione água quando necessário!",
      choices: [
        { text: "🍜 Tipos de ramen", nextNodeId: "japanese_ramen" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    japanese_traditional: {
      message: "Pratos tradicionais japoneses! 🍱 O que você gostaria de aprender?",
      choices: [
        { text: "Tempura", nextNodeId: "tempura_recipe" },
        { text: "Teriyaki", nextNodeId: "teriyaki_recipe" },
        { text: "Miso Soup", nextNodeId: "miso_soup_recipe" },
        { text: "⬅️ Voltar à culinária japonesa", nextNodeId: "japanese_cuisine" },
      ],
    },
    tempura_recipe: {
      message:
        "Tempura crocante! 🍤 Massa: farinha gelada, água gelada, gema. Óleo a 180°C. Camarões, legumes, mergulhe rápido na massa, frite até dourar!",
      choices: [
        { text: "🌡️ Controle da temperatura", nextNodeId: "tempura_temperature" },
        { text: "🍱 Outros pratos tradicionais", nextNodeId: "japanese_traditional" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    tempura_temperature: {
      message:
        "Temperatura do óleo: teste com uma gota de massa - deve fazer bolhas imediatamente. Muito quente = queima, muito frio = absorve óleo. 180°C é ideal!",
      choices: [
        { text: "🍱 Outros pratos tradicionais", nextNodeId: "japanese_traditional" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    teriyaki_recipe: {
      message:
        "Teriyaki caseiro! 🐟 Molho: shoyu, mirin, sake, açúcar. Grelhe peixe ou frango, pincele com molho, caramelize. Sabor doce e salgado perfeito!",
      choices: [
        { text: "🍯 Segredos do molho", nextNodeId: "teriyaki_sauce" },
        { text: "🍱 Outros pratos tradicionais", nextNodeId: "japanese_traditional" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    teriyaki_sauce: {
      message:
        "Molho teriyaki: proporção 3:2:1:1 (shoyu:mirin:sake:açúcar). Cozinhe até engrossar levemente. Pincele durante e após o cozimento!",
      choices: [
        { text: "🍱 Outros pratos tradicionais", nextNodeId: "japanese_traditional" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    miso_soup_recipe: {
      message:
        "Miso Soup! 🍲 Dashi, pasta de miso, tofu, wakame, cebolinha. Dissolva o miso no dashi morno, adicione tofu e algas. Sopa reconfortante!",
      choices: [
        { text: "🌊 Como fazer dashi", nextNodeId: "dashi_recipe" },
        { text: "🍱 Outros pratos tradicionais", nextNodeId: "japanese_traditional" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    dashi_recipe: {
      message:
        "Dashi básico: kombu (alga), katsuobushi (bonito seco), água. Deixe kombu na água fria por 30 min, aqueça, retire antes de ferver, adicione bonito!",
      choices: [
        { text: "🍱 Outros pratos tradicionais", nextNodeId: "japanese_traditional" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    japanese_desserts: {
      message: "Sobremesas japonesas! 🍡 Que doce japonês você quer aprender?",
      choices: [
        { text: "Mochi", nextNodeId: "mochi_recipe" },
        { text: "Dorayaki", nextNodeId: "dorayaki_recipe" },
        { text: "Matcha Ice Cream", nextNodeId: "matcha_ice_cream" },
        { text: "⬅️ Voltar à culinária japonesa", nextNodeId: "japanese_cuisine" },
      ],
    },
    mochi_recipe: {
      message:
        "Mochi caseiro! 🍡 Farinha de arroz glutinoso, açúcar, água, recheios variados. Cozinhe no vapor, amasse até ficar elástico. Textura única!",
      choices: [
        { text: "🥜 Recheios para mochi", nextNodeId: "mochi_fillings" },
        { text: "🍡 Outras sobremesas japonesas", nextNodeId: "japanese_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    mochi_fillings: {
      message:
        "Recheios: anko (pasta de feijão doce), morango, sorvete, chocolate. Envolva o recheio com a massa morna, sele bem as bordas!",
      choices: [
        { text: "🍡 Outras sobremesas japonesas", nextNodeId: "japanese_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    dorayaki_recipe: {
      message:
        "Dorayaki! 🥞 Panquecas fofas com recheio de anko (pasta de feijão doce). Massa: ovos, açúcar, farinha, mel, fermento. Asse como panquecas pequenas!",
      choices: [
        { text: "🫘 Como fazer anko", nextNodeId: "anko_recipe" },
        { text: "🍡 Outras sobremesas japonesas", nextNodeId: "japanese_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    anko_recipe: {
      message:
        "Anko (pasta de feijão): feijão azuki, açúcar, sal. Cozinhe o feijão até macio, escorra, refogue com açúcar até virar pasta. Doce tradicional!",
      choices: [
        { text: "🍡 Outras sobremesas japonesas", nextNodeId: "japanese_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    matcha_ice_cream: {
      message:
        "Sorvete de Matcha! 🍵 Creme de leite, leite, açúcar, gemas, matcha em pó de qualidade. Bata bem o matcha para não formar grumos!",
      choices: [
        { text: "🍵 Qualidade do matcha", nextNodeId: "matcha_quality" },
        { text: "🍡 Outras sobremesas japonesas", nextNodeId: "japanese_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    matcha_quality: {
      message:
        "Matcha de qualidade: cor verde vibrante, textura fina, sabor doce sem amargor. Matcha cerimonial é o melhor. Peneire sempre antes de usar!",
      choices: [
        { text: "🍡 Outras sobremesas japonesas", nextNodeId: "japanese_desserts" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    mexican_cuisine: {
      message: "¡Hola! A culinária mexicana é explosão de sabores e cores! Que prato mexicano você quer aprender?",
      choices: [
        { text: "🌮 Tacos", nextNodeId: "mexican_tacos" },
        { text: "🫔 Enchiladas", nextNodeId: "mexican_enchiladas" },
        { text: "🥑 Guacamole", nextNodeId: "guacamole_recipe" },
        { text: "🌶️ Salsas", nextNodeId: "mexican_salsas" },
        { text: "⬅️ Voltar ao início", nextNodeId: "start" },
      ],
    },
    mexican_tacos: {
      message: "Tacos autênticos! 🌮 Que tipo de taco você quer aprender?",
      choices: [
        { text: "Tacos al Pastor", nextNodeId: "tacos_pastor" },
        { text: "Tacos de Carnitas", nextNodeId: "tacos_carnitas" },
        { text: "Tacos de Pollo", nextNodeId: "tacos_pollo" },
        { text: "⬅️ Voltar à culinária mexicana", nextNodeId: "mexican_cuisine" },
      ],
    },
    tacos_pastor: {
      message:
        "Tacos al Pastor! 🍍 Carne de porco marinada com achiote, pimenta, abacaxi, cebola roxa, coentro, tortillas de milho. O sabor do México na sua mesa!",
      choices: [
        { text: "🌶️ Receita da marinada", nextNodeId: "pastor_marinade" },
        { text: "🌮 Outros tacos", nextNodeId: "mexican_tacos" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    pastor_marinade: {
      message:
        "Marinada al Pastor: achiote, pimenta chipotle, alho, cominho, orégano, vinagre, suco de laranja. Marine a carne por 4 horas. Grelhe com abacaxi!",
      choices: [
        { text: "🌮 Outros tipos de tacos", nextNodeId: "mexican_tacos" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    tacos_carnitas: {
      message:
        "Tacos de Carnitas! 🐷 Carne de porco cozida lentamente na própria gordura, temperada com laranja, alho, cominho. Desfiada e dourada na frigideira!",
      choices: [
        { text: "🍊 Técnica das carnitas", nextNodeId: "carnitas_technique" },
        { text: "🌮 Outros tacos", nextNodeId: "mexican_tacos" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    carnitas_technique: {
      message:
        "Técnica carnitas: cozinhe a carne em fogo baixo por 3-4h até desmanchar. Desfie, doure em fogo alto para criar bordas crocantes. Paciência é fundamental!",
      choices: [
        { text: "🌮 Outros tipos de tacos", nextNodeId: "mexican_tacos" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    tacos_pollo: {
      message:
        "Tacos de Pollo! 🐔 Frango marinado com limão, cominho, páprica, alho, grelhado e desfiado. Sirva com cebola, coentro e salsa verde!",
      choices: [
        { text: "🌿 Marinada do frango", nextNodeId: "pollo_marinade" },
        { text: "🌮 Outros tacos", nextNodeId: "mexican_tacos" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    pollo_marinade: {
      message:
        "Marinada: suco de limão, azeite, alho, cominho, páprica, orégano, sal, pimenta. Marine por 2h mínimo. Grelhe até dourar e desfie!",
      choices: [
        { text: "🌮 Outros tipos de tacos", nextNodeId: "mexican_tacos" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    mexican_enchiladas: {
      message: "Enchiladas autênticas! 🫔 Que tipo de enchilada você quer aprender?",
      choices: [
        { text: "Enchiladas Rojas", nextNodeId: "enchiladas_rojas" },
        { text: "Enchiladas Verdes", nextNodeId: "enchiladas_verdes" },
        { text: "Molho para enchiladas", nextNodeId: "enchilada_sauce" },
        { text: "⬅️ Voltar à culinária mexicana", nextNodeId: "mexican_cuisine" },
      ],
    },
    enchiladas_rojas: {
      message:
        "Enchiladas Rojas! 🌶️ Tortillas de milho, frango desfiado, molho de pimenta vermelha, queijo, cebola, creme. Gratine no forno até borbulhar!",
      choices: [
        { text: "🌶️ Fazer molho vermelho", nextNodeId: "red_sauce_recipe" },
        { text: "🫔 Outras enchiladas", nextNodeId: "mexican_enchiladas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    red_sauce_recipe: {
      message:
        "Molho vermelho: pimentas guajillo e ancho, tomate, alho, cebola, cominho. Torre as pimentas, hidrate, bata com os outros ingredientes. Coe e tempere!",
      choices: [
        { text: "🫔 Fazer enchiladas", nextNodeId: "mexican_enchiladas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    enchiladas_verdes: {
      message:
        "Enchiladas Verdes! 💚 Tortillas, frango, molho verde de tomatillo, queijo branco, cebola, creme. Sabor fresco e levemente ácido!",
      choices: [
        { text: "🌶️ Molho verde", nextNodeId: "green_sauce_recipe" },
        { text: "🫔 Outras enchiladas", nextNodeId: "mexican_enchiladas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    green_sauce_recipe: {
      message:
        "Molho verde: tomatillos, jalapeños, cebola, alho, coentro. Asse os tomatillos, bata todos ingredientes, cozinhe por 15 min. Fresco e picante!",
      choices: [
        { text: "🫔 Fazer enchiladas", nextNodeId: "mexican_enchiladas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    mexican_salsas: {
      message: "Salsas mexicanas! 🌶️ Que salsa você quer aprender?",
      choices: [
        { text: "Salsa Verde", nextNodeId: "salsa_verde" },
        { text: "Pico de Gallo", nextNodeId: "pico_de_gallo" },
        { text: "Salsa Roja", nextNodeId: "salsa_roja" },
        { text: "⬅️ Voltar à culinária mexicana", nextNodeId: "mexican_cuisine" },
      ],
    },
    salsa_verde: {
      message:
        "Salsa Verde! 💚 Tomatillos, jalapeños, cebola, alho, coentro, limão, sal. Asse os tomatillos até amolecer, bata todos os ingredientes. Fresca e picante!",
      choices: [
        { text: "🌶️ Ajustar o picante", nextNodeId: "salsa_spice_control" },
        { text: "🌶️ Outras salsas", nextNodeId: "mexican_salsas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    salsa_spice_control: {
      message:
        "Controlar picância: retire sementes e veias das pimentas, use menos quantidade, adicione tomate ou cebola para suavizar. Prove sempre!",
      choices: [
        { text: "🌶️ Outras salsas", nextNodeId: "mexican_salsas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    pico_de_gallo: {
      message:
        "Pico de Gallo! 🍅 Tomate, cebola branca, jalapeño, coentro, limão, sal. Corte tudo em cubos pequenos, misture na hora de servir. Fresco e crocante!",
      choices: [
        { text: "🔪 Técnica de corte", nextNodeId: "pico_cutting" },
        { text: "🌶️ Outras salsas", nextNodeId: "mexican_salsas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    pico_cutting: {
      message:
        "Corte uniforme: cubos de 5mm, retire sementes do tomate para não ficar aguado, corte a cebola bem fina. Misture só na hora de servir!",
      choices: [
        { text: "🌶️ Outras salsas", nextNodeId: "mexican_salsas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    salsa_roja: {
      message:
        "Salsa Roja! ❤️ Tomates, chiles serranos, cebola, alho, sal. Asse os tomates e pimentas, bata todos ingredientes. Salsa clássica e versátil!",
      choices: [
        { text: "🔥 Intensidade da pimenta", nextNodeId: "serrano_heat" },
        { text: "🌶️ Outras salsas", nextNodeId: "mexican_salsas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    serrano_heat: {
      message:
        "Chile serrano: mais picante que jalapeño, use com moderação. Para menos ardor, retire sementes e veias. Sempre prove antes de adicionar mais!",
      choices: [
        { text: "🌶️ Outras salsas", nextNodeId: "mexican_salsas" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    brazilian_cuisine: {
      message: "Oi! A culinária brasileira é diversa e saborosa! Que prato brasileiro você quer aprender?",
      choices: [
        { text: "🍛 Feijoada", nextNodeId: "feijoada_recipe" },
        { text: "🧄 Pão de açúcar", nextNodeId: "pao_acucar" },
        { text: "🥥 Brigadeiro", nextNodeId: "brigadeiro_recipe" },
        { text: "🍤 Moqueca", nextNodeId: "moqueca_recipe" },
        { text: "⬅️ Voltar ao início", nextNodeId: "start" },
      ],
    },
    feijoada_recipe: {
      message:
        "Feijoada completa! 🍛 Feijão preto, linguiça, bacon, carne seca, costela, couve refogada, arroz, farofa, laranja. O prato mais brasileiro que existe!",
      choices: [
        { text: "⏰ Tempo de preparo", nextNodeId: "feijoada_timing" },
        { text: "🥬 Como fazer a couve", nextNodeId: "couve_refogada" },
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    feijoada_timing: {
      message:
        "Tempo da feijoada: deixe o feijão de molho na véspera, cozinhe por 2-3 horas com as carnes. Adicione os temperos aos poucos. Paciência é o segredo!",
      choices: [
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    brigadeiro_recipe: {
      message:
        "Brigadeiro tradicional! 🍫 1 lata de leite condensado, 3 colheres de chocolate em pó, 1 colher de manteiga. Cozinhe mexendo até desgrudar da panela!",
      choices: [
        { text: "🍓 Variações de brigadeiro", nextNodeId: "brigadeiro_variations" },
        { text: "Outros doces brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    brigadeiro_variations: {
      message:
        "Variações: Beijinho (coco), Cajuzinho (amendoim), Brigadeiro branco (chocolate branco), Brigadeiro de Nutella. Use a mesma base e mude o sabor!",
      choices: [
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    pao_acucar: {
      message:
        "Pão de Açúcar! 🍞 Farinha, açúcar, ovos, manteiga, fermento. Massa doce e macia, perfeita para o café da manhã brasileiro!",
      choices: [
        { text: "🥖 Técnica da massa", nextNodeId: "pao_acucar_technique" },
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    pao_acucar_technique: {
      message:
        "Técnica: sove bem a massa até ficar lisa, deixe crescer até dobrar, modele, deixe crescer novamente. Asse até dourar. Paciência é fundamental!",
      choices: [
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    moqueca_recipe: {
      message:
        "Moqueca de Peixe! 🍤 Peixe firme, leite de coco, dendê, tomate, cebola, pimentão, coentro, limão. Cozinhe em panela de barro para o sabor autêntico!",
      choices: [
        { text: "🥥 Sobre o leite de coco", nextNodeId: "moqueca_coconut" },
        { text: "🌶️ Variações da moqueca", nextNodeId: "moqueca_variations" },
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    moqueca_coconut: {
      message:
        "Leite de coco: use leite de coco fresco ou de qualidade. Adicione no final para não talhar. O dendê dá cor e sabor únicos da Bahia!",
      choices: [
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    moqueca_variations: {
      message:
        "Variações: moqueca de camarão, siri, lagosta. Pode adicionar quiabo, usar peixe misto. Sirva com arroz branco, farofa e pimenta!",
      choices: [
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    couve_refogada: {
      message:
        "Couve refogada! 🥬 Couve cortada bem fina, alho, bacon ou linguiça, azeite. Refogue rapidamente para manter a cor verde e crocância!",
      choices: [
        { text: "🔪 Técnica de corte", nextNodeId: "couve_cutting" },
        { text: "Voltar à feijoada", nextNodeId: "feijoada_recipe" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },
    couve_cutting: {
      message:
        "Corte da couve: empilhe as folhas, enrole como charuto, corte em fatias bem finas (chiffonade). Lave bem e escorra antes de refogar!",
      choices: [
        { text: "Outros pratos brasileiros", nextNodeId: "brazilian_cuisine" },
        { text: "🏠 Voltar ao início", nextNodeId: "start" },
      ],
    },

    end_conversation: {
      message:
        "Foi um prazer cozinhar com você! 👨‍🍳 Espero que aproveite essas deliciosas receitas. Bom apetite e volte sempre para mais sabores!",
      choices: [{ text: "🍳 Explorar mais receitas", nextNodeId: "start" }],
    },
  }

  let currentNodeId = "start" // Start with the 'start' node

  // --- Helper Functions ---

  /**
   * Displays a message box with a given message.
   * @param {string} message - The message to display.
   */
  function showMessage(message) {
    messageText.textContent = message
    messageBox.style.display = "flex"
  }

  /**
   * Hides the message box.
   */
  function hideMessage() {
    messageBox.style.display = "none"
  }

  /**
   * Adds a message to the conversation display.
   * @param {string} text - The message text.
   * @param {string} sender - 'bot' or 'user'.
   */
  function addMessageToDisplay(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("message", `${sender}-message`)
    messageDiv.textContent = text
    conversationDisplay.appendChild(messageDiv)
    // Scroll to the bottom to show the latest message
    conversationDisplay.scrollTop = conversationDisplay.scrollHeight
  }

  /**
   * Displays the current conversation node (message and choices).
   * @param {string} nodeId - The ID of the node to display.
   */
  function displayNode(nodeId) {
    const node = conversationNodes[nodeId]
    if (!node) {
      addMessageToDisplay("Erro: Receita não encontrada.", "bot")
      choicesArea.innerHTML = "" // Clear choices
      return
    }

    addMessageToDisplay(node.message, "bot")
    choicesArea.innerHTML = "" // Clear previous choices

    node.choices.forEach((choice) => {
      const button = document.createElement("button")
      button.classList.add("choice-button")
      button.textContent = choice.text
      button.addEventListener("click", () => handleChoice(choice.text, choice.nextNodeId))
      choicesArea.appendChild(button)
    })
  }

  /**
   * Handles a user's choice, adds it to display, and moves to the next node.
   * @param {string} choiceText - The text of the choice made by the user.
   * @param {string} nextNodeId - The ID of the next conversation node.
   */
  function handleChoice(choiceText, nextNodeId) {
    addMessageToDisplay(choiceText, "user") // Display user's choice
    currentNodeId = nextNodeId // Update current node
    displayNode(currentNodeId) // Display the next node
  }

  /**
   * Restarts the conversation from the beginning.
   */
  function restartConversation() {
    if (confirm("Tem certeza que deseja reiniciar a conversa culinária?")) {
      conversationDisplay.innerHTML = "" // Clear all messages
      addMessageToDisplay("Bem-vindo(a) ao mundo das receitas culinárias! 👨‍🍳", "bot") // Initial message
      currentNodeId = "start" // Reset to start node
      displayNode(currentNodeId) // Display the start node
    }
  }

  // --- Event Listeners ---
  restartButton.addEventListener("click", restartConversation)
  closeMessageBtn.addEventListener("click", hideMessage)
  messageBox.addEventListener("click", (e) => {
    if (e.target === messageBox) {
      hideMessage()
    }
  })

  // --- Initialization ---
  displayNode(currentNodeId) // Start the conversation
})
