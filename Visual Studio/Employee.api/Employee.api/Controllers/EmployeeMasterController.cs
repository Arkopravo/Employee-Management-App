using Employee.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public EmployeeMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        // Get All
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var employees = await (
                    from emp in _context.Employees
                    join des in _context.Designations
                        on emp.designationId equals des.designationId
                    join dept in _context.Departments
                        on des.departmentId equals dept.departmentId
                    select new
                    {
                        emp.employeeId,
                        emp.name,
                        emp.contactNo,
                        emp.email,
                        emp.city,
                        emp.state,
                        emp.pincode,
                        emp.altContactNo,
                        emp.address,
                        emp.designationId,
                        emp.createdDate,
                        emp.modifiedDate,
                        emp.role,

                        designationName = des.designationName,
                        departmentName = dept.departmentName
                    }
                ).ToListAsync();

                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Get By Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);

                if (employee == null)
                    return NotFound("Employee not found.");

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EmployeeModel employee)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                bool emailExists = await _context.Employees
                    .AnyAsync(x => x.email == employee.email);

                if (emailExists)
                    return BadRequest("Email already exists.");

                bool contactExists = await _context.Employees
                    .AnyAsync(x => x.contactNo == employee.contactNo);

                if (contactExists)
                    return BadRequest("Contact number already exists.");

                employee.createdDate = DateTime.Now;
                employee.modifiedDate = DateTime.Now;

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.Message,
                    innerException = ex.InnerException?.Message,
                    innerInnerException = ex.InnerException?.InnerException?.Message
                });
            }
        }

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,[FromBody] EmployeeModel employee)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (id != employee.employeeId)
                    return BadRequest("Invalid Employee Id.");

                var existing = await _context.Employees.FindAsync(id);

                if (existing == null)
                    return NotFound("Employee not found.");

                bool emailExists = await _context.Employees
                    .AnyAsync(x => x.email == employee.email &&
                                   x.employeeId != id);

                if (emailExists)
                    return BadRequest("Email already exists.");

                bool contactExists = await _context.Employees
                    .AnyAsync(x => x.contactNo == employee.contactNo &&
                                   x.employeeId != id);

                if (contactExists)
                    return BadRequest("Contact number already exists.");

                existing.name = employee.name;
                existing.contactNo = employee.contactNo;
                existing.altContactNo = employee.altContactNo;
                existing.email = employee.email;
                existing.state = employee.state;
                existing.pincode = employee.pincode;
                existing.address = employee.address;
                existing.designationId = employee.designationId;
                existing.modifiedDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(existing);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);

                if (employee == null)
                    return NotFound("Employee not found.");

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return Ok("Employee deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/employee/filter/pagination
        [HttpGet("filter")]
        public async Task<IActionResult> Filter(
            string? name,
            string? state,
            int? designationId,
            string? sortBy = "name",
            bool ascending = true,
            int page = 1,
            int pageSize = 5)
        {
            try
            {
                var query = _context.Employees.AsQueryable();

                // Search
                if (!string.IsNullOrWhiteSpace(name))
                {
                    query = query.Where(x =>
                        x.name.Contains(name));
                }

                // Filter State
                if (!string.IsNullOrWhiteSpace(state))
                {
                    query = query.Where(x =>
                        x.state == state);
                }

                // Filter Designation
                if (designationId.HasValue)
                {
                    query = query.Where(x =>
                        x.designationId == designationId);
                }

                // Sorting
                switch (sortBy.ToLower())
                {
                    case "email":
                        query = ascending
                            ? query.OrderBy(x => x.email)
                            : query.OrderByDescending(x => x.email);
                        break;

                    case "createddate":
                        query = ascending
                            ? query.OrderBy(x => x.createdDate)
                            : query.OrderByDescending(x => x.createdDate);
                        break;

                    case "state":
                        query = ascending
                            ? query.OrderBy(x => x.state)
                            : query.OrderByDescending(x => x.state);
                        break;

                    default:
                        query = ascending
                            ? query.OrderBy(x => x.name)
                            : query.OrderByDescending(x => x.name);
                        break;
                }

                var totalRecords = await query.CountAsync();

                var data = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(new
                {
                    TotalRecords = totalRecords,
                    Page = page,
                    PageSize = pageSize,
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/EmployeeMaster/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var employee = await _context.Employees
                    .FirstOrDefaultAsync(x =>
                        x.email == login.email &&
                        x.contactNo == login.contactNo);

                if (employee == null)
                {
                    return Unauthorized(new
                    {
                        Message = "Invalid email or contact number."
                    });
                }

                //return Ok(new
                //{
                //    Message = "Login successful.",
                //    Employee = employee
                //});

                return Ok(new
                {
                    Message = "Login successful.",
                    data = new
                    {
                        employee.employeeId,
                        employee.name,
                        employee.email,
                        employee.contactNo,
                        employee.state,
                        employee.pincode,
                        employee.altContactNo,
                        employee.address,
                        employee.designationId,
                        employee.createdDate,
                        employee.modifiedDate,
                        employee.role
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
