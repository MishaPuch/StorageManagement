using AutoMapper;
using DAL.Model.Dto;
using BLL_StorageManagement.Service.Interfaces;
using DAL.Model;
using Microsoft.AspNetCore.Mvc;

namespace StorageManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userService.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userService.GetUserByIdAsync(id);
        }

        [HttpGet("users/{roleID:int}")]
        public async Task<IEnumerable<User>> GetUsersByRoleAsync(int roleID)
        {
            return await _userService.GetUsersByRoleAsync(roleID);
        }

        [HttpGet("{email}/{password}")]
        public async Task<IActionResult> GetUserByEmailAsync(string email, string password)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required");
            }

            var user = await _userService.GetUserByEmailAndPasswordAsync(email, password);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new { user });
        }

        [HttpPost]
        public async Task<IActionResult> AddUserAsync([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user=MapUserDtoToUser(userDto);
            await _userService.AddNewUserAsync(user);
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserAsync([FromBody] User user)
        {
            var changingUser = await _userService.GetUserByEmailAsync(user.Email);


            if (!ModelState.IsValid) 
            { 
                return BadRequest(ModelState);
            }

            await _userService.UpdateUserAsync(user);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUserByIdAsync(int id)
        {
            await _userService.DeleteUserByIdAsync(id);
            return NoContent();
        }
        private User MapUserDtoToUser(UserDto userDto)
        {
            return _mapper.Map<UserDto , User>(userDto);
        }
    }
}
