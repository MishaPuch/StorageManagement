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
        public int ID { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
        //navigation
        public Product Product { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
    }
}
