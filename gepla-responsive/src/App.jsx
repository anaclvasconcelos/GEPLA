import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TelaHome from './components/TelaHome/TelaHome';
import TelaEixo from './components/TelaEixo/TelaEixo';
import TelaCoordenador from './components/TelaCoordenador/TelaCoordenador';
import TelaConsolidado from './components/TelaConsolidado/TelaConsolidado';
import TelaRequisitosConsolidado from './components/TelaRequisitosConsolidado/TelaRequisitosConsolidado';
import { dadosCompletos, coresEixos } from './data/dados';

function App() {
  const [telaAtual, setTelaAtual] = useState('home');
  const [eixoSelecionado, setEixoSelecionado] = useState(null);
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(null);
  const [tipoConsolidado, setTipoConsolidado] = useState(null);
  const [itemConsolidadoSelecionado, setItemConsolidadoSelecionado] = useState(null);

  const irParaEixo = (eixo) => {
    setEixoSelecionado(eixo);
    setTelaAtual('eixo');
  };

  const irParaCoordenador = (coord, eixo) => {
    setCoordenadorSelecionado({ coord, eixo });
    setTelaAtual('coordenador');
  };

  const irParaConsolidado = (tipo) => {
    setTipoConsolidado(tipo);
    setItemConsolidadoSelecionado(null);
    setTelaAtual('consolidado');
  };

  const irParaRequisitosConsolidado = (nome, tipo) => {
    setItemConsolidadoSelecionado({ nome, tipo });
    setTelaAtual('requisitos-consolidado');
  };

  const voltarHome = () => {
    setTelaAtual('home');
    setEixoSelecionado(null);
    setCoordenadorSelecionado(null);
    setTipoConsolidado(null);
    setItemConsolidadoSelecionado(null);
  };

  const voltarConsolidado = () => {
    setItemConsolidadoSelecionado(null);
    setTelaAtual('consolidado');
  };

  return (
    <div className="app-container">
      <Header />

      {/* Botão Voltar */}
      {telaAtual !== 'home' && (
        <button
          className="btn-voltar"
          onClick={telaAtual === 'requisitos-consolidado' ? voltarConsolidado : voltarHome}
        >
          ← Voltar {telaAtual === 'requisitos-consolidado' ? 'ao Consolidado' : 'ao Início'}
        </button>
      )}

      {/* Container Principal */}
      <div className="container">
        <div className={`tela ${telaAtual === 'home' ? 'ativa' : ''}`}>
          <TelaHome
            irParaEixo={irParaEixo}
            irParaConsolidado={irParaConsolidado}
          />
        </div>

        <div className={`tela ${telaAtual === 'eixo' ? 'ativa' : ''}`}>
          {eixoSelecionado && (
            <TelaEixo
              eixo={eixoSelecionado}
              dados={dadosCompletos.estrutura[eixoSelecionado]}
              corEixo={coresEixos[eixoSelecionado]}
              irParaCoordenador={irParaCoordenador}
            />
          )}
        </div>

        <div className={`tela ${telaAtual === 'coordenador' ? 'ativa' : ''}`}>
          {coordenadorSelecionado && (
            <TelaCoordenador
              coord={coordenadorSelecionado.coord}
              eixo={coordenadorSelecionado.eixo}
              requisitos={dadosCompletos.estrutura[coordenadorSelecionado.eixo].coordenadores[coordenadorSelecionado.coord]}
              corEixo={coresEixos[coordenadorSelecionado.eixo]}
            />
          )}
        </div>

        <div className={`tela ${telaAtual === 'consolidado' ? 'ativa' : ''}`}>
          {tipoConsolidado && (
            <TelaConsolidado
              tipo={tipoConsolidado}
              dados={tipoConsolidado === 'coordenador' ? dadosCompletos.consolidado_coordenadores : dadosCompletos.consolidado_setores}
              irParaRequisitos={irParaRequisitosConsolidado}
            />
          )}
        </div>

        <div className={`tela ${telaAtual === 'requisitos-consolidado' ? 'ativa' : ''}`}>
          {itemConsolidadoSelecionado && (
            <TelaRequisitosConsolidado
              item={itemConsolidadoSelecionado}
              dados={itemConsolidadoSelecionado.tipo === 'coordenador' ? dadosCompletos.consolidado_coordenadores : dadosCompletos.consolidado_setores}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
