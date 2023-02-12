using System.Text.Json;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context,
            ILoggerFactory loggerFactory)
        {
            try
            {
                //* if there is no data, this conditional statement
                //* would make one.
                if(!context.Levels.Any())
                {
                    var levelsData = File.ReadAllText("../Infrastructure/Data/SeedData/level.json");

                    var levels = JsonSerializer.Deserialize<List<Level>>(levelsData);

                    foreach(var item in levels)
                    {
                        context.Levels.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if(!context.Areas.Any())
                {
                    var areasData = File.ReadAllText("../Infrastructure/Data/SeedData/area.json");

                    var areas = JsonSerializer.Deserialize<List<Area>>(areasData);

                    foreach(var item in areas)
                    {
                        context.Areas.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if(!context.Params.Any())
                {
                    var paramsData = File.ReadAllText("../Infrastructure/Data/SeedData/parameter.json");

                    var paramsF = JsonSerializer.Deserialize<List<Parameter>>(paramsData);

                    foreach(var item in paramsF)
                    {
                        context.Params.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                if(!context.SysImpOutpts.Any())
                {
                    var theSystem = File.ReadAllText("../Infrastructure/Data/SeedData/sysimpoutpt.json");

                    var sysF = JsonSerializer.Deserialize<List<SysImpOutpt>>(theSystem);

                    foreach(var item in sysF)
                    {
                        context.SysImpOutpts.Add(item);
                    }

                    await context.SaveChangesAsync();
                }


                if(!context.TheFiles.Any())
                {
                    var filesData = File.ReadAllText("../Infrastructure/Data/SeedData/file.json");

                    var files = JsonSerializer.Deserialize<List<TheFile>>(filesData);

                    foreach(var item in files)
                    {
                        context.TheFiles.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

            } catch(Exception ex) 
            {
                var logger = loggerFactory.CreateLogger<StoreContext>();
                logger.LogError("Catch" + ex.Message);
            }
        
        }
    }
}