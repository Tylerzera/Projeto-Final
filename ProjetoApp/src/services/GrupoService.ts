import { IResponse, http } from "./base";

const BASE_URL = "/grupo";

export class GrupoService {
  async listar(): Promise<IResponse<Grupo[]>> {
    return http.get(`${BASE_URL}/`);
  }

  async criar(grupo: CriarGrupo) {
    return http.post<IResponse<Grupo>>(`${BASE_URL}/`, grupo);
  }

  async atualizar(id: string, grupo: CriarGrupo) {
    return http.put<IResponse>(`${BASE_URL}/${id}`, grupo);
  }

  async listarPorId(id: string) {
    return http.get<IResponse<Grupo>>(`${BASE_URL}/${id}`);
  }

  async criarConvite(id: string) {
    return http.post<IResponse>(`${BASE_URL}/${id}/convites`);
  }

  async aceitarConvite(codigo: number) {
    return http.post<IResponse>(`${BASE_URL}/convites/${codigo}/aceitar`);
  }
}

export interface Grupo {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  quantidadeMaxima: number;
  dataRevelacao: Date;
  donoId: string;
  dono: Usuario;
  participantes: Participante[];
  convites: Convite[];
}

export type CriarGrupo = Omit<
  Grupo,
  "id" | "participantes" | "convites" | "dono" | "donoId"
>;

export interface Participante {
  id: string;
  usuarioId: string;
  usuario: Usuario;
  grupoId: string;
  grupo: Grupo;
}

export interface Convite {
  id: string;
  codigo: number;
  grupoId: string;
  grupo: Grupo;
  aceito: boolean;
}

export interface Usuario {
  id: string;
  nome: string;
  sobrenome: string;
  imagem: string;
  email: string;
  senha: string;
  grupos: Grupo[];
  gruposParticipante: Participante[];
}

export type UsuarioLogin = Pick<Usuario, "email" | "senha">;

export type UsuarioCadastro = Omit<Usuario, "id" | "grupos" | "gruposParticipante">;
