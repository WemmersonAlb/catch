const dimensoes = document.querySelector('#dimensoes');
const restart = document.querySelector('#restart');

let jogador = 0;
let redNumber = 0;
let blueNumber = 0;
let red=document.querySelector('#red');
let blue=document.querySelector('#blue');
red.innerHTML = `${redNumber}`;
blue.innerHTML = `${blueNumber}`;


restart.addEventListener('click', ()=>{
    excluirCasas();
    construirCasas(8);
    document.querySelector('#dimensoes').value = '8';
    jogador = 1;
    deQuemEAVez(jogador);
    jogador = 0;
    redNumber = 0;
    red.innerHTML = `${redNumber}`;
    blueNumber = 0;
    blue.innerHTML = `${blueNumber}`;
})



window.addEventListener('load', () =>{
    construirCasas(8);
    document.querySelector('#mensagem>p').innerHTML = 'É a vez da cor vermelha!';
});

dimensoes.addEventListener('change', () =>{
    excluirCasas();
    jogador = 1;
    deQuemEAVez(jogador);
    jogador = 0;
    redNumber = 0;
    red.innerHTML = `${redNumber}`;
    blueNumber = 0;
    blue.innerHTML = `${blueNumber}`;
    const largura = parseInt(document.querySelector('#dimensoes').value);
    if(largura>=4){
        construirCasas(largura);
    }else{
        construirCasas(4);
    }
});



function construirCasas(n){
    const tabuleiro = document.querySelector('#tabuleiro');
    const conglomerado = document.createElement('div');
    conglomerado.setAttribute('id', 'conglomerado')
    for(i = 0;i<n;i++){
        let linha = document.createElement('div');
        linha.setAttribute('class', 'linhas')

        for(j = 0;j<n;j++){
            let casa = document.createElement('div');
            casa.setAttribute('class', `casa branco`);
            casa.setAttribute('id', `casa${i}-${j}`);


            linha.appendChild(casa);
        }
        conglomerado.appendChild(linha);

    }
    tabuleiro.appendChild(conglomerado);
    marcarCasas();
}

function excluirCasas(){
    const tabuleiro = document.querySelector('#tabuleiro');
    const conglomerado = document.querySelector('#conglomerado');
    tabuleiro.removeChild(conglomerado);
    casasOcupadas = [];
}

function marcarCasas(){
    const largura = parseInt(document.querySelector('#dimensoes').value);
    casasOcupadas = [];

    for(i = 0;i<largura;i++){
        let carreira = [];
        for(j = 0;j<largura;j++){
            let casa = document.querySelector(`#casa${i}-${j}`);
            let casaAoLado = document.querySelector(`#casa${i}-${j+1}`);
            let casaABaixo = document.querySelector(`#casa${i+1}-${j}`);
            let mensagem = document.querySelector('#mensagem>p');

            let condicaoPontuacao = casa.classList.contains('ocupado');
            if(condicaoPontuacao){
                carreira.push(1);
            }else{
                carreira.push(0);
            }
            casa.addEventListener('click',()=>{
                let casaAssist = casa.getAttribute('id');
                try{
                    let indice = getID(casaAssist);

                    let condicao1 = casa.classList.contains('branco');



                    if(jogador === 0){
                        let condicaoAoLado = casaAoLado.classList.contains('branco');
                        let casaAoLadoAssist = casaAoLado.getAttribute('id');
                        let indiceAoLado = getID(casaAoLadoAssist);


                        if(!condicao1 || !condicaoAoLado){
                            mensagem.innerHTML = 'Erro: Jogada Inválida!<br>Casa Ocupada!';
                        }else{
                            deQuemEAVez(jogador);
                            casa.style = 'background-color: red';
                            casaAoLado.style = 'background-color:red';
                            jogador = 1;
                            casa.setAttribute('class', 'casa ocupado');
                            casaAoLado.setAttribute('class', 'casa ocupado');
                            casasOcupadas[indice[0]][indice[1]] = 1;
                            casasOcupadas[indiceAoLado[0]][indiceAoLado[1]] = 1;
                            console.log(casasOcupadas);
                            verificaTudo();
                        }
                    }else{

                        let casaABaixoAssist = casaABaixo.getAttribute('id');
                        let indiceABaixo = getID(casaABaixoAssist);
                        let condicaoABaixo = casaABaixo.classList.contains('branco');

                        if(!condicao1 || !condicaoABaixo){
                            mensagem.innerHTML = 'Erro: Jogada Inválida!<br>Casa Ocupada!';
                        }else{
                            deQuemEAVez(jogador);
                            casa.style = 'background-color: blue';
                            casaABaixo.style.backgroundColor =  'blue';
                            casa.setAttribute('class', 'casa ocupado');
                            jogador = 0;
                            casaABaixo.setAttribute('class', 'casa ocupado');
                            casasOcupadas[indice[0]][indice[1]] = 1;
                            casasOcupadas[indiceABaixo[0]][indiceABaixo[1]] = 1;
                            console.log(casasOcupadas);
                            verificaTudo();
                        }
                    }
                }catch(e){
                    mensagem.innerHTML = 'Erro: Jogada Inválida!<br>Casa adjacente fora do tabuleiro!';
                    console.log(e);
                }

            });
        }
        casasOcupadas.push(carreira);
    }
    console.log(casasOcupadas);
};

