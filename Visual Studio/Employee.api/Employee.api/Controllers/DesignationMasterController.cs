using Employee.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public DesignationMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllDesignations")]
        public async Task<IActionResult> GetAllDesignations()
        {
            try
            {
                var data = await _context.Designations.ToListAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var designation = await _context.Designations.FindAsync(id);

                if (designation == null)
                    return NotFound("Designation not found.");

                return Ok(designation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("AddDesignation")]
        public async Task<IActionResult> AddDesignation([FromBody] Designation model)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                bool existingDesignation = await _context.Designations.AnyAsync(d => d.designationName.ToLower() == model.designationName.ToLower());
                if(existingDesignation)
                {
                    return BadRequest(new {message="Designation already exists."});
                }
                await _context.Designations.AddAsync(model);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Designation created successfully.", Data = model });
            } catch(Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("UpdateDesignation/{id}")]
        public async Task<IActionResult> UpdateDesignation(int id, [FromBody] Designation model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if(id != model.designationId)
                {
                    return BadRequest("ID mismatch.");
                }
                var existingDesignation = await _context.Designations.FindAsync(id);
                if(existingDesignation == null)
                {
                    return NotFound("Designation not found.");
                }
                existingDesignation.departmentId = model.departmentId;
                existingDesignation.designationName = model.designationName;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Designation updated successfully.", Data = existingDesignation });
            } catch(Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // DELETE: api/designation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var designation = await _context.Designations.FindAsync(id);

                if (designation == null)
                    return NotFound("Designation not found.");

                _context.Designations.Remove(designation);
                await _context.SaveChangesAsync();

                return Ok("Designation deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // SEARCH: api/designation/search?name=Manager
        [HttpGet("search")]
        public async Task<IActionResult> Search(string name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                    return BadRequest("Search text is required.");

                var data = await _context.Designations
                    .Where(x => x.designationName.Contains(name))
                    .ToListAsync();

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // FILTER: api/designation/filter?departmentId=2
        [HttpGet("filter")]
        public async Task<IActionResult> Filter(int departmentId)
        {
            try
            {
                var data = await _context.Designations
                    .Where(x => x.departmentId == departmentId)
                    .ToListAsync();

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
