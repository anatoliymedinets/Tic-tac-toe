using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GameAPI.Models
{
    public class Game
    {
        public int? Id { get; set; }
        public int? WinnerId { get; set; }
        public DateTime Date { get; set; }
        public int Steps { get; set; }

        public int? FirstPlayerId { get; set; }
        public int? SecondPlayerId { get; set; }

        public Player FirstPlayer { get; set; }
        public Player SecondPlayer { get; set; }
    }
}