function deQuemEAVez(n){
    const mensagem = document.querySelector('#mensagem>p');
    if(n === 1){
        mensagem.innerHTML = "É a vez da cor vermelha!";
    }else{
        mensagem.innerHTML = "É a vez da cor azul!";
    }
}


function getID(id){
    let iMatriz = id.slice(id.indexOf("a",2) + 1, id.indexOf("-"));
    let jMatriz = id.slice(id.indexOf("-") + 1);
    let indice = [iMatriz, jMatriz];
    return indice;
}
function setID(indice){
    return document.getElementById(`casa${indice[0]}-${indice[1]}`);
}

function verificaTudo(){
    console.log('verificaTudo');
    for(a = 0;a<casasOcupadas.length;a++){
        for(b=0;b<casasOcupadas.length;b++){
            let indice = [a, b];
            verifica1(indice);
            verifica2p1(indice);
            verifica2p2(indice);
            verifica3p1(indice);
            verifica3p2(indice);
            verifica3p3(indice);
            verifica3p4(indice);
            verifica3p5(indice);
            verifica3p6(indice);

        }
    }
    fimDeJogo();
}
function fimDeJogo(){
    let parada = [];
    let mensagem = document.querySelector('#mensagem>p');
    for(a = 0;a<casasOcupadas.length;a++){
        for(b=0;b<casasOcupadas.length;b++){
            if(jogador==1){
                if(casasOcupadas.length-2>=b){
                    if(casasOcupadas[a][b]==0&&casasOcupadas[a][b+1]==0){
                        parada.push(true);
                    }else{
                        parada.push(false);
                    }
                }else{
                    parada.push(false);
                }
            }else if(jogador == 0){
                if(casasOcupadas.length-2>=a){
                    if(casasOcupadas[a][b]==0&&casasOcupadas[a+1][b]==0){
                        parada.push(true);
                    }else{
                        parada.push(false);
                    }
                }else{
                    parada.push(false);
                }
            }

        }
    }
    if(parada.indexOf(true)!=-1){

    }else if(casasOcupadas.indexOf(0)!=-1){
        if(jogador==1){
            mensagem.innerHTML = `FIM DE JOGO<BR>A cor vermelha ganhou!!!`;
        }else{
            mensagem.innerHTML = `FIM DE JOGO<br>A cor azul ganhou!!!`;
        }
    }else{
        if(redNumber<blueNumber){
            mensagem.innerHTML = `FIM DE JOGO<br>A cor azul ganhou!!!`;
        }else if(redNumber==blueNumber){
            mensagem.innerHTML = `FIM DE JOGO<BR>Empate!!!`;
        }else{
            mensagem.innerHTML = `FIM DE JOGO<BR>A cor vermelha ganhou!!!`;
        }
    }
}

