using Livraria.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Livraria.Dominio.Interface
{
    public interface IServico<T> where T : EntidadeBase
    {
        T Buscar(int id);
        IList<T> BuscarTodos();
        void Salvar(T obj);
        void Remover(int id);
    }
}
