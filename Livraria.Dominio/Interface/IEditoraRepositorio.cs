using Livraria.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Livraria.Dominio.Interface
{
    public interface IEditoraRepositorio<T> : IRepositorio<Editora>
    {
        T BuscarNome(string nome);
    }
}
