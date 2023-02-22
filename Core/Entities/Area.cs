using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class Area : BaseEntity
    {
        public string ArNameNo { get; set; }
        public string ArName { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;

        public Area(){}

        public Area(string nameNo, string name)
        {
            ArNameNo = nameNo;
            ArName = name;
        }
        public Area(string nameNo, string name, List<Parameter> dparams)
        {
            ArNameNo = nameNo;
            ArName = name;
            Params = dparams;
        }

        public Area(Guid id)
        {
            Id = id;
        }
        
        public Keyword Keyword { get; set; }
        public Guid KeywordId { get; set; }
        public AppUser FacultyUser { get; set; }
        public string FacultyUserId { get; set; }
        public List<Parameter> Params { get; set; } = new List<Parameter>();
    }
    
}