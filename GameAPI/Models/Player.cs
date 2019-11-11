using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GameAPI.Models
{
    public class Player
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int Win { get; set; }
        public int Lose { get; set; }
        public int Draw { get; set; }

        public List<Game> GamesPlayX { get; set; }
        public List<Game> GamesPlayO { get; set; }

        [NotMapped]
        public List<Game> AllGames {
            get
            {
                return new List<Game>(GamesPlayX ?? new List<Game>().Concat(GamesPlayO ?? new List<Game>()));
            }
            set { }
        }
    }
}
