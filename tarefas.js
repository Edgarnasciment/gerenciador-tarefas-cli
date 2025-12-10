const { carregarTarefas, salvarTarefas } = require(`./data`);


function addTarefa(r1, menu){
    const tarefas = carregarTarefas();
    r1.question(`Adicione uma tarefa ou digite "menu" para voltar ao menu inicial\n> `, (answer) =>{
        let menuinicial = answer.trim().toLowerCase();
        if(menuinicial === "menu"){
            menu();
        }else{
        let tarefaDigitada = {descricao: answer, feito: false}
        tarefas.push(tarefaDigitada);
        salvarTarefas(tarefas);
        for(let [index, tarefa] of tarefas.entries()){
            console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
        }
        acaoAfterAddTarefa(r1, menu)
        }
    })
}
function listarTarefas(r1, menu){
    let tarefas = carregarTarefas();
    if (tarefas.length === 0){
        console.log("Não existe nehuma tarefa adicionada.");
        acaoAfterAddTarefa(r1, menu);
    } else {
        for(let [index, tarefa] of tarefas.entries()){
            console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
        }
        acaoAfterAddTarefa(r1, menu);
    }
}
function excluirTarefa(r1, menu){
    const tarefas = carregarTarefas();
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
            salvarTarefas(tarefas);
            console.log(`Tarefa excluída com sucesso!`);
            console.log("**ATUALIZAÇÃO**");
            for(let [index, tarefa] of tarefas.entries()){
                console.log(`${index +1}. ${tarefa.descricao} - ${tarefa.feito}`);
                
            }
            menu();
        }
    })
}

function marcarFeita(r1, menu){
    const tarefas = carregarTarefas();
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
            salvarTarefas(tarefas);
            console.log("**ATUALIZAÇÃO**");
            console.log(`${answertype +1}. ${tarefas[answertype].descricao} - ${tarefas[answertype].feito}`);
            menu();
        }
        });
}


function acaoAfterAddTarefa(r1, menu){
    r1.question("***ESCOLHA***\n1 - Adicionar tarefa\n2 - Voltar ao menu\n>", (answer) => {
        let escolhaafteracao = Number(answer)
        switch(escolhaafteracao){
            case 1:
                addTarefa(r1, menu);
                break;
            case 2:
                menu();
                break;
            default:
                console.log("\nOpção inválida\n");
                acaoAfterAddTarefa(r1, menu);
                break;
        }
    })
}

module.exports = {addTarefa, listarTarefas, acaoAfterAddTarefa, marcarFeita, excluirTarefa};