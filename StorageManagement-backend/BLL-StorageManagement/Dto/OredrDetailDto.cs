using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BLL_StorageManagement.Dto
{
    public class OredrDetailDto
    {
        public int ProductId { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
        public ProductDto Product { get; set; }
        public DateTime Date { get; set; }
        public int UserID { get; set; }
    }
}
