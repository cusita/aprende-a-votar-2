export interface CandidatoConfiguracion {
  nombre: string;
  numeroCandidato: number;
  foto: string;
  partido: string;
}

export interface ConfiguracionCandidatosItem {
  codigo: string;
  imgHeader: string;
  color: string;
  camara?: CandidatoConfiguracion;
  senado?: CandidatoConfiguracion;
}

export const configuracionCandidatos: ConfiguracionCandidatosItem[] = [
  {
    codigo: 'horacio-serpa-2026',
    imgHeader: '',
    color: '#004085',
    senado: {
      nombre: 'Horacio Serpa',
      numeroCandidato: 9,
      foto: 'assets/images/candidatos/horacio.png',
      partido: 'PARTIDO LIBERAL COLOMBIANO',
    },
  },
  {
    codigo: 'solo-camara-rafa',
    imgHeader: 'assets/images/banner/banner.jpeg',
    color: '#1d4ed8',
    camara: {
      nombre: 'Carolina Gómez',
      numeroCandidato: 118,
      foto: 'assets/images/candidatos/rafa.jpg',
      partido: 'ALIANZA POR COLOMBIA',
    },
  },
  {
    codigo: 'solo-senado-nadia',
    imgHeader: 'assets/images/banner/banner.jpeg',
    color: '#16a34a',
    senado: {
      nombre: 'Luis Herrera',
      numeroCandidato: 7,
      foto: 'assets/images/candidatos/nadia.jpg',
      partido: 'PARTIDO LIBERAL COLOMBIANO',
    },
  },
  {
    codigo: 'sin-banner-ambos',
    imgHeader: '',
    color: '#9333ea',
    camara: {
      nombre: 'María Fernanda',
      numeroCandidato: 112,
      foto: '',
      partido: 'MOVIMIENTO SALVACIÓN NACIONAL',
    },
    senado: {
      nombre: 'Santiago Cruz',
      numeroCandidato: 19,
      foto: '',
      partido: 'Pacto Histórico',
    },
  },
  {
    codigo: 'sin-fotos-solo-camara',
    imgHeader: 'assets/images/banner/banner.jpeg',
    color: '#f97316',
    camara: {
      nombre: 'Valentina Rojas',
      numeroCandidato: 105,
      foto: '',
      partido: 'CREEMOS',
    },
  },
];

export const CONFIGURACION_POR_DEFECTO: ConfiguracionCandidatosItem | null =
  configuracionCandidatos.length > 0 ? configuracionCandidatos[0] : null;

export const obtenerConfiguracionPorCodigo = (
  codigo: string | null | undefined,
): ConfiguracionCandidatosItem | null => {
  if (!codigo) {
    return null;
  }

  return configuracionCandidatos.find((item) => item.codigo === codigo) ?? null;
};
