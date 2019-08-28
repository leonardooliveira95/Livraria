using Livraria.Dominio.Entidades;
using Modelo.Infra.Dados.Contexto;
using Modelo.Infra.Dados.Repositorio;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Livraria.Dominio.Interface;

namespace Livraria.Infra.Dados.Repositorio
{
    public class LivroRepositorio : ILivroRepositorio<Livro>
    {
        private readonly SqlServerContext _context;

        public LivroRepositorio(SqlServerContext context)
        {
            this._context = context;
        }

        public void Remover(int id)
        {
            _context.Livro.Remove(Buscar(id));
            _context.SaveChanges();
        }

        public void Atualizar(Livro obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public Livro Buscar(int id)
        {
            return _context.Livro
                .Include(x => x.Autor)
                .Include(x => x.Editora)
                .Where(y => y.Id == id).FirstOrDefault();
        }
        
        public void Inserir(Livro obj)
        {
            _context.Livro.Add(obj);
            _context.SaveChanges();
        }

        public IList<Livro> BuscarTodos()
        {
            return _context.Livro.Include(x => x.Autor).OrderBy(x => x.Nome).ToList();
        }

        public string BuscarCapa(int id)
        {
            return _context.Livro.Where(x => x.Id == id).Select(x => x.Capa).FirstOrDefault();
        }
    }
}
