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
    public class GamesController : ControllerBase
    {
        GameContext db;
        public GamesController(GameContext context)
        {
            this.db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Game>>> Get()
        {
            return Ok(await db.Games.Include(p => p.FirstPlayer).Include(p => p.SecondPlayer).ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Post([FromBody] Game game)
        {
            await db.Games.AddAsync(game);
            await db.SaveChangesAsync();

            return StatusCode(StatusCodes.Status201Created, game);
        }
    }
}