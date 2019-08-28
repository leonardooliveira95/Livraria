using Livraria.Dominio.Entidades;
using Livraria.Dominio.Interface;
using Modelo.Infra.Dados.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Livraria.Infra.Dados.Repositorio
{
    public class EditoraRepositorio : IEditoraRepositorio<Editora>
    {
        private readonly SqlServerContext _context;

        public EditoraRepositorio(SqlServerContext context)
        {
            this._context = context;
        }

        public void Remover(int id)
        {
            throw new NotImplementedException();
        }

        public void Atualizar(Editora obj)
        {
            throw new NotImplementedException();
        }

        public Editora Buscar(int id)
        {
            throw new NotImplementedException();
        }

        public Editora BuscarNome(string nome)
        {
            return _context.Editora.FirstOrDefault(x => x.Nome.ToLower() == nome.ToLower());
        }

        public IList<Editora> BuscarTodos()
        {
            throw new NotImplementedException();
        }

        public void Inserir(Editora obj)
        {
            _context.Editora.Add(obj);
            _context.SaveChanges();
        }
    }
}
