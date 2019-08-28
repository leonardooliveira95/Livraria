using Livraria.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Livraria.Dominio.Interface
{
    public interface ILivroRepositorio<T> : IRepositorio<Livro>
    {
        string BuscarCapa(int id);
    }
}
