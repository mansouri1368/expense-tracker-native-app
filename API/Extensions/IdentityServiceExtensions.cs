using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => { 
                    opt.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>();

            services.Configure<IdentityOptions>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
            });
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };

                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            // services.AddAuthorization(opt =>
            // {
            //     opt.AddPolicy("IsActivityHost", policy =>
            //     {
            //         policy.Requirements.Add(new IsHostRequirement());
            //     });
            // });

            // services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}