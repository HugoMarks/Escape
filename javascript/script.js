/**
 * 
 */
//********************************************************************************
 // variáveis para utilizar o canvas
		
	var canvas;
	var ctx;
		
	var largura;
	var altura;
	
	var startGame = false;
	var fimJogo = false;
	var intervalId;
	
//********************************************************************************	    
	// variaáveis para utilizar para imagens
	
	var imgFundo = new Array(new Image(),new Image(),new Image(),new Image());

	 imgFundo[0].src = "imagens/fundo0.jpg";
	 imgFundo[1].src = "imagens/fundo1.jpg";
	 imgFundo[2].src = "imagens/fundo2.jpg";
	 imgFundo[3].src = "imagens/fundo3.jpg";
	 
	 indiceFundo = 3;
	 var imgIniciar = new Image();
	 imgIniciar.src = "imagens/iniciar_1.png";
	 var imgOver = new Image();
	 imgOver.src = "imagens/iniciar_2.png";
	 
	 var imgHome = new Image();
	 imgHome.src = "imagens/home_1.png";
	 var imgHomeOver = new Image();
	 imgHomeOver.src = "imagens/home_2.png";
	 
	 var imgRestart = new Image();
	 imgRestart.src = "imagens/restart_1.png";
	 var imgRestartOver = new Image();
	 imgRestartOver.src = "imagens/restart_2.png";
	 
	    
//********************************************************************************	    
   // variaáveis para utilizar o menu    
	var larguraMenu = Math.floor(window.innerWidth *0.25);//400
	var alturaMenu = Math.floor(window.innerHeight *0.15);//200

//********************************************************************************
   // variaáveis para utilizar o mouse
	var raioMouse = window.innerWidth *0.004;
	var posX;
	var posY;
	var mouseColor = "white";
//******************************************************************************** 
  // variáveis utilizadas para o jogador
	var pontosJogador = 0;
	var bestPontos =0;

//******************************************************************************** 
// variáveis para utilizar a bola
	
	var raios = new Array(
		{'raio' : Math.floor(window.innerWidth *0.004)},
		{'raio' : Math.floor(window.innerWidth *0.0055)},
		{'raio' : Math.floor(window.innerWidth *0.008)}
	);
	
	var altoBaixo = false;
	
	var maxVelocidade = 8;
	var minVelocidade = 3;
	var qtdBolas = Math.floor((window.innerWidth *0.022));
	var qtdBolasCriadas =0;
	
	var slower = false;
	var minVelocidadeSlower = 8;
	var maxVelocidadeSlower = 3;
	var flagSlower = true;
	
	var shield = false;
	var tempoInicio;
	var tempoInicioSlower;

//********************************************************************************
// funçoes utilizada na inicialização do brownser
/*
 * A cada refresh (F5) da página, o método " window.onload "
 * é executado.
 * */

 window.onload =function inicio() {

	    canvas = document.getElementById("jogoEscape");
	    ctx = canvas.getContext("2d");
	    
	    largura = window.innerWidth;
	    altura = window.innerHeight;
	    canvas.setAttribute("width", largura);
	    canvas.setAttribute("height", altura);
	    
	    larguraMenu = Math.floor(window.innerWidth *0.25);
		alturaMenu = Math.floor(window.innerHeight *0.15);
		
		indiceFundo = Math.floor((Math.random() * 4)); //sorteia um numero de 0 a 4
		
		//localStorage.clear();

	    /*
	     * No evento onresize da janela, ou seja, quando esta for redimensionada, 
	     * invocamos a função desenharMenu para atualizar a tela, pois o menu será 
	     * reposicionado
	     */
	    window.onresize = function () {
	    	location.reload();  // atualizo a página por onload	 
	    	
	    }
	    
	    /*
	     * No evento onmousemove da janela verificamos a posição do cursor, 
	     * caso este esteja sobre o menu, calculamos o índice do item que está sendo 
	     * selecionado com base na posição vertical do cursor e da altura dos itens.
	     * Além disso, desenha o mouse
	     */
	    window.onmousemove = function () {
	         posX = event.clientX;
	         posY = event.clientY;
	        var x = parseInt((largura / 2) - (larguraMenu / 2));
	        var y = parseInt((altura / 2) - (alturaMenu / 2));
	        var indice = -1;
	        
	        if (startGame == false && fimJogo == false) {
			        if (posX > x && posX < (x + larguraMenu)) {
			            if (posY > y && posY < (y + alturaMenu)) {
			                indice = parseInt((posY - y) / (alturaMenu));                        
			            }
			        }
			        
			        selecionarItem(indice);
	        }
	        // verifico se o fim de jogo está ativo e seta as imagens da tela
	        if (fimJogo == true){
	        	desenharFim();
	        	
	        	if (posX > x && posX < (x + (larguraMenu/2))) {
		            if (posY > y && posY < (y + alturaMenu)) {
		            	selecionarItem(1); //seta o home                     
		            }
		        }
	        	
	        	if (posX > (x +(larguraMenu/2)) && posX < (x + larguraMenu)) {
		            if (posY > y && posY < (y + alturaMenu)) {
		            	selecionarItem(2);  //seta o restart                      
		            }
		        }
	        	
	        	
	        }
	        	
	        desenharMouse(posX,posY);
	    }
	    
	    if (fimJogo == false){
	    	desenharMenu();
	    }
	    else
	    	desenharFim();
};

 //********************************************************************************
 // função utilizada para desenhar o fundo
 
