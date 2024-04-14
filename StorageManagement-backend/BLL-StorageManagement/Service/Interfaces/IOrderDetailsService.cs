using DAL.Model;

namespace BLL_StorageManagement.Service.Interfaces
{
    public interface IOrderDetailsService
    {
        public Task<List<OrderDetails>> GetAllAsync();

        public Task<OrderDetails> GetOrderDetailsByIdAsync(int id);

        public Task<List<OrderDetails>> GetOrderDetailsByOrderIdAsync(int orderID);

        public Task<List<OrderDetails>> GetOrderDetailsByProductIdAsync(int productID);

        public Task<List<OrderDetails>> GetOrderDetailsByUserIdAsync(int userID);

        public Task<List<OrderDetails>> GetInWorkOrderDetailsIdAsync();


        //TODO: Improve naming of the functions

        public Task AddNewOrderAsync(OrderDetails orderDetails);

        public Task UpdateOrderAsync(OrderDetails orderDetails);

        public Task DeleteOrderByIdAsync(int id);
    }
}
