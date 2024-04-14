using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Dto
{
    public class OrderDetailsDTO
    {
        public int ProductId { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
    }
}
