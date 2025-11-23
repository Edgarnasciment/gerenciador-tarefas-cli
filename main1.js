const rl = require("node:readline");
const {stdin, stdout} = process;

const r1 = rl.createInterface({
    input:stdin,
    output:stdout
});

let tarefas = [];

function excluirTarefa(){
    for(let [index, tarefa] of tarefas.entries()){
        console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
    }
    r1.question("Qual dessas tarefas deseja excluir?\n>", (answer) =>{
        let answertype1 = Number(answer) -1;
        if(answertype1 < 0 || answertype1 >= tarefas.length){
            console.log("Tarefa inválida, voltando ao menu inicial.");
            menu();
            return;
        }else{
            tarefas.splice(answertype1, 1);
            console.log(`Tarefa excluída com sucesso!`);
            console.log("**ATUALIZAÇÃO**");
            for(let [index, tarefa] of tarefas.entries()){
                console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
            }
            menu();
        }
    })
}

function marcarFeita(){
    for(let [index, tarefa] of tarefas.entries()){
        console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
    }
    r1.question("Qual dessas tarefas deseja marcar como feita?\n>", (answer) => {
        let answertype = Number(answer) -1;
        if(answertype < 0 || answertype >= tarefas.length){
            console.log("Tarefa inválida, voltando ao menu inicial.");
            menu();
            return;
        }else{
            tarefas[answertype].feito = true;
            console.log("**ATUALIZAÇÃO**");
            console.log(`${answertype +1}. ${tarefas[answertype].descricao} - ${tarefas[answertype].feito}`);
            menu();
        }
        });
}

function listarTarefas(){
    if (tarefas.length === 0){
        console.log("Não existe nehuma tarefa adicionada.");
        acaoAfterAddTarefa();
    } else {
        for(let [index, tarefa] of tarefas.entries()){
            console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
        }
        acaoAfterAddTarefa();
    }
}

function acaoAfterAddTarefa(){
    r1.question("***ESCOLHA***\n1 - Adicionar tarefa\n2 - Voltar ao menu\n>", (answer) => {
        let escolhaafteracao = Number(answer)
        switch(escolhaafteracao){
            case 1:
                addTarefa();
                break;
            case 2:
                menu();
                break;
            default:
                console.log("\nOpção inválida\n");
                acaoAfterAddTarefa();
                break;
        }
    })
}

function addTarefa(){
    r1.question(`Adicione uma tarefa ou digite "menu" para voltar ao menu inicial\n> `, (answer) =>{
        let menuinicial = answer.trim().toLowerCase();
        if(menuinicial === "menu"){
            menu();
        }else{
        let tarefaDigitada = {descricao: answer, feito: false}
        tarefas.push(tarefaDigitada);
        for(let [index, tarefa] of tarefas.entries()){
            console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
        }
        acaoAfterAddTarefa()
        }
    })
}

function menu(){
    r1.question(`**MENU**\nSelecione a opção que deseja:\n1 - Adicionar tarefa\n2 - Listar tarefas \n3 - Marcar tarefa feita\n4 -Excluir tarefa \n5 -Sair\n> `, (answer) =>{
        let option = Number(answer);
        switch(option){
            case 1:
                addTarefa();
                break;
            case 2:
                listarTarefas();
                break;
            case 3:
                marcarFeita();
                break;
            case 4:
                excluirTarefa();
                break;
            case 5:
                console.log("\nEncerrando...\n");
                r1.close();
                break;
            default:
                console.log("\nOpção inválida\n");
                menu();
                break;
        }
    
    })
}
menu();