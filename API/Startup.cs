using API.Extensions;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            this._config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
            services.AddDbContext<StoreContext>(options => 
                {
                    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                    string connStr;

                    // Depending on if in development or production, use either Heroku-provided
                    // connection string, or development connection string from env var.
                    if (env == "Development")
                    {
                        // Use connection string from file.
                        connStr = _config.GetConnectionString("DefaultConnection");
                    }
                    else
                    {
                        // Use connection string provided at runtime by Heroku.
                        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                        // Parse connection URL to connection string for Npgsql
                        connUrl = connUrl.Replace("postgres://", string.Empty);
                        var pgUserPass = connUrl.Split("@")[0];
                        var pgHostPortDb = connUrl.Split("@")[1];
                        var pgHostPort = pgHostPortDb.Split("/")[0];
                        var pgDb = pgHostPortDb.Split("/")[1];
                        var pgUser = pgUserPass.Split(":")[0];
                        var pgPass = pgUserPass.Split(":")[1];
                        var pgHost = pgHostPort.Split(":")[0];
                        var pgPort = pgHostPort.Split(":")[1];

                        connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
                        
                    }

                    // Whether the connection string came from the local development configuration file
                    // or from the environment variable from Heroku, use it to set up your DbContext.
                    options.UseNpgsql(connStr);
                });
            
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
            services.AddSwaggerDocumentation();
      
          
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod()
                        .WithOrigins("https://localhost:4200");
                });
            });    

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