function verifica1(indice){//n precisa
    console.log('verifica1');
    let i = indice[0];
    let j = indice[1];
    let c2, c4, c6, c8, c5;
    if(casasOcupadas[i][j]==0){
        c5 = 'check';
    }
    if(i==0||(casasOcupadas[i-1][j] ==1)){
        c2 = 'check';
    }
    if(j==0 || (casasOcupadas[i][j-1]==1)){
        c4 = 'check';
    }
    if((casasOcupadas.length-1)==i || (casasOcupadas[i+1][j])==1){
        c8 = 'check';
    }
    if((casasOcupadas.length-1)==j||(casasOcupadas[i][j+1])==1){
        c6='check';
    }
    if(c2=='check'&&c4=='check'&&c6=='check'&&c8=='check'&&c5=='check'){

        casasOcupadas[i][j] = 1;
        let indice = [i, j];
        let casaDoX = setID(indice);
        casaDoX.innerHTML = 'X';


        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX.setAttribute('class', 'casa ocupada red');
            redNumber++;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX.setAttribute('class', 'casa ocupada blue');
            blueNumber++;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}


function verifica2p1(indice){//õ/
    let i = indice[0];
    let j = indice[1];
    let c2, c3, c5, c8, c10, c11, c6, c7;

    if(casasOcupadas.length-2>=j){
        if(casasOcupadas[i][j]==0){
            c6 = 'check';
        }
        if(casasOcupadas[i][j+1]==0){
            c7='check';
        }

        if(i==0){
            c2 = 'check';
            c3 = 'check';
        }else if (((casasOcupadas[i-1][j]==1)&&(casasOcupadas[i-1][j+1]==1))){
            c2 = 'check';
            c3 = 'check';
        }

        if(j==0){
            c5='check';
        }else if((casasOcupadas[i][j-1]==1)){
            c5='check';
        }

        if((casasOcupadas.length-1)==i){
            c10 = 'check';
            c11 = 'check';
        }else if(((casasOcupadas[i+1][j] ==1)&&(casasOcupadas[i+1][j+1]==1))){
            c10 = 'check';
            c11 = 'check';
        }

        if(((casasOcupadas.length-2)==j)){
            c8 = 'check';
        }else if((casasOcupadas.length-2)<j){
            c8='uncheck';
        }else if((casasOcupadas[i][j+2]==1)){
            c8 = 'check';
        }

    }else{
        c2='uncheck';
    }

    if(c7=='check'&&c2=='check'&&c3=='check'&&c5=='check'&&c8=='check'&&c10=='check'&&c11=='check'&&c6=='check'){
        casasOcupadas[i][j] = 1;
        casasOcupadas[i][j+1] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i, j+1];
        let casaDoX2 = setID(indice2);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+2;
            red.innerHTML=`${redNumber}`;

        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+2;
            blue.innerHTML=`${blueNumber}`;
        }
    }

}
function verifica2p2(indice){//õ/
    let i = indice[0];
    let j = indice[1];
    let c2, c4, c5, c6, c7, c8, c9, c11;

    if(casasOcupadas.length-2>=i){
        if(casasOcupadas[i][j]==0){
            c5='check';
        }
        if(casasOcupadas[i+1][j]==0){
            c8='check';
        }

        if(i==0){
            c2='check';
        }else if ((casasOcupadas[i-1][j]==1)){
            c2='check';
        }

        if(j==0){
            c4='check';
            c7='check';
        }else if (((casasOcupadas[i][j-1]==1)&&(casasOcupadas[i+1][j-1]==1))){
            c4='check';
            c7='check';
        }

        if(((casasOcupadas.length-1) == j)){
            c6='check';
            c9='check';
        }else if((casasOcupadas.length-1) < j){
            c6='uncheck';
            c9='uncheck';
        }else if(((casasOcupadas[i][j+1]==1)&&(casasOcupadas[i+1][j+1]==1))){
            c6='check';
            c9='check';
        }

        if(((casasOcupadas.length-2) == i)){
            c11='check';
        }else if(((casasOcupadas.length-2) < i)){
            c11='uncheck';
        }else{
            if(casasOcupadas[i+2][j] == 1){
                c11='check';
            }
        }
    }else{
        c2='uncheck';
    }

    if(c8=='check'&&c2=='check'&&c4=='check'&&c5=='check'&&c6=='check'&&c7=='check'&&c9=='check'&&c11=='check'){
        console.log('passou')
        casasOcupadas[i][j] = 1;
        casasOcupadas[i+1][j] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i+1, j];
        let casaDoX2 = setID(indice2);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+2;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+2;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}



