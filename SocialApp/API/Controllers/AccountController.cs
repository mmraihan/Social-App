using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(DataContext context, ITokenService token, IMapper mapper)
        {
            _context = context;
            _tokenService = token;
            _mapper = mapper;
        }
        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto  registerDto)// Note
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is already taken");

            var user = _mapper.Map<AppUser>(registerDto);
           
            using var hmac = new HMACSHA512();

            user.UserName = registerDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;
 
            
            _context.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto()
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),               
                KnownAs= user.KnownAs,
                Gender = user.Gender
            };
        }

        private async Task<bool>UserExists(string username)
        {
            return await _context.Users.AnyAsync(c => c.UserName == username.ToLower());
        
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .Include(c => c.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);
            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto()
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x=>x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };

        }
      
    }
}
