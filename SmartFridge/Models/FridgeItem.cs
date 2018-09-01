using System;

namespace SmartFridge.Models
{
    public class FridgeItem
    {
        public int ID { get; set; }
        public string ArticleName { get; set; }
        public DateTime InsertDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int Quantity { get; set; }
        public string Weight { get; set; }
    }
}
