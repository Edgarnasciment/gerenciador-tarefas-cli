const rl = require(`node:readline`);
const { addTarefa, listarTarefas, excluirTarefa, acaoAfterAddTarefa, marcarFeita } = require(`./tarefas`);
const { stdin, stdout } = require("node:process");
function menu(){
   loopMenu();
   perguntaMenu();
}

function loopMenu(){
    console.log("===========================================");
    console.log("================MENU INICIAL===============");
    console.log("===========================================");
    console.log();
}
function perguntaMenu(){
    const r1 = rl.createInterface({
        input: stdin,
        output: stdout
    })
    r1.question(`Selecione a opção que deseja:\n1 - Adicionar tarefa\n2 - Listar tarefas \n3 - Marcar tarefa feita\n4 -Excluir tarefa \n5 -Sair\n> `, (answer) =>{
        let option = Number(answer);
        switch(option){
            case 1:
                addTarefa(r1, menu);
                break;
            case 2:
                listarTarefas(r1, menu);
                break;
            case 3:
                marcarFeita(r1, menu);
                break;
            case 4:
                excluirTarefa(r1, menu);
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
module.exports = {menu}