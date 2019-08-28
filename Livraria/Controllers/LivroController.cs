using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Livraria.Dominio.Entidades;
using Livraria.Dominio.Interface;
using Livraria.Servico;
using Microsoft.AspNetCore.Mvc;

namespace Livraria.Controllers
{
    [Route("api/[controller]")]
    public class LivroController : Controller
    {
        private IServico<Livro> _livroServico;

        public LivroController(IServico<Livro> livroServico)
        {
            this._livroServico = livroServico;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("[action]")]
        public IActionResult GetLivros()
        {
            return Json(this._livroServico.BuscarTodos());
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetDetalhesLivro(int id)
        {
            return Json(this._livroServico.Buscar(id));
        }

        [HttpPost("[action]")]
        public IActionResult PostSalvarLivro([FromBody]Livro livro)
        {
            this._livroServico.Salvar(livro);
            return Json(livro);
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteRemoverLivro(int id)
        {
            this._livroServico.Remover(id);

            return Json("Livro removido");
        }
    }
}