using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartFridge.Models
{
    public interface IUsersRepository
    {
        Task<bool> LoginAsync(UserDTO user);
        Task<int> RegisterAsync(UserDTO user);
    }
}