function verifica3p1(indice){//õ/
    let i = indice[0];
    let j = indice[1];
    let c2, c3, c4, c6, c7, c8, c9, c10, c12, c13, c14;

    if(casasOcupadas.length-3>=j){

        if(casasOcupadas[i][j]==0){
            c7='check';
        }
        if(casasOcupadas[i][j+1]==0){
            c8='check';
        }
        if(casasOcupadas[i][j+2]==0){
            c9='check';
        }

        if(i==0){
            c2='check';
            c3='check';
            c4='check';
        }else{
            if((casasOcupadas[i-1][j]==1)&&(casasOcupadas[i-1][j+1]==1)&&(casasOcupadas[i-1][j+2]==1)){
                c2='check';
                c3='check';
                c4='check';
            }
        }

        if(j==0){
            c6='check';
        }else{
            if(casasOcupadas[i][j-1]==1){
                c6='check';
            }
        }

        if(((casasOcupadas.length-3)==j)){
            c10='check';
        }else if((casasOcupadas.length-3)<j){
            c10='uncheck';
        }else if(casasOcupadas[i][j+3]==1){
            c10='check';
        }


        if(((casasOcupadas.length-1)==i)){
            c12='check';
            c13='check';
            c14='check';
        }else if((casasOcupadas.length-1)<i){
            c12='uncheck';
            c13='uncheck';
            c14='uncheck';
        }else if ((casasOcupadas[i+1][j]==1)&&(casasOcupadas[i+1][j+1]==1)&&(casasOcupadas[i+1][j+2]==1)){
            c12='check';
            c13='check';
            c14='check';
        }

    }else{
        c2='uncheck';
    }


    if(c2=='check'&&c3=='check'&&c4=='check'&&c6=='check'&&c7=='check'&&c10=='check'&&c12=='check'&&c13=='check'&&c14=='check'){
        casasOcupadas[i][j] = 1;
        casasOcupadas[i][j+1] = 1;
        casasOcupadas[i][j+2] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i, j+1];
        let casaDoX2 = setID(indice2);
        let indice3 = [i, j+2];
        let casaDoX3 = setID(indice3);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';
        casaDoX3.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            casaDoX3.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+3;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            casaDoX3.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+3;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}
function verifica3p2(indice){//õ/
    let i = indice[0];
    let j = indice[1];

    let c2, c4, c5, c6, c7, c8, c9, c10, c11, c12, c14;

    if(casasOcupadas.length-3>=i){
        console.log('existe i+2 '+indice);
        if(casasOcupadas[i][j]==0){
            c5='check';
        }
        if(casasOcupadas[i+1][j]==0){
            c8='check';
        }
        if(casasOcupadas[i+2][j]==0){
            c11='check';
        }

        if(i==0){
            c2='check';
        }else{
            if(casasOcupadas[i-1][j]==1){
                c2='check';
            }
        }

        if(j==0){
            c4='check';
            c7='check';
            c10='check';
        }else{
            if((casasOcupadas[i][j-1]==1)&&(casasOcupadas[i+1][j-1]==1)&&(casasOcupadas[i+2][j-1]==1)){
                c4='check';
                c7='check';
                c10='check';
            }
        }

        if(((casasOcupadas.length-1)==j)){
            c6='check';
            c9='check';
            c12='check';
        }else if((casasOcupadas[i][j+1]==1)&&(casasOcupadas[i+1][j+1]==1)&&(casasOcupadas[i+2][j+1]==1)){
            c6='check';
            c9='check';
            c12='check';
        }

        if((casasOcupadas.length-3)==i){
            c14='check';
        }else if(casasOcupadas.length-3<i){
            c14='uncheck';
        }else if((casasOcupadas[i+3][j]==1)){
            c14='check';

        }
    }else{
        c2='uncheck';
        console.log('nops i-2 '+indice);
    }


    if(c8=='check'&&c11=='check'&&c2=='check'&&c4=='check'&&c5=='check'&&c6=='check'&&c7=='check'&&c9=='check'&&c10=='check'&&c12=='check'&&c14=='check'){
        casasOcupadas[i][j] = 1;
        casasOcupadas[i+1][j] = 1;
        casasOcupadas[i+2][j] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i+1, j];
        let casaDoX2 = setID(indice2);
        let indice3 = [i+2, j];
        let casaDoX3 = setID(indice3);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';
        casaDoX3.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            casaDoX3.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+3;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            casaDoX3.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+3;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}
