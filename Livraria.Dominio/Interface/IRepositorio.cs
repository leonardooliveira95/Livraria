using Livraria.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace Livraria.Dominio.Interface
{
    public interface IRepositorio<T> where T : EntidadeBase
    {
        void Inserir(T obj);
        void Atualizar(T obj);
        void Remover(int id);
        T Buscar(int id);
        IList<T> BuscarTodos();
        
    }
}
