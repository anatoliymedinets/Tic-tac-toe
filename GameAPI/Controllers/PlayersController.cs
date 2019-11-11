using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        GameContext db;
        public PlayersController(GameContext context)
        {
            this.db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Player>>> Get()
        {
            return Ok(await db.Players.Include(p => p.GamesPlayX).Include(p => p.GamesPlayO).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> Get(int id)
        {
            Player player = await db.Players.FirstOrDefaultAsync(x => x.Id == id);

            if (player != null)
                return Ok(player);

            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Player>> Post([FromBody] Player p)
        {
            Player player = await db.Players.FirstOrDefaultAsync(x => x.Name == p.Name);

            if (player != null)
                return Ok(player);

            await db.Players.AddAsync(p);
            await db.SaveChangesAsync();

            return StatusCode(StatusCodes.Status201Created, p);
        }

        [HttpPut]
        public async Task<ActionResult<Player>> Put([FromBody] Player p)
        {

            db.Players.Update(p);
            await db.SaveChangesAsync();

            return StatusCode(StatusCodes.Status204NoContent);
        }
    }
}