function verifica3p3(indice){//õ/
    let i = indice[0];
    let j = indice[1];
    let c2, c3, c5, c6, c7, c8, c9, c10, c11, c13;

    if(casasOcupadas.length-2>=i&&casasOcupadas.length-2>=j){
        if(casasOcupadas[i][j]==0){
            c6='check';
        }
        if(casasOcupadas[i][j+1]==0){
            c7='check';
        }
        if(casasOcupadas[i+1][j]==0){
            c10='check';
        }

        if(i==0){
            c2='check';
            c3='check';
        }else if(((casasOcupadas[i-1][j]==1)&&(casasOcupadas[i-1][j+1]==1))){
            c2='check';
            c3='check';
        }

        if(j==0){
            c5='check';
            c9='check';
        }else if(((casasOcupadas[i][j-1]==1)&&(casasOcupadas[i+1][j-1]==1))){
            c5='check';
            c9='check';
        }

        if((casasOcupadas.length-2)==j){
            c8='check';
        }else if ((casasOcupadas.length-2)<j){
            c8='uncheck';
        }else if((casasOcupadas[i][j+2]==1)){
            c8='check';
        }


        if((casasOcupadas.length-2)==i){
            c13='check';
        }else if((casasOcupadas.length-2)<i){
            c13='uncheck';
            c11='uncheck';
        }else{
            if(casasOcupadas[i+2][j]==1){
                c13='check';
            }
        }

        if(casasOcupadas[i+1][j+1]==1){
            c11='check';
        }

    }else{
        c2='uncheck';
    }

    if(c7=='check'&&c10=='check'&&c2=='check'&&c3=='check'&&c5=='check'&&c6=='check'&&c8=='check'&&c9=='check'&&c11=='check'&&c13=='check'){
        casasOcupadas[i][j] = 1;
        casasOcupadas[i+1][j] = 1;
        casasOcupadas[i][j+1] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i+1, j];
        let casaDoX2 = setID(indice2);
        let indice3 = [i, j+1];
        let casaDoX3 = setID(indice3);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';
        casaDoX3.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            casaDoX3.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+3;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            casaDoX3.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+3;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}
function verifica3p4(indice){//õ/
    let i = indice[0];
    let j= indice[1];
    let c2, c3, c5, c6, c7, c8, c10, c11, c12, c15;

    if(casasOcupadas.length-2>=i&&casasOcupadas.length-2>=j){
        if(casasOcupadas[i][j]==0){
            c6='check';
        }
        if(casasOcupadas[i][j+1]==0){
            c7='check';
        }
        if(casasOcupadas[i+1][j+1]==0){
            c11='check';
        }

        if(i==0){
            c2='check';
            c3='check';
        }else if(((casasOcupadas[i-1][j]==1)&&(casasOcupadas[i-1][j+1]==1))){
            c2='check';
            c3='check';
        }

        if(j==0){
            c5='check';
        }else if((casasOcupadas[i][j-1]==1)){
            c5='check';
        }

        if((casasOcupadas.length-2==j)){
            c8='check';
            c12='check';
        }else if(casasOcupadas.length-2<j){
            c8='uncheck';
            c12='uncheck';
        }else if(((casasOcupadas[i][j+2]==1)&&(casasOcupadas[i+1][j+2]==1))){
            c8='check';
            c12='check';
        }

        if((casasOcupadas.length-2==i)){
            c15='check';
        }else if((casasOcupadas.length-2<i)){
            c15='uncheck';
        }else{
            if(casasOcupadas[i+2][j+1]==1){
                c15='check';
            }
        }
        if(casasOcupadas[i+1][j]==1){
            c10='check';
        }
    }else{
        c2='uncheck';
    }

    if(c7=='check'&&c11=='check'&&c2=='check'&&c3=='check'&&c5=='check'&&c6=='check'&&c8=='check'&&c10=='check'&&c12=='check'&&c15=='check'){
        casasOcupadas[i][j] = 1;
        casasOcupadas[i][j+1] = 1;
        casasOcupadas[i+1][j+1] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i, j+1];
        let casaDoX2 = setID(indice2);
        let indice3 = [i+1, j+1];
        let casaDoX3 = setID(indice3);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';
        casaDoX3.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            casaDoX3.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+3;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            casaDoX3.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+3;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}