function atualizarPlanoDeFundo() {
    largura = window.innerWidth;
    altura = window.innerHeight;
    canvas.setAttribute("width", largura);
    canvas.setAttribute("height", altura);
    
    ctx.drawImage(imgFundo[indiceFundo], 0, 0,largura,altura);
}

//********************************************************************************
// funçao utilizada para desenhar o botao inicial


/*
 * Essa função é responsável por desenhar um retângulo no centro da tela, 
 * onde serão inseridos os itens do menu. Os atribuídos às variáveis x e y 
 * representam a posição da tela onde o retângulo deve ser desenhado, 
 * de forma que ocupe sempre o centro da tela. Para esse retângulo foi definido um plano 
 * de fundo branco com 70% de opacidade, para se obter um leve efeito de transparência.
 */
function desenharBaseMenu() {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    ctx.fillRect(x, y, larguraMenu, alturaMenu);
    
    canvas.addEventListener('click', function(e) {
          
        //Criamos uma estrutura contendo as coordenadas atuais do mouse
        var coords = {
               x : e.clientX,
               y : e.clientY
        };
        
        /*
         * Essa funcao nos garante que apenas se o usuario clicar dentro do
         * retangulo, e o jogo inicia
         * */
        if (startGame == false )// verifica senao começou o jogo
        {	
        	// verifica se o click realizado é no iniciar
        	if (isPontoInRec(coords.x, coords.y,x,y,larguraMenu,alturaMenu) == true && fimJogo==false) {
	           	 startGame = true;          	 
	           	 atualizarPlanoDeFundo();
	           	 iniciaJogo();
            }
        	if (isPontoInRec(coords.x, coords.y,x,y,larguraMenu/2,alturaMenu) == true && fimJogo==true) {
        		fimJogo = false;
        		location.reload();
        	}
        	if (isPontoInRec(coords.x, coords.y,x+ (larguraMenu/2),y,larguraMenu/2,alturaMenu) == true && fimJogo==true) {
        		startGame = true;          	 
        		fimJogo = false;
        		atualizarPlanoDeFundo();
	           	 iniciaJogo();
        	}
        	
        }
       
    }, false);
    

}

function desenharItensMenu() {
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
 
    if (fimJogo == false)
    	ctx.drawImage(imgIniciar, x, y,larguraMenu,alturaMenu);
    else{
    	ctx.drawImage(imgHome, x, y,larguraMenu/2,alturaMenu);
    	ctx.drawImage(imgRestart, x + larguraMenu/2, y,larguraMenu/2,alturaMenu);
    }
    
}


