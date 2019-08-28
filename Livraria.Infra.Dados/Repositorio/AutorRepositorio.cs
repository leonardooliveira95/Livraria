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
    public class AutorRepositorio : IAutorRepositorio<Autor>
    {
        private readonly SqlServerContext _context;

        public AutorRepositorio(SqlServerContext context)
        {
            this._context = context;
        }

        public void Remover(int id)
        {
            throw new NotImplementedException();
        }

        public void Atualizar(Autor obj)
        {
            throw new NotImplementedException();
        }

        public Autor Buscar(int id)
        {
            throw new NotImplementedException();
        }

        public Autor BuscarNome(string nome)
        {
            return _context.Autor.FirstOrDefault(x => x.Nome.ToLower() == nome.ToLower());
        }

        public IList<Autor> BuscarTodos()
        {
            throw new NotImplementedException();
        }

        public void Inserir(Autor obj)
        {
            _context.Autor.Add(obj);
            _context.SaveChanges();
        }
    }
}
