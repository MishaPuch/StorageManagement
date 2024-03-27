using BLL_StorageManagement.Service.Interfaces;
using DAL.Model;
using Microsoft.AspNetCore.Mvc;

namespace StorageManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _orderService.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _orderService.GetOrderByIdAsync(id);
        }

        [HttpGet("orders/{userID:int}")]
        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userID)
        {
            return await _orderService.GetOrdersByUserIdAsync(userID);
        }

        [HttpGet("{date:datetime}")] 
        public async Task<IEnumerable<Order>> GetOrdersByDateAsync(DateTime date)
        {
            return await _orderService.GetOrdersByDateAsync(date);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrderAsync([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _orderService.AddNewOrderAsync(order);
            return CreatedAtRoute("GetOrder", new { id = order.ID }, order);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOrderAsync(int id, [FromBody] Order order)
        {
            if (id != order.ID)
            {
                return BadRequest("Order ID in request body doesn't match route ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _orderService.UpdateOrderAsync(order);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOrderByIdAsync(int id)
        {
            await _orderService.DeleteOrderByIdAsync(id);
            return NoContent();
        }
    }

}
