using Employee.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public DepartmentMasterController(EmployeeDbContext context)
        {
            _context = context;
        }
            
        //[HttpGet("GetAllDepartments")]      // API -> GET: api/DepartmentMaster/GetAllDepartments
        //public IActionResult GetAllDepartment()
        //{
        //    var deptList = _context.Departments.ToList();
        //    return Ok(deptList);
        //}


        [HttpGet("GetAllDepartments")]      // API -> GET: api/DepartmentMaster/GetAllDepartments
        public async Task<IActionResult> GetAllDepartments()
        {
            var deptList = await _context.Departments.ToListAsync();
            return Ok(deptList);
        }

        [HttpPost("AddDepartment")]      // API -> POST: api/DepartmentMaster/AddDepartment
        public async Task<IActionResult> AddDepartment([FromBody] Department department)
        {
            if (department == null)
            {
                return BadRequest("Department data is null.");
            }
            bool existingDepartment = await _context.Departments.AnyAsync(d => d.departmentName.ToLower() == department.departmentName.ToLower());
            if (existingDepartment)
            {
                return BadRequest(new
                {
                    message = "Department with the same name already exists."
                });
            }
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Department added successfully."
            });
        }

        [HttpPut("UpdateDepartment")]      // API -> PUT: api/DepartmentMaster/UpdateDepartment/{id}
        public async Task<IActionResult> UpdateDepartment([FromBody] Department department)
        {
            if (department == null)
            {
                return BadRequest("Invalid department data.");
            }
            var existingDepartment = await _context.Departments.FindAsync(department.departmentId);
            if (existingDepartment == null)
            {
                return NotFound("Department not found.");
            }
            existingDepartment.departmentName = department.departmentName;
            existingDepartment.isActive = department.isActive;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Department updated successfully." });
        }

        [HttpDelete("DeleteDepartment/{id}")]      // API -> DELETE: api/DepartmentMaster/DeleteDepartment/{id}
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound("Department not found.");
            }
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
            return Ok("Department deleted successfully.");
        }
    }
}
