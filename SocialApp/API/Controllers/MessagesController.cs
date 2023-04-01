using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository,
            IMapper mapper)

        {
            _messageRepository = messageRepository;
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage([FromBody] CreateMessageDto createMessageDto)
        {
            var userName = User.GetUsername();

            if (userName == createMessageDto.RecipientUserName.ToLower())
            {
                return BadRequest("You cannot send messages to youself");
            }

            var sender = await _userRepository.GetUserByUserNameAsync(userName);
            var receipent = await _userRepository.GetUserByUserNameAsync(createMessageDto.RecipientUserName);

            if (receipent == null)
            {
                return NotFound();
            }

            var message = new Message()
            {
                Sender = sender,
                Recipient = receipent,
                SenderUserName = sender.UserName,
                RecipientUserName = receipent.UserName,
            };

            _messageRepository.AddMessage(message);

            if (await _messageRepository.SaveAllAsync())
            {
                return Ok(_mapper.Map<MessageDto>(message));
            }

            return BadRequest("Failed to send message");

        }

    }
    
}