function selecionarItem(indice) {
    if (fimJogo == false)
    	desenharMenu();
    
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));

    switch (indice) {
        case 0:                        
            ctx.drawImage(imgOver, x, y,larguraMenu,alturaMenu);
            break;
        case 1:                        
            ctx.drawImage(imgHomeOver, x, y,larguraMenu/2,alturaMenu);
            break;
        case 2:
            ctx.drawImage(imgRestartOver, x + larguraMenu/2, y,larguraMenu/2,alturaMenu);
            break;
    }
}
//********************************************************************************
//funçoes utilizada para desenhar nome do jogo
function desenharTitulo() {
	var tamanho = Math.floor(window.innerWidth *0.008);
	ctx.font = tamanho+"em alien";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    if (fimJogo == false)
    	ctx.fillText("ESCAPE! g",parseInt((largura * 0.20)), parseInt((altura * 0.25)));
    else{
    	ctx.fillText("GAME OVER",parseInt((largura * 0.15)), parseInt((altura * 0.25)));
    }
}
//********************************************************************************
//funçoes utilizada para desenhar as informações do jogo
function desenharInformacoes() {
	var x = (parseInt((largura /2) - (larguraMenu /2))) * 1.05;
    var y = (parseInt((altura /2) + (alturaMenu /2))) * 1.08;
	var tamanho = window.innerWidth *0.0008;
	ctx.font = tamanho+"em infoAstera";
    ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fillText("MODO DE JOGAR:",x ,y);
	ctx.fillText("Utilize o mouse para",x ,y+(largura * 0.019));
	ctx.fillText("desviar dos  asteroides.",x ,y+(largura * 0.034));
	
	ctx.fillText("Colete os poderes:",x ,y+(largura * 0.055));
	ctx.fillText("shield = roxo,",x ,y+(largura * 0.070));
	ctx.fillText("slow = verde.",x ,y+(largura * 0.085));
}

//********************************************************************************
//funçoes utilizada para desenhar o score e o best
function desenharScores() {
	var x = (parseInt((largura /2) - (larguraMenu /2)));
    var y = (parseInt((altura /2) + (alturaMenu /2)));
	var tamanho = window.innerWidth *0.0008;
	ctx.font = tamanho+"em infoAstera";
	ctx.fillStyle = "rgba(0,0,0,1)";
	
	ctx.fillText("Score:",x *1.05 ,y * 1.05);
	ctx.fillText("Best:",x + (larguraMenu * 0.5) ,y * 1.05);
	
	tamanho = window.innerWidth *0.001;
	ctx.font = tamanho+"em scorePoint";
	
	if(pontosJogador >= bestPontos){
		pontosJogador = bestPontos;
		ctx.fillStyle = "rgba(0,255,0,1)";
	}
	
	ctx.fillText(pontosJogador,x *1.05 ,y *((alturaMenu * 0.0022)+1));
	ctx.fillText(bestPontos,x + larguraMenu * 0.5 ,y * ((alturaMenu * 0.0022)+1));
	
	
	ctx.fillStyle = "rgba(255,255,255,1)";
	
	tamanho = window.innerWidth *0.0008;
	ctx.font = tamanho+"em infoAstera";
	ctx.fillText("Copyright 2014 - THT Estudios.",x  ,y * ((alturaMenu * 0.007)+1));
	ctx.fillText("Todos os direitos reservados.",x ,y * ((alturaMenu * 0.0075)+1));
	
}
//********************************************************************************
//funçoes utilizada para desenhar a segundo menu do fim
function desenharBaseFim (){
	ctx.fillStyle = "rgba(255,255,255,0.7)";
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) + (alturaMenu / 2));
    ctx.fillRect(x, y, larguraMenu, alturaMenu);
}
//********************************************************************************
//funçoes utilizada para desenhar toda a tela de inicio
function desenharMenu() {
    atualizarPlanoDeFundo();
    
    desenharTitulo();
    desenharInformacoes();
    
    desenharBaseMenu();
    desenharItensMenu();
    
    desenharMouse(posX,posY);
}
//********************************************************************************
//funçoes utilizada para desenhar toda a tela de fim
function desenharFim() {
  atualizarPlanoDeFundo();

  desenharTitulo();
  
  
  desenharBaseMenu();
  desenharItensMenu();
  
  desenharBaseFim();
  desenharScores();
  //qqdesenharItensMenu();
  
  desenharMouse(posX,posY);
}

//********************************************************************************
//Está função verifica se o ponto x,y está dentro do retângulo

function isPontoInRec(x, y, comecaX,comecaY,fimX,fimY) {
	var rectDimensao;
		
	rectDimensao = [comecaX,comecaY,fimX, fimY];
	
    var click_x = x;
    var click_y = y;
 
    if (click_x >= rectDimensao[0] && click_x <= rectDimensao[0] + rectDimensao[2]
       && click_y >= rectDimensao[1] && click_y<= rectDimensao[1] + rectDimensao[3]) {
            return true;
    }
 
   return false;
}
	
