using BLL_StorageManagement.Service.Interfaces;
using DAL.Model;
using DAL.Model.Dto;
using Microsoft.AspNetCore.Mvc;

namespace StorageManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IOrderDetailsService _orderDetailsService;

        public OrderController(IOrderService orderService, IOrderDetailsService orderDetailsService)
        {
            _orderService = orderService;
            _orderDetailsService = orderDetailsService;
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
        public async Task<IActionResult> AddOrderAsync([FromBody] OrderDTO orderDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Order order = new Order
            {
                Date = DateTime.Now,
                UserID = orderDTO.UserID
            };

            int generatedId = await _orderService.AddNewOrderAsync(order);

            foreach (OrderDetailsDTO DTO in orderDTO.Details)
            {
                OrderDetails orderDetails = new OrderDetails
                {
                    ProductId = DTO.ProductId,
                    OrderId = generatedId,
                    Amount = DTO.Amount,
                    Status = "In work"
                };

                await _orderDetailsService.AddNewOrderAsync(orderDetails);
            }

            return Ok();
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
