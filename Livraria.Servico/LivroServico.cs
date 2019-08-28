using Livraria.Dominio.Entidades;
using Livraria.Dominio.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Transactions;

namespace Livraria.Servico
{ 
    public class LivroServico : IServico<Livro>
    {
        private readonly ILivroRepositorio<Livro> _repositorioLivro;
        private readonly IAutorRepositorio<Autor> _repositorioAutor;
        private readonly IEditoraRepositorio<Editora> _repositorioEditora;

        public LivroServico(ILivroRepositorio<Livro> repositorioLivro, IAutorRepositorio<Autor> repositorioAutor, IEditoraRepositorio<Editora> repositorioEditora)
        {
            this._repositorioLivro = repositorioLivro;
            this._repositorioAutor = repositorioAutor;
            this._repositorioEditora = repositorioEditora;
        }

        public void Remover(int id)
        {
            _repositorioLivro.Remover(id);
        }

        public Livro Buscar(int id)
        {
            return _repositorioLivro.Buscar(id);
        }

        public IList<Livro> BuscarTodos()
        {
            return _repositorioLivro.BuscarTodos();
        }

        public void Salvar(Livro obj)
        {
            if(_repositorioAutor.BuscarNome(obj.Autor.Nome) == null)
            {
                _repositorioAutor.Inserir(obj.Autor);
            } 

            if(_repositorioEditora.BuscarNome(obj.Editora.Nome) == null)
            {
                _repositorioEditora.Inserir(obj.Editora);
            }

            if(obj.Id == 0)
            {
                _repositorioLivro.Inserir(obj);
            }
            else
            {
                if (string.IsNullOrEmpty(obj.Capa))
                {
                    obj.Capa = _repositorioLivro.BuscarCapa(obj.Id);
                }

                _repositorioLivro.Atualizar(obj);
            }
        }
    }
}