//********************************************************************************
//funçoes utilizada para desenhar o mouse
function desenharMouse(positionX,positionY){
	
	ctx.beginPath(); // inicio para desenho do circulo do mouse
	ctx.arc(positionX, positionY, raioMouse, 0, 2 * Math.PI, false);
	
	ctx.fillStyle = mouseColor;
	
	ctx.fill();
	ctx.lineWidth = window.innerWidth *0.001;
	ctx.strokeStyle = "#003300";
	ctx.stroke(); // desenha o circulo
}

//********************************************************************************
//funçoes utilizada para desenhar a bola
function bola(poder)
{
	var index = Math.round(Math.random() * (3 - 1) + 1) - 1;
    this.bolaRaio = raios[index]['raio'];
	
    if (altoBaixo){
    	this.bolaPosX = largura;
    	this.bolaPosY = (Math.random() * altura);
    	altoBaixo=false;
	}
    else{
    	this.bolaPosX = (Math.random() * largura);
    	this.bolaPosY = 0;
    	altoBaixo=true;
    }
    
    if (poder > 0)
    	this.velocidadeBola = 5;
    else
    	this.velocidadeBola = Math.random() * (maxVelocidade - minVelocidade) + minVelocidade;
	
    this.colisao = false;
	//variável que representa o poder
	// 0 - sem poder
	// 1 - slower
	// 2 - shield
	this.poder = poder;
	
	
}
//********************************************************************************
// função utilizada para começar o jogo
function iniciaJogo()
{
	pontosJogador = 0;
	bestPontos = localStorage.getItem("topPontos");
	
	primeira = new bola(0);
	bolas = new Array(primeira);
	qtdBolasCriadas++;
	
	
	intervalId = setInterval(gameLoop, 30);
	
}
//********************************************************************************
//função utilizada para desenhar o placar
function desenharPlacar() {
	var tamanho = window.innerWidth *0.0008;
	ctx.font = tamanho+"em scorePoint";
	ctx.fillStyle = "rgba(255,255,255,0.7)";
	ctx.fillText("Score:"+pontosJogador+" ",window.innerWidth *0.004, window.innerHeight *0.05);
}

