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
            try
            {
                var data = myDbContext.Employees.ToList();
                return View(data);
            }
            catch (Exception ex)
            {
                return new JsonResult($"Error: {ex.Message}");

            }
        }

        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public JsonResult PostEmployee(Employee employee)
        {
            try
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
            catch (Exception ex)
            {
                return new JsonResult($"{ex.Message}");
            }
        }

        [HttpGet]
        public JsonResult EditEmployee(int id)
        {
            try
            {
                var data = myDbContext.Employees.Where(x => x.Id == id).SingleOrDefault();
                return new JsonResult(data);
            }
            catch (Exception ex)
            {
                return new JsonResult($"{ex.Message}");
            }
        }


        [HttpPut]
        public JsonResult UpdateEmployee(Employee employee)
        {
            try
            {
                var data = myDbContext.Employees.FirstOrDefault(x => x.Id == employee.Id);
                if (data != null)
                {
                    data.Name = employee.Name;
                    data.Status = employee.Status;
                    data.Email = employee.Email;
                    data.Phone = employee.Phone;
                    data.CreatedOn = DateTime.Now;
                    myDbContext.SaveChanges();
                    return new JsonResult("Record updated successfully.");
                }
                else
                {
                    return new JsonResult("No record found to update.");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult($"Error: {ex.Message}");
            }

        }

        [HttpDelete]
        public JsonResult EmployeeDelete(int id)
        {
            try
            {
                var data = myDbContext.Employees.Where(x => x.Id == id).SingleOrDefault();
                if (data != null)
                {
                    data.Status = "In-active";
                    myDbContext.Update(data);
                    myDbContext.SaveChanges();
                    return new JsonResult("Record deleted successfully.");
                }
                else
                {
                    return new JsonResult("Record could not be deleted ...");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult($"Error: {ex.Message}");
            }

        }


    }
}
