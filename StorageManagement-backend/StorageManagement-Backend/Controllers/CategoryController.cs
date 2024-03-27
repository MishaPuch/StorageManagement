using BLL_StorageManagement.Service.Interfaces;
using DAL.Model;
using Microsoft.AspNetCore.Mvc;

namespace StorageManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _categoryService.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _categoryService.GetCategoryByIdAsync(id);
        }

        [HttpGet("{name}")]
        public async Task<Category> GetCategoryByNameAsync(string name)
        {
            return await _categoryService.GetCategoryByNameAsync(name);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategoryAsync([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _categoryService.AddNewCategoryAsync(category);
            return CreatedAtRoute("GetCategory", new { id = category.ID }, category);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCategoryAsync(int id, [FromBody] Category category)
        {
            if (id != category.ID)
            {
                return BadRequest("Category ID in request body doesn't match route ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _categoryService.UpdateCategoryAsync(category);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCategoryByIdAsync(int id)
        {
            await _categoryService.DeleteCategoryByIdAsync(id);
            return NoContent();
        }
    }
}
