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
        private readonly IUserService _userService;
        private readonly IProductService _productService;

        public OrderController(IOrderService orderService, IOrderDetailsService orderDetailsService , IUserService userService, IProductService productService)
        {
            _orderService = orderService;
            _orderDetailsService = orderDetailsService;
            _userService = userService;
            _productService = productService;
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
        [HttpGet("bucket/{userID:int}")]
        public async Task<Order> GetBucketByUserIdAsync(int userID)
        {
            var result= await _orderService.GetUserBucket(userID);
            return result;
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

            

            var bucket = await _orderService.GetUserBucket(orderDTO.UserID);
            if (bucket == null)
            {
                bucket = new Order
            {
                Date = DateTime.Now,
                UserID = orderDTO.UserID,
                Status = "bucket"
            };
            }
            int bucketId;

             if (bucket.Details == null)
            {
                var user= await _userService.GetUserByIdAsync(orderDTO.UserID);
                bucketId = await _orderService.AddNewOrderAsync(bucket);
            }
            else
            {
                bucketId = bucket.ID;
            }

            List<OrderDetails> orderDetailsList = bucket.Details.ToList();

            foreach (OrderDetailsDTO DTO in orderDTO.Details)
            {
                OrderDetails orderDetails = new OrderDetails
                {
                    ProductId = DTO.ProductId,
                    OrderId = bucketId,
                    Amount = DTO.Amount,
                    Product =await _productService.GetProductByIdAsync(DTO.ProductId),
                    Order=bucket
                    
                };

                var productInList = orderDetailsList.FirstOrDefault(details => details.Product.ID == orderDetails.Product.ID);
                if(productInList == null)
                {
                    orderDetailsList.Add(orderDetails);
                }
            }
            bucket.Details = orderDetailsList;

            await _orderService.UpdateOrderAsync(bucket);

            
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrderAsync([FromBody] OrderDTO orderDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bucket = await _orderService.GetUserBucket(orderDTO.UserID);
            if (bucket == null)
            {
                bucket = new Order
                {
                    Date = DateTime.Now,
                    UserID = orderDTO.UserID,
                    Status = "bucket"
                };
            }

            int bucketId = bucket.ID;

            List<OrderDetails> orderDetailsList = new List<OrderDetails>();

            foreach (OrderDetailsDTO DTO in orderDTO.Details)
            {
                OrderDetails orderDetails = new OrderDetails
                {
                    ProductId = DTO.ProductId,
                    OrderId = bucketId,
                    Amount = DTO.Amount,
                    Product = await _productService.GetProductByIdAsync(DTO.ProductId),
                    Order = bucket
                };

                bucket.Status = DTO.Status;
                
                orderDetailsList.Add(orderDetails);
                
            }

            bucket.Details=orderDetailsList;


            await _orderService.UpdateOrderAsync(bucket);


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