//********************************************************************************
// função utilizada dar sequencia no jogo até que o jogador perca
function gameLoop()
{

		//Limpa Tela
		atualizarPlanoDeFundo();
		desenharMouse(posX,posY);
		
		// Checar bolas
		if(bolas.length <= 0)
		{
			bolas.push(new bola(0));
			qtdBolasCriadas++;
		}
		
		// realiza o poder de slower por 5 segundos
		if (slower == true){
			if (flagSlower == true){
				minVelocidade = minVelocidade * 0.5;
				maxVelocidade = maxVelocidade * 0.5;
				flagSlower = false;
			}
			
			if ((pontosJogador - tempoInicioSlower) >= ((minVelocidade *10 ) + 15))
				mouseColor = "white";
			if ((pontosJogador - tempoInicioSlower) >= ((minVelocidade *10 ) + 20))
				mouseColor = "black";
			
			if ((pontosJogador - tempoInicioSlower) >= ((minVelocidade *10 ) + 25))
			{
				mouseColor = "white";
				slower = false;
				flagSlower = true;
				minVelocidade = minVelocidadeSlower;
				maxVelocidade = maxVelocidadeSlower;
			}
		}
		
		
		//realiza o aumento da velocidade e da quantidade de bolinhas a cada 130 bolas criadas
		if ((qtdBolasCriadas> 0) && ((qtdBolasCriadas % 130) == 0)){
			qtdBolas += 1;
			minVelocidade += 0.5;
			maxVelocidade += 0.5;
			minVelocidadeSlower +=0.5;
			maxVelocidadeSlower +=0.5;
			
		}
		// a cada 95 bolas criadas cria-se uma bola com poder
		if ((qtdBolasCriadas> 0) && ((qtdBolasCriadas % 95) == 0)){
			bolas.push(new bola(Math.floor((Math.random() * 2) + 1)));
			qtdBolasCriadas++;
		}
		// para cada Bola faz 				
		bolas.forEach(function(b, index)
		{
			ctx.beginPath();
		    ctx.arc(b.bolaPosX, b.bolaPosY, b.bolaRaio, 0, Math.PI * 2, true);
		    
		    switch(b.poder) {
		    case 1: // quando for slower
		    	ctx.fillStyle = "#7FFF00"; // verde
		    	bordaBola = window.innerWidth *0.001;
		        break;
		    case 2: // quando for shield
		    	ctx.fillStyle = "#FF00FF"; // magenta
		    	bordaBola = window.innerWidth *0.001;
		        break;
		    default: // quando for sem poder
		    	ctx.fillStyle = "red";
		    	bordaBola= Math.random() * ((window.innerWidth *0.005) - (window.innerWidth *0.001)) + (window.innerWidth *0.001);
		    } 
		    ctx.fill();
			
		    
			ctx.lineWidth = bordaBola;
			switch(b.poder) {
		    case 1: // quando for slower
		    	ctx.strokeStyle = "#7FFF00"; // verde
		        break;
		    case 2: // quando for shield
		    	ctx.strokeStyle = "#FF00FF"; // magenta
		        break;
		    default: // quando for sem poder
		    	ctx.strokeStyle = "yellow";
		    } 
			ctx.stroke();
			
			// Criar nova bola até atingir a qtdBolas por tela
			if(b.bolaPosY >= 50 && bolas.length <= qtdBolas)
			{
				bolas.push(new bola(0));
				qtdBolasCriadas++;
			}
			
			if (shield == false)
			{
				
				// Checar Colisão
				if ((posX+raioMouse) >= (b.bolaPosX - (b.bolaRaio + bordaBola)) && (posX-raioMouse) <= (b.bolaPosX + (b.bolaRaio + bordaBola)) )
				{
					if ((posY+raioMouse) >= (b.bolaPosY - (b.bolaRaio + bordaBola)) && (posY-raioMouse) <= (b.bolaPosY + (b.bolaRaio + bordaBola)) )
						{
							if (b.poder == 1){ // se colidiu com o slow da o devido poder
								slower = true;
								mouseColor ="#7FFF00"; // verde
								tempoInicioSlower = pontosJogador;
								
								bolas.splice(index, 1);
							}
						
							if (b.poder == 2){ // se colidiu com o shield da o devido poder
								shield = true;
								mouseColor = "#FF00FF"; // magenta
								tempoInicio = pontosJogador;
								bolas.splice(index, 1);
							}
							
							if (b.poder == 0){ // se colidiu com uma bola qualquer perde e reseta jogo
								
								mouseColor ="white"; // branco

								clearInterval(intervalId);
								fimJogo=true;
								startGame=false;
								
								qtdBolas = Math.floor((window.innerWidth *0.022)); // aproximadamente 30
								maxVelocidade = 8;
								minVelocidade = 3;
								qtdBolasCriadas =0;
								
								if (pontosJogador > bestPontos){
									bestPontos = pontosJogador;
									localStorage.setItem("topPontos", bestPontos);
								}
								
								slower = false;
								flagSlower = true;
								maxVelocidadeSlower = 8;
								minVelocidadeSlower = 3;
								
								
								
								desenharFim();
							}
												
						}
						
				}	
			}
			else{ // se o shield estiver ativo dura por 5 segundos
				if ((pontosJogador - tempoInicio) == ((minVelocidade *10 ) + 5))
					mouseColor = "white";
				if ((pontosJogador - tempoInicio) == ((minVelocidade *10 ) + 10))
					mouseColor = "black";
				
				if ((pontosJogador - tempoInicio) == ((minVelocidade *10 ) + 15))
				{
					mouseColor = "white";
					shield = false;
				}
				
			}
			
			// verifica se atingiu os limites da tela e exclui bola
			if(b.bolaPosY <= altura)
			{
				b.bolaPosY += b.velocidadeBola;
			}
			else
			{
				
				bolas.splice(index, 1);
				pontosJogador++;
				//b.bolaPosY = 0;
			}
			
			if(b.bolaPosX >= 0)
			{
				b.bolaPosX -= b.velocidadeBola;
			}
			else
			{

				bolas.splice(index, 1);
				pontosJogador++;
				//b.bolaPosX = 0;
			}
			
		});
	
	
	// Escreve placar
   desenharPlacar();
	
}






