import { UsuarioDAO } from '../../DAO/usuario.dao.ts';
import {
  CriarUsuarioDTO,
  PerfilUsuarioDTO
} from '../dto/usuario.dto.ts';

export const UsuarioService = {

  async cadastrar(
    dados: CriarUsuarioDTO
  ): Promise<PerfilUsuarioDTO> {

    const usuarioExistente =
      await UsuarioDAO.buscarPorEmail(
        dados.email
      );

    if (usuarioExistente) {

      throw new Error(
        'Este e-mail já está cadastrado.'
      );

    }

    return await UsuarioDAO.inserir(
      dados.nome,
      dados.email,
      dados.senha,
      dados.bio,
      dados.foto_perfil
    );
  },

  async logar(
    email: string,
    senha: string
  ): Promise<PerfilUsuarioDTO | null> {

    const usuario =
      await UsuarioDAO.buscarPorEmail(
        email
      );

    if (!usuario) {
      return null;
    }

    if (usuario.senha !== senha) {
      return null;
    }

    return usuario;
  },

  async obtenerPerfil(
    id: number
  ): Promise<PerfilUsuarioDTO | null> {

    return await UsuarioDAO.buscarPorId(
      id
    );
  },

  async atualizarPerfil(
    id: number,
    nome: string,
    email: string,
    bio?: string,
    foto_perfil?: string
  ): Promise<PerfilUsuarioDTO | null> {
    return await UsuarioDAO.atualizar(
      id,
      nome,
      email,
      bio,
      foto_perfil
    );
  }
};