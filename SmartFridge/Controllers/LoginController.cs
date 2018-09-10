﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartFridge.Models;

namespace SmartFridge.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private static IUsersRepository _repository;

        public LoginController(IUsersRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] UserDTO user)
        {
            bool isSuccess = false;
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

            isSuccess = _repository.LoginAsync(user).Result;
            Console.WriteLine("Controller, isSuccess: " + isSuccess);
            if (isSuccess)
                return Ok();
            return BadRequest();
        }
    }
}