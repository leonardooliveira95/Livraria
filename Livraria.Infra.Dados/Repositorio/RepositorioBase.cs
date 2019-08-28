using Livraria.Dominio.Entidades;
using Livraria.Dominio.Interface;
using Microsoft.EntityFrameworkCore;
using Modelo.Infra.Dados.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Modelo.Infra.Dados.Repositorio
{
    public class RepositorioBase<T> : IRepositorio<T> where T : EntidadeBase
    {
        private SqlServerContext _context;

        public RepositorioBase(SqlServerContext context)
        {
            this._context = context;
        }

        public void Remover(int id)
        {
            _context.Set<T>().Remove(Buscar(id));
            _context.SaveChanges();
        }

        public void Atualizar(T obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public T Buscar(int id)
        {
            return _context.Set<T>().Find(id);
        }

        public IList<T> BuscarTodos()
        {
            return _context.Set<T>().ToList();
        }

        public void Inserir(T obj)
        {
            _context.Set<T>().Add(obj);
            _context.SaveChanges();
        }
    }
}
