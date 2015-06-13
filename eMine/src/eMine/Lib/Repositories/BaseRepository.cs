namespace eMine.Lib.Repositories
{
    public class BaseRepository
    {
        protected ApplicationDbContext dbContext;

        public BaseRepository()
        {
            this.dbContext = new ApplicationDbContext();
        }

        //this will be used when one respository calls another. In those scenarios we don't need to create a new repository
        public BaseRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
