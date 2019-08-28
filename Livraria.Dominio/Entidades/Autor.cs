using System;
using System.Collections.Generic;
using System.Text;

namespace Livraria.Dominio.Entidades
{
    public class Autor : EntidadeBase
    {
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Pais { get; set; }
    }
}
