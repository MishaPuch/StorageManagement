using BLL_StorageManagement.Service.Interfaces;
using DAL.Model;
using Microsoft.AspNetCore.Mvc;

namespace StorageManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _roleService.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<Role> GetRoleByIdAsync(int id)
        {
            return await _roleService.GetRoleByIdAsync(id);
        }

        [HttpGet("{name}")]
        public async Task<Role> GetRoleByNameAsync(string name)
        {
            return await _roleService.GetRoleByNameAsync(name);
        }

        [HttpPost]
        public async Task<IActionResult> AddNewRoleAsync([FromBody] Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _roleService.AddNewRoleAsync(role);
            return CreatedAtRoute("GetRole", new { id = role.ID }, role);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateRoleAsync(int id, [FromBody] Role role)
        {
            if (id != role.ID)
            {
                return BadRequest("Role ID in request body doesn't match route ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _roleService.UpdateRoleAsync(role);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRoleByIdAsync(int id)
        {
            await _roleService.DeleteRoleByIdAsync(id);
            return NoContent();
        }
    }

}
