using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LikesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UserLike> GetUserLIke(int sourceUserId, int likedUserId)
        {
            var userLike = await _context.Likes.FindAsync(sourceUserId, likedUserId);
            return userLike;
        }

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == userId);
                users = likes.Select(like => like.LikedUser);
            }

            if (predicate == "likedBy")
            {
                likes = likes.Where(like => like.LikedUserId == userId);
                users = likes.Select(like => like.SourceUser);
            }

            return await users.Select(user => new LikeDto
            {
                Id = user.Id,
                UserName = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City
            }).ToListAsync();
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            var userWithLikes = await _context.Users
                .Include(c => c.LikedUsers)
                .FirstOrDefaultAsync(c => c.Id == userId);

            return userWithLikes;
        }
    }
}
