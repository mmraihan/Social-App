using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

    
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(usersToReturn);
        }
     
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByUserNameAsync(username);
            var userToReturn = _mapper.Map<MemberDto>(user);
            return userToReturn;
        }
    }
}

