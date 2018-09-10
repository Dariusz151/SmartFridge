using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartFridge.Models;

namespace SmartFridge.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : Controller
    {
        private static IUsersRepository _repository;

        public RegisterController(IUsersRepository repository)
        {
            _repository = repository;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetAllAsync()
        //{
        //    var list = new String[]
        //    {
        //        "siema", "siema2", "tu beda wszyscy users"
        //    };
        //    if (list == null)
        //        return NotFound();
        //    return Json(list);
        //}

        [HttpPost]
        public async Task<IActionResult> RegisterAsync([FromBody] UserDTO user)
        {
            Console.WriteLine("[Controller] item: " + user.Username);
            Console.WriteLine("[Controller] item: " + user.Password);

            if (user == null)
            {
                Console.WriteLine("[HttpPost] Jestem w Item=Null, zwracam BadRequest");
                return BadRequest();
            }
            if (string.IsNullOrEmpty(user.Username))
            {
                Console.WriteLine("[HttpPost] Username NullOrEmpty");
                return BadRequest();
            }
            if (string.IsNullOrEmpty(user.Password))
            {
                Console.WriteLine("[HttpPost]Password NullOrEmpty");
                return BadRequest();
            }
            
            int createdId = await _repository.RegisterAsync(user);
            Console.WriteLine("Controller, createdID: " + createdId);
            if (createdId > 0)
                return Json(createdId);
            return BadRequest();
        }
    }
}