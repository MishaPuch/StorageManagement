using BLL_StorageManagement.Service.Interfaces;
using DAL.Model;
using Microsoft.AspNetCore.Mvc;

namespace StorageManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _productService.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _productService.GetProductByIdAsync(id);
        }

        [HttpGet("products/{categoryID:int}")]
        public async Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(int categoryID)
        {
            return await _productService.GetProductsByCategoryIdAsync(categoryID);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductAsync([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _productService.AddNewProductAsync(product);
            return CreatedAtRoute("GetProduct", new { id = product.ID }, product);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProductAsync(int id, [FromBody] Product product)
        {
            if (id != product.ID)
            {
                return BadRequest("Product ID in request body doesn't match route ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _productService.UpdateProductAsync(product);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProductByIdAsync(int id)
        {
            await _productService.DeleteProductByIdAsync(id);
            return NoContent();
        }
    }
}
