import { LISTAS_CAMARA, ListaCamara } from './listas-camara.constants';
import { LISTAS_SENADO, ListaSenado } from './listas-senado.constants';

interface ListaConCandidatos {
  elegido: boolean;
  candidatos: Array<{ numero: number; elegido: boolean }>;
}

const configurarListas = <T extends ListaConCandidatos>(
  listas: T[],
  numeroCandidato?: number,
): T[] => {
  const numero = typeof numeroCandidato === 'number' ? numeroCandidato : null;

  return listas.map((lista) => {
    const candidatos = lista.candidatos.map((candidato) => ({
      ...candidato,
      elegido: numero !== null && candidato.numero === numero,
    }));

    const listaElegida = candidatos.some((candidato) => candidato.elegido);

    return {
      ...lista,
      elegido: listaElegida,
      candidatos,
    };
  });
};

export const obtenerListasCamaraConfiguradas = (
  numeroCandidato?: number,
): ListaCamara[] => configurarListas(LISTAS_CAMARA, numeroCandidato);

export const obtenerListasSenadoConfiguradas = (
  numeroCandidato?: number,
): ListaSenado[] => configurarListas(LISTAS_SENADO, numeroCandidato);