function verifica3p5(indice){//õ/
    let i = indice[0];
    let j = indice[1];
    let c2, c5, c6, c7, c9, c10, c11, c12, c14, c15;

    if(casasOcupadas.length-2>=i&&casasOcupadas.length-2>=j){
        if(casasOcupadas[i][j]==0){
            c6='check';
        }
        if(casasOcupadas[i+1][j]==0){
            c10='check';
        }
        if(casasOcupadas[i+1][j+1]==0){
            c11='check';
        }

        if(i==0){
            c2='check';
        }else if((casasOcupadas[i-1][j]==1)){
            c2='check';
        }

        if(j==0){
            c5='check';
            c9='check';
        }else if(((casasOcupadas[i][j-1]==1)&&(casasOcupadas[i+1][j-1]==1))){
            c5='check';
            c9='check';
        }

        if(casasOcupadas[i][j+1]==1){
            c7='check';
        }

        if(casasOcupadas.length-2==i){
            c14='check';
            c15='check';
        }else if(casasOcupadas.length-2<i){
            c14='uncheck';
            c15='uncheck';
        }else if(casasOcupadas[i+2][j]==1&&casasOcupadas[i+2][j+1]==1){
            c14='check';
            c15='check';
        }

        if(casasOcupadas.length-2==j){
            c12='check';
        }else if(casasOcupadas.length-2<j){
            c12='uncheck';
        }else if(casasOcupadas[i+1][j+2]==1){
            c12='check';
        }

    }else{
        c2='uncheck';
    }


    if(c10=='check'&&c11=='check'&&c2=='check'&&c5=='check'&&c6=='check'&&c7=='check'&&c9=='check'&&c12=='check'&&c14=='check'&&c15=='check'){
        casasOcupadas[i][j] = 1;
        casasOcupadas[i+1][j] = 1;
        casasOcupadas[i+1][j+1] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i+1, j];
        let casaDoX2 = setID(indice2);
        let indice3 = [i+1, j+1];
        let casaDoX3 = setID(indice3);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';
        casaDoX3.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            casaDoX3.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+3;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            casaDoX3.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+3;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}
function verifica3p6(indice){//õ/
    let i= indice[0];
    let j = indice[1];
    let c3, c6, c7, c8, c9, c10, c11, c12, c14, c15;

    if(casasOcupadas.length-2>=i&&j>0){
        if(casasOcupadas[i][j]==0){
            c7='check';
        }
        if(casasOcupadas[i+1][j-1]==0){
            c10='check';
        }
        if(casasOcupadas[i+1][j]==0){
            c11='check';
        }

        if(i==0){
            c3='check';
        }else if((casasOcupadas[i-1][j]==1)){
            c3='check';
        }

        if(casasOcupadas[i][j-1]==1){
            c6='check';
        }

        if((casasOcupadas.length-1==j)){
            c8='check';
            c12='check';
        }else if(((casasOcupadas[i][j+1]==1)&&(casasOcupadas[i+1][j+1]==1))){
            c8='check';
            c12='check';
        }

        if(casasOcupadas.length-2==i){
            c14='check';
            c15='check';
        }else if(casasOcupadas.length-2<i){
            c14='uncheck';
            c15='uncheck';
        }else if(casasOcupadas[i+2][j]==1&&casasOcupadas[i+2][j-1]==1){
            c14='check';
            c15='check';
        }

        if(j==1){
            c9='check';
        }else if(j==0){
            c9='uncheck';
        }else if(casasOcupadas[i+1][j-2]==1){
            c9='check';
        }
    }else{
        c3='uncheck';
    }

    if(c10=='check'&&c11=='check'&&c3=='check'&&c6=='check'&&c7=='check'&&c8=='check'&&c9=='check'&&c12=='check'&&c14=='check'&&c15=='check'){
        casasOcupadas[i][j] = 1;
        casasOcupadas[i+1][j] = 1;
        casasOcupadas[i+1][j-1] = 1;
        let indice1 = [i, j];
        let casaDoX1 = setID(indice1);
        let indice2 = [i+1, j];
        let casaDoX2 = setID(indice2);
        let indice3 = [i+1, j-1];
        let casaDoX3 = setID(indice3);
        casaDoX1.innerHTML = 'X';
        casaDoX2.innerHTML = 'X';
        casaDoX3.innerHTML = 'X';

        let red=document.querySelector('#red');
        let blue=document.querySelector('#blue');
        if(jogador==1){
            casaDoX1.setAttribute('class', 'casa ocupada red');
            casaDoX2.setAttribute('class', 'casa ocupada red');
            casaDoX3.setAttribute('class', 'casa ocupada red');
            redNumber=redNumber+3;
            red.innerHTML=`${redNumber}`;
        }else{
            casaDoX1.setAttribute('class', 'casa ocupada blue');
            casaDoX2.setAttribute('class', 'casa ocupada blue');
            casaDoX3.setAttribute('class', 'casa ocupada blue');
            blueNumber=blueNumber+3;
            blue.innerHTML=`${blueNumber}`;
        }
    }
}


















