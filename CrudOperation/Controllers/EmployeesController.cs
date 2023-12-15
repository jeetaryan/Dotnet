using CrudOperation.Data;
using CrudOperation.Models;
using Microsoft.AspNetCore.Mvc;

namespace CrudOperation.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly ApplicationDbContext myDbContext;

        public EmployeesController(ApplicationDbContext myDbContext)
        {
            this.myDbContext = myDbContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var data = myDbContext.Employees.ToList();
            return View(data);
        }

        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public JsonResult PostEmployee(Employee employee)
        {
            var data = new Employee()
            {
                Name = employee.Name,
                Status = employee.Status,
                Email = employee.Email,
                Phone = employee.Phone,
                CreatedOn = DateTime.Now,
            };
            myDbContext.Employees.Add(data);
            myDbContext.SaveChanges();
            return new JsonResult("Record created successfully.");
        }

        [HttpGet]
        public JsonResult EditEmployee(int id)
        {
            var data = myDbContext.Employees.Where(x => x.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }


        [HttpPut]
        public JsonResult UpdateEmployee(Employee employee)
        {   employee.CreatedOn = DateTime.Now;
            myDbContext.Employees.Update(employee);
            myDbContext.SaveChanges();
            return new JsonResult("Record updated successfully.");
        }

        [HttpDelete]
        public JsonResult EmployeeDelete(int id)
        {
            var data = myDbContext.Employees.Where(x => x.Id == id).SingleOrDefault();
            if (data != null)
            {
                data.Status = "In-active";
                myDbContext.Update(data);
                myDbContext.SaveChanges();
                return new JsonResult("Record deleted successfully.");
            }
            else {
                return new JsonResult("Record could not be deleted ...");
            }
           
        }



    }
}
