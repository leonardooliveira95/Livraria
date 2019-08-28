using Livraria.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modelo.Infra.Dados.Contexto
{
    public class SqlServerContext : DbContext
    {
        public DbSet<Livro> Livro { get; set; }
        public DbSet<Autor> Autor { get; set; }
        public DbSet<Editora> Editora { get; set; }

        public SqlServerContext()
        {
            this.Database.EnsureCreated();
        }

        public SqlServerContext(DbContextOptions<SqlServerContext> options)
            : base(options)
        {
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Livro>(new LivroMap().Configure);
        }
    }
}
