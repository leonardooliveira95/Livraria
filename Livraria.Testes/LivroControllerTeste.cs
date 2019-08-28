using Livraria.Controllers;
using Livraria.Infra.Dados.Repositorio;
using Livraria.Servico;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Modelo.Infra.Dados.Contexto;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Livraria.Testes
{
    public class LivroControllerTeste
    {
        [Fact]
        public void GetDetalhesLivro_Return_OkResult()
        {
            //Arrange

            DbContextOptions<SqlServerContext> dbContextOptions = new DbContextOptionsBuilder<SqlServerContext>()
               .UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Livraria;Trusted_Connection=True;")
               .Options;

            SqlServerContext context = new SqlServerContext(dbContextOptions);
            LivroRepositorio livroRepositorio = new LivroRepositorio(context);
            AutorRepositorio autorRepositorio = new AutorRepositorio(context);
            EditoraRepositorio editoraRepositorio = new EditoraRepositorio(context);
            LivroServico livroServico = new LivroServico(livroRepositorio, autorRepositorio, editoraRepositorio);

            var controller = new LivroController(livroServico);
            var id = 1;

            //Act
            var data = controller.GetDetalhesLivro(id);

            //Assert
            Assert.IsType<JsonResult>(data);
        }
    }
}
