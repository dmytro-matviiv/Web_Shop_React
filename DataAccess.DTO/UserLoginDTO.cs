using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO
{
    public class UserLoginDTO
    {
        /// <summary>
        /// user email
        /// </summary>     
        /// <example>admin@gmail.com</example>
        [Required(ErrorMessage = "Email is required field")]
        public string Email { get; set; }

        /// <summary>
        /// user password
        /// </summary>     
        /// <example>Qwerty-1</example>
        [Required(ErrorMessage = "Password is required field")]
        public string Password { get; set; }
    }
}
