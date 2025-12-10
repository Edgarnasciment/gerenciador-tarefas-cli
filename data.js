const fs = require(`fs`);
const FILE = `tarefas.json`;
function carregarTarefas(){
    try {
        let ArquivoBruto = fs.readFileSync(FILE, `utf-8`);
        let dadosConvertidos = JSON.parse(ArquivoBruto);
        return dadosConvertidos;
    } catch (error) {
         let tarefasVazias = [];
         return tarefasVazias;
    }
}
function salvarTarefas(tarefas){
    let dadosConvertidos = JSON.stringify(tarefas, null, 2);
    fs.writeFileSync(FILE, dadosConvertidos);
}
module.exports = {carregarTarefas, salvarTarefas};