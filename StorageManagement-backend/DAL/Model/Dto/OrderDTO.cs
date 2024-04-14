using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL.Model.Dto
{
    public class OrderDTO
    {
        public List<OrderDetailsDTO> Details { get; set; }
        public int UserID { get; set; }
    }
}
