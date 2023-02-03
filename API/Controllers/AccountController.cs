using System.Net;
using System.Net.Mail;
using System.Web;
using API.Dtos;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IPhotoService photoService,
            IUnitOfWork unitOfWork,
            IEmailService emailService,
            IUserRepository userRepository,
            IConfiguration config) {

            this._mapper = mapper;
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._tokenService = tokenService;
            this._photoService = photoService;
            this._unitOfWork = unitOfWork;
            this._emailService = emailService;
            this._userRepository = userRepository;
            this._config = config;
        }

        [HttpPost("resetpassword")]
        public async Task<ActionResult<UserDto>> ResetPasswordUser(
            UserResetDto userResetDto)
        {   
            
            var user = await _userManager.FindByIdAsync(userResetDto.UserId);

            var result = await _userManager.ResetPasswordAsync(user, 
                userResetDto.Token, userResetDto.Password);
            
            if (result.Succeeded)
            {
                
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("ForgotPassword")]
        public async Task<ActionResult<UserDto>> ForgotPasswordUser(
            UserForgotDto userForgotDto)
        {
            var user = await _userManager.FindByEmailAsync(userForgotDto.Email);

            if (user == null || !user.EmailConfirmed)
            {
                return BadRequest();
            }
    

            var confirmationToken = await _userManager
                                            .GeneratePasswordResetTokenAsync(user);
            
            
            var uriBuilder = new UriBuilder(_config["ReturnPaths:ResetPassword"]);
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            query["userId"] = user.Id;
            query["token"] = confirmationToken;
            uriBuilder.Query = query.ToString();
            var urlString = uriBuilder.ToString();

            await _emailService.SendAsync(
                "rodriguez.johnrussel.d.1592@gmail.com",
                user.Email, 
                "Reset Password",
                $"Please click on this link to reset your password <a href=\"{urlString}\">Reset Password</a>");

            return Ok();
        }


        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {

            var user = await _unitOfWork.UserRepository
                            .GetUserByUsernameAsync(User.GetUsername());
                    
            _mapper.Map(userUpdateDto, user);

            _unitOfWork.UserRepository.Update(user);

            var result = await _unitOfWork.Complete();
            if (result <= 0) return BadRequest("Failed to update user");

            return Ok();
            
        }

        [HttpPost("EmailConfirmation")]
        public async Task<IActionResult> VerifyEmail(
            VerifyEmailDto verifyEmailDto)
        {

            var user = await _userManager.FindByIdAsync(verifyEmailDto.UserId);

            var result = await _userManager.ConfirmEmailAsync(user, verifyEmailDto.Token);
            
            if (result.Succeeded)
            {
                
                return Ok();
            }

            return BadRequest();

        }


        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<Pagination<AppUser>>> GetAllUser(
            string search
        )
        {
            var user = await _userManager.ListAllUsers();

            var searchUsr = user.Where(
                d => d.DisplayName.ToLower().Contains(
                string.IsNullOrEmpty(search) ? "" : search.ToLower())
                ||
                d.Email.ToLower().Contains(
                string.IsNullOrEmpty(search) ? "" : search.ToLower())
                ).ToList();

            var totalItems = string.IsNullOrEmpty(search) ? user.Count() : searchUsr.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<UserToReturn>>(string.IsNullOrEmpty(search) ? user : searchUsr);

            return Ok(new Pagination<UserToReturn>(totalItems, data));

        }
        
        [Authorize]
        [HttpGet("admin/all")]
        public async Task<ActionResult<Pagination<AppUser>>> GetAllAdmin()
        {

            var user = await _userManager.ListAllAdmin();

            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<UserToReturn>>(user);

            return Ok(new Pagination<UserToReturn>(totalItems, data));

        }

        [Authorize]
        [HttpGet("faculty/all")]
        public async Task<ActionResult<Pagination<AppUser>>> GetAllFaculty()
        {

            var user = await _userManager.ListAllFaculty();
          
            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<FacultyToReturn>>(user);

            return Ok(new Pagination<FacultyToReturn>(totalItems, data));

        }

        [Authorize]
        [HttpGet("accreditor/all")]
        public async Task<ActionResult<List<AppUser>>> GetAllAccre()
        {

            var user = await _userManager.ListAllAccre();

            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<UserToReturn>>(user);

            return Ok(new Pagination<UserToReturn>(totalItems, data));

        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
        {
            
            var user = await _userManager
                .FindByEmailAsync(loginDto);
            
            if(user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(
                user, loginDto.Password, false
            );

            if (!await _userManager.IsEmailConfirmedAsync(user))
                return Unauthorized(new ApiResponse(401, "Email is not confirmed"));

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized(new ApiResponse(401, "Invalid Authentication"));

            if(!result.Succeeded)  return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Id = user.Id,
                PhotoUrl = user.UserPhoto.Url,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,  
                Created = user.Created,
            };

        }

        [Authorize]
        [HttpGet(Name = "GetUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await _userManager.FindUserByEmailFromClaimsPrinciple(
                User
            );


            return new UserDto
            {
                Id = user.Id,
                PhotoUrl = user.UserPhoto.Url,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                Created = user.Created,
            };

        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync(
            [FromQuery] string email
        )
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpGet("get-photo")]
        public async Task<ActionResult<UserPhoto>> GetPhotos(string userId)
        {
            var spec = new PhotosWithUserSpec();
            var userPhoto = await _unitOfWork.Repository<UserPhoto>()
                                            .ListAsync(spec);
            return Ok(userPhoto);
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<UserPhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userManager.FindUserByEmailFromClaimsPrinciple(
                User
            );

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new UserPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.UserPhoto = photo;
            _unitOfWork.Repository<UserPhoto>().Add(user.UserPhoto);
        
            if (await _unitOfWork.Complete() <= 0)
            {
                return BadRequest("Problem addding photo");
            }

            return CreatedAtRoute("GetUser",
                new { username = user.UserName }, 
                _mapper.Map<UserPhotoDto>(photo));


        }


        [HttpDelete("delete-photo/{id}")]
        public async Task<ActionResult<UserPhotoDto>> DeletePhoto(
            int id)
        {
            var user = await _userManager.FindUserByEmailFromClaimsPrinciple(
                User
            );

            if (user.UserPhoto == null) return NotFound();

            if (user.UserPhoto.PublicId == null)
            {
                var result = await _photoService.DeletePhotoAsync(user.UserPhoto.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }
      
            _unitOfWork.Repository<UserPhoto>().Delete(user.UserPhoto);

            if (await _unitOfWork.Complete() <= 0) return Ok();

            return BadRequest("Failed to delete the photo");
            

        }


        //*== Admin ==
        [HttpPost("admin/register")]
        public async Task<ActionResult<UserDto>> RegisterAdmin(
            RegisterUserDto registerDto)
        {

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                UserPhoto = new UserPhoto("assets/img/user_icon_default.png")
            };

            var result = await _userManager.CreateAsync(
                user, 
                registerDto.Password);

            if(!result.Succeeded) {
                
                return BadRequest(new ApiResponse(400));

            }

            if(result.Succeeded)
            {
                var confirmationToken = await _userManager
                                                .GenerateEmailConfirmationTokenAsync(user);
                
                var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                query["userId"] = user.Id;
                query["token"] = confirmationToken;
                uriBuilder.Query = query.ToString();
                var urlString = uriBuilder.ToString();

                await _emailService.SendAsync(
                    "rodriguez.johnrussel.d.1592@gmail.com",
                    user.Email, 
                    "Please confirm your email",
                    $"Please click on this link to your email <a href=\"{urlString}\">Verify Email</a>");
                
            }



            var roleAddResult = 
                await _userManager.AddToRoleAsync(user, "Admin");
            
            if (!roleAddResult.Succeeded){

              return BadRequest("Failed to add to role");  
            }

            return new UserDto
            {
                Id = user.Id,
                PhotoUrl = user.UserPhoto.Url,
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                Created = user.Created
            };

        }





        //*== Faculty ==
        [HttpPost("faculty/register")]
        public async Task<ActionResult<UserDto>> RegisterFaculty(
            RegisterUserDto registerFacultyDto)
        {

            var user = new AppUser
            {
                DisplayName = registerFacultyDto.DisplayName,
                Email = registerFacultyDto.Email,
                UserName = registerFacultyDto.Email,
                UserPhoto = new UserPhoto("assets/img/user_icon_default.png")
            };

            var result = await _userManager.CreateAsync(
                user, 
                registerFacultyDto.Password);

            if(!result.Succeeded) {

                return BadRequest(new ApiResponse(400));
            }

            if(result.Succeeded)
            {

                var confirmationToken = await _userManager
                                                .GenerateEmailConfirmationTokenAsync(user);
                
            
                var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                query["userId"] = user.Id;
                query["token"] = confirmationToken;
                uriBuilder.Query = query.ToString();
                var urlString = uriBuilder.ToString();

                await _emailService.SendAsync(
                    "rodriguez.johnrussel.d.1592@gmail.com",
                    user.Email, 
                    "Please confirm your email",
                    $"Please click on this link to confirm your email <a href=\"{urlString}\">Verify Email</a>");
                
            }


            var roleAddResult = 
                await _userManager.AddToRoleAsync(user, "Faculty");
            
            if (!roleAddResult.Succeeded){

              return BadRequest("Failed to add to role");  
            }

            return new UserDto
            {
                Id = user.Id,
                PhotoUrl = user.UserPhoto.Url,
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                Created = user.Created
            };
        }

        //*== Accreditor ==
        [HttpPost("accreditor/register")]
        public async Task<ActionResult<UserDto>> RegisterAccreditor(
            RegisterUserDto registerDto)
        {

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                UserPhoto = new UserPhoto("assets/img/user_icon_default.png")
            };

            var result = await _userManager.CreateAsync(
                user, 
                registerDto.Password);

            if(!result.Succeeded) {

                return BadRequest(new ApiResponse(400));

            }

            if(result.Succeeded)
            {

                var confirmationToken = await _userManager
                                                .GenerateEmailConfirmationTokenAsync(user);
                
                
                var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                query["userId"] = user.Id;
                query["token"] = confirmationToken;
                uriBuilder.Query = query.ToString();
                var urlString = uriBuilder.ToString();

                await _emailService.SendAsync(
                    "rodriguez.johnrussel.d.1592@gmail.com",
                    user.Email, 
                    "Please confirm your email",
                    $"Please click on this link to confirm your email <a href=\"{urlString}\">Verify Email</a>");
                
            }


            var roleAddResult = 
                await _userManager.AddToRoleAsync(user, "Accreditor");
            
            if (!roleAddResult.Succeeded){

              return BadRequest("Failed to add to role");  
            }

            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                PhotoUrl = user.UserPhoto.Url,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                Created = user.Created
            };

        }
        
    }
}