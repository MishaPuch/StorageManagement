﻿using BLL_StorageManagement.Service.Interfaces;
using DAL.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StorageManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IOrderDetailsService _orderDetailsService;

        public OrderDetailsController(IOrderDetailsService orderDetailsService)
        {
            _orderDetailsService = orderDetailsService;
        }

        [HttpGet]
        public async Task<IEnumerable<OrderDetails>> GetOrderDetailsAsync()
        {
            return await _orderDetailsService.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<OrderDetails> GetOrderDetailsByIdAsync(int id)
        {
            return await _orderDetailsService.GetOrderDetailsByIdAsync(id);
        }

        [HttpGet("orderDetailsForOrder/{orderId:int}")]
        public async Task<IEnumerable<OrderDetails>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            return await _orderDetailsService.GetOrderDetailsByOrderIdAsync(orderId);
        }

        [HttpGet("orderDetailsForProduct/{productId:int}")]
        public async Task<IEnumerable<OrderDetails>> GetOrderDetailsByProductIdAsync(int productId)
        {
            return await _orderDetailsService.GetOrderDetailsByProductIdAsync(productId);
        }

        [HttpGet("UserOrderDetails/{userId:int}")]
        public async Task<IEnumerable<OrderDetails>> GetOrderDetailsByUserIdAsync(int userId)
        {
            return await _orderDetailsService.GetOrderDetailsByUserIdAsync(userId);
        }

        [HttpGet("GetInWorkOrderDetails")]
        public async Task<IEnumerable<OrderDetails>> GetInWorkOrderDetailsAsync()
        {
            return await _orderDetailsService.GetInWorkOrderDetailsIdAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddOrderDetailsAsync([FromBody] List<OrderDetails> orderDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            foreach(var item in orderDetails)
            {
                await _orderDetailsService.AddNewOrderAsync(item);

            }
            return CreatedAtRoute("GetOrderDetails",  orderDetails);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOrderDetailsAsync(int id, [FromBody] OrderDetails orderDetails)
        {
            if (id != orderDetails.ID)
            {
                return BadRequest("Order details ID in request body doesn't match route ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _orderDetailsService.UpdateOrderAsync(orderDetails);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOrderDetailsAsync(int id)
        {
            await _orderDetailsService.DeleteOrderByIdAsync(id);
            return NoContent();
        }
    }

}
