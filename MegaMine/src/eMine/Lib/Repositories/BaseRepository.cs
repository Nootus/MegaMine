using eMine.Lib.Shared;
using eMine.Models.Account;

namespace eMine.Lib.Repositories
{
    public class BaseRepository
    {
        protected ApplicationDbContext dbContext;
        protected ProfileModel profile;

        public BaseRepository()
        {
            profile = Profile.Current;
        }
    }
}
