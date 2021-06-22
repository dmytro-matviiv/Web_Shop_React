using DataAccess.DTO;
using DataAccess.DTO.Results;
using DataAccess.EF;
using DataAccess.Entitty;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShopReact.Helpers;
using WebShopReact.Shared;

namespace WebShopReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJWTTokenService _JWTTokenService;

        public AccountController(EFContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJWTTokenService jWTTokenService)
        {
            this._context = context;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._JWTTokenService = jWTTokenService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ResultErrorDTO
                    {
                        Code = 405,
                        Message = "Error",
                        Errors = CustomValidator.getErrorsByModelState(ModelState)
                    });
                }
                else
                {
                    var user = new AppUser
                    {
                        UserName = model.Email,
                        Email = model.Email,
                        PhoneNumber = model.Phone,
                        Age = model.Age,
                        FullName = model.FullName,
                        Address = model.Address
                    };

                    IdentityResult result = await _userManager.CreateAsync(user, model.Password);

                    if (result.Succeeded)
                    {
                        result = _userManager.AddToRoleAsync(user, ProjectRoles.User).Result;
                        return Ok(new ResultDTO
                        {
                            Code = 200,
                            Message = "OK",
                        });
                    }
                    else
                    {
                        return BadRequest(new ResultErrorDTO
                        {
                            Code = 405,
                            Message = "Error",
                            Errors = CustomValidator.getErrorsByIdentityResult(result)
                        });
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(new ResultErrorDTO
                {
                    Code = 500,
                    Message = "Error",
                    Errors = new List<string>
                    {
                        e.Message
                    }
                });
            }
        }

        [HttpPost("login")]
        public async Task<ResultDTO> Login([FromBody] UserLoginDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new ResultErrorDTO
                    {
                        Code = 405,
                        Message = "Error",
                        Errors = CustomValidator.getErrorsByModelState(ModelState)
                    };
                }
                else
                {

                    var result = _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false).Result;

                    if (result.Succeeded)
                    {
                        var user = await _userManager.FindByEmailAsync(model.Email);
                        await _signInManager.SignInAsync(user, false);

                        return new ResultLoginDTO
                        {
                            Code = 200,
                            Message = "OK",
                            Token = _JWTTokenService.CreateToken(user)
                        };
                    }
                    else
                    {
                        return new ResultErrorDTO
                        {
                            Code = 405,
                            Message = "Error",
                            Errors = new List<string>
                            {
                               "Login error!"
                            }
                        };
                    }
                }
            }
            catch (Exception e)
            {
                return new ResultErrorDTO
                {
                    Code = 500,
                    Message = "Error",
                    Errors = new List<string>
                    {
                        e.Message
                    }
                };
            }
        }
    }
}
