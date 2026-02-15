import { LISTAS_CAMARA, ListaCamara } from './listas-camara.constants';
import { LISTAS_SENADO, ListaSenado } from './listas-senado.constants';

interface ListaConCandidatos {
  elegido: boolean;
  nombre: string;
  candidatos: Array<{ numero: number; elegido: boolean }>;
}

const configurarListas = <T extends ListaConCandidatos>(
  listas: T[],
  numeroCandidato?: number,
  partido?: string,
): T[] => {
  const numero = typeof numeroCandidato === 'number' ? numeroCandidato : null;
  const partidoNormalizado = partido?.trim().toLowerCase() ?? null;

  return listas.map((lista) => {
    const candidatos = lista.candidatos.map((candidato) => ({
      ...candidato,
      elegido: numero !== null && candidato.numero === numero,
    }));

    const listaCoincidePartido =
      !!partidoNormalizado && lista.nombre.trim().toLowerCase() === partidoNormalizado;

    const listaElegida = candidatos.some((candidato) => candidato.elegido) || listaCoincidePartido;

    return {
      ...lista,
      elegido: listaElegida,
      candidatos,
    };
  });
};

export const obtenerListasCamaraConfiguradas = (
  numeroCandidato?: number,
  partido?: string,
): ListaCamara[] => configurarListas(LISTAS_CAMARA, numeroCandidato, partido);

export const obtenerListasSenadoConfiguradas = (
  numeroCandidato?: number,
  partido?: string,
): ListaSenado[] => configurarListas(LISTAS_SENADO, numeroCandidato, partido);
