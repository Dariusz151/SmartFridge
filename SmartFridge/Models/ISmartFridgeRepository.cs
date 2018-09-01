using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartFridge.Models
{
    public interface ISmartFridgeRepository
    {
        Task<IEnumerable<FridgeItem>> GetAllAsync();
        Task<FridgeItem> GetAsync(int id);
        Task<int> CreateAsync(FridgeItem fridgeItem);
        Task<bool> DeleteAsync(int id);
    }
}
