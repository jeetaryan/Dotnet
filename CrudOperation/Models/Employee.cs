using System.ComponentModel.DataAnnotations;

namespace CrudOperation.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }    
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
