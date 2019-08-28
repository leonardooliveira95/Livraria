using System;
using System.Collections.Generic;
using System.Text;

namespace Livraria.Dominio.Entidades
{
    public class Livro : EntidadeBase
    {
        public string Nome { get; set; }
        public int AnoLancamento { get; set; }
        public string IdiomaOriginal { get; set; }
        public string Genero { get; set; }
        public string Capa { get; set; }
        public string Sinopse { get; set; }
        public decimal Preco { get; set; }
        public int Estoque { get; set; }
        public Autor Autor { get; set; }
        public Editora Editora { get; set; }
    }
}
